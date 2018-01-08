//=============================================================================
// Klotski (華容道) main program
//
// include libraries: kinetic-v4.5.4.js (http://kineticjs.com/)
//                    preloadjs-0.6.2.min.js (http://createjs.com/)
//                    soundjs-0.6.2.min.js (http://createjs.com/)
//
// V1.5 
// 01/08/2018 - (1) Change "展示" to "示範"
//
// V1.4
// 09/07/2017 - (1) Bug Fixed: load audio from MicroSoft Edge will cause program hang
//                  ==> Change to use PreloadJS & SoundJS to load and play audio
//              (2) Performance improvement: Slover skip calculation the mirror state
//
// V1.3
// 08/31/2013 - (1) Edit mode: display step number = 0 while press clear button
//              (2) Edit mode: change initial block position while switch to edit mode
//
// V1.2
// 08/22/2013 - add assign argument from url 
//              ex: http://......?l=4-5 (open level 4-5 )
//              ex: http://......?l=橫刀立馬 (open classic name = 橫刀立馬)
//
// V1.1 
// 08/14/2013 - release version
//
// 08/08/2013 - implement more edit mode (not finished yet!)
//
// V1.1
// 08/03/2013 - add edit mode (not finished yet!)
//
// V1.0
// 07/23/2013 - (1) first version support play mode & demo mode
//
// 05/10/2013 - create by Simon Hung
//=============================================================================

//===========
// define 
//===========
var VERSION_STRING = "1.5";
var DATA_VERSION = 1;

var MIN_SCREEN_X = 1000;
var MIN_SCREEN_Y = 650;

var BOTTOM_BOUND = 60; //bottom bound for action button

var BLOCK_CELL_SIZE = 90;
var MAX_MOV_STEP = Math.floor(BLOCK_CELL_SIZE/4);
var CELL_BORDER_SIZE = 0;

var BACKGROUND_COLOR = "#FAFAD2"; //Light Goldenrod Yellow
var TITLE_COLOR = "black";
var BOARD_BORDER_WIDTH = 50;
var BOARD_WIDTH = BLOCK_CELL_SIZE * G_BOARD_X + BOARD_BORDER_WIDTH*2;
var BOARD_HEIGHT = BLOCK_CELL_SIZE * G_BOARD_Y + BOARD_BORDER_WIDTH*2;

var MIN_HINTS_STEP = 5;
var MAX_HINTS_STEP = 10;
var ACTIVE_HINTS_COUNT = 15;

//================== 
// global variable 
//==================
var screenX, screenY;
var boardStageX, boardStageY;
var titleStartX, titleStartY;
var boardStartX, boardStartY;
var blockStartX, blockStartY;

var minX, minY;

var gStage;
var gBoardLayer;
var gButtonLayer
var gBackgroundLayer;  //kinetic layer

var playSpeed = 1;  //speed: 1, 2, 3, ..., no used
var dataVersion = 0;

var boardState; //current boardState [x][y]
var stepInfo;   //current step information
var manualMoveCount = 0; //move count for active hints button

var cellSize = BLOCK_CELL_SIZE - CELL_BORDER_SIZE;

/*
window.onresize = function(event) {
	//alert("resize");
	location.reload();
}
*/

window.onload = function()
{
	//just for fixed: chrome sets cursor to text while dragging, why?
	//http://stackoverflow.com/questions/2745028/chrome-sets-cursor-to-text-while-dragging-why
	//This will disable any text selection on the page and it seems that browser starts to show custom cursors.
	document.onselectstart = function(){ return false; } ;
	init();
	loadResource(initBoard); //after resource load complete will callback to initBoard
};	

var gLevelSelectObj;
var gCurSelectedBoard;
var gPassLevelDialog;
var gOKDialog;

var gHintsCount;

function init()
{
	initScreenSize();
	initScreenPosColor();
	showLoadingMsg("dialogStage", boardStageX, boardStageY);
}

function initBoard()
{
	hideLoadingMsg();
	initScreenVariable();
	createStageLayer();
	addBackgroundLayer();

	restoreConfigInfo(); //get config info: volume state & data_version
	
	gLevelSelectObj = new vSelectBoard();
	gCurSelectedBoard = gLevelSelectObj.init(
		"selectMainStage", "selectTabsStage", "selectBoardStage", boardStageX, boardStageY, setSelectedLevel );
	gPassLevelDialog = new passedDialog();
	gOKDialog = new okDialog();
		
	stepInfo = [];
	gHintsCount = 0;
	manualMoveCount = 0;

	//------------------------------------
	// 08/22/2013
	// force assign level from url
	//------------------------------------
	var assignLevel = getUrlArgument();
	if(assignLevel != null) {
		getAssignLevel(assignLevel); //direct assign initial level from url //08/22/2013
	} else {	
		getPlayInfo(); //get last step and board info
	}
	setPlayMode(stepInfo.length);

	createFunctionButton();
	createGameButton();
	enableFunctionButton();
	enableVolumeButton();
	
	enableGameButton();
 
	setTimeout(function(){audioPlayStartup();}, 500 );
}

var playMode = 0; //0: start mode, 1: play mode, 2:demo mode, 3: edit mode

function clearLastModeObject(newplayMode)
{
	switch(playMode) {
	case 1: 
		clearPlayModeButton();
		break;
	case 2:
		clearDemoModeButton();
		break;
	case 3:
		clearEditModeButton();
		break;
	}
	playMode = newplayMode;
}

function setButtonState()
{
	switch(playMode) {
	case 1:
		setPlayModeButtonState();
		break;
	case 2:
		setDemoModeButtonState();
		break;
	case 3:
		setEditModeButtonState();
		break;
	}
}

function setPlayMode(step)
{
	clearLastModeObject(1);	//set mode = "play mode" and clear last 
	addPlayModeButton();
	createBoard(gCurSelectedBoard.boardInfo.board);
	moveBoardStep(step);
}

function setDemoMode()
{
	clearLastModeObject(2);	//set mode = "demo mode" and clear last
	addDemoModeButton();
	createBoard(gCurSelectedBoard.boardInfo.board);
	var rc = setAutoMoveStepInfo();
	moveBoardStep(0);
	
	return rc;
}

function setEditMode()
{
	clearLastModeObject(3);	//set mode = "edit mode" and clear last
	addEditModeButton();
	createEditBoard();
	writeStepInfo(0);
}

//---------------------------------------------------------
// get url argument (08/22/2013)
// format : (1) http://....?l=2-1      (level 2-1)
//          (2) http://....?l=橫刀立馬 (by classic name)
//---------------------------------------------------------
function getUrlArgument()
{
	var urltext = decodeURIComponent(document.location.href);

	if (urltext.indexOf('?') < 0) return null;
	
	var argText = urltext.substring(urltext.indexOf('?')+1).replace(/\s/g, '');

	//----------------------------------------------------------------
	//reference: http://www.w3schools.com/jsref/jsref_obj_regexp.asp
	//----------------------------------------------------------------
	if( /l=\d{1,2}-\d{1,2}/.test(argText)) { // l=3-5 or l=1-56
		return { type:'tabsLevel', tabsLevel: argText.substring(2).split("-") };
	}
	if(argText.indexOf('l=') == 0 && argText.length >= 3) { //l=橫刀立馬
		return { type:'name', name: argText.substring(2) };
	}
	
	return null;
}

//---------------------------------------
// get assign level from boardlist info 
// 08/22/2013
//---------------------------------------
function getAssignLevel(assignLevel)
{
	var newSelectedBoard = null;
	
	switch(assignLevel.type) {
	case 'tabsLevel': //by tabs-level 
		var tabsId = parseInt(assignLevel.tabsLevel[0], 10) - 1; // (0 - )
		var level = parseInt(assignLevel.tabsLevel[1],10);     // (1 - )
		newSelectedBoard = gLevelSelectObj.changeBoardByTabsLevel(tabsId, level);
		break;
	case 'name': //by classic name
		newSelectedBoard = gLevelSelectObj.changeBoardByClassicName(assignLevel.name);
		break;
	default:
		break;
	}

	if(newSelectedBoard != null) {
		gCurSelectedBoard = newSelectedBoard;
		stepInfo = [];
		gHintsCount = 0;
		manualMoveCount = 0;
	}
}

//-----------------------------------------------------
//get last play step & board info from local storage
//-----------------------------------------------------
function getPlayInfo()
{
	var playInfo = restorePlayInfo();
	
	if(playInfo == null) return;
	
	var newSelectedBoard = gLevelSelectObj.changeSelectedBoard(playInfo);
	
	if(newSelectedBoard != null) {
		gCurSelectedBoard = newSelectedBoard;
		stepInfo = playInfo.stepInfo;
		gHintsCount = playInfo.hints;
		manualMoveCount = playInfo.moveCount;
	}
}

