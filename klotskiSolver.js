//=======================================================================================================
// Klotski solver (華容道) - BFS (Breadth-first search)
//
// 08/21/2013 - add support 3 option (default = RIGHT_ANGLE_TURN)
//
// 05/20/2013 - Include "klitski.share.js" for share variable & function
//              and move easyBoard(), board2Key(), blockCheck(), rowMajorToIndex() 
//              to "klitski.share.js" as share function
// 
// 05/02/2013 - Add support more than 2 empty block for "發芽網"  
//
// 04/23/2013 - For improve efficiency
//              (1) embedded the function inBound(), getBlockValue() and isBlock() to code directly
//              (2) Add easyBoard() to convert board char to gBlockBelongTo index
//
// 04/20/2013 - Created by Simon Hung
//              
//=======================================================================================================  

//----------------
// class function
//----------------
function klotskiSolution()
{
	//-----------
	// define
	//-----------
	var MOVE_MODE = { RIGHT_ANGLE_TURN:1, STRAIGHT:2, ONE_CELL_ONLY:3 }; //08/21/2013
	//-----------
	// variable	
	//-----------
	
	var moveMode = MOVE_MODE.RIGHT_ANGLE_TURN; 
	var Q; //queue for breadth first search (external)
	var H; //hash maps for current state to parent state & collision detection (external)

	var initBoard;
	var exploreCount;
	var emptyCount, wrongBoard;

	function reachGoal(curBoard)
	{
		for(var i = 0; i < gGoalPos.length; i++) {
			if(curBoard[gGoalPos[i][0] + gGoalPos[i][1]*G_BOARD_X] != G_GOAL_BLOCK)
			return false;
		}
		return true;
	}	

	//------------------------------------------------------------	
	//add new state to queue and hashmap if does not exist before 
	//------------------------------------------------------------
	function statePropose(curBoard, parentKey)
	{
		var curKey;
		var acceptState;
		var rc;

		curKey = gBoard2Key(curBoard);
		if(H.put(curKey, parentKey) == null) {
			//no any state same as current, add it
			Q.add(curBoard.slice(0));
			return 1; //add new state	
		}
		
		return 0; //state already exist
	}
	
	//------------------------------------------------------
	// how many spaces or block there are (origin excluded)
	//------------------------------------------------------

	function countLengthX(board, posX, posY, directionX, block)
	{
		var step = -1;

		do {
			step++;
			posX +=  directionX;
		} while (posX >= 0 && posX < G_BOARD_X && board[posX+posY*G_BOARD_X] == block);

		return step;
	}

	function countLengthY(board, posX, posY, directionY, block)
	{
		var step = -1;

		do {
			step++;
			posY +=  directionY;
		} while (posY >= 0 && posY < G_BOARD_Y && board[posX+posY*G_BOARD_X] == block);

		return step;
	}
	
	//---------------------------------------------------
	// slide empty-cell up or down by directionY (-1 or 1)
	//
	// directionY: 1: empty down (block up), -1: empty up (block down)
	//
	// return how many new state created
	// 
	//---------------------------------------------------
	function slideVertical(curBoard, parentKey, emptyX, emptyY, directionY, maxMove)
	{
		var blockX, blockY; //block position (x,y)
		var blockValue; //block value
		var styleIndex; //index of block style
		var blockSizeX, blockSizeY; //block style
		
		//Find the block
		blockX = emptyX;
		blockY = emptyY + directionY;
		if(blockY < 0 || blockY >= G_BOARD_Y) return 0; //out of range

		if((blockValue = curBoard[blockX+blockY*G_BOARD_X]) <= G_EMPTY_BLOCK) return 0; //empty
		blockSizeX = gBlockStyle[gBlockBelongTo[blockValue]][0]; //block size X
		blockSizeY = gBlockStyle[gBlockBelongTo[blockValue]][1]; //block size Y
		
		//Begin vertical move ------------------
	
		//----------------------------------------------------------------	
		// block slide up|down: must block size X can slide to empty space
		//
		//   min-X <---- empty space ----> max-X
		// 
		//           +--------------+
		//           |              | 
		//           +--------------+ 
		//     min-X <---- block ---> max-X
		// 
		//   minBlockX must >= minSpaceX && maxBlockX must <= maxSpaceX
		//-----------------------------------------------------------------  
		
		//--------------------------------------------------------------------------
		// find the block min-X and max-X
		// minimum block position X = current block position X - count of left block
		//--------------------------------------------------------------------------
		var minBlockX = blockX - countLengthX(curBoard, blockX, blockY, -1, blockValue); 
		var maxBlockX = minBlockX + blockSizeX - 1;	

		var stateCount = 0;
		var boardCopied = 0;
		var childBoard;
		var curKey;

		do {
			//--------------------------------------------------------------------------
			// calculate the space min-X and max-X of next position
			//--------------------------------------------------------------------------
		
			//minimum space position X = current space position X - count of left space
			var minSpaceX = emptyX - countLengthX(curBoard, emptyX, emptyY, -1, G_EMPTY_BLOCK); 
		
			//maximum space position X = current space position X + count of right space
			var maxSpaceX = emptyX + countLengthX(curBoard, emptyX, emptyY, +1, G_EMPTY_BLOCK);

			//block left-right (X) range must less or equal to left-right (X) space size
			if(minBlockX < minSpaceX || maxBlockX > maxSpaceX) return stateCount;
			
			if(!boardCopied) {
				//first time, copy board array & set curKey
				childBoard = curBoard.slice(0);
				curKey = gBoard2Key(curBoard);
				boardCopied	= 1;			
			}
			
			//slide empty-block up|down
			for(var x = minBlockX ; x <= maxBlockX; x++) {
				childBoard[x+emptyY*G_BOARD_X] = blockValue;
				childBoard[x+(emptyY + blockSizeY * directionY)*G_BOARD_X] = G_EMPTY_BLOCK;
			}
			
			if(parentKey != 0) {
				//-----------------------------------------------
				// parentKey != 0 means move more than one step
				//-----------------------------------------------
				stateCount += statePropose(childBoard, parentKey);
			} else {
				stateCount += statePropose(childBoard, curKey);
				parentKey = curKey;
			}
			
			{	
				//---------------------------------------------------------------------------------
				// only for one size block:
				// for more than one step and move to different direction (vertical to horizontal)
				//
				//
				//   +---+---+      +---+---+
				//   | E   E |      | E | B |
				//   +---+---+  ==> +   +---+ 
				//   | B |          | E | 
				//   +---+          +---+
				//---------------------------------------------------------------------------------
				if(moveMode == MOVE_MODE.RIGHT_ANGLE_TURN && maxMove < emptyCount) {
					if(minSpaceX < minBlockX && minBlockX == emptyX) {
						//slide block left
						stateCount += slideHorizontal(childBoard, parentKey, emptyX-1, emptyY, +1, maxMove+1);
					}
					if(maxSpaceX > maxBlockX && maxBlockX == emptyX) {
						//slide block right
						stateCount += slideHorizontal(childBoard, parentKey, emptyX+1, emptyY, -1, maxMove+1);
					}
				}
			}
			
			emptyY -= directionY;

		} while (moveMode != MOVE_MODE.ONE_CELL_ONLY && emptyY >= 0 && emptyY < G_BOARD_Y && childBoard[emptyX+emptyY*G_BOARD_X] == G_EMPTY_BLOCK);
		
		return stateCount;
	}	

	//---------------------------------------------------
	// slide empty-cell left or right by directionX (-1 or 1)
	//
	// directionX: 1: empty right (block left), -1: empty right (block left)
	//
	// return how many new state created
	//---------------------------------------------------
	function slideHorizontal(curBoard, parentKey, emptyX, emptyY, directionX, maxMove)
	{
		var blockX, blockY; //block position (x,y)
		var blockValue; //block value
		var styleIndex; //index of block style
		var blockSizeX, blockSizeY; //block style
		
		//Find the block
		blockX = emptyX + directionX;
		if(blockX < 0 || blockX >= G_BOARD_X) return 0; //out of range

		blockY = emptyY;

		if((blockValue = curBoard[blockX+blockY*G_BOARD_X]) <= G_EMPTY_BLOCK) return 0; //empty
		blockSizeX = gBlockStyle[gBlockBelongTo[blockValue]][0]; //block size X
		blockSizeY = gBlockStyle[gBlockBelongTo[blockValue]][1]; //block size Y
		
		//Begin horizontal move ------------------
	
		//--------------------------------------------------------------------	
		// block slide left|right: must block size Y can slide to empty space
		//
		//   min-X <---- empty space ----> max-X
		// 
		//    --+-- min-Y
		//      |          +---+   --+-- min-Y
		//      |          |   |     |
		//  empty space    |   |   block
		//      |          |   |	 | 
		//      |          +---+   --+-- max-Y
		//    --+-- max-Y 
		// 
		//   minBlockY must >= minSpaceY && maxBlockY must <= maxSpaceY
		//---------------------------------------------------------------------  
		
		//--------------------------------------------------------------------------
		// find the block min-Y and max-Y
		// minimum block position Y = current block position Y - count of up block
		//--------------------------------------------------------------------------
		var minBlockY = blockY - countLengthY(curBoard, blockX, blockY, -1, blockValue); 
		var maxBlockY = minBlockY + blockSizeY - 1;	
		
		var stateCount = 0;
		var boardCopied = 0;
		var childBoard;
		var curKey;

		do {
			//--------------------------------------------------------------------------
			// calculate the space min-X and max-X of next position
			//--------------------------------------------------------------------------
		
			//minimum space position Y = current space position Y - count of up space
			var minSpaceY = emptyY - countLengthY(curBoard, emptyX, emptyY, -1, G_EMPTY_BLOCK); 
		
			//maximum space position X = current space position X + count of right space
			var maxSpaceY = emptyY + countLengthY(curBoard, emptyX, emptyY, +1, G_EMPTY_BLOCK);

			//block up-down (Y) range must less or equal to up-down (Y) space size
			if(minBlockY < minSpaceY || maxBlockY > maxSpaceY) return stateCount;
			
			if(!boardCopied) {
				//first time, copy board array & set curKey
				childBoard = curBoard.slice(0); 
				curKey = gBoard2Key(curBoard);
				boardCopied = 1;
			}
			
			//slide empty-block left|right
			for(var y = minBlockY ; y <= maxBlockY; y++) {
				childBoard[emptyX+y*G_BOARD_X] = blockValue;
				childBoard[(emptyX + blockSizeX * directionX)+y*G_BOARD_X] = G_EMPTY_BLOCK;
			}
			if(parentKey != 0) {
				//-----------------------------------------------
				// parentKey != 0 means move more than one step
				//-----------------------------------------------
				stateCount += statePropose(childBoard, parentKey);
			} else {
				stateCount += statePropose(childBoard, curKey);
				parentKey = curKey;
			}
			
			{
				//---------------------------------------------------------------------------------
				// only for one size block:
				// for more than one step and move to different direction (horizontal to vertical)
				//
				//
				//       +---+          +---+
				//       | E |          | B |
				//   +---+   +  ==> +---+---+ 
				//   | B | E |      | E   E | 
				//   +---+---+      +---+---+
				//---------------------------------------------------------------------------------
				if(moveMode == MOVE_MODE.RIGHT_ANGLE_TURN && maxMove < emptyCount) {
					if(minSpaceY < minBlockY && minBlockY == emptyY) {
						//slide block up (empty down)
						stateCount += slideVertical(childBoard, parentKey, emptyX, emptyY-1, +1, maxMove+1);
					}
					if(maxSpaceY > maxBlockY && maxBlockY == emptyY) {
						//slide block down (empty up)
						stateCount += slideVertical(childBoard, parentKey, emptyX, emptyY+1, -1, maxMove+1);
					}
				}
			}
			emptyX -= directionX;

		} while (moveMode != MOVE_MODE.ONE_CELL_ONLY && emptyX >= 0 && emptyX < G_BOARD_X && childBoard[emptyX+emptyY*G_BOARD_X] == G_EMPTY_BLOCK);
		
		return stateCount;
	}	

	//--------------------------------------------------------
	// Using recursion to trace the steps from button to top 
	// then put the key value to array 
	//--------------------------------------------------------
	function getAnswerList(curKey, boardList)
	{
		var keyMap = H.get(curKey); //{ key: curKey, value: parentKey }
		
		if(keyMap.value) getAnswerList(keyMap.value, boardList);
		boardList.push(curKey);
	}	
	
	//---------------------------------------------
	// for all empty block to find the next state
	//---------------------------------------------
	function explore(curBoard)
	{
		var stateCount=0; //how many new state created
		var eCount = 0;   //empty count
		
		breakLoop:
		for (var emptyX = 0; emptyX < G_BOARD_X; emptyX++) {
			for (var emptyY = 0; emptyY < G_BOARD_Y; emptyY++) {

				if (curBoard[emptyX+emptyY*G_BOARD_X] != G_EMPTY_BLOCK) continue;
				eCount++;

				//slide empty up ==> block down
				stateCount += slideVertical(curBoard, 0, emptyX, emptyY, -1, 0); //block at Y-1
			
				//slide empty down ==> block up
				stateCount += slideVertical(curBoard, 0, emptyX, emptyY, +1, 0); //block at Y+1

				//slide empty left ==> block right
				stateCount += slideHorizontal(curBoard, 0, emptyX, emptyY, -1, 0); //block at X-1
			
				//slide empty right ==> block left  
				stateCount += slideHorizontal(curBoard, 0, emptyX, emptyY, +1, 0); //block at X+1 
				if(eCount >= emptyCount) break breakLoop;
			}
		}
		return stateCount;
	}	
	
	//---------------------------------
	// public function : initial value 
	//---------------------------------
	this.init = function(boardString, boardMoveMode)
	{
		//boardPrint(boardString.split("")); //debug
		
		var result = gBlockCheck(boardString);
		if(result.rc) { wrongBoard = 1; return;}
		
		emptyCount = result.emptyCount;
		wrongBoard = 0;
		
		if(typeof boardMoveMode != 'undefined') {
			switch(boardMoveMode) {
			case MOVE_MODE.ONE_CELL_ONLY:
				moveMode = MOVE_MODE.ONE_CELL_ONLY;
				break;
			case MOVE_MODE.STRAIGHT:
				moveMode = MOVE_MODE.STRAIGHT;
				break;
			default:
			case MOVE_MODE.RIGHT_ANGLE_TURN:
				moveMode = MOVE_MODE.RIGHT_ANGLE_TURN;
				break;
			};
		}
	
		Q = new queue(); //queue for breadth first search
		H = new hashMap(); //hash maps for current state to parent state & collision detection
		
		initBoard = gEasyBoard(boardString);
	}
	
	//-----------------------------------
	// public function : find the answer 
	//-----------------------------------
	this.find = function()
	{
		var startTime, endTime;
		var boardList = null;
		
		if(wrongBoard) {
			return { exploreCount: 0, elapsedTime: 0, boardList: null};
		}
		startTime = new Date();

		//Put the initial state to BFS queue & hash map
		statePropose(initBoard, 0);
		exploreCount = 1; //initial state
		
		while (Q.size() > 0) {
			var curBoard = Q.remove();
			
			if (reachGoal(curBoard)) {
				boardList = [];
				getAnswerList(gBoard2Key(curBoard), boardList); 
				break; //find a solution
			}
			exploreCount += explore(curBoard); //find next board state
		}
		endTime = new Date();
		
		delete Q;
		delete H;
		return { exploreCount: exploreCount,
			     elapsedTime: (endTime-startTime)/1000,
				 boardList: boardList
		};
	}
}