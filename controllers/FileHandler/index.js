let FileHandler = function() {
};

/**
* Get a graph object from values of csv file.
*
* @param {values} comments content of the csv file to be parse
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the property listOfNodes
*/

FileHandler.prototype.parsingGraph = function(values, separator, update, callback){
	let now = 0;
	let listOfNodes = {};
	console.log('test')
	update(now,"info");

	//Parse the values content and create the graph
	let line = "";
	let lines = [];
	lines = values.split("\n");
	lines.pop();
	for(let i = 0; i < lines.length; i++){
		line = lines[i].split(new RegExp(separator));
		let nodeID = parseInt(line[0]);
		listOfNodes[nodeID] = {
			listOfNeighbours: [],
			value: ''
		};
		for(let j = 1; j < line.length; j++){
			let neighbourID = parseInt(line[j]);
			if(listOfNodes[neighbourID] == undefined)
			listOfNodes[neighbourID] = {
				listOfNeighbours: [],
				value: ''
			};
			listOfNodes[nodeID].listOfNeighbours.push(neighbourID);
		}
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	callback(listOfNodes);
}

/**
* Initiate values of graph's nodes from csv file.
*
* @param {File} comments the csv file to be parse.
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the values of nodes
*/

FileHandler.prototype.parsingValues = function(values, separator, update, callback){
	let now = 0;
	let	lines = values.split("\n");
	lines.pop();
	let listOfNodes = {}
	for(let i = 0; i < lines.length; i++) {
		let line = lines[i].split(new RegExp(separator));
		let nodeID = parseInt(line[0]);
		listOfNodes[nodeID] = parseInt(line[1]);
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	let id = 0;
	callback(listOfNodes);
}


FileHandler = new FileHandler();
export default FileHandler;