function initScreenSize()
{
	screenX = 0, screenY = 0;

	//----------------------------------------------------------------------
	// Window size and scrolling:
	// URL: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
	//----------------------------------------------------------------------
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		screenX = window.innerWidth;
		screenY = window.innerHeight;
	} else if((document.documentElement) && 
		      (document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
	{
		//IE 6+ in 'standards compliant mode'
		screenX = document.documentElement.clientWidth;
		screenY = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		screenX = document.body.clientWidth;
		screenY = document.body.clientHeight;
	}
	
	if(screenX < MIN_SCREEN_X) boardStageX = MIN_SCREEN_X;
	else boardStageX = screenX - 10;
	
	if(screenY < MIN_SCREEN_Y) boardStageY = MIN_SCREEN_Y;
	else boardStageY = screenY - 10;
	
	boardStartX = Math.floor((boardStageX - BOARD_WIDTH )/2);
	//boardStartY = Math.floor((boardStageY - BOARD_HEIGHT)/2);
	boardStartY = Math.floor((boardStageY - BOTTOM_BOUND - BOARD_HEIGHT)/2);
}
 
function initScreenVariable() 
{
	levelNameStartX = boardStartX + 50;
	levelNameStartY = boardStartY + 30; 
	stepMsgStartX = boardStartX + BOARD_WIDTH-60;
	stepMsgStartY = boardStartY + 30;	

	titleStartX = 10;
	titleStartY = 10;
	titleScale = (images.title.width+30 > boardStartX)?boardStartX/(images.title.width)-0.1:1;
	
	//   +== blockStartX
	//   |
	//   V  
	// +----------------+
	// | +------------+ | <== blockStartY
	// | |            | |
	
	blockStartX = Math.floor((boardStageX - G_BOARD_X * BLOCK_CELL_SIZE)/2);
	//blockStartY = Math.floor((boardStageY - G_BOARD_Y * BLOCK_CELL_SIZE)/2);
	blockStartY = boardStartY + Math.floor((BOARD_HEIGHT - G_BOARD_Y * BLOCK_CELL_SIZE)/2);
	
	minX = blockStartX + CELL_BORDER_SIZE/2; //while CELL_BORDER_SIZE = 0, minX = blockStartX
	minY = blockStartY+ CELL_BORDER_SIZE/2;	 //while CELL_BORDER_SIZE = 0, minY = blockStartY
}

function initScreenPosColor()
{
	var baseX = 100;

	var boardStageOffsetX = Math.floor((screenX - boardStageX)/2);
	var boardStageOffsetY = Math.floor((screenX - boardStageY)/2);
	
	document.getElementById('selectMainStage').style.cssText = "top:" + (10) + "px; left:" + (10) + "px; position: absolute;";
	document.getElementById('selectTabsStage').style.cssText = "top:" + (20) + "px; left:" + (20) + "px; position: absolute;";
	document.getElementById('selectBoardStage').style.cssText = "top:" + (55) + "px; left:" + (30) + "px; position: absolute;";
}

//------------------------------------------------------
// select new level 
// isCallback: means callback from select level dialog
//------------------------------------------------------
function setSelectedLevel(selectedBoard, isCallback)
{
	stepInfo = [];
	gHintsCount = 0;
	manualMoveCount = 0;
	
	switch(playMode) {
	case 1:
	case 2:
		gCurSelectedBoard = selectedBoard;
		createBoard(gCurSelectedBoard.boardInfo.board);
			
		//1: play mode, 2:demo mode
		if(playMode == 2) { //demo mode
			savePlayModeInfo();
			var rc = setAutoMoveStepInfo();
			//display animation title while callback from board select
			if(isCallback) animateTitle(gTxtMsg.DemoMode, rc.time);
		} else {
			//if(isCallback) animateTitle(gTxtMsg.GameMode);
		}	
		moveBoardStep(0);
		break;
	case 3:
		setEditBoard(selectedBoard.boardInfo.board);
		break;
	}	
}

function createStageLayer()
{
	//create stage object
	gStage = new Kinetic.Stage({
		container: 'boardStage',
		width: boardStageX,
		height: boardStageY
	});
	
	//create layer object
	gBackgroundLayer  = new Kinetic.Layer();
	gMessageLayer = new Kinetic.Layer();
	gButtonLayer = new Kinetic.Layer();
	gBoardLayer = new Kinetic.Layer();
	
	gStage.add(gBackgroundLayer);
	gStage.add(gMessageLayer);		
	gStage.add(gButtonLayer);
	gStage.add(gBoardLayer);
}

//--------------------------
// add background to layer 
//--------------------------
function addBackgroundLayer()
{
	var borderWidth = 20;
	var textOffset = 15;
	var titleFontSize = 55;
	
	var titleText2 = new Kinetic.Text({
		x: textOffset, 
		y: boardStageY-titleFontSize,
		text: "Klotski",
		fill: BACKGROUND_COLOR,
		fontSize: titleFontSize,
		//fontFamily: "Calibri",
		fontStyle:"bold",
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [2, 2],
		shadowOpacity:0.3
	});	

	var versionText = new Kinetic.Text({
		x: textOffset+titleText2.getWidth(), 
		y: boardStageY-titleFontSize/3,
		text: VERSION_STRING, 
		fill: BACKGROUND_COLOR,
		fontSize: titleFontSize/3,
		fontStyle:"bold",
		shadowColor: 'black',
		shadowBlur: 9,
		shadowOffset: [2, 2],
		shadowOpacity:0.3
	});
	
	var background = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: boardStageX,
		height: boardStageY,
		fill: BACKGROUND_COLOR
	});	
	
	var board = new Kinetic.Rect({
		x: boardStartX,
		y: boardStartY,
		width: BOARD_WIDTH,
		height: BOARD_HEIGHT,
		fillPatternImage: images.board
	});		
	
	var title = new Kinetic.Image({
          x: titleStartX,
          y: titleStartY,
          image: images.title,
		  scaleX:titleScale,
		  scaleY:titleScale
	});	

	document.body.style.background = BACKGROUND_COLOR; //body background color
	
	gBackgroundLayer.add(background);
	gBackgroundLayer.add(title);
	gBackgroundLayer.add(titleText2);
	gBackgroundLayer.add(versionText);
	gBackgroundLayer.add(board);
	gBackgroundLayer.draw();
}

//------------------------------------
// initial board state & create block
//------------------------------------
var blockObj = [];
function createBoard(boardString)
{
	blockObj = [];
	curBoardStep = 0;
	boardState = [];
	
	for(var x = 0; x < G_BOARD_X; x++) {
		boardState[x] = [];
		for(var y = 0; y < G_BOARD_Y; y++) {
			boardState[x][y] = -1;
		}
	}
	gBoardLayer.removeChildren();
	var blockId = 1;  //blockObj[0] : for empty (don't use)
	var i = 0;
	var VOID_CHAR = '?';
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			if(boardState[x][y] >= 0) { i++; continue;}
			
			var style = gBlockBelongTo[boardString.charCodeAt(i++) - VOID_CHAR.charCodeAt(0)];
			
			//don't create block for empty
			if(style) blockObj[blockId] = createBlock(blockId, x, y, style, playMode==1?1:0);
			
			var sizeX = gBlockStyle[style][0];
			var sizeY = gBlockStyle[style][1];
			for(var xx = 0; xx < sizeX; xx++) {
				for(var yy = 0; yy < sizeY; yy++) {
					boardState[x+xx][y+yy] = style?blockId:0; //empty id = 0;
				}
			}
			if(style) blockId++;
			
		}	
	}	
	gBoardLayer.draw();
}

//----------------------------------------------
// build board from boardState
// ==> move exist block to boardState position
//----------------------------------------------
function buildBoard(boardState)
{
	var tmpBoardState = [];
	var id = 0;

	//copy 2 dimensional array 
	for(var x = 0; x < G_BOARD_X; x++) {
		tmpBoardState[x] = boardState[x].slice(0);
	}
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			if((id = tmpBoardState[x][y]) != 0) {
				blockObj[id].movePos(x,y);
				
				//clear current block
				var sizeX = blockObj[id].getAttr('sizeX');
				var sizeY = blockObj[id].getAttr('sizeY');
				for(var yy = 0; yy < sizeY; yy++) {
					for(var xx = 0; xx < sizeX; xx++) {
						tmpBoardState[x+xx][y+yy] = 0;
					}
				}
			}			
		}	
	}	
	gBoardLayer.draw();
}

//------------------------------------------
// Text message to screen (for debug only)
//------------------------------------------
function writeMessage(message) 
{
	var context = gMessageLayer.getContext();
	
	//gMessageLayer.clear();
	context.font = '12pt arial';
	context.fillStyle = 'blue';

	context.fillText(message+"  ", 20,20);
}

//-----------------------------------------
// display board title and move step info
//-----------------------------------------
function writeStepInfo(step, auto) 
{
	var context = gMessageLayer.getContext();
	gMessageLayer.clear();
	
	if(typeof auto == 'undefined') auto = 0;
	
	if(auto) {
		context.fillStyle = '#C40000';
		context.strokeStyle = "#FFBBCC";
	} else {	
		context.fillStyle = '#0000C4';
		context.strokeStyle = "#BABAFA";	
	}

	var len = (1 - (step+"").length)*12;
	context.font = '17pt Calibri';
	context.strokeText(step, stepMsgStartX+1+len, stepMsgStartY+1);
	context.fillText(step, stepMsgStartX+len, stepMsgStartY);

	var titleInfo = gCurSelectedBoard.titleInfo;
	if(playMode == 3) { //edit mode
		titleInfo = gTxtMsg.EditMode;
	}
	
	context.font = '18pt Calibri';
	context.fillStyle = "#BABAFA";
	context.fillText(titleInfo, levelNameStartX+1, levelNameStartY+1);	
	context.fillStyle = "#0000C4";
	context.fillText(titleInfo, levelNameStartX, levelNameStartY);	
}

