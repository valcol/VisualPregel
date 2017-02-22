let FileHandler = function() {
	this.listOfNodes = {};
	this.separator = ',';
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
FileHandler.prototype.fileToGraph = function(file, update, callback){

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
		FileHandler.parsingGraph(this.result, update, callback);
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

FileHandler.prototype.parsingGraph = function(values, update, callback){
	let now = 0;
	FileHandler.listOfNodes = {};

	update(now,"info");

	//Parse the values content and create the graph
	let line = "";
	let lines = [];
	lines = values.split("\n");
	for(let i = 0; i < lines.length; i++){
		line = lines[i].split(new RegExp(FileHandler.separator));
		let nodeID = parseInt(line[0]);
		FileHandler.listOfNodes[nodeID] = {
			listOfNeighbours: [],
			value: ''
		};
		for(let j = 1; j < line.length; j++){
			let neighbourID = parseInt(line[j]);
			if(FileHandler.listOfNodes[neighbourID] == undefined)
			FileHandler.listOfNodes[neighbourID] = {
				listOfNeighbours: [],
				value: ''
			};
			FileHandler.listOfNodes[nodeID].listOfNeighbours.push(neighbourID);
		}
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	callback(FileHandler.listOfNodes);
}

/**
* Initiate values of graph's nodes from csv file.
*
* @param {File} comments the csv file to be parse.
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the values of nodes
*/


FileHandler.prototype.initValuesFromFile = function(file, update, callback){
	let now = 0;

	//If the user choose cancel
	if(file == undefined){
		update(now,"info");
		return;
	}
	//If there is no initiate graph.
	if(Object.keys(FileHandler.listOfNodes).length == 0){
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
			FileHandler.parsingValues(this.result, update, callback);
		}
	reader.readAsText(file);
}

FileHandler.prototype.parsingValues = function(values, update, callback){
	let now = 0;
	let	lines = values.split("\n");
	lines.pop();
	console.log('parse value for ln : '+lines.length);
	for(let i = 0; i < lines.length; i++){
		let line = lines[i].split(new RegExp(FileHandler.separator));
		let nodeID = parseInt(line[0]);
		FileHandler.listOfNodes[nodeID].value = parseInt(line[1]);
		console.log('set :'+line[1]+' for '+nodeID);
		now = 100/(lines.length - i);
		update(now,"info");
	}
	update(now,"success");
	callback(FileHandler.listOfNodes);
}


FileHandler = new FileHandler();
export default FileHandler;
