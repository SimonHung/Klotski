//==========================================
// Klotski (華容道) : edit mode
//
// 08/31/2013 -(1) clear step number, 
//                 while press clear button
//             (2) change initial block pos
//
// 08/21/2013 - add tap for touch machine
// 
// 08/08/2013 - implement save function  
//
// 07/25/2013 - created by Simon Hung
//==========================================

var clearButton, verifySaveButton;

function addEditModeButton()
{
	var buttonWidth = images.first0.width+0;
	var startX = boardStartX - buttonWidth/2;
	var startY = boardStartY + BOARD_HEIGHT + 10;
	
	clearButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		width: images.reset0.width,
		height: images.reset0.height,
		fillPatternImage: images.reset0
	});
	
	startX += 10;
	firstButton = new Kinetic.Rect({
		x: startX+buttonWidth,
		y: startY,
		width: images.first0.width,
		height: images.first0.height,
		fillPatternImage: images.first0
	});

	backButton = new Kinetic.Rect({
		x: startX+buttonWidth*2,
		y: startY,
		width: images.back0.width,
		height: images.back0.height,
		fillPatternImage: images.back0
	});
	
	playButton = new Kinetic.Rect({
		x: startX+buttonWidth*3,
		y: startY,
		width: images.play2.width,
		height: images.play2.height,
		fillPatternImage: images.play2
	});
	
	nextButton = new Kinetic.Rect({
		x: startX+buttonWidth*4,
		y: startY,
		width: images.next0.width,
		height: images.next0.height,
		fillPatternImage: images.next0
	});

	lastButton = new Kinetic.Rect({
		x: startX+buttonWidth*5,
		y: startY,
		width: images.last0.width,
		height: images.last0.height,
		fillPatternImage: images.last0
	});
	
	startX += 10;
	verifySaveButton = new Kinetic.Rect({
		x: startX+buttonWidth*6,
		y: startY,
		width: images.reset0.width,
		height: images.reset0.height,
		fillPatternImage: images.test0
	});

	gButtonLayer.add(clearButton);
	gButtonLayer.add(firstButton);
	gButtonLayer.add(backButton);
	gButtonLayer.add(playButton);
	gButtonLayer.add(nextButton);
	gButtonLayer.add(lastButton);
	gButtonLayer.add(verifySaveButton);
	
	gButtonLayer.draw();
}

function clearEditModeButton()
{
	clearButton.destroy();
	firstButton.destroy();
	backButton.destroy();
	playButton.destroy();
	nextButton.destroy();
	lastButton.destroy();
	verifySaveButton.destroy();
}

//===========================================================================
// begin for button enable/disable
//===========================================================================

var editModeCanSave = 0;
//-------------------------
// begin for verify button
//-------------------------
function disableVerifyButton()
{
	verifySaveButton.setFillPatternImage(images.test0);
	verifySaveButton.off('mouseover mouseout click tap');
	
	gButtonLayer.draw();
}

function enableVerifyButton()
{
	verifySaveButton.setFillPatternImage(images.test1);
	verifySaveButton.off('mouseover mouseout click tap');
	
	verifySaveButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	verifySaveButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	verifySaveButton.on('click tap', function() {
		var maxMove = setAutoMoveStepInfo().maxMove;
		if(maxMove > 0) {
			var boardString = boardState2BoardString(boardState);
			var exitItem = findBoard(boardString);
			if(exitItem != null) {
				var titleName = gLevelSelectObj.tableLevel2TitleName(exitItem.tableId, exitItem.level);	
				audioPlayExist();
				editModeCanSave = 0;
				disableSaveButton();
				//already exist
				okBoard(gTxtMsg.Exist, 
				       [ ["l", gTxtMsg.SameAs.replace("%s", titleName) + (exitItem.flip?(" (" + gTxtMsg.Flip +")"):"")], 
					     ["l", gTxtMsg.OptimalSolution + maxMove + " " + (maxMove<=1?gTxtMsg.Step:gTxtMsg.Steps)] 
				       ]
				);
				//alert("same as " + titleName + (exitItem.flip?" (flip)":"") + "\n" + "optimal soultion: " + maxMove + " moves!");
				
			} else {
				audioPlayGood();
				editModeCanSave = 1;
				enableSaveButton();
				//good
				okBoard(gTxtMsg.Good, [ ["l", gTxtMsg.OptimalSolution + maxMove + " " + (maxMove<=1?gTxtMsg.Step:gTxtMsg.Steps)] ]);
				//alert("optimal soultion: " + maxMove + " moves!");
			}
			moveBoardStep(0);
		} else { //no solution or don't need move
			audioPlayError();
			editModeCanSave = 0;
			disableVerifyButton();
			if(maxMove < 0) {
				//no solution
				okBoard(gTxtMsg.Error, [ ["l", gTxtMsg.NoSolution + "    "] ]);
				//alert("No solution!");
			} else {
				//zero step
				okBoard(gTxtMsg.Error, [ ["l", gTxtMsg.ZeroStep ] ]);
				//alert("Don't need move!");
			}
			editModeDisableButton();
		}
	});
	gButtonLayer.draw();
}

