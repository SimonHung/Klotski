//=================================================================
// Klotski (µØ®e¹D) : level passed dialog 
//
// 08/21/2013 - add tap for touch machine 
//
// 08/05/2013 - replace byteLength() with Text.setOffset() 
//              to judgement string center offset
//
// 06/02/2013 - created by Simon Hung
//=================================================================

function passedDialog()
{
	var RECT_X = 400, RECT_Y = 300;
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

	var MIN_STAGE_X = RECT_X + STAGE_SHADOW_OFFSET;
	var MIN_STAGE_Y = RECT_Y + STAGE_SHADOW_OFFSET;
	
	var stageName, stageX, stageY;
	var startX, startY;
	var startXOfStar, startYOfStar;
	var	stage, layer, textLayer;
	
	var returnImageObj, nextImageObj;
	var titleName, boardInfo;
	var oldScoreInfo, newScoreInfo, IsHighScore;
	
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
			width:  RECT_X,
			height: RECT_Y,
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
	
	function drawStar()
	{
		var totalStar = 3;
		var numOfStar = score2StarNumber(newScoreInfo, boardInfo.mini); //external function
		
		var outerRadius = 30, gap = 10;
		var innerRadius = outerRadius/2;
		var starOffset = (RECT_X - (outerRadius*2*totalStar) - gap*(totalStar-1))/2;
		for(var i = 0; i < totalStar; i++) {
			var fillColor = (numOfStar > i)? STAR_GOOD_COLOR : STAR_BAD_COLOR;
			var strokeColor = (numOfStar > i)? STAR_GOOD_BORDER : STAR_BAD_BORDER;
	
			var star = new Kinetic.Star({
				x: startX + starOffset +(outerRadius*2+gap)*i+outerRadius,
				y: startY + 100,
				numPoints: 5,
				innerRadius: innerRadius,
				outerRadius: outerRadius,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: 2,
				
				shadowColor: 'gray',
				shadowBlur: 5,
				shadowOffset: 3,
				shadowOpacity: 0.5					
			});	
		
			layer.add(star);
			 
		}
	}

	function drawTitle()
	{
		var FONT_SIZE = 35;
		
		var titleTxt = new Kinetic.Text({
				x: startX+RECT_X/2,
				y: startY+FONT_SIZE*2/3,
				text: titleName,
				fontSize: FONT_SIZE,
				fontFamily: 'Verdana',
				fill: 'blue',
			
				shadowColor: 'white',
				shadowBlur: 3,
				shadowOffset: 3,
				shadowOpacity: 0.9				
			});
			
		titleTxt.setOffset({x: titleTxt.getWidth() / 2});
		layer.add(titleTxt);		
	}
 
	function drawNewScore() 
	{
		var FONT_SIZE = 30;
		var offsetY = 140;

		var curScore = newScoreInfo.moves + " " + (newScoreInfo.moves<=1?gTxtMsg.Step:gTxtMsg.Steps) + " " +  newScoreInfo.hints + " " + gTxtMsg.Hints;
		var curScoreTxt = new Kinetic.Text({
				x: startX+RECT_X/2,
				y: startY+offsetY,
				text: curScore,
				fontSize: FONT_SIZE,
				fontFamily: 'Calibri',
				fill: "#0000C4"
			});
		curScoreTxt.setOffset({x: curScoreTxt.getWidth() / 2});
		layer.add(curScoreTxt);
	}
	var bestScoreTxt=null;
	function drawBestScore()
	{
		if(oldScoreInfo == null) return;
		
		if(bestScoreTxt) {
			bestScoreTxt.destroy();
			bestScoreTxt = null;
		}
		offsetY = 180;
		var bestScore = "(" + gTxtMsg.BestScore + oldScoreInfo.moves +" " + (oldScoreInfo.moves<=1?gTxtMsg.Step:gTxtMsg.Steps) + " "+ oldScoreInfo.hints + " " + gTxtMsg.Hints + ")";
		var FONT_SIZE = 25;
		bestScoreTxt = new Kinetic.Text({
				x: startX+RECT_X/2,
				y: startY+offsetY,
				text: bestScore,
				fontSize: FONT_SIZE,
				fontFamily: 'Calibri',
				fill: "#0000C4"
			});
		bestScoreTxt.setOffset({x: bestScoreTxt.getWidth() / 2});
		layer.add(bestScoreTxt);		
	} 

	var BUTTON_FILL_COLOR = '#6699FF';
	var BUTTON_STROKE_COLOR = '#FF0066';
	var BUTTON_SHADOW_COLOR = 'gray';
	var returnButton, nextButton;
	
	function drawReturnImage()
	{
		var offsetX = ICON_OFFSET;
		var offsetY = RECT_Y - ICON_OFFSET;
	
		var returnCircle = new Kinetic.Circle({
			x: startX+offsetX+returnImageObj.width/2,
			y: startY+offsetY+returnImageObj.height/2,
			radius: ICON_RADIUS,
			fill: BUTTON_FILL_COLOR,
			stroke: BUTTON_STROKE_COLOR,
			strokeWidth: 5,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 8,
			shadowOffset: 5,
			shadowOpacity: 0.3
		});	

		var returnBox = new Kinetic.Image({
			x: startX+offsetX-3,
			y: startY+offsetY-2,
			image: returnImageObj,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 3,
			shadowOffset: 2,
			shadowOpacity: 0.5	
		});
		
		returnButton = new Kinetic.Circle({
			x: startX+offsetX+returnImageObj.width/2,
			y: startY+offsetY+returnImageObj.height/2,
			radius: ICON_RADIUS
		});	

		returnButton.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
	
		returnButton.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
	
		returnButton.on('click tap', function() {
			destroyStage();
			document.body.style.cursor = 'default';
			if(callbackFun != null) callbackFun(0);
		});	

		layer.add(returnCircle);	
		layer.add(returnBox);
		layer.add(returnButton);		
	}
	
	function drawNextImage()
	{
		var offsetX = RECT_X-ICON_OFFSET;
		var offsetY = RECT_Y - ICON_OFFSET;
	
		var nextCircle = new Kinetic.Circle({
			x: startX+offsetX-nextImageObj.width/2,
			y: startY+offsetY+nextImageObj.height/2,
			radius: ICON_RADIUS,
			fill: BUTTON_FILL_COLOR,
			stroke: BUTTON_STROKE_COLOR,
			strokeWidth: 5,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 8,
			shadowOffset: 5,
			shadowOpacity: 0.3		
		});	
	
		var nextBox = new Kinetic.Image({
			x: startX+offsetX-nextImageObj.width,
			y: startY+offsetY,
			image: nextImageObj,
			
			shadowColor: BUTTON_SHADOW_COLOR,
			shadowBlur: 3,
			shadowOffset: 2,
			shadowOpacity: 0.5		
		});
	
		nextButton = new Kinetic.Circle({
			x: startX+offsetX-nextImageObj.width/2,
			y: startY+offsetY+nextImageObj.height/2,
			radius: ICON_RADIUS
		});	

		nextButton.on('mouseover', function() {
			document.body.style.cursor = 'pointer';
		});
	
		nextButton.on('mouseout', function() {
			document.body.style.cursor = 'default';
		});
	
		nextButton.on('click tap', function() {
			destroyStage();
			document.body.style.cursor = 'default';
			if(callbackFun != null) callbackFun(1);
		});

		layer.add(nextCircle);
		layer.add(nextBox);
		layer.add(nextButton);		
	}
	
	function destroyStage()
	{
		stage.destroy();
	}
	
	function initStagePosition(maxStageX, maxStageY)
	{
		stageX = maxStageX > MIN_STAGE_X?maxStageX:MIN_STAGE_X;
		stageY = maxStageY > MIN_STAGE_Y?maxStageY:MIN_STAGE_Y;
	
		startX = (stageX <= MIN_STAGE_X)?0:Math.floor(stageX-MIN_STAGE_X)/2+BACKGROUND_SHIFT/2;
		startY = (stageY <= MIN_STAGE_Y)?0:Math.floor(stageY-MIN_STAGE_Y)/2+BACKGROUND_SHIFT/2;
	
		startXOfStar = startX + 50;
		startYOfStar = startY + 100;	
		document.getElementById(stageName).style.cssText = "top:" + 0 + "px; left:" + 0 + "px; position: absolute;";
	}
	
	function updateBestScore()
	{
		if(oldScoreInfo	!= null) audioPlaySuccess();
		oldScoreInfo = newScoreInfo;
		drawBestScore();
		drawReturnImage();
		drawNextImage();
		layer.draw();
	}
	
	function animateHighScore()
	{
		var highScoreNode = new Kinetic.Image({
			x: startX+RECT_X - highScoreImageObj.width+32,
			y: startY+115,
			opacity: 0,
			scale: 0.8,
			image: highScoreImageObj
			//scale: { x: 1, y: 1 }
		});
		layer.add(highScoreNode);
		layer.draw();
		audioPlayStamp(); //external function

		var tweenObj = new Kinetic.Tween({
			node: highScoreNode, 
			duration: 0.3,
			opacity: 0.7,
			onFinish: function() {
				//update best score after stamp
				setTimeout(	function(){updateBestScore();}, 800 );
			}
		});	
		tweenObj.play();
	}
	
	this.init = function(name, images, screenX, screenY, title, board, oldScore, newScore, isHigh, callback)
	{
		returnImageObj = images.replayLevel;
		nextImageObj = images.nextLevel;
		highScoreImageObj = images.highScore;

		stageName = name;
		titleName = title;
		boardInfo = board;
		oldScoreInfo = oldScore;
		newScoreInfo = newScore;
		isHighScore = isHigh;
		
		if(typeof oldScoreInfo == 'undefined') oldScoreInfo = null;
		
		if(typeof callback == 'undefined') callbackFun = null;
		else callbackFun = callback;
		
		initStagePosition(screenX, screenY);
	};	
	
	this.show = function() 
	{
		createStageLayer();
		drawBackground();
		drawDialog();
		drawTitle();
		drawStar();
		drawNewScore();
		drawBestScore();
		layer.draw();
		
		if(isHighScore) {
			if(oldScoreInfo == null) {
				//update best score only
				updateBestScore();
			} else {
				//stamp & update best score
				setTimeout(function(){animateHighScore();}, 300 );
			}
		} else {
			drawReturnImage();
			drawNextImage();
			layer.draw();
		}
	};
}
