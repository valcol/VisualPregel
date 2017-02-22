let FileHandler = function() {
	this.listOfNodes = {};
	this.separator = ',';
};

FileHandler.prototype.resetInputFile = function(id){
	let form = document.getElementById(id);
	form.value = "";
}

/**
* Get a graph object from csv file representing adjacency matrix of this graph
*
* @param {File} comments the csv file to be parse.
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the property listOfNodes
*/
FileHandler.prototype.fileToGraph = function(file, updateFileBar, updateGraph){

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
		FileHandler.parsingValues(this.result, updateFileBar, updateGraph);
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

FileHandler.prototype.parsingValues = function(values, updateFileBar, updateGraph){
	let now = 0;
	FileHandler.listOfNodes = {};

	updateFileBar(now,"info");

	//Parse the values content and create the graph
	let line = "";
	let lines = [];
	lines = values.split("\n");
	for(let i = 0; i < lines.length; i++){
		line = lines[i].split(new RegExp(FileHandler.separator));
		let nodeID = parseInt(line[0]);
		FileHandler.listOfNodes[nodeID] = {
			id: line[0],
			listOfNeighbours: []
		};
		for(let j = 1; j < line.length; j++){
			let neighbourID = parseInt(line[j]);
			if(FileHandler.listOfNodes[neighbourID] == undefined)
			FileHandler.listOfNodes[neighbourID] = {
				id: line[j],
				listOfNeighbours: []
			};
			FileHandler.listOfNodes[nodeID].listOfNeighbours.push(neighbourID);
		}
		now = 100/(lines.length - i);
		updateFileBar(now,"info");
	}
	updateFileBar(now,"success");
	updateGraph(this.listOfNodes);
}

/**
* Initiate values of graph's nodes from csv file.
*
* @param {File} comments the csv file to be parse.
* @param {Function} comments function to call for update the progress bar.
* @return {void} update the values of nodes
*/


FileHandler.prototype.initValuesFromFile = function(file, updateBar, updateGraph){
	let now = 0;

	//If the user choose cancel
	if(file == undefined){
		updateBar(now,"info");
		return;
	}
	//If there is no initiate graph.
	if(Object.keys(FileHandler.listOfNodes).length == 0){
		updateBar(now,"info");
		alert("There is no graph to initiate.");
		let form = document.getElementById("values");
		form.value = "";
		return;
	}
	let filename = file.name.split(".");
	let fileformat = filename[filename.length-1];
	//If the file is not in csv format
	if(!fileformat.includes("csv")){
		updateBar(now,"danger");
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
		lines = this.result.split("\n");
		for(let i = 0; i < lines.length; i++){
			line = lines[i].split(new RegExp(FileHandler.separator));
			let nodeID = parseInt(line[0]);
			FileHandler.listOfNodes[nodeID].value = parseInt(line[1]);
			now = 100/(lines.length - i);
			updateBar(now,"info");
		}
		updateBar(now,"success");
	}
	reader.readAsText(file);
	updateGraph(this.listOfNodes);
}

FileHandler = new FileHandler();
export default FileHandler;
