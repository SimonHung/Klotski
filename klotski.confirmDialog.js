//==========================================
// Klotski (µØ®e¹D) : Yes/No dialog 
//
// 08/21/2013 - add tap for touch machine
//             (no machine to verify it)
//
// 08/08/2013 - add callback argument
//
// 08/05/2013 - created by Simon Hung
//==========================================

function confirmDialog()
{
	var TITLE_FONT_SIZE = 33, LINE_FONT_SIZE = 27;
	var LINE_BORDER = 10;
	var LINE_SPACE = 15;
	var LINE_START_OFFSET = 20;
	
	var rectX, rectY;
	var BORDER_WIDTH = 15;
	var BORDER_COLOR = '#F63333';
	var DIALOG_COLOR = '#D0D0FF'; 
	var STAGE_SHADOW_OFFSET = 10;
	
	var ICON_OFFSET = 50;
	var ICON_RADIUS = 45;
	
	var BACKGROUND_SHIFT = 10;
	
	var STAR_GOOD_COLOR = '#FDD017';
	var STAR_GOOD_BORDER = 'white';
	var STAR_BAD_COLOR = 'gray';
	var STAR_BAD_BORDER = 'gray';

	var minStageX;
	var minStageY;
	
	var stageName, stageX, stageY;
	var startX, startY;
	var	stage, layer, textLayer;
	
	var yesImageObj, noImageObj;

	var stageCreated = 0;
	var callbackFun, callbackArgs;
	
	function createStageLayer()
	{
		stage = new Kinetic.Stage({
			container: stageName,
			width:  stageX,
			height: stageY
		});
		
		layer = new Kinetic.Layer( );
		textLayer = new Kinetic.Layer( );
		stage.add(layer);
		stage.add(textLayer);
		
	}
	
	function drawBackground()
	{
		var	background = new Kinetic.Rect({
			x: BACKGROUND_SHIFT,
			y: BACKGROUND_SHIFT,
			width:  stageX-BACKGROUND_SHIFT,
			height: stageY-BACKGROUND_SHIFT,
			cornerRadius: 5,
			fill: 'black',
			opacity: 0.6			
		});		
		layer.add(background);
	}
	
	function drawDialog()
	{	
		var	border = new Kinetic.Rect({
			x: startX,
			y: startY,
			width:  rectX,
			height: rectY,
			cornerRadius: 5,
			fill: DIALOG_COLOR,
			stroke: BORDER_COLOR,
			strokeWidth: BORDER_WIDTH,
			shadowColor: 'black',
			shadowBlur: 5,
			shadowOffset: STAGE_SHADOW_OFFSET,
			shadowOpacity: 0.5			
		});		
		layer.add(border);
	}
	
	var titleTxt;
	function createTitle()
	{
		titleTxt = new Kinetic.Text({
			x: 0,
			y: 0,
			text: titleName,
			fontSize: TITLE_FONT_SIZE,
			fontFamily: 'Verdana',
			fill: 'blue',
			
			shadowColor: 'white',
			shadowBlur: 3,
			shadowOffset: 3,
			shadowOpacity: 0.9				
		});
	}
	
	function drawTitle()
	{
		titleTxt.setPosition(startX+rectX/2, startY+titleTxt.getHeight()/2+ LINE_BORDER);
		// to align text in the middle of the screen, we can set the
		// shape offset to the center of the text shape after instantiating it
		titleTxt.setOffset({x: titleTxt.getWidth() / 2});
		layer.add(titleTxt);	
	}
	
	var msgTxt, maxMsgTxtWidth, totalMsgTxtHeigh;
	function createMsgTxt()
	{
		msgTxt = [];
		maxMsgTxtWidth = 0;
		totalMsgTxtHeight = 0;
		
		for(var i = 0; i < msgInfo.length; i++) {
			msgTxt[i] = new Kinetic.Text({
				myId: i, //private 
				x: 0,
				y: 0,
				text: msgInfo[i],
				fontSize: LINE_FONT_SIZE,
				fontFamily: 'Calibri',
				fill: "#0000C4"
			});
			var msgWidth = msgTxt[i].getWidth();
			if( msgWidth > maxMsgTxtWidth) maxMsgTxtWidth = msgWidth;
			totalMsgTxtHeight += (msgTxt[i].getHeight() + LINE_SPACE);
		}
	}
	
	function drawInfo()
	{
		for(var i = 0; i < msgInfo.length; i++) {
			var offsetY = (startY+titleTxt.getHeight()*3/2) + LINE_BORDER + LINE_SPACE * (i+1) + msgTxt[i].getHeight() * i;
			msgTxt[i].setPosition(startX+rectX/2, offsetY);
			msgTxt[i].setOffset({x: msgTxt[i].getWidth() / 2});
			layer.add(msgTxt[i]);
		}
	}

	var BUTTON_FILL_COLOR = '#6699FF';
	var BUTTON_STROKE_COLOR = '#FF0066';
	var BUTTON_SHADOW_COLOR = 'gray';
	
	function drawYesImage()
	{
		var offsetX = ICON_OFFSET;
		var offsetY = rectY-ICON_OFFSET;
	
		var yesCircle = new Kinetic.Circle({
			x: startX+offsetX+yesImageObj.width/2,
			y: startY+offsetY+yesImageObj.width/2,
			radius: ICON_RADIUS,
			fill: BUTTON_FILL_COLOR,
			stroke: BUTTON_STROKE_COLOR,
			strokeWidth: 5,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 8,
			shadowOffset: 5,
			shadowOpacity: 0.3		
		});	

		var yesImage = new Kinetic.Image({
			x: startX+offsetX,
			y: startY+offsetY,
			image: yesImageObj,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 3,
			shadowOffset: 2,
			shadowOpacity: 0.5	
		});
		
		var yesClick = new Kinetic.Circle({
			x: startX+offsetX+yesImageObj.width/2,
			y: startY+offsetY+yesImageObj.width/2,
			radius: ICON_RADIUS
		});	
	
		yesClick.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
	
		yesClick.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
	
		yesClick.on('click tap', function() {
			destroyStage();
			delete titleTxt;
			delete msgTxt;
			document.body.style.cursor = 'default';
			if(callbackFun != null) callbackFun(1, callbackArgs);
		});
	
		layer.add(yesCircle);
		layer.add(yesImage);
		layer.add(yesClick);
	}
	
	function drawNoImage()
	{
		var offsetX = rectX-ICON_OFFSET;
		var offsetY = rectY-ICON_OFFSET;
	
		var noCircle = new Kinetic.Circle({
			x: startX+offsetX-32,
			y: startY+offsetY+32,
			radius: ICON_RADIUS,
			fill: BUTTON_FILL_COLOR,
			stroke: BUTTON_STROKE_COLOR,
			strokeWidth: 5,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 8,
			shadowOffset: 5,
			shadowOpacity: 0.3		
		});	
	
		var noImage = new Kinetic.Image({
			x: startX+offsetX-noImageObj.width,
			y: startY+offsetY,
			image: noImageObj,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 3,
			shadowOffset: 2,
			shadowOpacity: 0.5	
		});

		var noClick = new Kinetic.Circle({
			x: startX+offsetX-noImageObj.width/2,
			y: startY+offsetY+noImageObj.width/2,
			radius: ICON_RADIUS
		});	
	
		noClick.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
	
		noClick.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
	
		noClick.on('click tap', function() {
			destroyStage();
			delete titleTxt;
			delete msgTxt;
			document.body.style.cursor = 'default';
			if(callbackFun != null) callbackFun(0, callbackArgs);
		});
	
		layer.add(noCircle);
		layer.add(noImage);
		layer.add(noClick);
	}
	
	function destroyStage()
	{
		stage.destroy();
	}
	
	function initStagePosition(maxStageX, maxStageY)
	{
		createTitle();
		createMsgTxt();
		
		rectY = totalMsgTxtHeight +  titleTxt.getHeight()*2 + LINE_BORDER * 2 + ICON_RADIUS *3/2;
		rectX = maxMsgTxtWidth + LINE_START_OFFSET * 2 + ICON_OFFSET * 2;
		
		minStageX = rectX + STAGE_SHADOW_OFFSET;
		minStageY = rectY + STAGE_SHADOW_OFFSET;
	
		stageX = maxStageX > minStageX?maxStageX:minStageX;
		stageY = maxStageY > minStageY?maxStageY:minStageY;
	
		startX = (stageX <= minStageX)?0:Math.floor(stageX-minStageX)/2+BACKGROUND_SHIFT/2;
		startY = (stageY <= minStageY)?0:Math.floor(stageY-minStageY)/2+BACKGROUND_SHIFT/2;
	
		document.getElementById(stageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";
	}

	this.init = function(name, images, screenX, screenY, title, msg, callback, args)
	{
		yesImageObj = new Image();
		noImageObj = new Image();
		yesImageObj = images.yes;
		noImageObj = images.no;
		
		stageName = name;
		titleName = title;
		msgInfo = msg;
		
		if(typeof callback == 'undefined') callbackFun = null;
		else {
			callbackFun = callback;
			callbackArgs = args;
		}
		
		initStagePosition(screenX, screenY);
	};	
	
	this.show = function() 
	{
		createStageLayer();
		drawBackground();
		drawDialog();
		layer.draw();
		drawTitle();
		drawInfo();
		drawYesImage();
		drawNoImage();
		layer.draw();
	};
}