//----------------------------------
// screen point to board position
//----------------------------------
function point2Pos(x,y)
{
	var posX = posY = 0;
	
	var offsetX = x - minX;
	if(offsetX < 0) offsetX = 0;
	while(offsetX >= BLOCK_CELL_SIZE) { offsetX -= BLOCK_CELL_SIZE; posX++;}

	var offsetY = y - minY;
	if(offsetY < 0) offsetY = 0;
	while(offsetY >= BLOCK_CELL_SIZE) { offsetY -= BLOCK_CELL_SIZE; posY++;}
	
	return {posX: posX, posY: posY, offsetX: offsetX, offsetY: offsetY};
}

//----------------------------------------
// check shiftX, don't out of the board X
//----------------------------------------
function getShiftX(x, y, shiftX, blockSizeX, blockSizeY)
{
	var posX = posY = 0;

	var offsetY = y - minY;
	if(offsetY < 0) offsetY = 0;
	while(offsetY >= BLOCK_CELL_SIZE) { offsetY -= BLOCK_CELL_SIZE; posY++;}

	var offsetX;
	if(shiftX < 0) {
		//block left position
		offsetX = x - minX + shiftX;
		if(offsetX < 0) {
			return shiftX-offsetX;
		}
		while(offsetX >= BLOCK_CELL_SIZE) { offsetX -= BLOCK_CELL_SIZE; posX++;}
		if(!allCellYEmpty(posX, posY,blockSizeY)) {
			return shiftX + BLOCK_CELL_SIZE - offsetX;
		}
	} else {
		//block right position
		offsetX = x - minX + shiftX + BLOCK_CELL_SIZE * blockSizeX - 1;
		if(offsetX < 0) error("desgin error");
		while(offsetX >= BLOCK_CELL_SIZE) { offsetX -= BLOCK_CELL_SIZE; posX++;}
		if(posX >= G_BOARD_X || !allCellYEmpty(posX, posY,blockSizeY)) {
			return shiftX - offsetX - 1;
		}
	}
	return shiftX;
}	

//----------------------------------------
// check shiftY, don't out of the board Y
//----------------------------------------
function getShiftY(x, y, shiftY, blockSizeX, blockSizeY)
{
	var posX = posY = 0;

	var offsetX = x - minX;
	if(offsetX < 0) offsetX = 0;
	while(offsetX >= BLOCK_CELL_SIZE) { offsetX -= BLOCK_CELL_SIZE; posX++;}

	var offsetY;	
	if(shiftY < 0) {
		//block up position
		var offsetY = y - minY + shiftY;
		if(offsetY < 0) {
			return shiftY-offsetY;
		}
		while(offsetY >= BLOCK_CELL_SIZE) { offsetY -= BLOCK_CELL_SIZE; posY++;}
		if(!allCellXEmpty(posX, posY,blockSizeX)) { 
			return shiftY + BLOCK_CELL_SIZE - offsetY;
		}
	} else {
		//block down position
		var offsetY = y - minY + shiftY + BLOCK_CELL_SIZE * blockSizeY - 1;
		if(offsetY < 0) debug("desgin error");
		while(offsetY >= BLOCK_CELL_SIZE) { offsetY -= BLOCK_CELL_SIZE; posY++;}
		if(posY >= G_BOARD_Y || !allCellXEmpty(posX, posY,blockSizeX)) {
			return shiftY - offsetY - 1;
		}
	}
	return shiftY;
}

//----------------------------------------------------------
// check all cell (x,y), (x+1,y) ...(x+size,y) are empty
//----------------------------------------------------------
function allCellXEmpty(x, y, size)
{
	for(var i = 0; i < size; i++) {
		if(boardState[x+i][y] != 0) return 0;
	}
	return 1;
}

//----------------------------------------------------------
// check all cell (x,y), (x,y+1) ...(x,y+size) are empty
//----------------------------------------------------------
function allCellYEmpty(x, y, size)
{
	for(var i = 0; i < size; i++) {
		if(boardState[x][y+i] != 0) return 0;
	}
	return 1;
}

//---------------------------------------------
// change block style value from (posX, posY)
//---------------------------------------------
function setBoardState(boardState, posX, posY, style, value)
{
	var sizeX = gBlockStyle[style][0];
	var sizeY = gBlockStyle[style][1];
	
	for(var y = 0; y < sizeY; y++) {
		for(var x = 0; x < sizeX; x++) {
			boardState[posX+x][posY+y] = value;
		}
	}
} 

//-----------------------------------------------------
//            |1bit| 5 bit | 4 bit| 4 bit|4bit|4bit| 
// stepInfo = |auto|blockId|startX|startY|endX|endY|
//               21|     16|    12|     8|   4|   0|
//-----------------------------------------------------
function stepInfo2PosInfo(stepId)
{
	var value = stepInfo[stepId-1];
	var autoPlay = (value >> 21) & 0x1;
	var blockId = (value >> 16) & 0x1f;  //for work with edit mode (14 + 6 + 6 + 1 = 27 blocks for edit)
	var startX = (value >> 12) & 0xf;
	var startY = (value >> 8) & 0xf;
	var endX = (value >> 4) & 0xf;
	var endY = value & 0xf;	
	
	return { id: blockId, startX: startX, startY: startY, endX: endX, endY: endY, auto: autoPlay }
}

//----------------------------------------------------------------------------------
// add new move step to stepInfo
// (1) append will add to last 
// (2) if curBoardStep < stepInfo.length means usr press the undo button 
//        cut off remain and add new
// (3) if auto enable (move by click hints button) will not merge with old step
//---------------------------------------------------------------------------------

var curBoardStep = 0;
function setStepInfo(id, startX, startY, endX, endY, auto, append)
{
	var curStep = stepInfo.length;
	if(startX == endX && startY == endY) return curBoardStep;
	
	if(!append && curStep > curBoardStep) {
		// remove undo steps
		stepInfo.splice(curBoardStep, curStep - curBoardStep);
		curStep = curBoardStep;
	}
	
	if(!auto && curStep != 0) {
		var lastPosInfo = stepInfo2PosInfo(curStep);
	
		if(lastPosInfo.endX == startX && lastPosInfo.endY == startY) {
			//same block with last moved
			if(lastPosInfo.startX == endX && lastPosInfo.startY == endY) {
				//same block move back to last moved
				// ==> remove last step
				stepInfo.pop();
				curStep--;
			} else {
				//update last step
				stepInfo[curStep-1] = ((auto?1:0)<<21) + (id << 16) + (lastPosInfo.startX << 12) + (lastPosInfo.startY << 8) + (endX << 4) + endY;
			}
			curBoardStep = curStep;
			return curStep;
		}
	}
	stepInfo[curStep++] = ((auto?1:0)<<21) + (id << 16) + (startX << 12) + (startY << 8) + (endX << 4) + endY;

	if(!auto) {
		curBoardStep = curStep;
		manualMoveCount++; //move count for enable hints button
	}
	
	return curStep;
}

//----------------------------------------------------
// get move action combine with: "U", "D", "L", "R"
// only work with empty cell <= 3
//----------------------------------------------------
function getStepAction(posInfo, back, reverse)
{
	var dirX, dirY, style;
	var sizeX, sizeY;
	var posX, posY;
	var action = [];
	
	if(back) { //from (endX, endY) to (startX, startY)
		dirX = posInfo.startX - posInfo.endX;
		dirY = posInfo.startY - posInfo.endY;
		posX = posInfo.endX;
		posY = posInfo.endY;
	} else { //from (startX, startY) to (endX, endY)
		dirX = posInfo.endX - posInfo.startX;
		dirY = posInfo.endY - posInfo.startY;
		posX = posInfo.startX;
		posY = posInfo.startY;
	}
	style = blockObj[posInfo.id].getAttr('style');
	sizeX = gBlockStyle[style][0];
	sizeY = gBlockStyle[style][1];

	while(dirX || dirY) {
		var errCheck = 0;
		while (dirY < 0 && allCellXEmpty(posX, posY-1, sizeX) == 1) {
			action.push('U'); dirY++; posY--;
			errCheck = 1;
		}
		while(dirY > 0 && allCellXEmpty(posX, posY+sizeY, sizeX) == 1) {
			action.push('D'); dirY--; posY++;
			errCheck = 1;
		}
		while(dirX < 0 && allCellYEmpty(posX-1, posY, sizeY) == 1) {
			action.push('L'); dirX++; posX--;
			errCheck = 1;
		}
		while(dirX > 0 && allCellYEmpty(posX+sizeX, posY, sizeY) == 1) {
			action.push('R'); dirX--; posX++;
			errCheck = 1;
		}
		if(!errCheck) { //too many empty may cause this error (empty cell > 3)
			error("getStepAction(): design error!");
			break;	
		}
	}
	if(reverse) {
		var rAction = [];
		var size = action.length;
		for(var i = 0; i < size; i++) {
			switch(action[size-1-i]) {
			case 'U':
				rAction[i] = 'D';
				break;
			case 'D':
				rAction[i] = 'U';
				break;
			case 'L':
				rAction[i] = 'R';
				break;
			case 'R':
				rAction[i] = 'L';
				break;
			}	
		}		
		//debug("id=" + posInfo.id + " " + rAction );
		action = rAction;
	}
	debug("id=" + posInfo.id + " " + action );
	return {auto: posInfo.auto, move: action}
}

