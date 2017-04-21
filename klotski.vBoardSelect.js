//=====================================================================
// Klotski (µØ®e¹D) : vertical slide board selection 
//
// 08/23/2013 - add function for direct open indicate level from url:
//
// 08/08/2013 - add support edit mode
// 
// 05/23/2013 - created by Simon Hung
//=====================================================================
var TABS_TYPE = { NORMAL: 0, CLASSIC: 1, USER: 2};
	
function vSelectBoard()
{
	//---------
	// define 
	//---------
	var PAGE = 4;
	var ITEM_PAGE_X = 6;
	var ITEM_PAGE_Y = 4;
	var ITEM_WIDTH = 120;
	var ITEM_HEIGHT = 120;
	var ITEM_PER_PAGE = ITEM_PAGE_X * ITEM_PAGE_Y;
	var TOTAL_ITEM_PER_LEVEL = ITEM_PER_PAGE * PAGE; 
	var MAX_LEVEL = 6; //only support max items = TOTAL_ITEM_PER_LEVEL * MAX_LEVEL

	var SELECT_BOARD_X = ITEM_PAGE_X * ITEM_WIDTH;
	var SELECT_BOARD_Y = ITEM_PAGE_Y * ITEM_HEIGHT;
	var TABS_HEIGHT = 25;
	var TABS_WIDTH = 70;
	var MAIN_BORDER_WIDTH = 20;
	var MAIN_BORDER_HEIGHT = 15;
	var TABS_BORDER_WIDTH = 10;

	var BOARD_TXT_NORMAL_COLOR = 'black';
	var BOARD_TXT_SELECT_COLOR = 'red';
	
	//rectangle for click area
	var CLICK_RECT_X = 65;
	var CLICK_RECT_Y = 100;
	
	var FONT_FAMILY = 'arial';

	var MAIN_STAGE_SHADOW_OFFSET = 5;
	var MAIN_RECT_X = (SELECT_BOARD_X + MAIN_BORDER_WIDTH*2 + TABS_BORDER_WIDTH*2);
	var MAIN_RECT_Y = (SELECT_BOARD_Y + MAIN_BORDER_HEIGHT*2 + TABS_BORDER_WIDTH*2 + TABS_HEIGHT);	
	var MAIN_STAGE_X = MAIN_RECT_X + MAIN_STAGE_SHADOW_OFFSET;
	var MAIN_STAGE_Y = MAIN_RECT_Y + MAIN_STAGE_SHADOW_OFFSET;
	
	var TABS_STAGE_X = (SELECT_BOARD_X + TABS_BORDER_WIDTH*2);
	var TABS_STAGE_Y = (SELECT_BOARD_Y + TABS_HEIGHT + TABS_BORDER_WIDTH*2);
	//var SELECT_STAGE_X = SELECT_BOARD_X+200; //for display debug message (writeMessage)
	var SELECT_STAGE_X = SELECT_BOARD_X;
	var SELECT_STAGE_Y = SELECT_BOARD_Y;
	
	var MAIN_STAGE_COLOR = '#F63333'; //'red';
	
	var TABS_ACTIVE_COLOR = 'white';
	var TABS_ACTIVE_FONT_COLOR = 'black';
	var TABS_INACTIVE_COLOR = '#CCCCCC';
	var TABS_INACTIVE_BORDER_COLOR = 'black';
	var TABS_INACTIVE_FONT_COLOR = 'gray';
	var TABS_STROKE_BORDER = 0.2;
	
	var SLIDE_BOARD_BG_COLOR = '#D0D0FF';
	
	var STAR_GOOD_COLOR = 'yellow';
	var STAR_BAD_COLOR = 'gray';
	var STAR_BORDER_COLOR = 'blue';
	
	//-----------
	// variable
	//-----------
	//var colorStyle = [ 'white', 'white', 'yellow', 'blue' , 'red' ];
	//var colorStyle = [ 'white', 'white', 'yellow', 'blue' , 'red' ];
	var colorStyle = [ 'white', 'white', '#F6F633', '#3333F6' , '#F63333' ];
	var boardList; //total board info (sorted)
	var selectCallback; // a callback function to create board
	
	var mainStage, mainLayer;
	var tabsStage, tabsLayer;
	var selectStage, selectLayer;
	var slideBoardGrp, slideBoardTopLine, slideBoardBottomLine;
	var tweenSlideObj = null;

	var maxLevel; 
	var curActiveTabs= -1; 
	var tabsBackground = [];
	var tabsText = [];
	
	var tabsIdOfClassic, tabsIdOfUserDefined;
	
	var sildeBoardMaxY = 0;
	var sildeBoardMinY = -SELECT_BOARD_Y * (PAGE-1);
	
	var maxStageX, maxStageY;
	var dragMoving = 0;
	
	var gameSelectedInfo; //for game mode
	var editSelectedInfo = null; //for edit mode
	var self = this;
	
	function createMainStage(containName)
	{
		mainStage = new Kinetic.Stage({
			container: containName,
			width:  mainStageX,
			height: mainStageY
		});
		
		mainLayer = new Kinetic.Layer( );
		mainStage.add(mainLayer);

		var	background = new Kinetic.Rect({
			x: 10,
			y: 10,
			width:  mainStageX-10,
			height: mainStageY-10,
			cornerRadius: 5,
			fill: 'black',
			opacity: 0.6			
		});		
		mainLayer.add(background);
		
		var	mainRect = new Kinetic.Rect({
			x: mainStartX,
			y: mainStartY,
			width:  MAIN_RECT_X,
			height: MAIN_RECT_Y,
			cornerRadius: 5,
			fill: MAIN_STAGE_COLOR,
			stroke: MAIN_STAGE_COLOR,
			strokeWidth: 1,
			shadowColor: 'black',
			shadowBlur: 5,
			shadowOffset: MAIN_STAGE_SHADOW_OFFSET,
			shadowOpacity: 0.5			
		});		
		mainLayer.add(mainRect);

		var closeGroup = closeBox();
		mainLayer.add(closeGroup);
		mainLayer.draw();		
	}
	
	//--------------------------------
	// for close board select dialog 
	//--------------------------------
	function closeBox()
	{
		var boxSize = 8;
		var bound = 12;
		var radius = boxSize;
		
		var x = mainStartX+MAIN_RECT_X-bound, y = mainStartY+bound;
		var normalCycle = MAIN_STAGE_COLOR, normalCross = 'white'; 
		var activeCycle = 'white', activeCross = MAIN_STAGE_COLOR; 
		
		var closeGroup = new Kinetic.Group({
			x: x,
			y: y
		});

		var closeBox = new Kinetic.Circle({
			x: -boxSize/2,
			y: +boxSize/2,
			radius: radius,
			fill: normalCycle,
			opacity: 1
		});
		var clickBox = new Kinetic.Circle({
			x: -boxSize/2,
			y: +boxSize/2,
			radius: radius,
			fill: normalCycle,
			opacity: 0
		});
		var cross = new Kinetic.Shape({
			x: -boxSize,
			y: 0,
			drawFunc: function(canvas) {
				var context = canvas.getContext();

				//draw cross	
				context.beginPath();
				context.moveTo(0, 0);
				context.lineTo(boxSize,boxSize);
				context.closePath();
				context.moveTo(boxSize, 0);
				context.lineTo(0,boxSize);
				context.closePath();
				context.fill();
				canvas.fillStroke(this); 
			},
			stroke: normalCross,
			strokeWidth: 2
		});
		
		clickBox.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
			closeBox.setFill(activeCycle);
			cross.setStroke(activeCross);
			this.getLayer().draw();
		});
		
		clickBox.on('mouseout', function() {
			document.body.style.cursor = 'default';
			closeBox.setFill(normalCycle);
			cross.setStroke(normalCross);
			this.getLayer().draw();
		});
		
		clickBox.on('click tap', function(){
			if(selectCallback != null) {
				hideStage();
			}
		});
		closeGroup.add(closeBox);
		closeGroup.add(cross);
		closeGroup.add(clickBox);

		return closeGroup;
	}

	//---------------------------------------------
	// for edit mode to delete user defined board
	//---------------------------------------------
	function deleteBox(posStyle, idx)
	{
		var boxSize = 8;
		var bound = 12;
		var radius = boxSize;
		
		var x = posStyle.x, y = posStyle.y;
		var normalCycle = posStyle.normalCycle, normalCross =posStyle.normalCross; 
		var activeCycle = posStyle.activeCycle, activeCross =posStyle.activeCross; 
		
		var deleteGroup = new Kinetic.Group({
			x: x,
			y: y
		});

		var closeBox = new Kinetic.Circle({
			x: -boxSize/2,
			y: +boxSize/2,
			radius: radius,
			fill: normalCycle,
			opacity: 1
		});
		var clickBox = new Kinetic.Circle({
			//--------------------
			myIdx: idx, //(0 - )
			//--------------------
			x: -boxSize/2,
			y: +boxSize/2,
			radius: radius,
			fill: normalCycle,
			opacity: 0
		});
		var cross = new Kinetic.Shape({
			x: -boxSize,
			y: 0,
			drawFunc: function(canvas) {
				var context = canvas.getContext();

				//draw cross	
				context.beginPath();
				context.moveTo(0, 0);
				context.lineTo(boxSize,boxSize);
				context.closePath();
				context.moveTo(boxSize, 0);
				context.lineTo(0,boxSize);
				context.closePath();
				context.fill();
				canvas.fillStroke(this); 
			},
			stroke: normalCross,
			strokeWidth: 2
		});
		
		clickBox.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
			closeBox.setFill(activeCycle);
			cross.setStroke(activeCross);
			slideBoardGrp.draw();
		});
		
		clickBox.on('mouseout', function() {
			document.body.style.cursor = 'default';
			closeBox.setFill(normalCycle);
			cross.setStroke(normalCross);
			
			//can not use this.getLayer().draw() ==> maybe slideBoardGrp.removeChildren() cause this problem
			slideBoardGrp.draw(); 
		});
		
		clickBox.on('click tap', function(){
			var idx = this.getAttr('myIdx');
			deleteBoardCallback(idx);
		});
		
		deleteGroup.add(closeBox);
		deleteGroup.add(cross);
		deleteGroup.add(clickBox);

		return deleteGroup;
	}
	
	//-------------------------------
	// tabsId: 0 - (maxLevel -1 )
	// showPage: 0 - (PAGE -1)
	//-------------------------------
	function activeTabs(tabsId, showPage)
	{
		if(curActiveTabs >= 0) {
			tabsBackground[curActiveTabs].setFill(TABS_INACTIVE_COLOR);
			tabsBackground[curActiveTabs].setStroke(TABS_INACTIVE_BORDER_COLOR);
			tabsBackground[curActiveTabs].setStrokeWidth(TABS_STROKE_BORDER);	
			tabsText[curActiveTabs].setFill(TABS_INACTIVE_FONT_COLOR);
		} 
		tabsBackground[tabsId].setFill(TABS_ACTIVE_COLOR);
		tabsBackground[tabsId].setStroke(null);
		tabsBackground[tabsId].setStrokeWidth(0);
		tabsText[tabsId].setFill(TABS_ACTIVE_FONT_COLOR);
		curActiveTabs = tabsId;
		tabsLayer.draw();
	
		showSlideBoardElement(tabsId, showPage);
	}

	function createTabsStage(containName)
	{
		tabsStage = new Kinetic.Stage({
			container: containName,
			width:  TABS_STAGE_X,
			height: TABS_STAGE_Y
		});
		tabsLayer = new Kinetic.Layer( );
		tabsStage.add(tabsLayer);
		
		for(var i = 0; i < maxLevel+2; i++) {
			var textName;
			if(i < maxLevel) {
				textName = "Level " + (i+1);
			} else {
				if(i == tabsIdOfClassic) 
					textName = gTxtMsg.Classic;
				else 	
					textName = gTxtMsg.User; //user defined
			}
			tabsBackground[i] = new Kinetic.Rect({
				tabsId: i,
				x: TABS_WIDTH *i,
				y:0,
				width: TABS_WIDTH,
				height: TABS_HEIGHT,
				fill:   TABS_INACTIVE_COLOR,
				stroke: TABS_INACTIVE_BORDER_COLOR,
				strokeWidth: TABS_STROKE_BORDER
			});	
			tabsText[i] = new Kinetic.Text({
				tabsId: i, 
				x: 10 + TABS_WIDTH * i,
				y: 5,
				text: textName,
				fontSize: 16,
				fontFamily: FONT_FAMILY,
				fill: TABS_INACTIVE_FONT_COLOR
			});	
			tabsLayer.add(tabsBackground[i]);
			tabsLayer.add(tabsText[i]);

			tabsText[i].on('mouseover', function() {
				document.body.style.cursor = 'pointer';
			});
	
			tabsText[i].on('mouseout', function() {
				document.body.style.cursor = 'default';
			});
			tabsText[i].on('click tap', function (evt) {
				activeTabs(this.getAttr('tabsId'), 0);
			});			
		
			tabsBackground[i].on('mouseover', function() {
				document.body.style.cursor = 'pointer';
			});
	
			tabsBackground[i].on('mouseout', function() {
				document.body.style.cursor = 'default';
			});
			tabsBackground[i].on('click tap', function (evt) {
				activeTabs(this.getAttr('tabsId'), 0);
			});			
		}

		//select border 	
		var	tabsRect = new Kinetic.Rect({
			x:0,
			y: TABS_HEIGHT-1,
			width:  TABS_STAGE_X,
			height: TABS_STAGE_Y+1,
			fill: TABS_ACTIVE_COLOR
		});
		tabsLayer.add(tabsRect);
	}

	var msgLayer; //for debug
	function writeMessage(message) 
	{
		var context = msgLayer.getContext();
	
		if(typeof auto == 'undefined') auto = 0;
		msgLayer.clear();
		context.font = '12pt arial';
		context.fillStyle = 'blue';

		context.fillText(message, SELECT_BOARD_X+20, 20);
	}

	//-------------------------------------------
	// create small board for user to selection
	//-------------------------------------------
	function drawSmallBoard(grpObj, posX, posY, boardString)
	{
		var i = 0;
		var VOID_CHAR = '?';
		var boardState = [];
		for(var x = 0; x < G_BOARD_X; x++) {
			boardState[x] = [];
			for(var y = 0; y < G_BOARD_Y; y++) {
				boardState[x][y] = -1;
			}
		}
	
		for(var y = 0; y < G_BOARD_Y; y++) {
			for(var x = 0; x < G_BOARD_X; x++) {
				if(boardState[x][y] >= 0) { i++; continue;}
			
				var style = gBlockBelongTo[boardString.charCodeAt(i++) - VOID_CHAR.charCodeAt(0)];
			
				//don't create block for empty
				if(style) drawSmallBlock(grpObj, posX, posY, x, y, style);
			
				var sizeX = gBlockStyle[style][0];
				var sizeY = gBlockStyle[style][1];
				for(var xx = 0; xx < sizeX; xx++) {
					for(var yy = 0; yy < sizeY; yy++) {
						boardState[x+xx][y+yy] = style; 
					}
				}
			}	
		}	
	}

	var blockCellSize = 12;
	var BOARD_FONT_SIZE = 15;
	function drawSmallBlock(grpObj, posX, posY, x, y, style)
	{
		var block = new Kinetic.Rect({
			x: posX+14+blockCellSize*x,
			y: posY+17+blockCellSize*y,
			width:  blockCellSize*gBlockStyle[style][0],
			height: blockCellSize*gBlockStyle[style][1],
			//fillPatternImage: images.block4,
			fill: colorStyle[style],
			stroke: 'black',
			strokeWidth: 0.3
		});

		grpObj.add(block);
		return block;
	}	

	function drawStar(grpObj, posX, posY, noOfgold)
	{
		if(noOfgold == 0) return;
		for(var i = 1; i <= 3; i++) {
			var fillColor = (noOfgold >= i)? STAR_GOOD_COLOR : STAR_BAD_COLOR;
		
			var star = new Kinetic.Star({
				x: posX+i*18,
				y: posY+15+blockCellSize*(G_BOARD_Y+1),
				numPoints: 5,
				innerRadius: 5,
				outerRadius: 10,
				fill: fillColor,
				stroke: STAR_BORDER_COLOR,
				strokeWidth: .2
			});	
			grpObj.add(star);
		}
	}
	
	function hideStage()
	{
		mainLayer.hide();
		mainStage.setWidth(0);
		mainStage.setHeight(0);
		
		tabsLayer.hide();
		tabsStage.setWidth(0);
		tabsStage.setHeight(0);

		selectLayer.hide();
		selectStage.setWidth(0);
		selectStage.setHeight(0);

		slideBoardGrp.removeChildren();
	}
	
	function getTitleName(name, tabsId, level)
	{
		switch(true) {
		case (tabsId < maxLevel):
			return "Level " + (tabsId+1) + "-" + level;
		case (tabsId == tabsIdOfUserDefined): 
				return gTxtMsg.UserLevel + level;
		default:		
		case (tabsId == tabsIdOfClassic):
				return level + " " + name;
		}
	}
	
	function createSelectArea(posX, posY, tableId, level, tabsId, itemOfTabs, type)
	{
		var selectArea = new Kinetic.Rect({
			x: posX,
			y: posY,
			width: CLICK_RECT_X,
			height: CLICK_RECT_Y,
			//fill: 'black',
			//stroke: '#00FF00',
			//strokeWidth: .2,
			//opacity: 0.1,
			//--------------------
			dragPos: {x:0, y:0},
			myId: tableId,  //myId + myLevel for got board info
			myLevel: level, //(1 - )
			myType: type,
			myTabs: tabsId, //myTabs+myItem for display title info
			myItem: itemOfTabs //(1 - )
			//--------------------
		});					
					
		selectArea.on('mousedown', function(evt) {
			var dragPos =  this.getAbsolutePosition(); 
			this.setAttrs({dragPos: {x: dragPos.x, y: dragPos.y}});
		});
				
		selectArea.on('click tap', function (evt) {
			var curPos = this.getAbsolutePosition();
			var dragPos = this.getAttr('dragPos');
			writeMessage((curPos.y == dragPos.y?'MY-CLICK':(curPos.y > dragPos.y?'DOWN':'UP')) );
			if(curPos.y == dragPos.y) { //click
				var tableId = this.getAttr('myId');
				var level = this.getAttr('myLevel');
				var type = this.getAttr('myType');
				var tabsId = this.getAttr('myTabs');
				var item = this.getAttr('myItem');
				
				var boardInfo = getBoardInfo(tableId, level) 
				var titleInfo = getTitleName(boardInfo.name, tabsId, item); 
				
				writeMessage("tableId = " + tableId + "level = " + level);
				if(selectCallback != null) {
					//call back
					var selectInfo = {
						boardInfo: boardInfo,
						titleInfo: titleInfo,		
						tableId:   tableId , 
						level:     level , //(1 - )
						type:      type
					};
					selectCallback(selectInfo, 1); //callback function
					if(curGameMode == 3) {
						editSelectedInfo = selectInfo;
					} else {
						gameSelectedInfo = selectInfo;
					}
					hideStage();	
				}	
			}
		});	
					
		// add cursor styling
		selectArea.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
			writeMessage("tableId = " + this.getAttr('myId') + "level = " + this.getAttr('myLevel'));
		});
	
		selectArea.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});	
		
		return selectArea;	
	}
	
	function createSelectStage(containName)
	{
		selectStage = new Kinetic.Stage({
			container: containName,
			width: SELECT_STAGE_X,
			height: SELECT_STAGE_Y
		});
	
		//message layer (for debug)
		msgLayer = new Kinetic.Layer();
		selectStage.add(msgLayer);
		 
		selectLayer = new Kinetic.Layer( );
		selectStage.add(selectLayer);

		slideBoardGrp = new Kinetic.Group({
			width: SELECT_BOARD_X,
			height: SELECT_BOARD_Y*PAGE,
			draggable: true,
			dragBoundFunc: function(pos) {
				var newX = this.getPosition().x;
				var newY = pos.y;
				
				if(newY > sildeBoardMaxY) {
					newY = 0;
					slideBoardTopLine.show();
				}else if(newY < sildeBoardMinY) {
					newY = sildeBoardMinY;
					slideBoardBottomLine.show();
				}  

				writeMessage("x: " + newX + " y: " + newY );
				
				return { x: newX, y: newY }
			},
			//-----------------------
			dragPos: {x:0, y:0}
			//-----------------------
		});
	
		slideBoardGrp.on('dragstart', function(evt) {
			//document.body.style.cursor =  "url('https://mail.google.com/mail/images/2/closedhand.cur'), auto";
			document.body.style.cursor =  "url('./cursor/closedhand.cur'), auto";
			var dragPos =  this.getPosition(); 
			//this.setAttrs({dragPos: {x: dragPos.x, y: dragPos.y}});
			this.setAttrs({dragPos: dragPos});
		});
	
		slideBoardGrp.on('dragend', function(evt) {
			//document.body.style.cursor =  "url('https://mail.google.com/mail/images/2/openhand.cur'), auto";
			document.body.style.cursor =  "url('./cursor/openhand.cur'), auto";
			var curPos = this.getPosition();
			var dragPos = this.getAttr('dragPos');
			writeMessage("DRAG: " + (curPos.y == dragPos.y?'CLICK':(curPos.y > dragPos.y?'DOWN':'UP')) + " " + curPos.y );
		
			slideBoardTopLine.hide();
			slideBoardBottomLine.hide();	
			if(curPos.y < sildeBoardMaxY && curPos.y > sildeBoardMinY && curPos.y != dragPos.y) {
				var newY = curPos.y;
				switch(true) {
				case (curPos.y > dragPos.y && (-curPos.y%ITEM_HEIGHT) < ITEM_HEIGHT/3):
					newY += ITEM_HEIGHT; //drag down
					break;
				case (curPos.y < dragPos.y && (-curPos.y%ITEM_HEIGHT) < ITEM_HEIGHT/3):
					newY += ITEM_HEIGHT; //drag up
					break;
				}	

				var newY = Math.floor(newY/ITEM_HEIGHT);
				newY = newY * ITEM_HEIGHT;

				//BEGIN tween animation ===============================
				if(newY != curPos.y) {
					if(tweenSlideObj != null) {
						tweenSlideObj.pause();
					}
					tweenSlideObj = new Kinetic.Tween({
						node: slideBoardGrp, 
						duration: 0.1,
						x:curPos.x,
						y:newY,	
						onFinish: function() {
							tweenSlideObj = null;
							//writeMessage(messageLayer, 'tween finished!');
						}
					});
					tweenSlideObj.play();	
				}
				//END    tween animation ===============================
				
				//this.setPosition(curPos.x, newY);
			}
			this.getLayer().draw();
			//selectLayer.draw();
		});
		selectLayer.add(slideBoardGrp);		

	
		//----------------------------
		// BEGIN mouse wheel function
		//----------------------------
		var wheelScroll = function(e) {
			var direction = e.detail?-e.detail:e.wheelDelta; //e.detail: for fireFox, e.wheelDelta: for chrome, IE
			direction = (direction>0)?ITEM_HEIGHT: -ITEM_HEIGHT;	
		
			var newX = slideBoardGrp.getPosition().x;
			var newY = slideBoardGrp.getPosition().y + direction;

			if(newY > sildeBoardMaxY) {
				newY = 0;
			}else if(newY < sildeBoardMinY) {
				newY = sildeBoardMinY;
			}  		
		
			slideBoardGrp.setPosition(newX, newY);
			slideBoardGrp.getLayer().draw();
		}
	
		//for chrome
		document.addEventListener("mousewheel", wheelScroll, false);
		//for firefox
		document.getElementById(selectStageName).addEventListener('DOMMouseScroll', wheelScroll, false);
		//----------------------------
		// END   mouse wheel function
		//----------------------------		
	}
	
	function createSlideBoardBackground(maxPage)
	{
		//---------------------
		// create background
		//---------------------
		var backGround = new Kinetic.Rect({
			width: SELECT_BOARD_X,
			height: SELECT_BOARD_Y*maxPage,
			fill: SLIDE_BOARD_BG_COLOR
		});
		
		// add cursor styling
		backGround.on('mouseover', function() {
			document.body.style.cursor =  "url('./cursor/openhand.cur'), auto";
		});
		backGround.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});		

		slideBoardGrp.add(backGround);
	
		slideBoardTopLine = new Kinetic.Line({
			points: [0, 0, SELECT_BOARD_X, 0],
			stroke: 'red',
			strokeWidth: 3
		});
		slideBoardTopLine.hide();
		slideBoardGrp.add(slideBoardTopLine);
	
		slideBoardBottomLine = new Kinetic.Line({
			points: [0, SELECT_BOARD_Y*maxPage, SELECT_BOARD_X, SELECT_BOARD_Y*maxPage],
			stroke: 'red',
			strokeWidth: 3
		});
		slideBoardBottomLine.hide();
		slideBoardGrp.add(slideBoardBottomLine);		
	}
	
	//-----------------------------
	// tabsId: 0 - (maxLevel+2)  
	// showPage: 0 - (PAGE-1)
	//-----------------------------
	function showSlideBoardElement(tabsId, showPage)
	{
		slideBoardGrp.removeChildren();
		var maxPage;
		
		switch(true) {
		case (tabsId < maxLevel)://normal
			var startOfBoardList = tabsId * TOTAL_ITEM_PER_LEVEL;
			var endOfBoardList = startOfBoardList + TOTAL_ITEM_PER_LEVEL - 1;
			if(endOfBoardList >= boardList.length) endOfBoardList = boardList.length - 1;
			maxPage = Math.ceil((endOfBoardList - startOfBoardList+1) / ITEM_PER_PAGE); //round up
			sildeBoardMinY = -SELECT_BOARD_Y * (maxPage-1);		
			
			createSlideBoardBackground(maxPage);
			createNormalBoardList(tabsId, startOfBoardList, endOfBoardList);
			break;
		case (tabsId == tabsIdOfClassic): //classic
			var classicInfo = getClassicInfo();
			var tableId = classicInfo.id;
			var list = classicInfo.list;
			maxPage = Math.ceil(list.length / ITEM_PER_PAGE); //round up
			sildeBoardMinY = -SELECT_BOARD_Y * (maxPage-1);		

			createSlideBoardBackground(maxPage);
			createClassicBoardList(tabsIdOfClassic, tableId, list); 
			break;
		case (tabsId == tabsIdOfUserDefined): //user defined
			var tableId = getUserInfo().id;
			var tableSize = getUserInfo().size;
			maxPage = Math.ceil(tableSize / ITEM_PER_PAGE); //round up
			sildeBoardMinY = -SELECT_BOARD_Y * (maxPage-1);		
			createSlideBoardBackground(maxPage);
			createUserBoardList(tabsIdOfUserDefined, tableId, tableSize); 
			break;
		default:
			error("showSlideBoardElement(): design error !");
		}
		//-----------------------
		//set show page position
		//-----------------------
		var curPos = slideBoardGrp.getPosition();
		slideBoardGrp.setPosition(curPos.x, -SELECT_BOARD_Y * showPage );
		slideBoardGrp.getLayer().draw();
	}
	
	function createNormalBoardList(tabsId, startId, endId)
	{
		var offsetX = (ITEM_WIDTH - CLICK_RECT_X) /2;
		var offsetY = (ITEM_HEIGHT - CLICK_RECT_Y) /2;
		var selectArea = [];

		//convert current selected table-level to tabs-level /////////////
		var tabsLevel = tableLevel2TabsLevel(gameSelectedInfo.tableId, 
		                                     gameSelectedInfo.level, 
		                                     TABS_TYPE.NORMAL); 
	    var checkLevel = (tabsLevel.tabsId == tabsId && curGameMode != 3)?1:0; //need check level or not
		var levelOfTabs = tabsLevel.level; //(1 - )	
		//////////////////////////////////////////////////////////////////
		
		for(var p = 0; p < PAGE; p++) {
			for(var y = 0; y < ITEM_PAGE_Y; y++) {
				for(var x = 0; x < ITEM_PAGE_X; x++) {
					var idxOfTabs = y*ITEM_PAGE_X + x + p*ITEM_PER_PAGE; //index of current tabs
					var id = idxOfTabs + startId; //index of boardList (0 - ) 
					if(id > endId) break;
					
					var posX = ITEM_WIDTH * x +  offsetX;
					var posY = ITEM_HEIGHT * y + offsetY + p*SELECT_BOARD_Y;
					
					var tableId = boardList[id].tableId;
					var tableLevel = boardList[id].level; //(1 - ) 
					
					var boardInfo = getBoardInfo(tableId, tableLevel);
					var boardHighScore = getBoardHighScore(tableId, tableLevel);
					var starNumber = (typeof boardHighScore == 'undefined')?0:score2StarNumber(boardHighScore, boardInfo.mini);
					
					var fillColor = BOARD_TXT_NORMAL_COLOR;
					if(checkLevel && levelOfTabs == (idxOfTabs+1)) {
						fillColor = BOARD_TXT_SELECT_COLOR; //current selected
					}
					
					var boxText = new Kinetic.Text({
						x: posX,
						y: posY,
						//text: (idxOfTabs+1) + " " + (boardInfo.name.length < 6? boardInfo.name: boardInfo.mini),
						//text: (idxOfTabs+1) + " (" + boardInfo.mini + ")",
						text: (idxOfTabs+1),
						fontSize: BOARD_FONT_SIZE,
						fontFamily: FONT_FAMILY,
						fill: fillColor
					});
					slideBoardGrp.add(boxText);
					drawSmallBoard(slideBoardGrp, posX, posY, boardInfo.board);
					//drawStar(slideBoardGrp, posX, posY,Math.floor(Math.random()*4));
					drawStar(slideBoardGrp, posX, posY, starNumber);
					selectArea[idxOfTabs] = createSelectArea(posX, posY, tableId, tableLevel, tabsId, idxOfTabs+1, TABS_TYPE.NORMAL);
					slideBoardGrp.add(selectArea[idxOfTabs]);
				}
			}
		}
	}

	function createClassicBoardList(tabsId, tableId, list)
	{
		var offsetX = (ITEM_WIDTH - CLICK_RECT_X) /2;
		var offsetY = (ITEM_HEIGHT - CLICK_RECT_Y) /2;
		var maxLevel = list.length;
		var selectArea = [];
		
		//convert current selected table-level to tabs-level /////////////
		var tabsLevel = tableLevel2TabsLevel(gameSelectedInfo.tableId, 
		                                     gameSelectedInfo.level, 
		                                     TABS_TYPE.CLASSIC); 
	    var checkLevel = (tabsLevel.tabsId == tabsId && curGameMode != 3)?1:0; //need check level or not
		var levelOfTabs = tabsLevel.level; //(1 - )	
		//////////////////////////////////////////////////////////////////
		
		for(var p = 0; p < PAGE; p++) {
			for(var y = 0; y < ITEM_PAGE_Y; y++) {
				for(var x = 0; x < ITEM_PAGE_X; x++) {
					var idx = y*ITEM_PAGE_X + x + p*ITEM_PER_PAGE;
					if(idx >= maxLevel) break;
					
					var posX = ITEM_WIDTH * x +  offsetX;
					var posY = ITEM_HEIGHT * y + offsetY + p*SELECT_BOARD_Y;

					var boardInfo = getBoardInfo(tableId, list[idx]);
					var boardHighScore = getBoardHighScore(tableId, list[idx]);
					var starNumber = (typeof boardHighScore == 'undefined')?0:score2StarNumber(boardHighScore, boardInfo.mini);
					
					var fillColor = BOARD_TXT_NORMAL_COLOR;
					if(checkLevel && levelOfTabs == (idx+1)) {
						fillColor = BOARD_TXT_SELECT_COLOR; //current selected
					}
					
					var boxText = new Kinetic.Text({
						x: posX,
						y: posY,
						//text: (idx+1) + " " + boardInfo.name  + " " + boardInfo.level,
						text: (idx+1) + " " + boardInfo.name,
						fontSize: BOARD_FONT_SIZE,
						fontFamily: FONT_FAMILY,
						fill: fillColor
					});
					slideBoardGrp.add(boxText);
					drawSmallBoard(slideBoardGrp, posX, posY, boardInfo.board);
					//drawStar(slideBoardGrp, posX, posY,Math.floor(Math.random()*4));
					drawStar(slideBoardGrp, posX, posY,starNumber);
					selectArea[idx] = createSelectArea(posX, posY, tableId, list[idx], tabsId, idx+1, TABS_TYPE.CLASSIC);;
					slideBoardGrp.add(selectArea[idx]);
				}
			}
		}		
	}

	function createUserBoardList(tabsId, tableId, tableSize)
	{
		var offsetX = (ITEM_WIDTH - CLICK_RECT_X) /2;
		var offsetY = (ITEM_HEIGHT - CLICK_RECT_Y) /2;
		var maxLevel = tableSize;
		var selectArea = [];
		
		//convert current selected table-level to tabs-level /////////////
		var tabsLevel = tableLevel2TabsLevel(gameSelectedInfo.tableId, 
		                                     gameSelectedInfo.level, 
		                                     TABS_TYPE.USER); 
	    var checkLevel = (tabsLevel.tabsId == tabsId && curGameMode != 3)?1:0; //need check level or not
		var levelOfTabs = tabsLevel.level; //(1 - )	
		//////////////////////////////////////////////////////////////////

		for(var p = 0; p < PAGE; p++) {
			for(var y = 0; y < ITEM_PAGE_Y; y++) {
				for(var x = 0; x < ITEM_PAGE_X; x++) {
					var idx = y*ITEM_PAGE_X + x + p*ITEM_PER_PAGE; //(0 - )
					if(idx >= maxLevel) break;
					
					var posX = ITEM_WIDTH * x +  offsetX;
					var posY = ITEM_HEIGHT * y + offsetY + p*SELECT_BOARD_Y;

					var boardInfo = getBoardInfo(tableId, idx+1);
					var boardHighScore = getBoardHighScore(tableId, idx+1);
					var starNumber = (typeof boardHighScore == 'undefined')?0:score2StarNumber(boardHighScore, boardInfo.mini);

					var fillColor = BOARD_TXT_NORMAL_COLOR;
					if(checkLevel && levelOfTabs == (idx+1)) {
						fillColor = BOARD_TXT_SELECT_COLOR; //current selected
					}
				
					var boxText = new Kinetic.Text({
						x: posX,
						y: posY,
						//text: (idx+1) + " " + boardInfo.name  + " " + boardInfo.level,
						text: (idx+1),
						fontSize: BOARD_FONT_SIZE,
						fontFamily: FONT_FAMILY,
						fill: fillColor
					});
					slideBoardGrp.add(boxText);
					drawSmallBoard(slideBoardGrp, posX, posY, boardInfo.board);
					//drawStar(slideBoardGrp, posX, posY,Math.floor(Math.random()*4));
					drawStar(slideBoardGrp, posX, posY,starNumber);
					selectArea[idx] = createSelectArea(posX, posY, tableId, idx+1, tabsId, idx+1, TABS_TYPE.USER);
					
					var posStyle = {
						x: posX+80,
						y: posY+4,
						normalCycle: SLIDE_BOARD_BG_COLOR, //'#80008', // SLIDE_BOARD_BG_COLOR, 
						normalCross: 'white', //SLIDE_BOARD_BG_COLOR,
						activeCycle: MAIN_STAGE_COLOR,
						activeCross: 'white'
					};
					if(curGameMode == 3) { //edit mode	
						var deleteGroup = deleteBox(posStyle, idx); //idx : (0 - )
						slideBoardGrp.add(deleteGroup);
					}
					slideBoardGrp.add(selectArea[idx]);
				}
			}
		}		
	}

	function tableLevel2TabsLevel(tableId, level, type) 
	{
		var tabsId = -1;
		var levelOfTabs = -1;
		
		switch(true) {
		case (type == TABS_TYPE.NORMAL):		
			for(var id = 0; id < boardList.length; id++) {
				if(boardList[id].tableId == tableId && boardList[id].level == level) {
					//found 
					tabsId = Math.floor( id / TOTAL_ITEM_PER_LEVEL); 
					levelOfTabs = id - tabsId * TOTAL_ITEM_PER_LEVEL + 1;
					break;
				}
			}
			break;
		case (type == TABS_TYPE.CLASSIC && tableId == getClassicInfo().id):
			var classicList = getClassicInfo().list;

			for(var id =0; id < classicList.length; id++) {
				if(classicList[id] == level) {
					tabsId = tabsIdOfClassic;
					levelOfTabs = id+1; 
					break;
				}
			}
			break;
		case (type == TABS_TYPE.USER && tableId == getUserInfo().id):
			tabsId = tabsIdOfUserDefined;
			levelOfTabs = level
			break;
		default:
			// can not found the tabs-level, return { -1, -1 } 
		}	
		
		return { tabsId: tabsId, level: levelOfTabs };	
	}	
	
	//----------------
	//delIdx: (0 - ) , level = delIdx+1
	//----------------
	function deleteBoardCallback(delIdx)
	{
		removeUserDefinedBoard(delIdx);
		
		var userId = getUserInfo().id;
		var userSize = getUserInfo().size; //size value as after removed 
		
		var curTableId = gameSelectedInfo.tableId;
		var curLevel = gameSelectedInfo.level;

		//current selected board >= removed
		if(curTableId == userId && curLevel >= (delIdx+1) ) {
			switch(true) {
			case (curLevel == (delIdx+1)):
				//(1) current selected board same as removed, change it to next or (Level 1-1)
				var tableId, level, type;
				if(userSize <= 0) { 
					//(1.1) no user defined items, change to level 1-1
					tableId = boardList[0].tableId;
					level = boardList[0].level;
					type = TABS_TYPE.NORMAL;
				} else {
					//change to next or last
					tableId = userId;
					type = TABS_TYPE.USER;
					if(delIdx >= userSize) { 
						//(1.2) remove last items, change to last  
						level = delIdx;
					} else {
						//(1.3) change to next one
						level = delIdx+1;
					}
				}
				break;
			case (curLevel > (delIdx+1)):	
				//(2) current selected board > removed, change to curLevel-1
				tableId = userId;
				type = TABS_TYPE.USER;
				level = curLevel-1;
				break;
			}
			
			var newSelectedBoard = self.changeSelectedBoard({ 
				table: tableId, 
				level: level, 
				board: getBoardInfo(tableId, level).board,
				type: type
			});		
			
			if(newSelectedBoard) {
				gCurSelectedBoard = newSelectedBoard; //change global variable!
				if(curLevel == (delIdx+1)) { //already be deleted
					stepInfo = [];
					gHintsCount = 0;
					manualMoveCount = 0;
					curBoardStep = 0;
					savePlayModeInfo();
				}
				savePlayInfo(gCurSelectedBoard, stepInfo, gHintsCount, manualMoveCount);
				editSelectedInfo = gameSelectedInfo;
			} else {
				error("error ? why? after delete usr board !");
			}
				
		}

		//-------------------
		//renew select tabs	
		//-------------------
		if(userSize <= 0) { 
			//(1) none of user define change tabs to level 1-1
			tabsBackground[tabsIdOfUserDefined].hide();
			tabsText[tabsIdOfUserDefined].hide();
			activeTabs(0, 0);
		} else {
			//(2) 
			if(delIdx >= userSize) { 
				//(2.1) remove last item of user-defined tabs 
				level = delIdx;
			} else {
				//(2.2) remove one item of user-defined tabs
					level = delIdx+1;
			}	
			activeTabs(tabsIdOfUserDefined, getUserTabsPage(level).page);
			debug("[" + tabsIdOfUserDefined + "," + level + "]");
		}
	}
	
	function getNormalTabsPage(tableId, tableLevel)
	{
		for(var id =0; id < boardList.length; id++) {
			if(boardList[id].tableId == tableId && boardList[id].level == tableLevel) {
				//found
				var tabsId = Math.floor( id / TOTAL_ITEM_PER_LEVEL); //round down ( 0 - )
				var page = Math.floor((id - tabsId * TOTAL_ITEM_PER_LEVEL)/ ITEM_PER_PAGE); // (0 - )
				return {tabsId: tabsId, page: page};
			}
		}
		// not found ?
		error("getNormalTabsPage(): design error !");
		return {tabsId:0, page:0};
	}
	
	function getClassicTabsPage(tableLevel)
	{
		var classicList = getClassicInfo().list;
		var tabsIdx = 0; //(0 - )
		
		for(var id =0; id < classicList.length; id++) {
			if(classicList[id] == tableLevel) {
				tabsIdx = id;
				break;
			}
		}

		var page = Math.floor(tabsIdx/ ITEM_PER_PAGE); // (0 - )
		
		return {tabsId: tabsIdOfClassic,  page: page};
	}

	function getUserTabsPage(tableLevel)
	{
		var tabsIdx = tableLevel-1; //(0 - )
		
		var page = Math.floor(tabsIdx/ ITEM_PER_PAGE); // (0 - )
		
		return {tabsId: tabsIdOfUserDefined,  page: page};
	}
	
	function convert2TabsPage(tableId, level, tableType)
	{
		var tabsPage; 
		
		switch(tableType) {
		case TABS_TYPE.NORMAL: //normal sorted
			tabsPage = getNormalTabsPage(tableId, level); 
			break;
		case TABS_TYPE.CLASSIC: //classic 
			tabsPage = getClassicTabsPage(level);
			break;
		case TABS_TYPE.USER: //user defined	
			tabsPage = getUserTabsPage(level);
			break;
		default:
			tabsPage = {tabsId:0, page:0}; //other ??
		}
		return tabsPage;
	}
	
	//convert table+level to tabs+level for normal type
	function getNormalLevel(tableId, level)
	{
		var getId = 0; //if not found or out of range
		var tabsId = 0;
		var levelOfTabs = 1;
		
		for(var id = 0; id < boardList.length; id++) {
			if(boardList[id].tableId == tableId && boardList[id].level == level) {
				//found 
				getId = id;
				tabsId = Math.floor( getId / TOTAL_ITEM_PER_LEVEL); 
				levelOfTabs = getId - tabsId * TOTAL_ITEM_PER_LEVEL + 1;
				break;
			}
		}
		var tableId = boardList[getId].tableId;
		var level = boardList[getId].level;
		
		return {
			boardInfo: getBoardInfo(tableId, level),  
			titleInfo: getTitleName('', tabsId, levelOfTabs),
			tableId:   tableId , 
			level:     level , //(1 - )
			type:      TABS_TYPE.NORMAL
		}; 		
	}

	//convert table+level to tabs+level for classic type
	function getClassicLevel(levelOfTable)
	{
		var tableId = getClassicInfo().id;
		var classicList = getClassicInfo().list;
		var tabsId = tabsIdOfClassic;
		var idx = 0; //(0 - )
		
		//from table+Level to find next tabs+Level
		for(var id =0; id < classicList.length; id++) {
			if(classicList[id] == levelOfTable) {
				idx = id; 
				break;
			}
		}	

		levelOfTable = classicList[idx]; //new level of table (if not found idx = 0)		
		var boardInfo = getBoardInfo(tableId, levelOfTable);
		
		return {
			boardInfo: boardInfo,  
			titleInfo: getTitleName(boardInfo.name, tabsId, idx+1),
			tableId:   tableId , 
			level:     levelOfTable , //(1 - )
			type:      TABS_TYPE.CLASSIC
		}; 	
	}

	//convert table+level to tabs+level for user defined type
	function getUserLevel(levelOfTable)
	{
		var tableId = getUserInfo().id;
		var tableSize = getUserInfo().size;
		var tabsId = tabsIdOfUserDefined;
		var levelOfTabs = levelOfTable; //(1 - ), user defined: tabs-level = tables-level
		
		if(levelOfTable > tableSize) {
			return null; //level not found of user defined
		}

		var boardInfo = getBoardInfo(tableId, levelOfTable);
		
		return {
			boardInfo: boardInfo,  
			titleInfo: getTitleName(boardInfo.name, tabsId, levelOfTabs),
			tableId:   tableId , 
			level:     levelOfTable , //(1 - )
			type:      TABS_TYPE.USER
		}; 	
	}
	
	function getNormalNextLevel(tableId, levelOfTable)
	{
		var nextId = 0; //if not found or out of range
		var tabsId = 0;
		var levelOfTabs = 1;
		
		for(var id =0; id < boardList.length; id++) {
			if(boardList[id].tableId == tableId && boardList[id].level == levelOfTable) {
				//found, and get next 
				if(++id < boardList.length) {
					nextId = id;
					tabsId = Math.floor( nextId / TOTAL_ITEM_PER_LEVEL); 
					levelOfTabs = nextId - tabsId * TOTAL_ITEM_PER_LEVEL + 1;
				}
				break;
			}
		}
		
		//get next tableId & levelOfTable
		tableId = boardList[nextId].tableId;
		levelOfTable = boardList[nextId].level;
		
		return {
			boardInfo: getBoardInfo(tableId, levelOfTable),  
			titleInfo: getTitleName('', tabsId, levelOfTabs),
			tableId:   tableId , 
			level:     levelOfTable , //(1 - )
			type:      TABS_TYPE.NORMAL
		}; 		
	}
	
	function getClassicNextLevel(levelOfTable)
	{
		var tableId = getClassicInfo().id;
		var classicList = getClassicInfo().list;
		var tabsId = tabsIdOfClassic;
		var nextIdxOfTabs = 0; //(0 - )
		
		//from table+Level to find next tabs+Level
		for(var id =0; id < classicList.length; id++) {
			if(classicList[id] == levelOfTable) {
				nextIdxOfTabs = id+1; //get next idx of tabs
				if(nextIdxOfTabs >= classicList.length) nextIdxOfTabs = 0; 
				break;
			}
		}	

		var nextTableLevel = classicList[nextIdxOfTabs];		
		var boardInfo = getBoardInfo(tableId, nextTableLevel);
		
		return {
			boardInfo: boardInfo,  
			titleInfo: getTitleName(boardInfo.name, tabsId, nextIdxOfTabs+1),
			tableId:   tableId , 
			level:     nextTableLevel , //(1 - )
			type:      TABS_TYPE.CLASSIC
		}; 	
	}

	function getUserNextLevel(levelOfTable)
	{
		var tableId = getUserInfo().id;
		var tableSize = getUserInfo().size;
		
		var tabsId = tabsIdOfUserDefined;
		var nextLevel = levelOfTable+1; //(1 - ), get next level of table

		if(	nextLevel > tableSize) {
			nextLevel = 1;
		}

		var boardInfo = getBoardInfo(tableId, nextLevel);
		
		return {
			boardInfo: boardInfo,  
			titleInfo: getTitleName(boardInfo.name, tabsId, nextLevel),
			tableId:   tableId , 
			level:     nextLevel , //(1 - ), user defined: level of tables same as level of tabs 
			type:      TABS_TYPE.USER
		}; 	
	}
	
	function initStagePosition(maxStageX, maxStageY)
	{
		mainStageX = maxStageX > MAIN_STAGE_X?maxStageX:MAIN_STAGE_X;
		mainStageY = maxStageY > MAIN_STAGE_Y?maxStageY:MAIN_STAGE_Y;
	
		mainStartX = maxStageX <= MAIN_RECT_X?0:Math.floor(maxStageX-MAIN_RECT_X)/2;
		mainStartY = maxStageY <= MAIN_RECT_Y?0:Math.floor(maxStageY-MAIN_RECT_Y)/2;
		
		var tabsStartX = mainStartX + MAIN_BORDER_WIDTH;
		var tabsStartY = mainStartY + MAIN_BORDER_HEIGHT;
		
		var selectStartX = tabsStartX + TABS_BORDER_WIDTH;
		var selectStartY = tabsStartY + TABS_BORDER_WIDTH + TABS_HEIGHT;
	
		//document.getElementById(mainStageName).style.cssText = "top:" + baseY + "px; left:" + baseX + "px; position: absolute;";
		document.getElementById(mainStageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";
		document.getElementById(tabsStageName).style.cssText = "top:" + tabsStartY + "px; left:" + tabsStartX + "px; position: absolute;";
		document.getElementById(selectStageName).style.cssText = "top:" + selectStartY + "px; left:" + selectStartX + "px; position: absolute;";
		
	}
	
	this.init = function(mainName, tabsName, selectName, screenX, screenY, callback)
	{
		boardList = genBoardList();		

		maxLevel= Math.ceil(boardList.length / TOTAL_ITEM_PER_LEVEL); //round up
		if (maxLevel > MAX_LEVEL) maxLevel = MAX_LEVEL;

		tabsIdOfClassic = maxLevel;
		tabsIdOfUserDefined = maxLevel+1;
		
		mainStageName = mainName;
		tabsStageName = tabsName;
		selectStageName = selectName;
		
		if(typeof callback == 'undefined') selectCallback = null;
		else selectCallback = callback;
		
		initStagePosition(screenX, screenY);
	
		//return first of boardlist
		var tableId = boardList[0].tableId;
		var level = boardList[0].level; 
		
		gameSelectedInfo = {
			boardInfo: getBoardInfo(tableId, level),  
			titleInfo: getTitleName('', 0,1),
			tableId:   tableId , 
			level:     level , //(1 - )
			type:      TABS_TYPE.NORMAL
		}; 
		
		return gameSelectedInfo;
	}
	
	var mainStageName, tabsStageName, selectStageName;
	var mainStageX, mainStageY, mainStartX, mainStartY;
	var stageCreated = 0;

	var curGameMode; //1:game mode, 2:demo mode, 3:edit mode
	
	this.show = function(curMode) 
	{
		if(!stageCreated) {
			createMainStage(mainStageName);
			createTabsStage(tabsStageName);
			createSelectStage(selectStageName);
			stageCreated = 1;
		}
		curGameMode = curMode; //for EDIT Mode enable deleteBox of each user-defined board

		var selectInfo;
		if(curGameMode == 3) { //edit mode
			if(editSelectedInfo == null) editSelectedInfo = gameSelectedInfo;
			selectInfo = editSelectedInfo;
		} else {
			selectInfo = gameSelectedInfo;
		}
		
		var tabsPage = convert2TabsPage(selectInfo.tableId, selectInfo.level, selectInfo.type);

		//hidden the user defined tabs if no any items	
		if(getUserInfo().size <= 0) {
			tabsBackground[tabsIdOfUserDefined].hide();
			tabsText[tabsIdOfUserDefined].hide();
		} else {
			tabsBackground[tabsIdOfUserDefined].show();
			tabsText[tabsIdOfUserDefined].show();
		}
		
		mainLayer.show();
		mainStage.setWidth(mainStageX);
		mainStage.setHeight(mainStageY);
		
		tabsLayer.show();
		tabsStage.setWidth(TABS_STAGE_X);
		tabsStage.setHeight(TABS_STAGE_Y);
		
		selectLayer.show();
		selectStage.setWidth(SELECT_STAGE_X);
		selectStage.setHeight(SELECT_STAGE_Y);
		
		activeTabs(tabsPage.tabsId, tabsPage.page);
	}
	
	this.changeSelectedBoard = function(playInfo) 
	{
		var selectedInfo = null;

		switch(playInfo.type) {
		case TABS_TYPE.NORMAL: //normal sorted
			selectedInfo = getNormalLevel(playInfo.table, playInfo.level); 
			break;
		case TABS_TYPE.CLASSIC: //classic 
			selectedInfo = getClassicLevel(playInfo.level);
			break;
		case TABS_TYPE.USER: //user defined
			selectedInfo = getUserLevel(playInfo.level);
			break;
		}	

		if(selectedInfo == null || selectedInfo.boardInfo.board != playInfo.board) {
			return null; //saved info is not same as current [table, level] info 
		}
		gameSelectedInfo = selectedInfo;
		
		return selectedInfo;
	}
	
	this.changeBoardByTabsLevel = function(tabsId, levelOfTabs) //8/23/2013
	{
		//tabsId: 0 - , levelOfTabs: 1 - 
		if(tabsId < 0 || levelOfTabs < 1 || levelOfTabs > TOTAL_ITEM_PER_LEVEL) return null;
		
		var id = tabsId * TOTAL_ITEM_PER_LEVEL + (levelOfTabs-1);
		
		if(id >= boardList.length) return null;
		
		var tableId = boardList[id].tableId;
		var level = boardList[id].level;
		
		var selectedInfo = {
			boardInfo: getBoardInfo(tableId, level),  
			titleInfo: getTitleName('', tabsId, levelOfTabs),
			tableId:   tableId , 
			level:     level , //(1 - )
			type:      TABS_TYPE.NORMAL
		};
			
		gameSelectedInfo = selectedInfo;	
		return selectedInfo;		
	}
	
	this.changeBoardByClassicName = function(name) //8/23/2013
	{
		var tableId = getClassicInfo().id;
		var classicList = getClassicInfo().list;
		var tabsId = tabsIdOfClassic;
		var idx = 0;
		var levelOfTable, boardInfo;
		
		for(var idx =0; idx < classicList.length; idx++) {
			levelOfTable = classicList[idx];
			boardInfo = getBoardInfo(tableId, levelOfTable);
			if( (boardInfo.name == name) || 
			    (typeof boardInfo.classicAlias != 'undefined' &&
			     boardInfo.classicAlias.indexOf(name) >= 0)
			) break;
		}
		if(idx >= classicList.length) return null; //classic name not found
		
		
		var selectedInfo = {
			boardInfo: boardInfo,  
			titleInfo: getTitleName(boardInfo.name, tabsId, idx+1),
			tableId:   tableId , 
			level:     levelOfTable , //(1 - )
			type:      TABS_TYPE.CLASSIC
		};
			
 		gameSelectedInfo = selectedInfo;	
		return selectedInfo;		
	}
	
	this.getNextLevel = function()
	{
		var tableId = gameSelectedInfo.tableId;
		var level = gameSelectedInfo.level;
		var type = gameSelectedInfo.type;
		
		switch(type) {
		case TABS_TYPE.NORMAL: //normal sorted
			gameSelectedInfo = getNormalNextLevel(tableId, level); 
			break;
		case TABS_TYPE.CLASSIC: //classic 
			gameSelectedInfo = getClassicNextLevel(level);
			break;
		case TABS_TYPE.USER: //user defined 
			gameSelectedInfo = getUserNextLevel(level);
			break;
		}
		
		return gameSelectedInfo;
	}

	
	this.setScore = function(curScore)
	{
		var tableId = gameSelectedInfo.tableId;
		var level = gameSelectedInfo.level;
		return setBoardScore(tableId, level, curScore);
	}
	
	this.getHighScore = function()
	{
		var tableId = gameSelectedInfo.tableId;
		var level = gameSelectedInfo.level;
		
		return getBoardHighScore(tableId, level);
	}

	this.getAliasName = function(tableId, level, type)
	{
		var aliasName = "";
		var tabsId = null, levelOfTabs = null;
		
		switch(type) {
		case TABS_TYPE.NORMAL: //get classic name
			var classicTableId = getClassicInfo().id;
			var classicList = getClassicInfo().list;		
			if(tableId == classicTableId) {
				for(var id =0; id < classicList.length; id++) {
					if(classicList[id] == level) {
						tabsId = tabsIdOfClassic;
						levelOfTabs = id+1;
						break;
					}
				}
			}				
			break;
		case TABS_TYPE.CLASSIC: //get normal name
			for(var id = 0; id < boardList.length; id++) {
				if(boardList[id].tableId == tableId && boardList[id].level == level) {
					//found 
					tabsId = Math.floor( id / TOTAL_ITEM_PER_LEVEL); 
					levelOfTabs = id - tabsId * TOTAL_ITEM_PER_LEVEL + 1;
					break;
				}
			}
			break
		}		
		if(	tabsId != null) {
			var boardInfo = getBoardInfo(tableId, level);
			aliasName = getTitleName(boardInfo.name, tabsId, levelOfTabs);
		}
		return aliasName;	
	}
	
	this.tableLevel2TitleName = function(tableId, levelofTable) 
	{
		var getId = 0; //if not found or out of range
		var tabsId = -1;
		var levelOftabs = -1;

		var classicTableId = getClassicInfo().id;
		var classicList = getClassicInfo().list;
		
		var userTableId = getUserInfo().id;
		
		if(tableId == userTableId) {
			return gTxtMsg.UserLevel + levelofTable;
		}
		
		for(var id = 0; id < boardList.length; id++) {
			if(boardList[id].tableId == tableId && boardList[id].level == levelofTable) {
				//found 
				getId = id;
				tabsId = Math.floor( getId / TOTAL_ITEM_PER_LEVEL); 
				levelOftabs = getId - tabsId * TOTAL_ITEM_PER_LEVEL + 1;
				break;
			}
		}
		//return normal level name
		var aliasName = self.getAliasName(tableId, levelofTable, TABS_TYPE.NORMAL);
		if(aliasName != "") aliasName = " (" + aliasName + ") ";
		return getTitleName('', tabsId, levelOftabs) + aliasName;	
	}
	
	this.maxLevelSize = function()
	{
		return TOTAL_ITEM_PER_LEVEL;
	}
}
