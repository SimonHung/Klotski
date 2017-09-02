//===================================================
// Klotski (華容道) Demo program 
// 
// Using Breadth-first Search to find the solution 
//
// 08/21/2013 - add support 3 option 
//
// 04/26/2013 - Created by Simon Hung
//===================================================

//--------------------------
// external global variable 
//--------------------------
//var G_BOARD_X = 4;
//var G_BOARD_Y = 5;

//-----------
// define
//-----------

var BOARD_PRINT_MAX_BOARD_PER_LINE  = 4;
var BOARD_PRINT_ONE_G_BOARD_X = ((G_BOARD_X+1)*3+G_BOARD_X);
var BOARD_PRINT_G_BOARD_X_SPACE = 1;
var BOARD_PRINT_ONE_BOARD_AND_SPACE = (BOARD_PRINT_ONE_G_BOARD_X+BOARD_PRINT_G_BOARD_X_SPACE);
var BOARD_PRINT_MAX_X = (BOARD_PRINT_ONE_BOARD_AND_SPACE*BOARD_PRINT_MAX_BOARD_PER_LINE+1);
var BOARD_PRINT_MAX_Y = ((G_BOARD_Y+1)*2);

//------------------
// global variable
//------------------
var gBoardBuf = [];
var glineInfo = '';
var gInitBoard;
var gSelectItems;

//                 UP  DN   LF   RT
var arrowFlag = [ '↑', '↓', '←', '→' ];

//                     0    1    2    3	   4    5    6    7
//  var asciiFlag = [ ' ', 'X', 'X', '┘', 'X', '│', '┐', '┤',
//                     8    9   10   11   12   13   14   15
//                    'X', '└', '─', '┴', '┌', '├', '┬', '┼'  ];

//                  00     01     02     03     04     05     06     07     08     09     10     11     12     13     14     15
var blockFlag1 = [ "   ", "XXX", "XXX", "─┘ ", "XXX", " │ ", "─┐ ", "─┤ ", "XXX", " └─", "───", "─┴─", " ┌─", " ├─", "─┬─", "─┼─" ];
var blockFlag2 = [ "   ", "XXX", "XXX", "   ", "XXX", " │ ", " │ ", " │ ", "XXX", "   ", "   ", "   ", " │ ", " │ ", " │ ", " │ " ];

var textareaElemet;

var boardType = [ 
	{name:"經典佈局", initBoard:initBoardFayaa, mode:2, 
		list: [0,1,2,3,4,5,6,7,8,9,10,11,  
		       12,56,   13,14,  
			   15,16,17,18,19,20,21,22,23,  
			   24,122,  25,26,
		       38,39,40,41,42,44, 
			   45,46,47,48,49,50,51,52,
			   54,55,
		       //============================================================
		       //below from http://zh.wikipedia.org/wiki/華容道_(遊戲) 
		       //============================================================
			   57,405,406
		]
	},
	{name:"UNBLOCK IT 2", initBoard:initBoardUnblockIt2, mode:1}, //Unblock Totem (Android & iPhone)
	{name:"WAY OUT", initBoard:initBoardWayOut, mode:1}, //Way out (出路) (Android)
	/*{name:"發芽網", initBoard:initBoardFayaa, mode:1},
	/*{name:"從菜鳥到高手(發芽網)", initBoard:initBoardFayaa, mode:2,
		list: [223, 217, 228, 62, 57, 229, 237, 49, 11, 41, 9, 20, 81, 204, 5, 72, 31, 8, 3, 94]
	},*/	
	{name:"01-19步(發芽網)", initBoard:initBoardFayaa, mode:3, min:1, max:19},
	{name:"20-39步(發芽網)", initBoard:initBoardFayaa, mode:3, min:20, max:39},
	{name:"40-59步(發芽網)", initBoard:initBoardFayaa, mode:3, min:40, max:59},
	{name:"60-79步(發芽網)", initBoard:initBoardFayaa, mode:3, min:60, max:79},
	{name:"80-99步(發芽網)", initBoard:initBoardFayaa, mode:3, min:80, max:99},
	{name:"100-119步(發芽網)", initBoard:initBoardFayaa, mode:3, min:100, max:119},
	{name:"120-200步(發芽網)", initBoard:initBoardFayaa, mode:3, min:119, max:200},
	{name:"非標準(發芽網)", initBoard:initBoardFayaa, mode:4, emptyMin:3, emptyMax:10}
];
 