//-------------------------
// begin for save button
//-------------------------
function disableSaveButton()
{
	verifySaveButton.setFillPatternImage(images.save0);
	verifySaveButton.off('mouseover mouseout click tap');

	gButtonLayer.draw();
}

function saveBoard()
{
	var ynDialog = new confirmDialog();
	
	disableSaveButton();
	moveFirst(1); //move to start state silently
	
	//if(getUserInfo().size >= 30) { //for TEST
	if(getUserInfo().size >= gLevelSelectObj.maxLevelSize()) {
		editModeCanSave = 0;
		audioPlayError();

		//Too Many Items
		//"Please remove some items for add new one !
		
		okBoard(gTxtMsg.TooManyItem, 
			[ ["l", gTxtMsg.RemoveSome] ]);
		return;	
	}
 
	var boardString = boardState2BoardString(boardState);
	editModeCanSave = 0; //already saved
	
	var playInfo = addUserDefinedBoard(boardString,stepInfo.length);

	if(playInfo != null) { //save success
		audioPlaySuccess();
		
		var levelString = gTxtMsg.NewLevel + " '" + gTxtMsg.UserLevel + playInfo.level + "'";
		//save success, play it now ?
		ynDialog.init("dialogStage",
			images, 				
			boardStageX, 
			boardStageY, 
			gTxtMsg.SaveSuccess,
			[ levelString, gTxtMsg.PlayItNow ],
			playAfterSave, playInfo
		);
		ynDialog.show();	
	} else {
		//should not execute below statement !
		okBoard(gTxtMsg.Exist, 
			[ ["l", "Error: This board style already exist !"] ]);
	}
}

function playAfterSave(yes, playInfo)
{
	//window.alert("Yes = " + yes);
	if(yes) {
		//set current board as selected board
		var newSelectedBoard = gLevelSelectObj.changeSelectedBoard(playInfo);	
	
		if(newSelectedBoard != null) {
			gCurSelectedBoard = newSelectedBoard;
			stepInfo = [];
			gHintsCount = 0;
			manualMoveCount = 0;
			curBoardStep = 0;
		}		
		//switch to game mode and play current created board
		switch2GameMode();
		gameMode = !gameMode;
	}
	
}

function enableSaveButton()
{
	if(!editModeCanSave) return;
	
	verifySaveButton.setFillPatternImage(images.save1);
	verifySaveButton.off('mouseover mouseout click tap');
	
	verifySaveButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	verifySaveButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	verifySaveButton.on('click tap', function() {
		if(blockIsMoving) return;
		
		//save current board state to localStorage
		saveBoard();
		
	});
	gButtonLayer.draw();
}

//-------------------------------------------
// begin for edit mode clear board button
//-------------------------------------------
function disableClearButton()
{
	clearButton.setFillPatternImage(images.reset0);
	clearButton.off('mouseover mouseout click tap');
/*	
	verifySaveButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});
*/	
	gButtonLayer.draw();
}

function enableClearButton()
{
	clearButton.setFillPatternImage(images.reset1);
	clearButton.off('mouseover mouseout click tap');
	
	clearButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	clearButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	clearButton.on('click tap', function() {
		for(var x = 0; x < G_BOARD_X; x++) {
			for(var y = 0; y < G_BOARD_Y; y++) {
				var blockId = boardState[x][y];
				if(blockId) {
					var block = blockObj[blockId];
					var curPointX  = block.getPosition().x, curPointY  = block.getPosition().y;
					//console.log('curPointX = ' + curPointX + ", curPointY = " + curPointY);
					block.setAttrs({curBoardPosX: -1, curBoardPosY: -1}); //out of board
					setBoardState(boardState, x, y, block.getAttr('style'), 0); //remove this block
					block.moveToTop();
					blockMoveTo(block, curPointX, curPointY, block.getAttr('defaultPointX'), block.getAttr('defaultPointY')); //move this block back 
				}
			}
		}	
		numOfEmptyCell = G_BOARD_SIZE;
		hasBigBlock = 0;
		disableClearButton();
		checkBoardState();
		writeStepInfo(0); //clear step number, 8/31/2013
	});
	gButtonLayer.draw();
}