function createBlock(id, x, y, style, draggable)
{
	var block = new Kinetic.Rect({
		//begin mine attributes ===============================
		id: id,
		startPosX: x,
		startPosY: y,
		sizeX: gBlockStyle[style][0],
		sizeY: gBlockStyle[style][1],
		style: style,
		blockMoved: 0,
		//endn mine attributes ================================
		x: minX+BLOCK_CELL_SIZE*x,
		y: minY+BLOCK_CELL_SIZE*y,
		width:  BLOCK_CELL_SIZE*gBlockStyle[style][0]-CELL_BORDER_SIZE,
		height: BLOCK_CELL_SIZE*gBlockStyle[style][1]-CELL_BORDER_SIZE,
		fillPatternImage: images['block' + style],
		//fill: '#00D2FF',
		//stroke: 'black',
		strokeWidth: CELL_BORDER_SIZE,
		draggable:draggable,
	
		dragBoundFunc: function(lastPos) { //last position
			var curX = this.getPosition().x; //current position
			var curY = this.getPosition().y; 
			var shiftX = lastPos.x - curX, shiftY = lastPos.y - curY;
			
			//console.log("x,y = (" + curX + "," + curY + ") x1,y1 = (" + lastPos.x + "," + lastPos.y + ")");
			
			if(Math.abs(shiftX) > MAX_MOV_STEP) { //don't move to fast cause over 1 position 
				if(shiftX > 0) shiftX = MAX_MOV_STEP;
				else shiftX = -MAX_MOV_STEP;
			}
			
			if(Math.abs(shiftY) > MAX_MOV_STEP) {
				if(shiftY > 0) shiftY = MAX_MOV_STEP;
				else shiftY = -MAX_MOV_STEP;
			}
			
			var moveDirectionH = 0, moveDirectionV = 0, moveDirection = 0;
			var curPos = point2Pos(curX, curY); //block position of left-up cell
			
			switch(true) {
			case (curPos.offsetX == 0 && curPos.offsetY == 0): //two direction for choice
				if(shiftY < 0 && curPos.posY > 0 && allCellXEmpty(curPos.posX, curPos.posY-1, this.getAttr('sizeX'))) {
						moveDirectionV = 1; //move UP
				}
				if(shiftY > 0 && curPos.posY+this.getAttr('sizeY') < G_BOARD_Y && allCellXEmpty(curPos.posX, curPos.posY+this.getAttr('sizeY'), this.getAttr('sizeX'))) {
					moveDirectionV = 2; //move down
				}
				
				if(shiftX < 0 && curPos.posX > 0 && allCellYEmpty(curPos.posX-1, curPos.posY, this.getAttr('sizeY'))) {
					moveDirectionH = 3; //move left
				}
				if(shiftX > 0 && curPos.posX+this.getAttr('sizeX') < G_BOARD_X && allCellYEmpty(curPos.posX+this.getAttr('sizeX'), curPos.posY, this.getAttr('sizeY'))) {
					moveDirectionH = 4; //move right
				}
				switch(true) {
				case (moveDirectionV != 0 && moveDirectionH != 0):  //select one
					if(Math.abs(shiftX) > Math.abs(shiftY)) moveDirection  =  moveDirectionH; //select move H
					else moveDirection = moveDirectionV; //select move V
					break;
				case (moveDirectionV != 0):
					moveDirection = moveDirectionV;
					break;
				case (moveDirectionH != 0):
					moveDirection = moveDirectionH;
					break;
				}	
				break;
			case (curPos.offsetX == 0):
				if(shiftY < 0) moveDirection = 1; //up
				else if(shiftY > 0) moveDirection = 2; //down
				break;
			case (curPos.offsetY == 0): 
				if(shiftX < 0) moveDirection = 3; //left
				else if(shiftX > 0) moveDirection = 4; //right
				break;
			default:
				error("createBlock(): design error !");
				break;
			}
			
			if(moveDirection  == 0) {
				return { x:curX, y: curY }; //don't need move  
			}
			
			switch(moveDirection) {
			case 1: //up
			case 2: //down
				shiftX = 0;
				shiftY =  getShiftY(curX, curY, shiftY, this.getAttr('sizeX'), this.getAttr('sizeY'));
				break;
			case 3: //left
			case 4: //right
				shiftY = 0;
				shiftX =  getShiftX(curX, curY, shiftX, this.getAttr('sizeX'), this.getAttr('sizeY'));
				break;
			default:
				error("createBlock(): design error");
				break;
			}
			if(shiftX != 0 || shiftY != 0) this.setAttrs({blockMoved:1});
			return {x: curX+shiftX, y:curY+shiftY};
		}
	});
	
	block.setPos = function(x,y) 
	{
		this.setAttrs({startPosX: x, startPosY: y});
	}
	
	block.movePos = function(x,y) 
	{
		var curX = minX + x * BLOCK_CELL_SIZE;
		var curY = minY + y * BLOCK_CELL_SIZE;
		this.setAttrs({startPosX: x, startPosY: y});
		this.setPosition(curX, curY);
	}

	if(draggable) enableBlockDraggable(block, id);
	
	gBoardLayer.add(block);
	return block;
}	

function enableBlockDraggable(block, id)
{
	// add cursor styling
	block.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	block.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});

	block.on('dragstart', function() {
		this.setAttrs({blockMoved: 0});
		setBoardState(boardState, this.getAttr('startPosX'), this.getAttr('startPosY'), this.getAttr('style'), 0);
	});	
	
	block.on('dragend', function() {
		var curX  = this.getPosition().x;
		var curY  = this.getPosition().y;
		var curPos = point2Pos(curX, curY);
		
		if(curPos.offsetX > BLOCK_CELL_SIZE/2) {
			curX = minX + (curPos.posX+1) * BLOCK_CELL_SIZE;
		} else {
			curX = minX + curPos.posX * BLOCK_CELL_SIZE;
		}
		if(curPos.offsetY > BLOCK_CELL_SIZE/2) {
			curY = minY + (curPos.posY+1) * BLOCK_CELL_SIZE;
		} else {
			curY = minY + curPos.posY * BLOCK_CELL_SIZE;
		}
		var newPos = point2Pos(curX, curY);
		var oldPosX = this.getAttr('startPosX');
		var oldPosY = this.getAttr('startPosY');
		
		this.setPosition(curX, curY);
		setBoardState(boardState, newPos.posX, newPos.posY, this.getAttr('style'), this.getAttr('id'));
		var step = setStepInfo(id, oldPosX, oldPosY, newPos.posX, newPos.posY, 0, 0);
		
		//if(curPos.offsetX != 0 || curPos.offsetY != 0 || oldPosX != newPos.posX || oldPosY != newPos.posY) {
		if(this.getAttr('blockMoved')) {
			//(1) offsetX or offsetY != 0 means block have moved
			//(2) oldPosX != newPos.posX means position changed
			audioPlayWoodHit();
		}
		
		savePlayInfo(gCurSelectedBoard, stepInfo, gHintsCount, manualMoveCount); //save current step & board info
		
		setPlayModeButtonState();
		writeStepInfo(step,(step == 0)?0: stepInfo2PosInfo(step).auto );
		////////////////////////////////////////////////
		//for debug only
		//
		//if(step > 0) {
		//	var posInfo = stepInfo2PosInfo(step);
		//	getStepAction(posInfo, 1, 1);
		//}
		//
		///////////////////////////////////////////////
		
		this.setAttrs({startPosX: newPos.posX, startPosY: newPos.posY});
		this.getLayer().draw();
		
		checkGoalState();
	});
}

//----------------------
// for game & edit mode 
//----------------------
function disableAllBlockDraggable()
{
	for(var id = 1; id < blockObj.length; id++) {
		blockObj[id].setDraggable(false);
		blockObj[id].off("mouseover mouseout dragstart dragend");
	}
}

//----------------------
// for game & edit mode 
//----------------------
function enableAllBlockDraggable()
{
	for(var id = 1; id < blockObj.length; id++) {
		blockObj[id].setDraggable(true);
		if(playMode == 1) 
			enableBlockDraggable(blockObj[id], id); //game mode
		else 
			editEnableBlockDraggable(blockObj[id]); //edit mode	
	}
}

var moveObj = [];
var blockIsMoving = 0;
var ONE_STEP_MOVE_TIME = 0.17;  //sec
var DEMO_MOVE_SLEEP_TIME = 100; //ms
var HINTS_MOVE_SLEEP_TIME = 50; //ms

function moveBlock(block, action, step, callbackFun, callbackCount) 
{
	var newX = block.getAttr('x');
	var newY = block.getAttr('y');
	var curAction = action.move[step];
	var moveSize = BLOCK_CELL_SIZE;
	var moveTime = ONE_STEP_MOVE_TIME;
	var tweenObj;
	
	var count=1;
	//combine same direction as one action
	while(step+count < action.move.length && curAction == action.move[step+count]) count++;
	
	moveSize *= count;
	moveTime *= count;
	
	switch(curAction) {
	case 'U':
		newY -= moveSize;
		break;
	case 'D':
		newY += moveSize;
		break;
	case 'L':
		newX -= moveSize;
		break;
	case 'R':
		newX += moveSize;
		break;
	default:
		error("moveBlock(): design error !");
		return;	
	}

	tweenObj = new Kinetic.Tween({
		node: block, 
		duration: moveTime,
		x: newX,
		y: newY,
		onFinish: function() {
			step += count;
			if(step < action.move.length) {
				//one step not finish move again
				moveBlock(block, action, step, callbackFun, callbackCount);
			} else {
				//finish one step move
				audioPlayWoodHit();
				writeStepInfo(curBoardStep, action.auto);
				
				for(var i = 0; i < moveObj.length; i++) {
					//delete tweenObj 
					moveObj[i].destroy();
				}
				moveObj = [];
				//check next status
				checkMoveState(callbackFun, callbackCount);
			}	
		}
	});
	tweenObj.play();
 
	moveObj.push(tweenObj);
}

