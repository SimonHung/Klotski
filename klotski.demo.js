//==========================================
// Klotski (華容道) : demo mode 
// 
// 07/15/2013 - created by Simon Hung
//==========================================

var firstButton, backButton, playButton, nextButton, lastButton, demoModeButton;

function addDemoModeButton()
{
	var startX = boardStartX;
	var startY = boardStartY + BOARD_HEIGHT + 10;
	var buttonWidth = images.first0.width+0;
	
	firstButton = new Kinetic.Rect({
		x: startX,
		y: startY,
		width: images.first0.width,
		height: images.first0.height,
		fillPatternImage: images.first0
	});

	backButton = new Kinetic.Rect({
		x: startX+buttonWidth,
		y: startY,
		width: images.back0.width,
		height: images.back0.height,
		fillPatternImage: images.back0
	});
	
	playButton = new Kinetic.Rect({
		x: startX+buttonWidth*2,
		y: startY,
		width: images.play0.width,
		height: images.play0.height,
		fillPatternImage: images.play0
	});
	
	nextButton = new Kinetic.Rect({
		x: startX+buttonWidth*3,
		y: startY,
		width: images.next0.width,
		height: images.next0.height,
		fillPatternImage: images.next0
	});

	lastButton = new Kinetic.Rect({
		x: startX+buttonWidth*4,
		y: startY,
		width: images.last0.width,
		height: images.last0.height,
		fillPatternImage: images.last0
	});
	
	demoModeButton = new Kinetic.Rect({
		x: startX+buttonWidth*5,
		y: startY,
		width: images.demoMode1.width,
		height: images.demoMode1.height,
		fillPatternImage: images.demoMode1
	});	
	
	gButtonLayer.add(firstButton);
	gButtonLayer.add(backButton);
	gButtonLayer.add(playButton);
	gButtonLayer.add(nextButton);
	gButtonLayer.add(lastButton);
	gButtonLayer.add(demoModeButton);
	gButtonLayer.draw();
}

function clearDemoModeButton()
{
	firstButton.destroy();
	backButton.destroy();
	playButton.destroy();
	nextButton.destroy();
	lastButton.destroy();
	demoModeButton.destroy();
}

//-----------------------------------------------
// begin for first button (for demo & edit mode)
//-----------------------------------------------
function disableFirstButton()
{
	firstButton.setFillPatternImage(images.first0);
	firstButton.off('mouseover click tap');
	firstButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableFirstButton()
{
	firstButton.setFillPatternImage(images.first1);
	firstButton.off('mouseover mouseout click tap');
	
	firstButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	firstButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	firstButton.on('click tap', function() {
		moveFirst(0);
	});
	gButtonLayer.draw();
}

//----------------------------------------------
// begin for back button (for demo & edit mode)
//----------------------------------------------
function disableBackButton()
{
	backButton.setFillPatternImage(images.back0);
	backButton.off('mouseover click tap');
	backButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableBackButton()
{
	backButton.setFillPatternImage(images.back1);
	backButton.off('mouseover mouseout click tap');
	
	backButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	backButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	backButton.on('click tap', function() {
		if(blockIsMoving) return;
		if(playMode == 3) disableAllBlockDraggable(); //edit mode
		moveBack();
	});
	gButtonLayer.draw();
}

//----------------------------------------------
// begin for play button (for demo & edit mode)
//----------------------------------------------
function enableStartPlayButton()
{
	playButton.setFillPatternImage(images.play0);
	playButton.off('mouseover mouseout click tap');
	
	playButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	playButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	playButton.on('click tap', function() {
		playStart();
	});
	gButtonLayer.draw();
}

function enableStopPlayButton()
{
	playButton.setFillPatternImage(images.play1);
	playButton.off('mouseover mouseout click tap');
	
	playButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	playButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	playButton.on('click tap', function() {
		playStop();
	});
	gButtonLayer.draw();
}

function disablePlayButton()
{
	playButton.setFillPatternImage(images.play2);
	playButton.off('mouseover click tap');
	playButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

//-----------------------------------------------
// begin for next button (for demo & edit mode)
//-----------------------------------------------
function disableNextButton()
{
	nextButton.setFillPatternImage(images.next0);
	nextButton.off('mouseover click tap');
	nextButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableNextButton()
{
	nextButton.setFillPatternImage(images.next1);
	nextButton.off('mouseover mouseout click tap');
	
	nextButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	nextButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	nextButton.on('click tap', function() {
		if(blockIsMoving) return;
		if(playMode == 3) disableAllBlockDraggable(); //edit mode
		moveNext();
	});
	gButtonLayer.draw();
}

//----------------------------------------------
// begin for last button (for demo & edit mode)
//----------------------------------------------
function disableLastButton()
{
	lastButton.setFillPatternImage(images.last0);
	lastButton.off('mouseover click tap');
	lastButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	gButtonLayer.draw();
}

function enableLastButton()
{
	lastButton.setFillPatternImage(images.last1);
	lastButton.off('mouseover mouseout click tap');
	
	lastButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	lastButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	lastButton.on('click tap', function() {
		moveLast();
	});
	gButtonLayer.draw();
}

//----------------------------
// begin for demo mode button
//----------------------------
function disableDemoModeButton()
{
	//demoModeButton.setFillPatternImage(images.demoMode0);
	demoModeButton.off('mouseover mouseout click tap');
	demoModeButton.on('mouseover', function() {
		document.body.style.cursor = 'default';
	});	
	//gButtonLayer.draw();
}

function enableDemoModeButton()
{
	//demoModeButton.setFillPatternImage(images.demoMode1);
	demoModeButton.off('mouseover mouseout click tap');
	
	demoModeButton.on('mouseover', function() {
		document.body.style.cursor = 'pointer';
	});
	
	demoModeButton.on('mouseout', function() {
		document.body.style.cursor = 'default';
	});
	
	demoModeButton.on('click tap', function() {
		restorePlayModeInfo();
		setPlayMode(curBoardStep);
		animateTitle(gTxtMsg.GameMode);
	});
	//gButtonLayer.draw();
}

//-----------------------------
// set demo mode button state 
//-----------------------------
function setDemoModeButtonState()
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
	//demo mode 
	enableDemoModeButton();
}

//-------------------------------
// disable all demo mode button
//-------------------------------
function demoModeDisableButton()
{
	disableFirstButton();
	disableBackButton();
	disablePlayButton();
	disableNextButton();
	disableLastButton();
	disableDemoModeButton();
}

//----------------------------------- 
// start play (for demo & edit mode)
//-----------------------------------
function playStart()
{
	var maxMove = stepInfo.length - curBoardStep;
	
	stopPlay = 0;
	if(playMode == 2) demoModeDisableButton(); //demo mode
	if(playMode == 3) {
		editModeDisableButton();
		disableClearButton(); 
		disableSaveButton();
	}
	disableFunctionButton();	
	enableStopPlayButton();
	if(playMode == 3) disableAllBlockDraggable(); //edit mode
	moveNext(maxMove);
}

//----------------------------------------
// get play status (for demo & edit mode)
//----------------------------------------
var stopPlay = 0;
function needStopPlay()
{
	return stopPlay;
}

//----------------------------------
// stop play (for demo & edit mode)
//----------------------------------
function playStop()
{
	stopPlay = 1;
}
