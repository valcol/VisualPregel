let FileHandler = function() {
};

FileHandler.prototype.resetInputFile = function(id){
	let form = document.getElementById(id);
	form.value = "";
}

/*
* Get a graph object from csv file representing adjacency matrix of this graph
*
* @param {File} comments the csv file to be parse.
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the property listOfNodes
*/
FileHandler.prototype.fileToGraph = function(file, separator, update, callback){

	FileHandler.resetInputFile("values");
	//If the user choose cancel
	if(file == undefined){
		return;
	}
	let filename = file.name.split(".");
	let fileformat = filename[filename.length-1];

	//If the file is not in csv format
	if(!fileformat.includes("csv")){
		FileHandler.resetInputFile("graph");
		alert("Your file is not csv file");
		return;
	}
	//Parse the file and create the graph
	let reader = new FileReader();
	reader.onload = function(evt){
		FileHandler.parsingGraph(this.result, separator, update, callback);
	}
	reader.readAsText(file);
}

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


FileHandler.prototype.initValuesFromFile = function(file, separator, nodes, update, callback){
	let now = 0;

	//If the user choose cancel
	if(file == undefined){
		update(now,"info");
		return;
	}
	//If there is no initiate graph.
	if(Object.keys(nodes).length == 0){
		update(now,"info");
		alert("There is no graph to initiate.");
		let form = document.getElementById("values");
		form.value = "";
		return;
	}
	let filename = file.name.split(".");
	let fileformat = filename[filename.length-1];
	//If the file is not in csv format
	if(!fileformat.includes("csv")){
		update(now,"danger");
		alert("Your file is not csv file");
		let form = document.getElementById("values");
		form.value = "";
		return;
	}
	//Parse the file and update graph values
	let reader = new FileReader();
	let line = "";
	let lines = [];
	reader.onload = function(evt){
			FileHandler.parsingValues(this.result, separator, nodes, update, callback);
		}
	reader.readAsText(file);
}

FileHandler.prototype.parsingValues = function(values, separator, nodes, update, callback){
	let now = 0;
	let	lines = values.split("\n");
	lines.pop();
	for(let i = 0; i < lines.length; i++){
		let line = lines[i].split(new RegExp(separator));
		let nodeID = parseInt(line[0]);
		nodes[nodeID].value = parseInt(line[1]);
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	callback(nodes);
}


FileHandler = new FileHandler();
export default FileHandler;