//-----------------------------------
// count number of empty block & 
// check biggest block exist or not 
//-----------------------------------
var hasBigBlock = 0
var numOfEmptyCell = 0;
function countBoardState(style, addBlock)
{
	var numOfCell = gBlockStyle[style][0] *  gBlockStyle[style][1] * (addBlock?-1:1);

	if(style == 4) hasBigBlock = (addBlock?1:0);
	
	numOfEmptyCell += numOfCell; 
		
}

//-----------------------------------------------------
// check board state, 
// if remain 2 empty-block then enable verify button
//-----------------------------------------------------
function checkBoardState()
{
	//if((numOfEmptyCell == 2 || numOfEmptyCell == 3) && hasBigBlock) { 
	// three empty will spend more time to solve problem !
	if(numOfEmptyCell == 2 && hasBigBlock) {
		enableVerifyButton();
	} else {
		disableVerifyButton();
		editModeDisableButton();
	}
}

//-----------------------------
// set edit mode button state 
//-----------------------------
function setEditModeButtonState()
{
	var maxStep = stepInfo.length;

	//first	
	if(curBoardStep <= 0 || maxStep <= 0) disableFirstButton();
	else enableFirstButton();
	
	//back
	if(curBoardStep <= 0) disableBackButton();
	else enableBackButton();
	
	//play, next & last
	if(curBoardStep >=  maxStep) {
		disableNextButton();
		disablePlayButton();
		disableLastButton();
	} else {
		enableNextButton();
		enableStartPlayButton();
		enableLastButton();
	}
	
	//enableDemoModeButton();
}

//-------------------------------
// Disable all edit mode button
//-------------------------------
function editModeDisableButton()
{
	disableFirstButton();
	disableBackButton();
	disablePlayButton();
	disableNextButton();
	disableLastButton();
}

//----------------------------------
// how many blocks for each style
// 1X1 -- 14   style: 1
// 2X1 -- 6    style: 2
// 1X2 -- 6    style: 3
// 2X2 -- 1    style: 4
//----------------------------------

var blockGap, editMinX, editMinY;

function createEditBoard()
{
	//edit block start position

	//var blockInfo1 = [ [14, 2, 0], [ 6, 0, 2], [6, 2, 1], [1, 0, 0] ]; //[ numOfBlock, posX, posY]
	//var blockInfo2 = [ [14, 1, 3], [ 6, 0, 2], [6, 0, 3], [1, 0, 0] ]; //[ numOfBlock, posX, posY]
	var blockInfo1 = [ [14, 0, 0], [ 6, 1, 2], [6, 0, 1], [1, 1, 0] ]; //[ numOfBlock, posX, posY]
	var blockInfo2 = [ [14, 1, 1], [ 6, 0, 2], [6, 0, 0], [1, 0, 3] ]; //[ numOfBlock, posX, posY]
	
	var blockInfo = blockInfo1;
	
	numOfEmptyCell = G_BOARD_SIZE;
	
	blockGap = 10;
	editMinX = 15;
	if(boardStartX <= BLOCK_CELL_SIZE * 3 + blockGap + editMinX*2) {
		//------------------------------------------
		// left hand side can not fit 3 block size 
		// so use blockInfo2 (2 block size mode)
		//------------------------------------------
		blockInfo = blockInfo2;
		blockGap = 0;
		//editMinX = 10;
		editMinY = Math.floor(boardStartY+ BOARD_HEIGHT - BLOCK_CELL_SIZE*5);	
	} else { //8/31/2013, change initial block position
		editMinY = Math.floor(boardStartY+ (BOARD_HEIGHT - BLOCK_CELL_SIZE*3 - blockGap)/2);	
	}

	boardState = [];
	for(var x = 0; x < G_BOARD_X; x++) {
		boardState[x] = [];
		for(var y = 0; y < G_BOARD_Y; y++) {
			boardState[x][y] = 0; //empty block
		}
	}
	
	gBoardLayer.removeChildren();
	var blockId = 1; //0: for empty (don't use)
	
	blockObj = [];
	for(var i =0; i < blockInfo.length; i++) {
		for(var j = 0; j < blockInfo[i][0]; j++) {
			blockObj[blockId]  = createEditBlock(blockId, blockInfo[i][1], blockInfo[i][2], i+1);
			blockId++;
		}
	}
	gBoardLayer.draw();
}