//--------------------------------
// After one step move complete
// check next status
//--------------------------------
function checkMoveState(callbackFun, callbackCount)
{
	//1: play mode, 2:demo mode, 3: edit mode
	switch(playMode) {
	case 1: //game mode : for press hints button (auto move)
		if(--callbackCount > 0) { //still have step need move
			//callbackFun(callbackCount, 1); //1: isCallBack;
			setTimeout(function(){callbackFun(callbackCount, 1);}, HINTS_MOVE_SLEEP_TIME );
		} else {
			//all hints steps complete
			blockIsMoving = 0;
			enableFunctionButton();
			setPlayModeButtonState();
			enableAllBlockDraggable();
			checkGoalState();
		}
		break;
	case 2: //demo mode
		if(needStopPlay() || --callbackCount <= 0) { 
			//all steps complete or press stop button
			blockIsMoving = 0;
			enableFunctionButton();
			setDemoModeButtonState();
		} else {
			//callbackFun(callbackCount, 1); //1: isCallBack;
			setTimeout(function(){callbackFun(callbackCount, 1);}, DEMO_MOVE_SLEEP_TIME );
		}
		break;
	case 3: //edit mode
		if(needStopPlay() || --callbackCount <= 0) {
			//all steps complete or press stop button
			blockIsMoving = 0;
			enableFunctionButton();
			setEditModeButtonState();
			enableAllBlockDraggable(); 
			enableClearButton();
			enableSaveButton();
		} else {
			//callbackFun(callbackCount, 1); //1: isCallBack;
			setTimeout(function(){callbackFun(callbackCount, 1);}, DEMO_MOVE_SLEEP_TIME );
		}
		break;
	}
}

//-----------------------------------
// move block back to (count) steps 
//-----------------------------------
function moveBack(count, isCallBack)
{
	if(typeof count == 'undefined') count = 1;
	if(typeof isCallBack == 'undefined') isCallBack = 0;
	
	//if(curBoardStep <= 0 || (blockIsMoving && !isCallBack) ) {
	if(curBoardStep <= 0) {
		blockIsMoving = 0;
		return;
	}
	blockIsMoving = 1;
	
	var auto = (curBoardStep == 1)?0: stepInfo2PosInfo(curBoardStep-1).auto;
	var posInfo = stepInfo2PosInfo(curBoardStep);
	posInfo.auto = auto;
	
	var curBlock = blockObj[posInfo.id];
	
	var action = getStepAction(posInfo, 1, 0);
	var style = curBlock.getAttr('style');
	
	setBoardState(boardState, posInfo.endX, posInfo.endY, style, 0);	
	setBoardState(boardState, posInfo.startX, posInfo.startY, style, posInfo.id);
	curBlock.setPos(posInfo.startX, posInfo.startY);
	curBoardStep--;
	
	if(curBoardStep <= 0) setDefaultCursor();
	moveBlock(curBlock, action, 0, moveBack, count);  
}  

//----------------------------------
// move block next to (count) step
//----------------------------------
function moveNext(count, isCallBack)
{
	var maxStep = stepInfo.length;
	
	if(typeof count == 'undefined') count = 1;
	if(typeof isCallBack == 'undefined') isCallBack = 0;

	//if(curBoardStep >=  maxStep || (blockIsMoving && !isCallBack) ) {
	if(curBoardStep >=  maxStep) {
		blockIsMoving = 0;
		return;	
	}
	blockIsMoving = 1;
	
	curBoardStep++
	
	var posInfo = stepInfo2PosInfo(curBoardStep);
	
	var curBlock = blockObj[posInfo.id];
	
	var action = getStepAction(posInfo, 0, 0);
	var style = curBlock.getAttr('style');
	
	setBoardState(boardState, posInfo.startX, posInfo.startY, curBlock.getAttr('style'), 0);	
	setBoardState(boardState, posInfo.endX, posInfo.endY, curBlock.getAttr('style'), posInfo.id);
	curBlock.setPos(posInfo.endX, posInfo.endY);
	
	if(curBoardStep >= maxStep) setDefaultCursor();
	moveBlock(curBlock, action, 0, moveNext, count);  
}
 
//--------------------------------------
// move block to first (initial state)
//-------------------------------------- 
function moveFirst(silent)
{
	moveBoardStep(0);
	if(!silent) audioPlayWoodHit();
	setDefaultCursor();
}

//---------------------------
// move block to last steps
//---------------------------
function moveLast()
{
	moveBoardStep(stepInfo.length);
	audioPlayWoodHit();
	setDefaultCursor();
}

//-----------------------------------
// move boardState to indicate step
//-----------------------------------
function moveBoardState(step)
{
	if(step < 0 || step > stepInfo.length || step == curBoardStep) return;
		
	switch(true) {
	case (step < curBoardStep): //move back
		do {
			var posInfo = stepInfo2PosInfo(curBoardStep);
			var curBlock = blockObj[posInfo.id];
			var style = curBlock.getAttr('style');
			
			setBoardState(boardState, posInfo.endX, posInfo.endY, style, 0);	
			setBoardState(boardState, posInfo.startX, posInfo.startY, style, posInfo.id);
			curBlock.setPos(posInfo.startX, posInfo.startY);
			curBoardStep--;
		} while(step < curBoardStep);
		break;
	case (step > curBoardStep): //move next	
		do {
			curBoardStep++
			var posInfo = stepInfo2PosInfo(curBoardStep);
			var curBlock = blockObj[posInfo.id];
			var style = curBlock.getAttr('style');
	
			setBoardState(boardState, posInfo.startX, posInfo.startY, curBlock.getAttr('style'), 0);	
			setBoardState(boardState, posInfo.endX, posInfo.endY, curBlock.getAttr('style'), posInfo.id);
			curBlock.setPos(posInfo.endX, posInfo.endY);
		} while(step > curBoardStep);
		break;
	}	
}

//---------------------------
// move board to step state
//---------------------------
function moveBoardStep(step)
{
	if(blockIsMoving) return;
	
	moveBoardState(step);
	buildBoard(boardState);
	setButtonState();
	////setDefaultCursor();
	writeStepInfo(step, (step == 0)?0: stepInfo2PosInfo(step).auto);
}

//==============================
// BEGIN for hints()
//============================== 

//---------------------------------------------
// convert board state to board string format 
// for solver to solve it
//---------------------------------------------
function boardState2BoardString(boardState)
{
	                 //0    1    2    3    4
	var blockValue = ['@', 'N', 'B', 'H', 'A' ];
	var boardString = [];
	var tmpBoardState = [];
	var id = 0;

	//copy 2 dimensional array 
	for(var x = 0; x < G_BOARD_X; x++) {
		tmpBoardState[x] = boardState[x].slice(0);
	}
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			if((id = tmpBoardState[x][y]) >= 0) {
				if(id == 0) { //empty block
					boardString[x+y*G_BOARD_X] = blockValue[0];
				} else {
					var style = blockObj[id].getAttr('style');
					var sizeX = blockObj[id].getAttr('sizeX');
					var sizeY = blockObj[id].getAttr('sizeY');
					
					for(var yy = 0; yy < sizeY; yy++) {
						for(var xx = 0; xx < sizeX; xx++) {
							tmpBoardState[x+xx][y+yy] = -1;
							boardString[x+xx + (y+yy)*G_BOARD_X] = blockValue[style];	
						}
					}
					blockValue[style] = String.fromCharCode(blockValue[style].charCodeAt(0) + 1); //ascii + 1
				}	
			}
		}
	}

	return boardString.join("");
}

//-------------------------------------------
// max hints step base on board mini steps
//-------------------------------------------
function getMaxHintsStep()
{
	//return 100; //for debug
	var moveSteps = Math.floor(gCurSelectedBoard.boardInfo.mini/10);
	
	if(moveSteps < MIN_HINTS_STEP) moveSteps = MIN_HINTS_STEP;
	if(moveSteps > MAX_HINTS_STEP) moveSteps = MAX_HINTS_STEP;
	
	return moveSteps;
}

//-------------------------------------
// from source board to target board
// to get the move info 
//-------------------------------------
function getMoveInfo(srcBoard, dstBoard)
{
	var srcPos, dstPos
	
	srcPos = dstPos = srcStyle = dstStyle = null;
	
	for(var i = 0; i < srcBoard.length && (dstPos == null || srcPos == null); i++) {
		if(srcBoard[i] != dstBoard[i]) {
			if(srcBoard[i] == '@') {
				//move block to here
				if(dstPos == null) { //first time
					dstPos = i;
					dstStyle = dstBoard[i];
				} 
			} else if(dstBoard[i] == '@') {
				// move block out here 
				/*
				if(dstBoard[i] != ' ') {
					debug("Error2: wrong board (" + i + ") !");
					break;
				}*/
				if(srcPos == null) { //first time
					srcPos = i;
					srcStyle = srcBoard[i];
				}
			}
		}
	}
	var srcX = srcPos % G_BOARD_X, srcY = (srcPos - srcX) / G_BOARD_X;
	var dstX = dstPos % G_BOARD_X, dstY = (dstPos - dstX) / G_BOARD_X;
	
	//find the left-up position
	while(srcX > 0 && srcBoard[srcX - 1 + srcY * G_BOARD_X] == srcStyle) srcX--;
	while(srcY > 0 && srcBoard[srcX + (srcY-1) * G_BOARD_X] == srcStyle) srcY--;
	
	//find the left-up position
	while(dstX > 0 && dstBoard[dstX - 1 + dstY * G_BOARD_X] == dstStyle) dstX--;
	while(dstY > 0 && dstBoard[dstX + (dstY-1) * G_BOARD_X] == dstStyle) dstY--;
	
	return { startX: srcX, startY: srcY, endX: dstX, endY: dstY }
}

