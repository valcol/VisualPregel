let FileHandler = function() {
	this.listOfNodes = {};
};

FileHandler.prototype.fileToGraph = function(file, updateBar){
	let now = 0;
	FileHandler.listOfNodes = {};
	if(file == undefined)
	return;
	var filename = file.name.split(".");
	var fileformat = filename[filename.length-1];
	if(!fileformat.includes("csv")){
		updateBar(now,"danger");
		alert("Your file is not csv file");
		file.value = "";
		return;
	}
	var reader = new FileReader();
	var edges = false;
	var line = "";
	var lines = [];
	reader.onload = function(evt){
		lines = this.result.split("\n");
		for(var i = 0; i < lines.length; i++){
			line = lines[i].split(/,| |\t/);
			if(!edges){
				if(lines[i].includes("EDGES")){
					edges = true;
					continue;
				}
				FileHandler.listOfNodes[parseInt(line[0])] = {
					id: parseInt(line[0]),
					value: parseInt(line[1]),
					listOfNeighbours: []
				};
			}
			else{
				let nodeID = parseInt(line[0]);
				if(FileHandler.listOfNodes[nodeID] != null)
				for(var j = 1; j < line.length; j++){
					let neighbourNode = parseInt(line[j]);
					if(FileHandler.listOfNodes[neighbourNode] != null )
					FileHandler.listOfNodes[nodeID].listOfNeighbours.push(neighbourNode);
					else{
						updateBar(now,"danger");
						alert("Fail to read csv file.\nAn error occurs line " + (i+1));
						return;
					}
				}
				else{
					updateBar(now,"danger");
					alert("Fail to read csv file.\nAn error occurs line " + (i+1));
					return;
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
