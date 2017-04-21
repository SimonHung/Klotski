//====================================================
// Klotski (華容道) : generate board list info
//
// include: hashmap.js, klotski.share.js
//          klotski.board.fayaa.js, 
//          klotski.board.unblock2.js, 
//          klotski.board.wayout.js,
//          klotski.board.Mine.js 
//
// 08/21/2013 - add alias name of classic
//
// 08/05/2013 - add support edit mode
//
// 05/21/2013 - Created by Simon Hung
//====================================================

var initBoardUserDefined = []; //for store user-defined board (saved from edit mode)
var userDefinedTableId;

var gBoardTableList = [ 
	[initBoardFayaa, 'Fayaa'], 
	[initBoardUnblockIt2, 'unblock-it-2'], 
	[initBoardWayOut, 'Wayout'],
	[initBoardMine, 'Mine']
];

var gClassicList = { 
	tableId:0, 
	list: [ //level list: the array index = level - 1,
		1,2,3,4,5,6,7,8,9,10,11,12,  
		13,57,   14,15,  
		16,17,18,19,20,21,22,23,24,  
		25,123,  26,27,
		39,40,41,42,43,45, 
		//46,47,48,49,50,51,52,53,
		46,47,50,51,52,53, //remove "48 走投無路": no solution & "49 小燕出巢": same as "22 甕中之鼈"
		
		//-----------------------------------------------------------------------
		//取自:華容道遊戲秘決技巧  
		// http://ewchem.blog.163.com/blog/static/9875667201111151425842/)		
		56, //56:井底之蛙
		//-----------------------------------------------------------------------
		// 取自:利用電腦探討中國古代益智遊戲─「華容道」之解法 
		//	魏仲良、林順喜 (國立臺灣師範大學 資訊教育系)
		// http://www2.kuas.edu.tw/prof/cjh/2003puzzle/subject/08.htm
		406, 407, //406:身先士卒(將擋後路), 407:兵威將廣(調兵遣將)	
		//-----------------------------------------------------------------------
		55 //55: 峰迴路轉 
	]
};

var boardAliasName = [ //08/21/2013 add support alias name of classic
  //[ tableId, level, aliasNameString ] //level: 1 -
	[ 0,  2, "將守角樓，橫刀立馬2" ], //指揮若定
	[ 0,  7, "兵臨城下"], //左右佈兵
	[ 0, 13, "天羅地網"], //插翅難飛
	[ 0, 16, "重重包圍"], //雙將擋路
	[ 0, 19, "兵將聯防"], //層層設防2
	[ 0, 22, "小燕出巢"], //甕中之鼈
	[ 0, 24, "四面埋伏"], //水泄不通
	[ 0, 27, "巧過五關"], //勇闖五關
	[ 0, 43, "橫豎皆將"], //雲遮霧障
	[ 0, 45, "交錯堵道"], //三軍聯防
	[ 0, 46, "前擋後堵"], //前擋後阻
//	[ 0, 49, "甕中之鼈"], //小燕出巢
//	[ 0, 51, "兵將連環"], //夾道藏兵
	[ 0, 53, "四將聯防"], //四將連關
	[ 0,123, "四路皆兵"], //四路進兵2
	[ 0,406, "將擋後路"], //身先士卒
	[ 0,407, "調兵遣將"] //兵威將廣
];	
	
function getClassicInfo()
{
	return { id:gClassicList.tableId, list:gClassicList.list};
}

function getUserInfo()
{
	return { id:userDefinedTableId, size:initBoardUserDefined.length};
}

//=======================================================================================

var	boardHash = new hashMap(); //hash maps

function boardFlip(boardString)
{
	var srcBoard = boardString.split("");
	var flipBoard = [];
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			flipBoard[gRowMajorToIndex(G_BOARD_X-x-1, y)] = srcBoard[gRowMajorToIndex(x, y)];
		}
	}
	return flipBoard.join("");
}

