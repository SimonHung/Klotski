//======================================
// Klotski utility
//
// 05/21/2013 - Created by Simon Hung
//=====================================

//=======================
// for debug
//=======================
function debug(msg)
{
	//console.log(msg);
}

function error(msg)
{
	console.log(msg);
}

//=======================================
// BEGIN for set|get|clear localstorage
//=======================================
function setStorage(key, value) 
{
	if(typeof(window.localStorage) != 'undefined'){ 
		window.localStorage.setItem(key,value); 
	} 
}

function getStorage(key) 
{
	var value = null;
	if(typeof(window.localStorage) != 'undefined'){ 
		value = window.localStorage.getItem(key); 
	} 
	return value;
}

function clearStorage(key) 
{
	if(typeof(window.localStorage) != 'undefined'){ 
		window.localStorage.removeItem(key); 
	} 
}

//====================================================== 
// This function for class vSelectBoard & passedDialog
//====================================================== 
function score2StarNumber(score, mini)
{
	var numOfStar = 1;
		
	if(score.moves <= mini * 1.5) {
		//3 star : steps <= 1.5 * mini
		//if(score.hints > 0) numOfStar = 2;
		numOfStar = 3;
	} else if(score.moves <= mini * 3) {
		//2 star : steps <= 3 * mini
		numOfStar = 2;
	} else {
		//1 star :other
		numOfStar = 1;
	}
	
	return numOfStar;	
}