function setSelectItems(id)
{
	gInitBoard = boardType[id].initBoard;
	gSelectItems = [];
	
	switch(boardType[id].mode) {
	case 1: //select all
		for(var i=0; i < gInitBoard.length; i++){
				gSelectItems[i] = i;;
		}
		break;	
	case 2: //select list
		gSelectItems = boardType[id].list.slice(0);
		break;
	case 3: //select mini range
		var min = boardType[id].min;
		var max = boardType[id].max;
		for(var i=0; i < gInitBoard.length; i++){
			if(typeof gInitBoard[i].mini == "undefined" ) continue;
			if(gInitBoard[i].mini >= min && gInitBoard[i].mini <= max) {
				gSelectItems.push(i);
			}
		}
		gSelectItems.sort(function(a,b) {return gInitBoard[a].mini - gInitBoard[b].mini;});
	
		break;
	case 4: //select empty range
		var emptyMin = boardType[id].emptyMin;
		var emptyMax = boardType[id].emptyMax;
		for(var i=0; i < gInitBoard.length; i++){
			if(typeof gInitBoard[i].empty == "undefined" ) continue;
			if(gInitBoard[i].empty >= emptyMin && gInitBoard[i].empty <= emptyMax) {
				gSelectItems.push(i);
			}
		}
		gSelectItems.sort(function(a,b) {return gInitBoard[a].empty - gInitBoard[b].empty;});
		break;
	default:
		console.log("design error !");
		break;
	}
	var selectElement = document.getElementById('select_item');
	selectElement.options.length = 0;
	selectElement.options[0]=new Option("(000) 顯示全部開局", -1);
	for(var i=0; i < gSelectItems.length; i++){
		var boardIndex = gSelectItems[i];
		selectElement.options[i+1]=new Option("(" + String("00" + (i+1)).slice(-3) + ") " + gInitBoard[boardIndex].name + ((typeof gInitBoard[boardIndex].mini == 'undefined')?'':'-' + gInitBoard[boardIndex].mini) , i);
	}
	selectElement.options[0].selected = true;
	clearText();
	main();
	//remarked: set focus will cause web jump to focus area, 8/24/2013
	//selectElement.focus();
}

function initKlotski()
{
	textareaElemet = document.getElementById('text_output');

	var typeElement = document.getElementById('board_type');
	for(var i=0; i < boardType.length; i++){
		typeElement.options[i]=new Option(boardType[i].name, i);
    }
	//initial global variable
	for(var i = 0; i <= G_BOARD_Y*2 ; i++) gBoardBuf[i] = [];

	typeElement.options[0].selected = true;
	setSelectItems(0);
	
}

//=============================================================================
// BEGIN for text message function
//=============================================================================

//---------------------
// clear text message
//---------------------
function clearText()
{
	textareaElemet.value = "";
}

function displayText(textValue)
{
	textareaElemet.value += textValue;
}

//=============================================================================
// BEGIN for display board
//=============================================================================

//----------------------------------------
//Direct draw the board from ascii value
//----------------------------------------
function boardPrint(board)
{
	var tmpChar;
	var tmpBoard;
	var boardLine = [];
	
	for(var y = 0; y < G_BOARD_Y; y++) {
		for(var x = 0; x < G_BOARD_X; x++) {
			boardLine[x] = board[x+y*G_BOARD_X];
		}
		displayText(boardLine.join("") + "\n");
	}
}

//------------------------------------------- 
// convert integer board key to board value 
// with same char value of same block style
// for compare board value
//------------------------------------------- 
function key2Board1(curKey)
{
	var board = [];
	var blockIndex;
	                 //0   1   2   3   4
	var blockValue = [' ','N','B','H','A' ];
	var primeBlockPos = curKey & 0x0F; //position of prime minister block (曹操), 4 bits
	
	//set prime minister block
	board[primeBlockPos] = blockValue[4];
	board[primeBlockPos+G_BOARD_X] = blockValue[4];
	board[primeBlockPos+1] = blockValue[4];
	board[primeBlockPos+1+G_BOARD_X] = blockValue[4];
	
	curKey =  Math.floor(curKey / 16); //shift >> 4 bits
	
	for(var curPos = (G_BOARD_Y * G_BOARD_X)-1; curPos >= 0; curPos--) {
		if(board[curPos] == blockValue[4]) continue;

		blockIndex = curKey & 0x03; //2 bits
		curKey >>= 2; //shift >> 2 bits, now the value <= 32 bits can use bitwise operator
		board[curPos] = blockValue[blockIndex];
	}
	
	return board;
}