function addClassicAliasName() //8/21/2013
{
	for(var i = 0; i < boardAliasName.length; i++) {
		var tableId =	boardAliasName[i][0];
		var level = boardAliasName[i][1];
		var aliasName = boardAliasName[i][2];
		gBoardTableList[tableId][0][level-1].classicAlias = aliasName;
	}
}

function genBoardList()
{
	var totalBoards = okBoards = wrongBoards = 0;
	var dupBoards;
	var boardList = [];

	addClassicAliasName(); //8/21/2013
	for(var id = 0; id < gBoardTableList.length; id++) {  
		dupBoards = 0;
		for(var boardItem = 0; boardItem < gBoardTableList[id][0].length; boardItem++) {
			var boardInfo = gBoardTableList[id][0][boardItem];
			boardInfo.level = boardItem+1; //add level element to init board, level = 1 - N
			totalBoards++;

			if(addBoardInfo2Hash(boardInfo, id)) {
				if( boardInfo.mini <= 0) { 
					//skip 'no solution' or 'step = 0' 
					wrongBoards++	
				} else {
					boardList[okBoards++] = {tableId:id, level:boardInfo.level};
				}	
			} else {
				dupBoards++;
			}			
		}
		gBoardTableList[id][2] = dupBoards;		
	}
	debug(boardHash.size() + " " + boardHash.avage());
	for(var id = 0; id < gBoardTableList.length; id++) {
		var boardInfo = gBoardTableList[id][0];
		debug(gBoardTableList[id][1] + ": total level = " + boardInfo.length + ", dupicate boards = " + gBoardTableList[id][2] );
		
	}
	debug("Total boards = " + totalBoards + " good boards = " + okBoards + " wrong boards = " + wrongBoards );
	
	boardList.sort(function(a,b) {
		//---------------------------------------------
		// for different browser with stabilize order
		// check order 1. steps, 2. tableId, 3. level
		//---------------------------------------------
		var rc = gBoardTableList[a.tableId][0][a.level-1].mini - gBoardTableList[b.tableId][0][b.level-1].mini;
		if(rc == 0) {
			rc = a.tableId - b.tableId;
			if(rc == 0) rc = a.level - b.level;
		}
		return rc;
	});

	//// add user-defined board after gBoardTableList[] ////////////////
	restoreUserDefinedBoard();
	gBoardTableList.push([initBoardUserDefined, "user-defined"]);
	userDefinedTableId = gBoardTableList.length - 1;
	
	totalBoards = 0;
	dupBoards = 0;
	wrongBoards = 0;
	for(var boardItem = 0; boardItem < initBoardUserDefined.length; boardItem++) {
		var boardInfo = initBoardUserDefined[boardItem];
		boardInfo.level = boardItem+1; //add level element to init board, level = 1 - N
		boardInfo.user = "user";
		totalBoards++;

		if(addBoardInfo2Hash(boardInfo, userDefinedTableId)) {
			//don't need add to normal level list
		} else {
			dupBoards++;
		}			
	}
	debug("----------------------------------------------------------------------");
	debug("User Defined boards = " + totalBoards + ", duplicate boards = " + dupBoards );
	debug("----------------------------------------------------------------------");
	///////////////////////////////////////////////////////////////////
	
	restoreScore(); //restore saved high-score 
	
	return boardList;
}

//-----------------------------------
//return =  1:success, 0: duplicate
//-----------------------------------
function addBoardInfo2Hash(boardInfo, tableId)
{
	var boardKey1 = gBoard2Key(gEasyBoard(boardInfo.board));
	var boardKey2 = gBoard2Key(gEasyBoard(boardFlip(boardInfo.board)));
	var level = boardInfo.level;
	var rc = 1;
	
	if(boardHash.put(boardKey1, {tableId:tableId, level:level, flip:0} ) != null) {
		// already exist
		var exitItem = boardHash.get(boardKey1).value;
		debug("srcItem: level " + level + " of " + gBoardTableList[tableId][1]);
		debug("existItem: level " + exitItem.level + " of " + gBoardTableList[exitItem.tableId][1] + (exitItem.flip?" (flip)":""));
		debug("======> same board!!!");
		debug("");
		rc = 0;
	} else if(boardKey1 != boardKey2 && boardHash.put(boardKey2, {tableId:tableId, level:level, flip:1} ) != null) {
		// already exist with flip board
		var exitItem = boardHash.get(boardKey2).value;
		debug("srcItem: level " + level + " of " + gBoardTableList[tableId][1] + " (flip)");
		debug("existItem: level " + exitItem.level + " of " + gBoardTableList[exitItem.tableId][1] + (exitItem.flip?" (flip)":""));
		debug("======> same board!!!");
		debug("");
		rc = 0;
	}
	return rc;
}

