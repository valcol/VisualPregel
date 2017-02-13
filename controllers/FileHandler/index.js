

let FileHandler = function() {
	this.listOfNodes = [];
};

FileHandler.prototype.fileToGraph = function(file, updateBar){
	let now = 0;
	if(file == undefined)
		return;
	var filename = file.name.split('.');
	var fileformat = filename[filename.length-1];
	if(!fileformat.includes("csv")){
		listOfNodes = [];
		updateBar(now,"danger");
		alert("Your file is not csv file");
		file.value = '';
		return;
	}
	var reader = new FileReader();
	var edges = false;
	var line = "";
	var lines = [];
	reader.onload = function(evt){
		lines = this.result.split('\n');
		for(var i = 0; i < lines.length; i++){
			line = lines[i].split(',');
			if(!edges){
				if(lines[i].includes("EDGES")){
					edges = true;
					continue;
				}
				FileHandler.listOfNodes.push({
					id: parseInt(line[0]),
					value: parseInt(line[1]),
					listOfNeighbours: []
				});
			}
			else{
				var nodeID = parseInt(line[0]);
				for(var j = 1; j < line.length; j++){
					var actualNode = FileHandler.listOfNodes[nodeID]
					if(actualNode != null)
						actualNode.listOfNeighbours.push(parseInt(line[j]));
					else{
						alert("Fail to read csv file.\nAn error occurs line " + (i+1));
						updateBar(now,"danger");
						return;
					}
				}
			}
			now = 100/(lines.length - i);
			updateBar(now,"info");
		}
		updateBar(now,"success");
	}
	reader.readAsText(file);
}

FileHandler = new FileHandler();
export default FileHandler;