//-------------------------------------------------
// convert integer board key to board value 
// with different char value of same block style
// for draw board 
//-------------------------------------------------
function key2Board2(curKey)
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
			console.log("Error: design error !");	
			break loop;
		}	
	}
	return board;
}

//-----------------------------------------------------------------
// get board[x,y] ascii value , if out of range return null
//-----------------------------------------------------------------
function getBlockValue(board, x, y)
{
	return (x>=0 && x < G_BOARD_X && y >= 0 && y < G_BOARD_Y ? 
	        board[x+ G_BOARD_X *y]:null);
}

//----------------------------------------------
// Draw the board to buffer for output all step 
//----------------------------------------------
function boardPrint2Buf(board, moveBlock)
{
	var curY= 0;
	var flagValue =[];

	for(var y = -1; y < G_BOARD_Y ; y++) {
		for(var x = -1; x < G_BOARD_X; x++) {
			flagValue[x+1] = 0;
			if(getBlockValue(board,x,y) != getBlockValue(board,x+1,y)) flagValue[x+1] += 1;
			if(getBlockValue(board,x,y) != getBlockValue(board,x,y+1)) flagValue[x+1] += 2;
			if(getBlockValue(board,x,y+1) != getBlockValue(board,x+1,y+1)) flagValue[x+1] += 4;
			if(getBlockValue(board,x+1,y) != getBlockValue(board,x+1,y+1)) flagValue[x+1] += 8;
		}

		for(var x = -1; x < G_BOARD_X; x++) {
			gBoardBuf[curY] += blockFlag1[flagValue[x+1]];
			
			if(x < G_BOARD_X-1) {
				if(flagValue[x+1] & 8) gBoardBuf[curY] += '─';
				else gBoardBuf[curY] += ' ';
			}
		}
		for(var i=0; i < BOARD_PRINT_G_BOARD_X_SPACE; i++) gBoardBuf[curY] += ' ';
			
		curY++;
		for(x = -1; x < G_BOARD_X; x++) {
			gBoardBuf[curY] += blockFlag2[flagValue[x+1]];
			if(x < G_BOARD_X-1) {
				if(getBlockValue(board,x+1,y+1) == '@') //empty
					gBoardBuf[curY] += 'E';
				else {
					if(moveBlock != null && moveBlock.x == x+1 && moveBlock.y == y+1) 
						gBoardBuf[curY] += arrowFlag[moveBlock.arrow];
					else	
						gBoardBuf[curY] += ' ';
        }
			}
		}
		for(i=0; i < BOARD_PRINT_G_BOARD_X_SPACE; i++) 
			gBoardBuf[curY] += ' ';

		curY++;
	}
}

//---------------------------
// get string length in byte
//---------------------------
function getLengthInBytes(str) 
{
	var b = str.match(/[^\x00-\xff]/g);
	
	var len =  (str.length + (!b ? 0: b.length/2)); 
	                                       // ^==== ugly value 
	//-----------------------------------------------------------------------
	// TODO: how textarea with fixed width?
	// ==> width of one chinese character = width of two english characters
	//-----------------------------------------------------------------------
	
	return len;
}

//----------------------- 
// Draw all steps result  
//----------------------- 
function boardKeyPrintStepResult(board, msgInfo, curStep, moveBlock, isLast)
{
	//var board;
	var startPos = curStep % BOARD_PRINT_MAX_BOARD_PER_LINE;
	var i, j, printSpace;
	
	boardPrint2Buf(board, moveBlock);
	
	//printSpace = BOARD_PRINT_ONE_BOARD_AND_SPACE - msgInfo.length;
	printSpace = BOARD_PRINT_ONE_BOARD_AND_SPACE - getLengthInBytes(msgInfo);
	glineInfo += msgInfo;
	for(j = 0; j < printSpace; j++) glineInfo += ' ';

	if(startPos >= BOARD_PRINT_MAX_BOARD_PER_LINE-1 || isLast) {
		displayText(glineInfo + "\n");
		for(i = 0; i < G_BOARD_Y*2+1;i++) {
			displayText(gBoardBuf[i]+"\n");
			gBoardBuf[i] = '';
			glineInfo = '';
		}
		displayText(""+"\n");
	}
}