//-------------------------------------------------
// convert integer board key to board value 
// with different char value of same block style
// for draw board 
//-------------------------------------------------
function key2Board(curKey)
{
	var blockIndex;
	var board = [];
	                     //0   1    2    3    4
	var blockValue = ['@', 'N', 'B', 'H', 'A' ];
	var primeBlockPos = curKey & 0x0F; //position of prime minister block (曹操), 4 bits
	
	//set prime minister block
	board[primeBlockPos] = blockValue[4];
	board[primeBlockPos+G_BOARD_X] = blockValue[4];
	board[primeBlockPos+1] = blockValue[4];
	board[primeBlockPos+1+G_BOARD_X] = blockValue[4];
	curKey =  Math.floor(curKey / 16); //shift >> 4 bits
	
	loop:
	for(var curPos = (G_BOARD_Y * G_BOARD_X)-1; curPos >= 0; curPos--) {
		if(board[curPos] == blockValue[4]) continue;
		
		blockIndex = curKey & 0x03; //2 bits
		curKey >>= 2; //shift >> 2 bits, now the value <= 32 bits can use bitwise operator

		if(typeof board[curPos] != 'undefined') continue;
		
		switch(blockIndex) {
		case 0: //empty block
			board[curPos] = blockValue[0];
			break;
		case 1: // 1X1 block
			board[curPos] = blockValue[1];
			blockValue[1] = String.fromCharCode(blockValue[1].charCodeAt(0) + 1); //ascii + 1
			break;
		case 2: // 2X1 block
			board[curPos] = blockValue[2];
			board[curPos-1] = blockValue[2];
			blockValue[2] = String.fromCharCode(blockValue[2].charCodeAt(0) + 1); //ascii + 1
			break;
		case 3: // 1X2 block
			board[curPos] = blockValue[3];
			board[curPos-G_BOARD_X] = blockValue[3];
			blockValue[3] = String.fromCharCode(blockValue[3].charCodeAt(0) + 1); //ascii + 1
			break;
		case 4: // 2X2 block	
		default:
			error("key2Board(): design error !");	
			break loop;
		}	
	}
	return board;
}

//----------------------------
// after press hints button
// auto move hints steps
//----------------------------
var findAnswer = new klotskiSolution();
function hints()
{
	var boardString = boardState2BoardString(boardState);
	var maxMove = getMaxHintsStep();

	disableFunctionButton();
	playModeDisableButton();	
	
	findAnswer.init(boardString); 

	var result = findAnswer.find();
	var resultMsg;
	
	if(result.boardList == null) {
		resultMsg = "No solution, ";
	} else {
		manualMoveCount = 0; //reset move count	
		var totalSteps = result.boardList.length-1; 
		totalSteps--; //skip last step, last step must moved by user 
		resultMsg = totalSteps + " steps, ";
	}
	//writeMessage( " " + resultMsg + "elapsed time: " + result.elapsedTime + ", " + result.exploreCount + " explored");
	
	if(result.boardList != null && totalSteps >= 1) {
		gHintsCount++;
		if(totalSteps < maxMove) maxMove = totalSteps;
		
		var tmpBoardState = [];
		//copy 2 dimensional array 
		for(var x = 0; x < G_BOARD_X; x++) {
			tmpBoardState[x] = boardState[x].slice(0);
		}

		for(var i = 1; i <= maxMove; i++) {
		
			var moveInfo = getMoveInfo(key2Board(result.boardList[i-1]), key2Board(result.boardList[i]));
			var blockId = tmpBoardState[moveInfo.startX][moveInfo.startY];;
			var step = setStepInfo(blockId, moveInfo.startX, moveInfo.startY, moveInfo.endX, moveInfo.endY, 1, i==1?0:1);
			
			//change temp board state	
			var style = blockObj[blockId].getAttr('style');
			setBoardState(tmpBoardState, moveInfo.startX, moveInfo.startY, style, 0);	
			setBoardState(tmpBoardState, moveInfo.endX, moveInfo.endY, style, blockId);

		}
		savePlayInfo(gCurSelectedBoard, stepInfo, gHintsCount, manualMoveCount); //save current step & board info
		disableAllBlockDraggable();	
		moveNext(maxMove);
	} else {
		setPlayModeButtonState();
		enableFunctionButton();
	}
}

//======================
// END  for hints()
//======================

//------------------------------
// display select board dialog
//------------------------------
function selectBoard()
{
	gLevelSelectObj.show(playMode);
}

//----------------------------------------------
// display level info after press info button
//----------------------------------------------
function infoBoard()
{
	var msgTxt = [], urlTxt = [];
	var boardInfo = gCurSelectedBoard.boardInfo;
	var msgString;
	var msgId=-1;

	var aliasName = gLevelSelectObj.getAliasName(gCurSelectedBoard.tableId, gCurSelectedBoard.level, gCurSelectedBoard.type);

	//line 1: (level <==> class) name
	if(aliasName != "") msgTxt[++msgId] = [ "c", "(" +aliasName+ ")" ];	
	
	//line 2: best score
	msgTxt[++msgId] = [ "l", gTxtMsg.BestScore];
	if(typeof boardInfo.highScore == 'undefined') {
			msgTxt[msgId][1]  += '---';
	} else {
			msgTxt[msgId][1]  += boardInfo.highScore.moves + " " + (boardInfo.highScore.moves<=1?gTxtMsg.Step:gTxtMsg.Steps) + " " + boardInfo.highScore.hints + " " + gTxtMsg.Hints;
	}
	
	//line 3: optimal moves
	msgTxt[++msgId] = [ "l", gTxtMsg.OptimalSolution + boardInfo.mini + " " + (boardInfo.mini<=1?gTxtMsg.Step:gTxtMsg.Steps) ];	
	
	//line 4: class alias name
	if(typeof boardInfo.classicAlias != "undefined") {
		msgTxt[++msgId] = [ "l", gTxtMsg.AliasName + boardInfo.classicAlias ];	
	}
	
	if(typeof boardInfo.user != 'undefined') {
		//line 5: creator
		msgTxt[++msgId] = [ "l", gTxtMsg.Creator + (boardInfo.user=='user'?gTxtMsg.userCreator:boardInfo.user) ];
	}
	
	if(typeof boardInfo.url != 'undefined') {
		var levelStr = (typeof boardInfo.url_level == 'undefined')?("level " + boardInfo.level): boardInfo.url_level;
		
		if(typeof boardInfo.url_level == 'undefined') {
			levelStr = gTxtMsg.Level.replace("%l", boardInfo.level);
		} else {
			levelStr = boardInfo.url_level;
		}
		
		var urlStr;
		if(levelStr == "") {
			urlStr = boardInfo.url_name;
		} else {
			urlStr = gTxtMsg.LevelOfUrl.replace("%u",boardInfo.url_name).replace("%l",levelStr);
		}
		
		//line 6: source (a link ) 	 
		msgTxt[++msgId]= [ "l", gTxtMsg.Source + urlStr ];
		urlTxt[msgId] = boardInfo.url;		
	}
	
	okBoard(gCurSelectedBoard.titleInfo, msgTxt, urlTxt);
}

//--------------------------
// display message dialog 
//--------------------------
function okBoard(title, msg, url)
{
	gOKDialog.init("dialogStage",
	               images, 				
	               boardStageX, 
	               boardStageY, 
	               title,
				   msg,
				   url);
	gOKDialog.show();			   
}

//=============================
// BEGIN for play mode button
//=============================
var resetButton, undoButton, redoButton, hintsButton, playModeButton;
var selectButton, infoButton, volumeButton;

function addPlayModeButton()
{
	var startX = boardStartX;
	var startY = boardStartY + BOARD_HEIGHT + 10;
	var buttonWidth = images.reset0.width+0;
	
	resetButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		width: images.reset0.width,
		height: images.reset0.height,
		fillPatternImage: images.reset0
	});

	undoButton = new Kinetic.Rect({
		x: startX+buttonWidth,
		y: startY,
		width: images.undo0.width,
		height: images.undo0.height,
		fillPatternImage: images.undo0
	});
	
	redoButton = new Kinetic.Rect({
		x: startX+buttonWidth*2,
		y: startY,
		width: images.redo0.width,
		height: images.redo0.height,
		fillPatternImage: images.redo0
	});
	
	hintsButton = new Kinetic.Rect({
		x: startX+buttonWidth*3,
		y: startY,
		width: images.hints0.width,
		height: images.hints0.height,
		fillPatternImage: images.hints0
	});

	playModeButton = new Kinetic.Rect({
		x: startX+buttonWidth*5,
		y: startY,
		width: images.gameMode1.width,
		height: images.gameMode1.height,
		fillPatternImage: images.gameMode1
	});
	
	gButtonLayer.add(resetButton);
	gButtonLayer.add(undoButton);
	gButtonLayer.add(redoButton);
	gButtonLayer.add(hintsButton);
	gButtonLayer.add(playModeButton);
	gButtonLayer.draw();
}

