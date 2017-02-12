var listOfNodes = [];

var now = 0;

function Node(){
	this.id = 0,
	this.value = 0,
	this.listOfNeighbours = []
}  

function updateProgressBar(bar,state){
	bar.setAttribute("style", "width: "+now+"%");
	bar.setAttribute("class", "progress-bar progress-bar-"+state);
	bar.innerHTML = now+"%";
}

function fileToGraph(file){
	if(file == undefined)
		return;
	var progressbar = document.getElementsByClassName("progress-bar")[0];
	var filename = file.name.split('.');
	var fileformat = filename[filename.length-1];
	if(!fileformat.includes("csv")){
		listOfNodes = [];
		now = 0;
		updateProgressBar(progressbar,"danger");
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
				listOfNodes.push(new Node());
				listOfNodes[i].id = parseInt(line[0]);
				listOfNodes[i].value = parseInt(line[1]);
			}
			else{
				var nodeID = parseInt(line[0]);
				for(var j = 1; j < line.length; j++){
					var actualNode = listOfNodes[nodeID]
					if(actualNode != null)
						actualNode.listOfNeighbours.push(parseInt(line[j]));
					else{
						alert("Fail to read csv file.\nAn error occurs line " + (i+1));
						updateProgressBar(progressbar,"danger");
						return;
					}
				}
			}
			now = 100/(lines.length - i);
			updateProgressBar(progressbar,"info");
		}
		updateProgressBar(progressbar,"success");
	}
	reader.readAsText(file);
}
