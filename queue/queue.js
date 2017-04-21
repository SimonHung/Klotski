function queue() {
	var head = null;
	var tail = null;
	var size = 0;
	
	this.add = function(data) 
	{
		var node = {
			data: data,
			next: null
		};

		if(tail == null) {
			tail = head = node;
		} else {
			tail.next = node;
			tail = node;	
		}
		size++;
	}
	
	this.remove = function() 
	{
		var data;
		
		if(size <= 0) return null;
		data = head.data;
		
		if( (head = head.next) == null) tail = null;
		size--;
		return data;
	}
	
	this.size = function() { return size; }
	
	this.dump = function() 
	{
		console.log("-- Begin queue dump --------------");
		for(var i = 0, node = head; node ; node = node.next ) {
			console.log( ++i + ")" + node.data);
		}
		console.log("Queue size = " + size);
		console.log("-- After queue dump --------------");
		if(i != size) {
			console.log("queue design error !");
		}	 
	}
	
	this.test = function (data) 
	{
		var node;
	
		node = head;
		while(node) {
			if(node.data == data) {
				console.log("Queue Data duplice :" + data);
				break;
			}
			node = node.next;
		}
	} 	
}