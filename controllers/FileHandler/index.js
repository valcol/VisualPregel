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
	let edges = {};
	let nodes = {};
	let edgesMessages = {};
	update(now,"info");

	//Parse the values content and create the graph
	let error = "";
	let line = "";
	let lines = [];
	lines = values.split("\n");
	for(let i = 0; i < lines.length; i++){
		line = lines[i].split(new RegExp(separator));
		let nodeID = parseInt(line[0]);
		nodes[nodeID] = {};
		nodes[nodeID].value = nodeID;
		nodes[nodeID].initialValue = -1;
		//Test if the line is readable (at least 2 elements) and if the user try to initiate an already initiated Neighborhood
		/*let alreadyDefinedNeighborhood = (listOfNodes[nodeID] != undefined && listOfNodes[nodeID].listOfNeighbours.length != 0);
		if(line.length < 2 || alreadyDefinedNeighborhood ){
			if(i + 1 != lines.length && line.length < 2)
				error = "".concat(error,"\nError at line " + (i+1) + ", there is not enough elements");
			if(alreadyDefinedNeighborhood)
				error = "".concat(error,"\nError at line " + (i+1) + ", you try to recreate a neighborhood of a node");
			now = Math.ceil(100/(lines.length - i));
			continue;
		}*/
		for(let j = 1; j < line.length; j++){
				let nodeIDbis = parseInt(line[j]);
				nodes[nodeIDbis] = {};
				nodes[nodeIDbis].value = nodeIDbis;
				nodes[nodeIDbis].initialValue = -1;
				edges[i] = {from: nodeID, to:nodeIDbis};
				edgesMessages[i] = '';
		}
		now = Math.ceil(100/(lines.length - i));
		update(now,"info");
	}
	update(now,"success");
	callback(edges, nodes, edgesMessages);
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
	let nodes = {}
	for(let i = 0; i < lines.length; i++) {
		let line = lines[i].split(new RegExp(separator));
		let nodeID = parseInt(line[0]);
		nodes[nodeID] = {};
		nodes[nodeID].value = parseInt(line[1]);
		nodes[nodeID].initialValue = -1;
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	let id = 0;
	callback(nodes);
}


FileHandler = new FileHandler();
export default FileHandler;
