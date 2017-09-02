//=======================================
// Klotski share variable & function
//=======================================

//---------------------------------------------------------------------------------------
//  0----------> X        
//  |"HAAI"
//  |"HAAI"
//  |"JBBK"
//  |"JNOK"
//  |"P@@Q"
//  V
//  Y
//
// normal block = A..[
// empty  block = @
//---------------------------------------------------------------------------------------
//Block Shapes:
//    @, AA BB CC DD EE FF GG  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  [
//       AA                    H  I  J  K  L  M
//---------------------------------------------------------------------------------------

var G_BOARD_X = 4;
var G_BOARD_Y = 5;
var G_BOARD_SIZE = G_BOARD_X*G_BOARD_Y; //board size

var G_VOID_CHAR  = '?';
var G_EMPTY_CHAR = '@';

var G_EMPTY_BLOCK = 1; //gBlockBelongTo index 1 ('@')
var G_GOAL_BLOCK  = 2; //gBlockBelongTo index 2 ('A')
var G_GOAL_STYLE  = 4; //index of gBlockStyle for goal block
  
//convert char to index of block style
//ASCII char   :       ?, @,  A,  B,C,D,E,F,G,  H,I,J,K,L,M,  N,O,P,Q,R,S,T,U,V,W,X,Y,Z,[
var gBlockBelongTo = [-1, 0,  4,  2,2,2,2,2,2,  3,3,3,3,3,3,  1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var gBlockStyle = [[1,1],[1,1],[2,1],[1,2],[2,2]]; //block style:[x size, y size] 
var gGoalPos = [[1, 4], [2,4]]; //goal position: [x,y]

                       //0   1   2   3   4
var gBlockStartStyle = ['@','N','B','H','A' ];

//--------------------------------------------------------------------
// board string convert to board array with gBlockBelongTo index value
//--------------------------------------------------------------------
function gEasyBoard(boardString)
{
	var boardArray  = boardString.split("");

	for(var i = 0; i < boardArray.length; i++) {
		boardArray[i] = boardArray[i].charCodeAt(0) - G_VOID_CHAR.charCodeAt(0);
	}
	return boardArray;	
}

//---------------------------------------------------------
// transfer the board to 64 bits int
// one char convert to 2 bits
//
// javascript: They are 64-bit floating point values, 
//             the largest exact integral value is 2 ^ 53
//             but bitwise/shifts only operate on int32
//
// add support key for left-right mirror, 09/02/2017
//---------------------------------------------------------
function gBoard2Key(board, mirror=0)
{
	var boardKey = 0;
	var primeBlockPos = -1;
	var invBase = 0;
	
	if(mirror) invBase = -(G_BOARD_X + 1); //key for mirror board

	for(var i = 0; i < board.length; i++) {
		//---------------------------------------------------------------------
		// Javascript only support 53 bits integer	(64 bits floating)
		// for save space, one cell use 2 bits 
		// and only keep the position of prime minister block (曹操)
		//---------------------------------------------------------------------
		// maxmum length = (4 * 5 - 4) * 2 + 4  
		//               = 32 + 4 = 36 bits
		//
		// 4 * 5 : max cell
		// - 4   : prime minister block size
		// * 2   : one cell use 2 bits 
		// + 4   : prime minister block position use 4 bits
		//---------------------------------------------------------------------
		if(!(i % G_BOARD_X)) invBase += G_BOARD_X*2; //key for mirror board
		if((blockValue = board[mirror?invBase-i:i]) == G_GOAL_BLOCK){
			//skip prime minister block (曹操), only keep position  
			if(primeBlockPos < 0) primeBlockPos = i;
			continue;
		}
		boardKey = 	(boardKey << 2) + gBlockBelongTo[blockValue];  //bitwise/shifts must <= 32 bits)
	}
	boardKey = (boardKey * 16) + primeBlockPos; //shift 4 bits (0x00-0x0E) 
	return boardKey;
}

//----------------------------------------------------
// convert row major 2 diamonion to 1 diamonion index
//----------------------------------------------------
function gRowMajorToIndex(x, y)
{
	return x + G_BOARD_X * y;
}

//---------------------------------------
// board verify 
//
// return emptyCount for maximum deep check
//---------------------------------------
function gBlockCheck(boardString)
{
	var tmpBoard = boardString.split(""); //string to array
	var indexCheck = [];
	var rc = 0;
	var emptyCount = 0;
	
	//(1) board size check
	if(tmpBoard.length != G_BOARD_SIZE) {
		console.log("Wrong board size !");
		return {rc:1 };
	}
	
	//(2) check block style and don't duplicate
	var blockValue;
	var blockIndex;
	var sizeX, sizeY;
	loop:
	for(var y=0; y < G_BOARD_Y; y++) {
		for(var x=0; x < G_BOARD_X; x++) {
			if((blockValue = tmpBoard[gRowMajorToIndex(x,y)]) == '0') continue; //already verified
			
			blockIndex = blockValue.charCodeAt(0) - G_VOID_CHAR.charCodeAt(0);
			
			sizeX = gBlockStyle[gBlockBelongTo[blockIndex]][0]; //block size X
			sizeY = gBlockStyle[gBlockBelongTo[blockIndex]][1]; //block size Y
			
			for(var blockY = 0; blockY < sizeY; blockY++) {
				if(blockY+y >= G_BOARD_Y) {rc = 1;break loop;}
					
				for(var blockX = 0; blockX < sizeX; blockX++) {
					if(blockX+x >= G_BOARD_X) {rc = 1;break loop;}
						
					var index = gRowMajorToIndex(blockX+x,blockY+y);
					if(tmpBoard[index] != blockValue) {rc = 1;break loop;}
					tmpBoard[index] = '0'; //verified 
				}
			}
			if(blockValue == G_EMPTY_CHAR) {
				++emptyCount;
			} else if(typeof indexCheck[blockIndex] != 'undefined') {
				rc = 2; 
				break loop; //duplicate
			}
			indexCheck[blockIndex] = 1;
		}
	}
	if(rc==1) console.log("Error: wrong block at [" + x + "," + y + "]");
	if(rc==2) console.log("Error: block duplicate at [" + x + "," + y + "]");
	if(emptyCount > 2) console.log("Warning: too many empty block!");
	return {rc:rc, emptyCount:emptyCount};
}