function clearPlayModeButton()
{
	resetButton.destroy();
	undoButton.destroy();
	redoButton.destroy();
	hintsButton.destroy();
	playModeButton.destroy();
}

//------------------------
// begin for reset button
//------------------------
function disableResetButton()
{
	resetButton.setFillPatternImage(images.reset0);
	resetButton.off('mouseover click tap');
	resetButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableResetButton()
{
	resetButton.setFillPatternImage(images.reset1);
	resetButton.off('mouseover mouseout click tap');
	
	resetButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	resetButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	resetButton.on('click tap', function() {
		moveFirst(0);
	});
	gButtonLayer.draw();
}

//------------------------
// begin for undo button
//------------------------
function disableUndoButton()
{
	undoButton.setFillPatternImage(images.undo0);
	undoButton.off('mouseover click tap');
	undoButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableUndoButton()
{
	undoButton.setFillPatternImage(images.undo1);
	undoButton.off('mouseover mouseout click tap');
	
	undoButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	undoButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	undoButton.on('click tap', function() {
		if(blockIsMoving) return;
		disableAllBlockDraggable();
		moveBack();
	});
	gButtonLayer.draw();
}

//------------------------
// begin for redo button
//------------------------
function disableRedoButton()
{
	redoButton.setFillPatternImage(images.redo0);
	redoButton.off('mouseover click tap');
	redoButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableRedoButton()
{
	redoButton.setFillPatternImage(images.redo1);
	redoButton.off('mouseover mouseout click tap');
	
	redoButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	redoButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	redoButton.on('click tap', function() {
		if(blockIsMoving) return;
		disableAllBlockDraggable();	
		moveNext();
	});
	gButtonLayer.draw();
}

//------------------------
// begin for hints button
//------------------------
function disableHintsButton()
{
	hintsButton.setFillPatternImage(images.hints0);
	hintsButton.off('mouseover click tap');
	hintsButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableHintsButton()
{
	hintsButton.setFillPatternImage(images.hints1);
	hintsButton.off('mouseover mouseout click tap');
	
	hintsButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	hintsButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	hintsButton.on('click tap', function() {
		hints();
	});
	gButtonLayer.draw();
}

//----------------------------
// begin for play mode button
//----------------------------
function disablePlayModeButton()
{
	//playModeButton.setFillPatternImage(images.gameMode0);
	playModeButton.off('mouseover click tap');
	playModeButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	//gButtonLayer.draw();
}

function enablePlayModeButton()
{
	//playModeButton.setFillPatternImage(images.gameMode1);
	playModeButton.off('mouseover mouseout click tap');
	
	playModeButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	playModeButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	playModeButton.on('click tap', function() {
		savePlayModeInfo();
		var rc = setDemoMode();
		animateTitle(gTxtMsg.DemoMode, rc.time);
	});
	//gButtonLayer.draw();
}

//----------------------------------------------
// save current play mode info
// for switch from play mode to demo|edit mode
//----------------------------------------------
var playModeStepInfo;
var playModeCurBoardStep;
function savePlayModeInfo()
{
	playModeStepInfo = stepInfo.slice(0); //copy array
	playModeCurBoardStep = curBoardStep;
}

//--------------------------------------------
// restore play mode info
// for from demo|edit mode back to play mode
//--------------------------------------------
function restorePlayModeInfo()
{
	stepInfo = playModeStepInfo.slice(0);
	playModeStepInfo = [];
	curBoardStep = playModeCurBoardStep;
}

//----------------------------------------
// return maxMove < 0 : no solution
//                = 0 : don't need move
//                > 0 : OK
//        time: elapsed-time
//----------------------------------------
function setAutoMoveStepInfo()
{
	var boardString = boardState2BoardString(boardState);
	
	findAnswer.init(boardString); 
	var result = findAnswer.find();
	var maxMove = -1;
	
	debug("find answer, elapsed-time: " + result.elapsedTime);
	if(result.boardList != null) {
		maxMove = result.boardList.length-1; 
	}
	
	if(maxMove > 0) {
		var tmpBoardState = [];
		
		stepInfo = [];
		curBoardStep = 0;
		//copy 2 dimensional array 
		for(var x = 0; x < G_BOARD_X; x++) {
			tmpBoardState[x] = boardState[x].slice(0);
		}

		for(var i = 1; i <= maxMove; i++) {
		
			var moveInfo = getMoveInfo(key2Board(result.boardList[i-1]), key2Board(result.boardList[i]));
			var blockId = tmpBoardState[moveInfo.startX][moveInfo.startY];;
			var step = setStepInfo(blockId, moveInfo.startX, moveInfo.startY, moveInfo.endX, moveInfo.endY, 1, i==1?0:1);
			
			//change temp board state	
			var style = blockObj[blockId].getAttr('style');
			setBoardState(tmpBoardState, moveInfo.startX, moveInfo.startY, style, 0);	
			setBoardState(tmpBoardState, moveInfo.endX, moveInfo.endY, style, blockId);		
		}
	}
	
	return { maxMove:maxMove, time:result.elapsedTime };
}

//-----------------------------
// set play mode button state 
//-----------------------------
function setPlayModeButtonState()
{
	var maxStep = stepInfo.length;

	//reset	
	if(curBoardStep <= 0 || maxStep <= 0) disableResetButton();
	else enableResetButton();
	
	//undo
	if(curBoardStep <= 0) disableUndoButton();
	else enableUndoButton();
	
	//redo
	if(curBoardStep >=  maxStep) disableRedoButton();
	else enableRedoButton();
	
	//hints
	if(manualMoveCount >= ACTIVE_HINTS_COUNT) enableHintsButton();
	else disableHintsButton();
	
	//play mode
	enablePlayModeButton();
}

function setDefaultCursor()
{
	document.body.style.cursor = 'default';
}

function playModeDisableButton()
{
	setDefaultCursor();
	disableResetButton();
	disableUndoButton();
	disableRedoButton();
	disableHintsButton();
	disablePlayModeButton();
}

//=============================
// BEGIN for function button
//=============================
function createFunctionButton()
{
	var imageScale = .8;
	var imageSpace = 10;
	var startX = boardStageX - images.select1.width * imageScale;
	var startY = 20;
	
	selectButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		scale: { x: imageScale, y: imageScale },
		width: images.select1.width,
		height: images.select1.height,
		fillPatternImage: images.select1
	});

	startY = startY + images.select1.height + imageSpace;
	infoButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		scale: { x: imageScale, y: imageScale },
		width: images.info1.width,
		height: images.info1.height,
		fillPatternImage: images.info1
	});
	
	startY = startY + images.info1.height + imageSpace; 
	if(!noAudio) {
		volumeButton = new Kinetic.Rect({
			x: startX,
			y: startY,
			scale: { x: imageScale, y: imageScale },
			width: images.volume0.width,
			height: images.volume0.height,
			fillPatternImage: (volumeState?images.volume1:images.volume0)
		});
	}		
	
	gButtonLayer.add(selectButton);
	gButtonLayer.add(infoButton);
	if(!noAudio) gButtonLayer.add(volumeButton);
	
	gButtonLayer.draw();
}

//------------------------
// begin for select button
//------------------------
function disableSelectButton()
{
	//selectButton.setFillPatternImage(images.select0);
	selectButton.off('mouseover mouseout click tap');
	//gButtonLayer.draw();
}

function enableSelectButton()
{
	//selectButton.setFillPatternImage(images.select1);
	selectButton.off('mouseover mouseout click tap');
	
	selectButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	selectButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	selectButton.on('click tap', function() {
		selectBoard();
	});
	//gButtonLayer.draw();
}

//------------------------
// begin for info button
//------------------------
function disableInfoButton()
{
	//infoButton.setFillPatternImage(images.info0);
	infoButton.off('mouseover mouseout click tap');
	//gButtonLayer.draw();
}

function enableInfoButton()
{
	//infoButton.setFillPatternImage(images.info1);
	infoButton.off('mouseover mouseout click tap');
	
	infoButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	infoButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	infoButton.on('click tap', function() {
		if(playMode == 3) infoEditMode(); //display edit mode info
		else { 
			//display board info
			infoBoard();
		}
	});
	//gButtonLayer.draw();
}

//---------------------------
// begin for volume button
//---------------------------
var volumeState = 1; //0: off, 1:on

function toggleVolumeButton()
{
	volumeState = !volumeState;

	if(volumeState) {
		volumeButton.setFillPatternImage(images.volume1); //volume on
	} else {
		volumeButton.setFillPatternImage(images.volume0); //volume off
	}
	saveConfigInfo();
	gButtonLayer.draw();
}

function enableVolumeButton()
{
	if(noAudio) return;
	
	volumeButton.off('mouseover mouseout click tap');
	
	volumeButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	volumeButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	volumeButton.on('click tap', function() {
		toggleVolumeButton();
	});
}