function createEditBlock(id, x, y, style)
{
	var startPosX = editMinX+BLOCK_CELL_SIZE*x+(x>0?blockGap:0);
	var startPosY = editMinY+BLOCK_CELL_SIZE*y+(y>0?blockGap:0);

	var block = new Kinetic.Rect({
		//begin mine attributes ===============================
		id: id,
		defaultPointX: startPosX,
		defaultPointY: startPosY,
		curBoardPosX: -1,
		curBoardPosY: -1,
		sizeX: gBlockStyle[style][0],
		sizeY: gBlockStyle[style][1],
		style: style,
		//endn mine attributes ================================
		x: startPosX,
		y: startPosY,
		width:  BLOCK_CELL_SIZE*gBlockStyle[style][0]-CELL_BORDER_SIZE,
		height: BLOCK_CELL_SIZE*gBlockStyle[style][1]-CELL_BORDER_SIZE,
		fillPatternImage: images['block' + style],
		strokeWidth: CELL_BORDER_SIZE,
		draggable: true
	});
	
	block.setPos = function(x,y) 
	{
		this.setAttrs({curBoardPosX: x, curBoardPosY: y});
	}
	
	block.movePos = function(x,y) 
	{
		var curX = minX + x * BLOCK_CELL_SIZE;
		var curY = minY + y * BLOCK_CELL_SIZE;
		this.setAttrs({curBoardPosX: x, curBoardPosY: y});
		this.setPosition(curX, curY);
	}
	
	editEnableBlockDraggable(block);
	gBoardLayer.add(block);
	return block;
}	

function editEnableBlockDraggable(block)
{
	// add cursor styling
	block.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	block.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});

	block.on('dragstart', function() {
		if(this.getAttr('curBoardPosX') >=0) { 
			//this block alrady in board, clear it 
			setBoardState(boardState, this.getAttr('curBoardPosX'), this.getAttr('curBoardPosY'), this.getAttr('style'), 0);
			this.setAttrs({curBoardPosX: -1, curBoardPosY: -1});
			countBoardState(this.getAttr('style'), 0); //0: remove block
			checkBoardState();
		}
		this.moveToTop();
	});	
	
	block.on('dragend', function() {
		var curPointX  = this.getPosition().x;
		var curPointY  = this.getPosition().y;
		var curPos = editPoint2Pos(curPointX, curPointY);

		if(curPos.posX < 0 || !canInsert2Board(boardState, curPos.posX, curPos.posY, this.getAttr('style')) ) {
			//move it back to default position
			//this.setPosition(this.getAttr('defaultPointX'), this.getAttr('defaultPointY'));
			blockMoveTo(this, curPointX, curPointY, this.getAttr('defaultPointX'), this.getAttr('defaultPointY')); 
		} else {
			curPointX = minX + curPos.posX * BLOCK_CELL_SIZE;
			curPointY = minY + curPos.posY * BLOCK_CELL_SIZE;
			this.setPosition(curPointX, curPointY);
			this.setAttrs({curBoardPosX: curPos.posX, curBoardPosY: curPos.posY});
			setBoardState(boardState, curPos.posX, curPos.posY, this.getAttr('style'), this.getAttr('id'));
			countBoardState(this.getAttr('style'), 1); //1: add block
			checkBoardState(); 
		}
		if(numOfEmptyCell == G_BOARD_SIZE) disableClearButton();
		else enableClearButton();
		
		this.getLayer().draw();
	});
}

//--------------------------
// point to board position
//--------------------------
function editPoint2Pos(x,y)
{
	var posX = posY = 0;
	
	//if(x < minX || y < minY ) return { posX: -1, posY:-1};
	
	var offsetX = x - minX;
	if(offsetX < 0) {
		if(offsetX < -BLOCK_CELL_SIZE/2) posX = -1;
		offsetX = 0;
	}
	while(offsetX >= BLOCK_CELL_SIZE) { offsetX -= BLOCK_CELL_SIZE; posX++;}

	var offsetY = y - minY;
	if(offsetY < 0) {
		if(offsetY < -BLOCK_CELL_SIZE/2) posY = -1;
		offsetY = 0;
	}
		
	while(offsetY >= BLOCK_CELL_SIZE) { offsetY -= BLOCK_CELL_SIZE; posY++;}
	
	if(offsetX > BLOCK_CELL_SIZE/2) posX++;
	if(offsetY > BLOCK_CELL_SIZE/2) posY++;

	if(posX >= G_BOARD_X || posY >= G_BOARD_Y || posX < 0 || posY < 0) { posX = -1; posY = -1; };

	
	return {posX: posX, posY: posY};
}

