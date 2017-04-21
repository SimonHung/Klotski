//===================================================================
// Klotski (µØ®e¹D) : OK dialog 
//
// 08/21/2013 - add tap for touch machine
//              (no machine for verify it)
//
// 08/12/2013 - msgInfo support position 'c':center, 'l":left
// 
// 07/28/2013 - created by Simon Hung
//===================================================================

function okDialog()
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
	
	var okImageObj;

	var stageCreated = 0;
	var callbackFun;
	
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
				text: msgInfo[i][1],
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
			if(msgInfo[i][0] == 'c') {
				//center
				msgTxt[i].setPosition(startX+rectX/2, offsetY);
				msgTxt[i].setOffset({x: msgTxt[i].getWidth() / 2});
			} else {
				//left
				msgTxt[i].setPosition(startX+LINE_START_OFFSET, offsetY);
			}
			layer.add(msgTxt[i]);
			
			//create url link
			if(typeof urlInfo != 'undefined' && typeof urlInfo[i] != 'undefined') {	
				msgTxt[i].setFontStyle('italic'); 
				msgTxt[i].on('mouseover', function() {
					document.body.style.cursor = 'pointer';
				});
	
				msgTxt[i].on('mouseout', function() {
					document.body.style.cursor = 'default';
				});
	
				msgTxt[i].on('click tap', function() {
					window.open(urlInfo[this.getAttr('myId')]);
				});
			}
		}
	}

	var BUTTON_FILL_COLOR = '#6699FF';
	var BUTTON_STROKE_COLOR = '#FF0066';
	var BUTTON_SHADOW_COLOR = 'gray';
	function drawOkImage()
	{
		var offsetX = rectX-ICON_OFFSET;
		var offsetY = rectY-ICON_OFFSET;
	
		var okCircle = new Kinetic.Circle({
			x: startX+offsetX-okImageObj.width/2,
			y: startY+offsetY+okImageObj.width/2,
			radius: ICON_RADIUS,
			fill: BUTTON_FILL_COLOR,
			stroke: BUTTON_STROKE_COLOR,
			strokeWidth: 5,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 8,
			shadowOffset: 5,
			shadowOpacity: 0.3		
		});	
		
		var okImage = new Kinetic.Image({
			x: startX+offsetX-okImageObj.width,
			y: startY+offsetY,
			image: okImageObj,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 3,
			shadowOffset: 2,
			shadowOpacity: 0.5	
		});		
		
		var okClick = new Kinetic.Circle({
			x: startX+offsetX-okImageObj.width/2,
			y: startY+offsetY+okImageObj.width/2,
			radius: ICON_RADIUS
		});	
		
		okClick.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
	
		okClick.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
	
		okClick.on('click tap', function() {
			destroyStage();
			delete titleTxt;
			delete msgTxt;
			document.body.style.cursor = 'default';
		});
	
		layer.add(okCircle);
		layer.add(okImage);
		layer.add(okClick);
	}
	
	function destroyStage()
	{
		stage.destroy();
	}
	
	function initStagePosition(maxStageX, maxStageY)
	{
		createTitle();
		createMsgTxt();
		
		rectY = totalMsgTxtHeight +  titleTxt.getHeight()*2 + LINE_BORDER * 2;
		rectX = maxMsgTxtWidth + LINE_START_OFFSET * 2 + ICON_OFFSET * 3;
		
		minStageX = rectX + STAGE_SHADOW_OFFSET;
		minStageY = rectY + STAGE_SHADOW_OFFSET;
	
		stageX = maxStageX > minStageX?maxStageX:minStageX;
		stageY = maxStageY > minStageY?maxStageY:minStageY;
	
		startX = (stageX <= minStageX)?0:Math.floor(stageX-minStageX)/2+BACKGROUND_SHIFT/2;
		startY = (stageY <= minStageY)?0:Math.floor(stageY-minStageY)/2+BACKGROUND_SHIFT/2;
	
		document.getElementById(stageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";
	}

	this.init = function(name, images, screenX, screenY, title, msg, url)
	{
		okImageObj = new Image();
		okImageObj = images.ok;
		
		stageName = name;
		titleName = title;
		msgInfo = msg;
		urlInfo = url;
		
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
		drawOkImage();
		layer.draw();
	};
}