function enableSelectButton()
{
	selectButton.setFillPatternImage(images.select1);
	selectButton.off('mouseover mouseout click tap');
	
	selectButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	selectButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	selectButton.on('click tap', function() {
		selectBoard();
	});
	gButtonLayer.draw();
}

function disableFunctionButton()
{
	disableSelectButton();
	disableInfoButton();
	disableGameButton();
}

function enableFunctionButton()
{
	enableSelectButton();
	enableInfoButton();
	enableGameButton();
}

//===========================
// END for function button
//===========================

//========================
// BEGIN of Game button
//========================
//-----------------------------------------
// Game Button is toggle button 
// switch between Game Mode and Edit Mode
//-----------------------------------------

var gameButton;
var gameMode = 1; //1: gameMode , 0:editMode;

function createGameButton()
{
	var startX = boardStageX - images.game.width;
	var startY = boardStageY - images.game.height;
	
	gameButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		width: images.game.width,
		height: images.game.height,
		fillPatternImage: images.game
	});	
	
	gButtonLayer.add(gameButton);
	gButtonLayer.draw();
}

function enableGameButton()
{
	gameButton.off('mouseover mouseout click tap');
	
	gameButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	gameButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
 
	gameButton.on('click tap', function() {
		if(gameMode) {
			//switch to edit mode
			switch2EditMode();
		} else {
			//switch to game mode
			restorePlayModeInfo()
			switch2GameMode();
		}
		gameMode = !gameMode; //toggle
		gButtonLayer.draw();		
	});
}

function switch2EditMode()
{
	gameButton.setFillPatternImage(images.edit);
	if(playMode == 1) savePlayModeInfo(); //game mode: save play info
	setEditMode();
	animateTitle(gTxtMsg.EditMode);
}

function switch2GameMode()
{
	gameButton.setFillPatternImage(images.game);	
	setPlayMode(curBoardStep);
	//audioPlayTitle();
	animateTitle(gTxtMsg.GameMode);
}

function disableGameButton()
{
	gameButton.off('mouseover mouseout click tap');
}

//=====================
// END of Game button
//=====================

//----------------------------------
// callback from pass level dialog 
//----------------------------------
function passLevelCallback(goNext)
{
	if(goNext) { 
		//play next level
		var nextSelected = gLevelSelectObj.getNextLevel();
		setSelectedLevel(nextSelected, 0); //0: not callback
	} else {
		// play current level again
		moveFirst(1); //move to first silently
		
		stepInfo = [];
		gHintsCount = 0;
		manualMoveCount = 0;
		
		setPlayModeButtonState();
	}
	savePlayInfo(gCurSelectedBoard, stepInfo, gHintsCount, manualMoveCount); //save current step & board info
}

//---------------------------
// display pass level dialog
//----------------------------
function showPassDialog(lastHighScore, curIsHigh)
{
	var tmpStepInfo = [];
	savePlayInfo(gCurSelectedBoard, tmpStepInfo, 0, 0); //before confirm, save current select but reset status

	gPassLevelDialog.init( "dialogStage", //stage name
	                       images,        //button images
	                       boardStageX,   //screen X
	                       boardStageY,   //screen Y
	                       gCurSelectedBoard.titleInfo, //title name
	                       gCurSelectedBoard.boardInfo, //board info
	                       lastHighScore,               //old high score 
	                       { moves: stepInfo.length, hints: gHintsCount}, //new score
	                       curIsHigh,
	                       passLevelCallback //callback
	);					   
	gPassLevelDialog.show();
}

//---------------------------------------
// if current is new high score return 1
// else return 0
//---------------------------------------
function setScore()
{
	return gLevelSelectObj.setScore({ moves: stepInfo.length, hints: gHintsCount});
}

//---------------------------------
// Move biggest block out of board
//---------------------------------
function move2Goal(block)
{
	var newX = block.getAttr('x');
	var newY = block.getAttr('y') + BOARD_BORDER_WIDTH;

	disableAllBlockDraggable();
	disableFunctionButton();	
	playModeDisableButton();
	savePlayInfo(gCurSelectedBoard, [], 0, 0); //before confirm, save current select but reset status
	
	var tweenObj = new Kinetic.Tween({
		node: block, 
		duration: 1,
		x: newX,
		y: newY,
		onFinish: function() {
			var lastHighScore = gLevelSelectObj.getHighScore();
			var curIsHighScore = setScore();
			
			showPassDialog(lastHighScore, curIsHighScore);
			enableFunctionButton();
			tweenObj.destroy();
			enableAllBlockDraggable();
		}
	});
	audioPlayHappyPass();
	tweenObj.play();
}

//=======================
// check goal position
//=======================
function checkGoalState()
{
	var goalBlock, blockId;
	
	for(var i = 0; i < gGoalPos.length; i++) {
		var x = gGoalPos[i][0];
		var y = gGoalPos[i][1];
		blockId = boardState[x][y];
		if(blockId == 0 || blockObj[blockId].getAttr('style') != G_GOAL_STYLE){
			return false;
		}
	}
	
	goalBlock =  blockObj[blockId];
	move2Goal(goalBlock);
	
	return true;
}
//=========================
// Show loading message
//=========================
var loadingStage;
function showLoadingMsg(stageName, stageX, stageY)
{
	document.getElementById(stageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";

	loadingStage = new Kinetic.Stage({
		container: stageName,
		width:  stageX,
		height: stageY
	});
	
	var	textLayer = new Kinetic.Layer( );
	var FONT_SIZE = 40;
	
	loadingStage.add(textLayer);

	var	startX = Math.floor(stageX)/2-100;
	var	startY = Math.floor(stageY)/2-20;
	
	var context = textLayer.getContext();
	context.font = FONT_SIZE + 'pt Calibri';
	context.fillStyle = "#0000C4";
	context.strokeStyle = "#FFBBCC";
	
	context.fillText("Loading.....",  startX, startY);	
}

function hideLoadingMsg()
{
	loadingStage.destroy();
}

//==============================================
// BEGIN for save/restore to/from localStorage
//==============================================

//-----------------
// save play info
//-----------------
function savePlayInfo(selectedInfo, stepInfo, hints, moveCount)
{
	var playInfo = { 
		board: selectedInfo.boardInfo.board, 
		table: selectedInfo.tableId, 
		level: selectedInfo.level,
		type:  selectedInfo.type,
		hints: hints,
		moveCount: moveCount,
		stepInfo: stepInfo
	}
	setStorage('klotski_playinfo', JSON.stringify(playInfo))		
}

//--------------------
// restore play info
//--------------------
function restorePlayInfo()
{
	if(dataVersion != DATA_VERSION) {
		clearStorage('klotski_playinfo'); //data format changed
		return;
	}
	
	var playInfoString = getStorage('klotski_playinfo');
	if(playInfoString == null) return null;

	var playInfo = JSON.parse(playInfoString);	
	
	return playInfo;
}

//-------------------
// save config info
//-------------------
function saveConfigInfo()
{
	var playInfo = { 
		dataVersion: DATA_VERSION,
		volume: volumeState, 
		speed: playSpeed
	}
	setStorage('klotski_confinfo', JSON.stringify(playInfo))		
}

//----------------------
// restore config info
//----------------------
function restoreConfigInfo()
{
	////clearStorage('klotski_confinfo'); //for debug 
	var configInfoString = getStorage('klotski_confinfo');
	if(configInfoString == null) {
		dataVersion = DATA_VERSION;
		saveConfigInfo(); //no DATA_VERSION save it!
		return;
	}

	var configInfo = JSON.parse(configInfoString);	

	volumeState = configInfo.volume;
	playSpeed = configInfo.speed;
	if(typeof configInfo.dataVersion != 'undefined') {
		dataVersion = configInfo.dataVersion;	
	} 
	
	if(dataVersion != DATA_VERSION) {
		saveConfigInfo(); //save DATA_VERSION again as new version
	}
}

//=====================
// animated Text Title
//=====================
function animateTitle(msg, time)
{
	var fontSize = 70;
	
	var title1 = new Kinetic.Text({
		x: 0,
		y: boardStageY / 2 - fontSize,
		text: msg,
		fontSize: fontSize,
		fontStyle: 'bold',
		fontFamily: 'Calibri',
		fill: '#00FFFF',
		stroke: "#FFFFFF",
		width: boardStageX,
		align: 'center'
	});
	gBoardLayer.add(title1);
	gBoardLayer.draw();
	var tweenObj1 = new Kinetic.Tween({
		node: title1, 
		duration: 1.5,
		fontSize: 90,
		opacity: 0,
		onFinish: function() {
			tweenObj1.destroy();
			title1.destroy();
		}
	});	
	tweenObj1.play();
	
	if(typeof time == 'undefined') return;
	
	var title2 = new Kinetic.Text({
		x: 0,
		y: boardStageY / 2 - fontSize + title1.getHeight(),
		text: time + "s",
		fontSize: 45,
		//fontStyle: 'bold',
		fontFamily: 'Calibri',
		fill: '#00FFFF',
		stroke: "#FFFFFF",
		width: boardStageX,
		align: 'center'
	});
	gBoardLayer.add(title2);
	var tweenObj2 = new Kinetic.Tween({
		node: title2, 
		duration: 1.5,
		fontSize: 65,
		opacity: 0,
		onFinish: function() {
			tweenObj2.destroy();
			title2.destroy();
		}
	});
	gBoardLayer.draw();
	tweenObj2.play();
}