//---------------------------------------
// compare source:board1, target:board2
// to find the moved block
//---------------------------------------
function getBoardDiff(board1, board2)
{
	var srcPos, dstPos
	var blockStyle;
	
	srcPos = dstPos = blockStyle = null;
	
	for(var i = 0; i < board1.length; i++) {
		if(board1[i] != board2[i]) {
			if(board1[i] == ' ') {
				//move block to here
				if(dstPos == null) { //first time
					dstPos = i;
					if(blockStyle == null) blockStyle = board2[i];
				} 
				/*
				if(blockStyle != board2[i]) {
					console.log("Error1: wrong board (" + i + ") !");
					break;
				}*/
			} else {
				// move block out here 
				/*
				if(board2[i] != ' ') {
					console.log("Error2: wrong board (" + i + ") !");
					break;
				}*/
				if(srcPos == null) { //first time
					srcPos = i;
					if(blockStyle == null) blockStyle = board1[i];
				}/*
				if(blockStyle != board1[i]) {
					console.log("Error3: wrong board (" + i + ") !");
					break;
				}*/
			}
		}
	}
	//-----------------------------------------------------------------------------------
	//
    //  (01)  	
	//        0         0                           0         0
	//      ┌───┐     ┌───┐                       ┌───┐     ┌───┐
	//   0  │ E │     │ ↑ │                    0  │   │     │ E │
	//      ├───┤ ==> ├───┤                       ├───┤ ==> ├───┤
	//   1  │   │     │ E │                    1  │ E │     │ ↓ │
	//      └───┘     └───┘                       └───┘     └───┘
	//      srcPos = (0,1) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (0,1)
	//      direction = (0,-1), move up           direction = (0,1) , move down 
	//
	//        0   1         0   1                   0   1         0   1
	//      ┌───┬───┐     ┌───┬───┐               ┌───┬───┐     ┌───┬───┐  
	//   0  │ E │   │ ==> │ ← │ E │            0  │   │ E │ ==> │ E │ → │ 
	//      └───┴───┘     └───┴───┘               └───┴───┘     └───┴───┘ 
	//      srcPos = (1,0), dstPos = (0,0)       srcPos = (0,0), dstPos = (1,0)
	//	    direction = (-1,0), move left        direction = (1,0), move right 
	//
	//  (02)
	//        0         0                           0         0
	//      ┌───┐     ┌───┐                       ┌───┐     ┌───┐
	//   0  │ E │     │ ↑ │                    0  │   │     │ E │
	//      ├───┤     │   │                       ├   ┤     ├───┤
	//   1  │   │ ==> │   │                    1  │   │ ==> │   │ 
	//      ├   ┤     ├───┤                       ├───┤     │   │
	//   2  │   │     │ E │                    2  │ E │     │ ↓ │
	//      └───┘     └───┘                       └───┘     └───┘
	//      srcPos = (0,2) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (0,2)
	//      direction = (0,-2), move up        direction = (0,2) , move down 
	//
	//        0         0                           0         0
	//      ┌───┐     ┌───┐                       ┌───┐     ┌───┐
	//   0  │ E │     │ ↑ │                    0  │   │     │ E │
	//      ├───┤     │   │                       ├   ┤     ├───┤
	//   1  │ E │     │   │                    1  │   │     │ E │
	//      ├───┤     ├───┤                       ├───┤     ├───┤
	//   2  │   │ ==> │ E │                    2  │ E │ ==> │ ↓ │ ==> case1: need to be fixed
	//      ├   ┤     ├───┤                       ├───┤     │   │
	//   3  │   │     │ E │                    3  │ E │     │   │
	//      └───┘     └───┘                       └───┘     └───┘
	//      srcPos = (0,2) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (0,2)
	//      direction = (0,-2), move up           direction = (0,2) , move down 
	//
	//        0   1         0   1                   0   1         0   1
	//      ┌───┬───┐     ┌───┬───┐               ┌───┬───┐     ┌───┬───┐
	//   0  │ E │   │     │ ← │ E │            0  │   │ E │     │ E │ → │
	//      ├─-─┼   ┤ ==> │   ┼─-─┤               ├   ┼─-─┤ ==> ├─-─┼   │ 
	//   1  │ E │   │     │   │ E │            1  │   │ E │     │ E │   │
	//      └───┴───┘     └───┴───┘               └───┴───┘     └───┴───┘
	//      srcPos = (1,0) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (1,0)
	//      direction = (-1,0), move left         direction = (1,0) , move right 
    //	
	//  (03)
	//        0   1         0   1                   0   1         0   1
	//      ┌───┬───┐     ┌───────┐               ┌───┬───┐     ┌───┬───┐
	//   0  │ E │ E │     │ ↑     │            0  │       │     │ E │ E │
	//      ├─-─┼─-─┤ ==> ├─-─┬─-─┤               ├-──┼─-─┤ ==> ├─-─┴─-─┤ 
	//   1  │       │     │ E │ E │            1  │ E │ E │     │ ↓     │
	//      └───┴───┘     └───┴───┘               └───┴───┘     └───────┘
	//      srcPos = (0,1) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (0,1)
	//      direction = (0,-1), move up           direction = (0,1) , move down
	//	
	//        0   1   2         0   1   2           0   1   2         0   1   2
	//      ┌───┬───┬───┐     ┌───────┬───┐       ┌───┬───┬───┐     ┌───┬───────┐
	//   0  │ E │       │ ==> │ ←     │ E │    0  │       │ E │ ==> │ E │     → │
	//      └───┴───┴───┘     └───────┴───┘       └───┴───┴───┘     └───┴───────┘
	//      srcPos = (1,0) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (2,0)
	//      direction = (-1,0), move left         direction = (2,0) , move right 
	//
	//        0   1   2   3         0   1   2   3          0   1   2   3         0   1   2   3
	//      ┌───┬───┬───┬───┐     ┌───────┬───┬───┐      ┌───┬───┬───┬───┐     ┌───┬───┬───────┐
	//   0  │ E │ E │       │ ==> │ ←     │ E │ E │   0  │       │ E │ E │ ==> │ E │ E │ →     │
	//      └───┴───┴───┴───┘     └───────┴───┴───┘      └───┴───┴───┴───┘     └───┴───┴───────┘
	//      srcPos = (2,0) , dstPos = (0,0)              srcPos = (0,0) , dstPos = (2,0) ==> case2: need to be fixed                   
	//      direction = (-2,0) , move left               direction = (2,0) , move right 
	//
	//  (04)
	//
	//        0   1         0   1                   0   1         0   1
	//      ┌───┬───┐     ┌───────┐               ┌───┬───┐     ┌───┬───┐
	//   0  │ E │ E │     │ ↑     │            0  │       │     │ E │ E │
	//      ├─-─┼─-─┤     │       │               ├       ┤     ├─-─┴─-─┤ 
	//   1  │       │ ==> │       │            1  │       │ ==> │       │
	//      ├       ┤     ├─-─┬─-─┤               ├-──┼─-─┤     │       │ 
	//   2  │       │     │ E │ E │            1  │ E │ E │     │ ↓     │
	//      └───┴───┘     └───┴───┘               └───┴───┘     └───────┘
	//      srcPos = (0,1) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (0,2)
	//      direction = (0,-1), move up           direction = (0,1) , move down
	//
	//        0   1   2         0   1   2          0   1   2          0   1   2    
	//      ┌───┬───┬───┐     ┌───────┬───┐       ┌───┬───┬───┐     ┌───┬───────┐  
	//   0  │ E │       │     │ ←     │ E │    0  │       │ E │     │ E │     → │  
	//      ├─-─┼       ┤ ==> │       ├─-─┤       ├       ┼─-─┤ ==> ├─-─┤       │   
	//   2  │ E │       │     │       │ E │    2  │       │ E │     │ E │       │  
	//      └───┴───┴───┘     └───────┴───┘       └───┴───┴───┘     └───┴───────┘  
	//      srcPos = (1,0) , dstPos = (0,0)       srcPos = (0,0) , dstPos = (2,0)
	//      direction = (-1,0), move left         direction = (2,0) , move right
	//
	//-------------------------------------------------------------------------------------------
	
	var srcX = srcPos % G_BOARD_X, srcY = (srcPos - srcX) / G_BOARD_X;
	var dstX = dstPos % G_BOARD_X, dstY = (dstPos - dstX) / G_BOARD_X;
	var directX = dstX - srcX, directY = dstY - srcY;
	var arrowValue;
	//console.log("(", + srcX + "," + srcY + ") -> (", + dstX + "," + dstY + ")" );
	
	//-------------------------------------------------------------
	// special case (skip first step)
	//
	//       0   1         0   1       0   1         0   1             
	//     ┌───┐         ┌───┐           ┌───┐         ┌───┐    
	//  0  │ E │         │   │           │ E │         │   │    
	//     ├───┼───┐ ==> ├───┼───┐   ┌───┼───┤ ==> ┌───┼───┤    
	//  1  │ E │   │     │ E │ E │   │   │ E │     │ E │ E │    
	//     └───┴───┘     └───┴───┘   └───┴───┘     └───┴───┘    
	//   
	//     left then up ==> up       right then up ==> up 
	//
	//       0   1         0   1       0   1         0   1  
	//     ┌───┬───┐     ┌───┬───┐   ┌───┬───┐     ┌───┬───┐
	//  0  │ E │   │     │ E │ E │   │   │ E │     │ E │ E │
	//     ├───┼───┘ ==> ├───┼───┘   └───┼───┤ ==> └───┼───┤
	//  1  │ E │         │   │           │ E │         │   │
	//     └───┘         └───┘           └───┘         └───┘
	//
	//     left then down ==> down   right then down ==> down
	//
	//       0   1         0   1      0   1         0   1      
	//     ┌───┬───┐     ┌───┬───┐      ┌───┐         ┌───┐              
	//  0  │ E │ E │     │   │ E │      │   │         │ E │         
	//     └───┼───┤ ==> └───┼───┤  ┌───┼───┤ ==> ┌───┼───┤              
	//  1      │   │         │ E │  │ E │ E │     │   │ E │       
	//         └───┘         └───┘  └───┴───┘     └───┴───┘       
	//    
	//     up then left ==> left    down then left ==> left    
	//   
	//        0   1         0   1     0   1         0   1     
	//     ┌───┬───┐     ┌───┬───┐  ┌───┐         ┌───┐       
	//  0  │ E │ E │     │ E │   │  │   │         │ E │       
	//     ├───┼───┘ ==> ├───┼───┘  ├───┼───┐ ==> ├───┼───┐   
	//  1  │   │         │ E │      │ E │ E │     │ E │   │   
	//     └───┘         └───┘      └───┴───┘     └───┴───┘   
	//     
	//     up then right ==> right  down then right ==> right 
	//--------------------------------------------------------------
	if(directX && directY) {
		if(directX > 0) { //move right 
			//srcPos+(1,0) = empty, means first step is moving right (skip it)
			if(board1[(srcX+1)+srcY*G_BOARD_X] == ' ') directX = 0;
			else directY = 0;
		} else { //move left
			//srcPos+(-1,0) = empty, means first step is moving left (skip it)
			if(board1[(srcX-1)+srcY*G_BOARD_X] == ' ') directX = 0;
			else directY = 0;
		}
	}
	
	//----------------------------------
	// case 1: dst pos need to be fixed
	//----------------------------------
 	//    board1    board2
	//      0         0         0
	//    ┌───┐     ┌───┐     ┌───┐            ┌───┐
	// 0  │   │     │ E │     │ E │            │ E │
	//    ├   ┤     ├───┤     ├───┤            ├───┤
	// 1  │   │     │ E │     │ E │            │ E │
	//    ├───┤     ├───┤     ├───┤   dstY+1   ├───┤
	// 2  │ E │ ==> │   │ ==> │ ↓ │   ======>  │   │ 
	//    ├───┤     ├   ┤     │   │            │   │
	// 3  │ E │     │   │     │   │            │ ↓ │
	//    └───┘     └───┘     └───┘            └───┘
	//    srcPos = (0,0) , dstPos = (0,2)     dstY+1 ==> dstPos = (0,3)
	//    direct = (0,2) , move down 
	//
	//  directY = 2, blockStyle = 'I', board2(0,2-1) = 'E'  ==> dstY+1  
	//
	if(directY > 1 && blockStyle == 'I' && board2[dstX+(dstY-1)*G_BOARD_X] == ' ') {
		dstY++;
	}
	
	//----------------------------------
	// case 2: dst pos need to be fixed
	//----------------------------------
	//     board1                board2
	//      0   1   2   3         0   1   2   3         0   1   2   3         0   1   2   3
	//    ┌───┬───┬───┬───┐     ┌───┬───┬───┬───┐     ┌───┬───┬───────┐ dstX+1 ┌───┬───┬───────┐
	// 0  │       │ E │ E │ ==> │ E │ E │       │ ==> │ E │ E │ →     │ =====> │ E │ E │     → │
	//    └───┴───┴───┴───┘     └───┴───┴───┴───┘     └───┴───┴───────┘        └───┴───┴───────┘
	//    srcPos = (0,0) , dstPos = (2,0)                                   dstX+1 ==> dstPos = (3,0)
	//    direct = (2,0) , move right 
	//
	//  directX = 2, blockStyle = 'H', board2(2-1,0) = 'E'  ==> dstX+1
	//
	if(directX > 1 && blockStyle == 'H' && board2[(dstX-1)+dstY*G_BOARD_X] == ' ') {
		dstX++;
	}
	
	//UP:0, DN:1, LT:2, RT:3
	if(directY) arrowValue = directY < 0 ? 0:1;
	if(directX) arrowValue = directX < 0 ? 2:3;
	
	return { x:dstX, y:dstY, arrow: arrowValue };
}