//----------------------------------
// check for insert block to board
//----------------------------------
function canInsert2Board(boardState, x, y, style)
{
	var rc = 1;
	
	switch(style) {
	case 1: //1X1
		if(boardState[x][y]) rc = 0;
		break;
	case 2: //2X1
		if(x > G_BOARD_X-2 || boardState[x][y] || boardState[x+1][y]) rc = 0;
		break;
	case 3: //1X2
		if(y > G_BOARD_Y-2 || boardState[x][y] || boardState[x][y+1]) rc = 0;
		break;
	case 4: //2X2
		if(x > G_BOARD_X-2 || y > G_BOARD_Y-2 || 
		   boardState[x][y] || boardState[x+1][y] || 
		   boardState[x][y+1] || boardState[x+1][y+1] ) rc = 0;
		break;	
	default:
		error("canInsert2Board(): design error!");
		rc = 0;
		break;
	}
	return rc;
}

function blockMoveTo(block, startX, startY, endX, endY)
{
	var distance = (Math.abs(startX - endX) + Math.abs(startY - endY)) / BLOCK_CELL_SIZE;
	//-----------------------------------
	//set move speed, depend on distance 
	//-----------------------------------
	if(distance > 10) distance = 10; //10/20 = 0.5
	if(distance <  2) distance = 2;  //2/20 = 0.1
	debug(distance/20);
	var tweenObj = new Kinetic.Tween({
		node: block, 
		duration: distance/20,
		x: endX,
		y: endY,
		onFinish: function() {
			tweenObj.destroy();
		}
	});
	tweenObj.play();
}

//--------------------------------------
//  set edit board from selected level
//--------------------------------------
function setEditBoard(boardString)
{
	var blockIdOfStyle = []; //current block id to different block style 

	//clear board state	
	boardState = [];
	for(var x = 0; x < G_BOARD_X; x++) {
		boardState[x] = [];
		for(var y = 0; y < G_BOARD_Y; y++) {
			boardState[x][y] = -1;
		}
	}
 
	//move all block to default position
	for(var blockId=1; blockId < blockObj.length; blockId++) {
		var block = blockObj[blockId];
	
		block.setAttrs({curBoardPosX: -1, curBoardPosY: -1}); //out of board
		//move to default position		
		block.setPosition(block.getAttr('defaultPointX'), block.getAttr('defaultPointY')); 
	}	
	numOfEmptyCell = G_BOARD_SIZE;
	hasBigBlock = 0;
	
	var i = 0;
	var VOID_CHAR = '?';
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			if(boardState[x][y] >= 0) { i++; continue;}
			
			var style = gBlockBelongTo[boardString.charCodeAt(i++) - VOID_CHAR.charCodeAt(0)];
			var blockId;
			
			if(style) {
				//move exist block (block for edit) to correct position
				if(typeof blockIdOfStyle[style] == 'undefined') {
					//first time to find the first id of same block style 
					for(blockId = 1; blockId < blockObj.length; blockId++) {
						if(blockObj[blockId].getAttr('style') == style){
							blockIdOfStyle[style] = blockId;
							break;
						}
					}
				} else {
					//get next block id of this style
					blockId = ++blockIdOfStyle[style];
				}
				if(blockId >= blockObj.length || blockObj[blockId].getAttr('style') != style) {
					error("Too few blocks for style = " + style );
				}
				
				//set block position
				blockObj[blockId].movePos(x,y);
				countBoardState(style, 1); //1: add block
			}

			//set block state
			setBoardState(boardState, x, y, style, style?blockId:0);
		}	
	}
	enableClearButton();	
	checkBoardState(); 
	editModeDisableButton();
	gBoardLayer.draw();
}

//-------------------------------------------------
// display edit mode information (for info button)
//-------------------------------------------------
function infoEditMode()
{
	okBoard(gTxtMsg.EditMode, 
		[ ["l", gTxtMsg.EditModeMsg] ]);
}