function getBoardInfo(tableId, level)
{
	return gBoardTableList[tableId][0][level-1];
}

//---------------------------------------
// if not found return null
// else return {tableId, level, flip}
//---------------------------------------
function findBoard(boardString)
{
	var boardKey = gBoard2Key(gEasyBoard(boardString));	
	var existNode = boardHash.get(boardKey);

	if(	existNode == null) return null;
	
	return existNode.value;
}

function setBoardScore(tableId, level, curScore)
{
	var highScore = gBoardTableList[tableId][0][level-1].highScore;
	
	//save current score
	//(1) no high score 
	//(2) current moves < high moves 
	//(3) current moves = high moves & current hints < high hints
	if( (typeof highScore == 'undefined') || (curScore.moves < highScore.moves) || 
	    (curScore.moves == highScore.moves && curScore.hints < highScore.hints)) 
	{
		gBoardTableList[tableId][0][level-1].highScore = curScore;
		saveScore();
		return 1;	
	}
	return 0;
}

function getBoardHighScore(tableId, level)
{
	var boardInfo = gBoardTableList[tableId][0][level-1];

/*///// for test localStorage (for debug only) ////////////////////////	
	if(typeof boardInfo.highScore == 'undefined') {
		boardInfo.highScore = { 
			moves: boardInfo.mini + Math.floor(Math.random()*50), 
			hints: Math.floor(Math.random()*5) 
		};
	}
/////////////////////////////////////////////////////////////////////*/
	
	return boardInfo.highScore;
}

//==============================================
// BEGIN function for user-defined (edit mode)
//==============================================

//---------------------------------------------------------
// return playInfo = {table: table-id, level: , board: } 
// for changeSelectedBoard() of vSelectBoard
//---------------------------------------------------------
function addUserDefinedBoard(boardString, mini)
{
	var level = initBoardUserDefined.length+1;
	var boardInfo = {level: level, mini:mini, board: boardString, user:"user"};

	if(addBoardInfo2Hash(boardInfo, userDefinedTableId)) {
		initBoardUserDefined.push(boardInfo);
		saveUserDefinedBoard();
		return { table: userDefinedTableId, 
		         level: level, 
		         board: boardString,
				 type: TABS_TYPE.USER
		       };
	}
	return null; //already exist 
}

function saveUserDefinedBoard()
{
	var boardList = [];
	
	for(var id = 0; id < initBoardUserDefined.length; id++) { 
		boardList[id] = { mini:initBoardUserDefined[id].mini, board: initBoardUserDefined[id].board };
	}
	
	setStorage('klotski_board', JSON.stringify(boardList));
}

function restoreUserDefinedBoard()
{
	if(dataVersion != DATA_VERSION) {
		clearStorage('klotski_board'); //data format changed
		return;
	}
	
	var boardJSON = getStorage('klotski_board');
	if(boardJSON == null) return;
	
	initBoardUserDefined = JSON.parse(boardJSON);
}