function titleList()
{
	var length = gSelectItems.length;
	var boardIndex;
	
	for(var i = 0; i < length; i++) {
		boardIndex = gSelectItems[i];
		boardKeyPrintStepResult(gInitBoard[boardIndex].board.split(""), 
		                        "(" + String("00" + (i+1)).slice(-3) + ")" + gInitBoard[boardIndex].name,
								i, null, i+1 == length);
	}
}

//---------------
// main function
//---------------
var findAnswer = new klotskiSolution();
function main()
{
	var result;
	var resultMsg = '';
	var id = document.getElementById("select_item").value;
	if(id == '') return;
	
	clearText();
	id = parseInt(id);
	if(id == -1) {
		titleList();
		return;
	}

	var checkButton = document.getElementsByName("moveMode");
	var moveMode = 3;
	for(var i = 0; i < checkButton.length; i++) {
		if(checkButton[i].checked) {
			moveMode = parseInt(checkButton[i].value);
		}
	}
	
	boardIndex = gSelectItems[id];
	boardKeyPrintStepResult(gInitBoard[boardIndex].board.split(""), 
	                        " (" + String("00" + (id+1)).slice(-3) + ")" + gInitBoard[boardIndex].name,
							0, null, 1);
	
	findAnswer.init(gInitBoard[boardIndex].board, moveMode); 
	result = findAnswer.find();
	
	if(result.boardList == null) {
		resultMsg = "No solution, ";
	} else {
		var totalSteps = result.boardList.length-1;
		resultMsg = totalSteps + " steps, ";
	}
	
	displayText( " " + resultMsg + "elapsed time: " + result.elapsedTime*1000 + " ms, " + result.exploreCount + " explored" +"\n");
	//displayText(((typeof gInitBoard[boardIndex].user != 'undefined')? " 提供者: " + gInitBoard[boardIndex].user+",":"")+((typeof gInitBoard[boardIndex].url != 'undefined')? " 取自: " + gInitBoard[boardIndex].url:"") + "\n");
	displayText("\n");
	
	if(result.boardList != null) {
		for(var i = 1; i <= totalSteps; i++) {
			var moveBlock = getBoardDiff(key2Board1(result.boardList[i-1]), key2Board1(result.boardList[i]));
			boardKeyPrintStepResult(key2Board2(result.boardList[i]), " Step: " +  (i), i-1, moveBlock, i == totalSteps);
		}
	}
	//displayText( " " + resultMsg + "elapsed time: " + result.elapsedTime + ", " + result.exploreCount + " explored" +"\n\n");
	displayText(((typeof gInitBoard[boardIndex].user != 'undefined')? " 提供者: " + gInitBoard[boardIndex].user+",":"")+((typeof gInitBoard[boardIndex].url != 'undefined')? " 取自: " + gInitBoard[boardIndex].url:"") + "\n");
	//displayText( " (E: empty block, ↑,↓,←,→: moving direction)\n");
}