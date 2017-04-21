function hashMap() {
	//define
	var MASK_BIT = 16;
	var DIVIDE_VALUE = Math.pow(2,MASK_BIT); //16bits = 0x10000
	var HASH_COUNT = 4;
	var MASK_VALUE = DIVIDE_VALUE-1; //16 bits = 0xFFFF
	var HMAP_INIT_SIZE = (DIVIDE_VALUE * HASH_COUNT);

	//private variable
	var node = new Array(HMAP_INIT_SIZE);
	var size = 0;

	//private function 
	var hashCode = function(key)
	{
		var i;
		var hashCode = 0 ;
		
		//key = (key^0xdeadbeef) + (key<<5);
		
		for(i = 0 ; i < HASH_COUNT ; i ++) {
			hashCode += (key & MASK_VALUE); //mask 16 bits
			//key >>= MASK_BIT; //javascript: bitwise shift only support 32 bits
			key /= DIVIDE_VALUE;
		}
		return hashCode ;
	}
	
	//if no duplicate return null
	//if duplicate return node of duplicate
	this.put = function (key, value)
	{
		var hashIndex = hashCode(key);
		var curNode = node[hashIndex];

		//check duplicate or not 
		while (curNode) {
			//if duplicate return node of duplicate
			if (key == curNode.key)	return curNode;
			curNode = curNode.next;
		}

		curNode = { key: key, value: value, next: node[hashIndex] };
		node[hashIndex] = curNode;
		size++;	
	
		return null;
	}
	
	//return a object contains { key, value } or null (undefined) if key not found
	this.get = function(key) 
	{
		var  curNode = node[hashCode(key)];

		while (curNode) {
			if (key == curNode.key) {
				break;
			}
			curNode = curNode.next;
		}
		return curNode;
	}

	this.remove = function(key)
	{
		var hashIndex = hashCode(key)
		var curNode = node[hashIndex];
		var preNode = null;

		while (curNode) {
			if (key == curNode.key) {
				break;
			}
			preNode = curNode;
			curNode = curNode.next;
		}
		if(curNode) {
			if(preNode) {
				preNode.next = curNode.next;
			} else {
				node[hashIndex] = curNode.next;
			}
			size--;
		}
		return curNode;
	}
	
	this.size = function() { return size; }
	
	this.maxCollision = function() 
	{
		var maxCollision = 0;
		var curNode;
		var curCollision;

		for(var i = 0; i < HMAP_INIT_SIZE; i++) {
			curNode = node[i];
			curCollision = 0;
			while (curNode) {
				curCollision++;
				curNode = curNode.next;
			}
			if(curCollision > maxCollision) maxCollision = curCollision;
		}
		return maxCollision;
	}

	this.avage = function() 
	{
		var total = 0;
		var usedItem = 0;
		var curNode;
		var curCollision;

		for(var i = 0; i < HMAP_INIT_SIZE; i++) {
			curNode = node[i];
			curCollision = 0;
			while (curNode) {
				curCollision++;
				curNode = curNode.next;
			}
			if(curCollision) usedItem++;
			total += curCollision;
		}
		//if(total != size) console.log("design error ! (" + total + ")");
		return total / usedItem;
	}
	
}
	