function removeUserDefinedBoard(delItem) //delItem: 0 - 
{
	//(1) remove delItem ~ end from hash
	for(var item = delItem; item < initBoardUserDefined.length; item++) {

		var boardString = initBoardUserDefined[item].board
		var boardKey1 = gBoard2Key(gEasyBoard(boardString));	
		var boardKey2 = gBoard2Key(gEasyBoard(boardFlip(boardString)));
	
		//remove from hash
		if(!boardHash.remove(boardKey1)) {
			error("failed to remove user-defined from hash!");
		}
	
		if(boardKey1 != boardKey2){
			//remove flip from hash
			if(!boardHash.remove(boardKey2)) {
				error("failed to remove user-defined (flip) from hash!");
			}
		}
	}		
	//(2) delete delItem from array (shift delItem+1 ~ end to delItem ~ end-1) 
	initBoardUserDefined.splice(delItem, 1);
	
	//(3) add delItem ~ end-1 to hash
	for(var item = delItem; item < initBoardUserDefined.length; item++) {
		var boardInfo = initBoardUserDefined[item];
		boardInfo.level = item+1; //shift level
		
		if(!addBoardInfo2Hash(boardInfo, userDefinedTableId)) { 
			//duplicate why?
			error("failed to shift user-defined item:" + item); 	
		}
	}
	
	//(4) save to localStorage
	saveUserDefinedBoard();
	
	//(5) save score
	saveScore(); //save score again after remove this board
	
}

//==============================================
// BEGIN for save/restore to/from localStorage
//==============================================

//------------------------------
// save score to localstorage
//------------------------------
function saveScore()
{
	var scoreList = {};
	
	for(var tableId = 0; tableId < gBoardTableList.length; tableId++) { 
		var initBoardList = gBoardTableList[tableId][0];
		for(var item = 0; item < initBoardList.length; item++) {
			var highScore = initBoardList[item].highScore;
			if(typeof highScore != 'undefined') {
				var mini = initBoardList[item].mini;
				
				if(tableId == userDefinedTableId) { //for user-defined
					var objKey = "ID" +  String("00" + item).slice(-3); // "ID" + XXX
				} else {
					//objKey = "tableId (2 bytes) + item (3 bytes)" 
					var objKey = String("0" + tableId).slice(-2) +  String("00" + item).slice(-3);
				}
				//(1) max moves = 65535 (16 bits)
				//(2) max hints = 255   (8 bits)
				//(3) scorelist[] = moves 16 bits + hints (8 bits) + mini (8 bits)
				var value = ((highScore.moves & 0xFFFF) << 16) + ((highScore.hints & 0xFF) << 8) + (mini & 0xFF);
				scoreList[objKey] = value.toString(16); //for save space, keep hex value
			}
		}
	}
	
	setStorage('klotski_score', JSON.stringify(scoreList));
}

//----------------------------------
// restore score from localstorage
//----------------------------------
function restoreScore()
{
	if(dataVersion != DATA_VERSION) {
		clearStorage('klotski_score'); //data format changed
		return;
	}
	
	var scoreString = getStorage('klotski_score');
	if(scoreString == null) return;
	
	var scoreList = JSON.parse(scoreString);	
	var maxTableId = gBoardTableList.length;
	var maxItem = [];
	
	for(var tableId = 0; tableId < maxTableId; tableId++) 
		maxItem[tableId] = gBoardTableList[tableId][0].length;
	
	var count = 0;
	for (var objKey in scoreList) {
		var tableId = parseInt(objKey.slice(0,2), 10);
		var item = parseInt(objKey.slice(2), 10);
		
		if(isNaN(tableId)) {
			tableId = userDefinedTableId; //for user defined "ID" + XXX 
		}
		
		if(tableId >= maxTableId || item >= maxItem[tableId]) {
			continue;
		}

		var objValue = parseInt(scoreList[objKey], 16); //hex string to int
		var moves = (objValue >> 16) & 0xFFFF;
		var hints = (objValue >>  8) & 0xFF;
		var mini  =  objValue & 0xFF;

		if(gBoardTableList[tableId][0][item].mini == mini) {
			gBoardTableList[tableId][0][item].highScore = { moves: moves, hints: hints}; 
			count++;
		} else {
		
		}
	}
	debug('klotski_score count = ' + count);
}
