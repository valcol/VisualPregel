import FileHandler from '../../controllers/FileHandler';
let FatumGraph = function() {
};

FatumGraph.prototype.fatumgraph = function(){
      console.log("coucou");
      let initVis = function() {
            //init. de la vue
				let canvas = document.getElementById('fatum-demo');
				window.fatum = Fatum.createFatumContext(canvas);
				Fatum.setRenderingObserver(fatum);
				Fatum.setMouseMoveHandler(canvas, fatum);
                // activation du rendu des MARKS
				fatum.layerOn(Fatum.MARKS | Fatum.TEXT | Fatum.CONNECTIONS);
                var vertices = [];
                var fonts = fatum.fonts();
                var xVertex = 40;
                var yVertex = 40;
                var vertexSize = 30;
                var tmp = 0;

                var listOfGraphNodes = {};
                for(var node in FileHandler.listOfNodes){
                    listOfGraphNodes[FileHandler.listOfNodes[node].id] = fatum.addMark().x(xVertex+tmp).y(yVertex+tmp).color(200,100,255).show().alpha(255).width(vertexSize).height(vertexSize);
                    tmp+=30;
                  }
                for(var node in FileHandler.listOfNodes)
                  for(var neighbour in FileHandler.listOfNodes[node].listOfNeighbours)
                    fatum.addConnection(listOfGraphNodes[node],listOfGraphNodes[neighbour]).sourceColor([0,0,0,128]).targetColor([0,0,0,128]);

                /*

                // Assoicate a value to each vertex
                fatum.addText().textColor(0,0,0,128).size(vertexSize - 10).text("5").x(-xVertex).y(yVertex - 5).font(Math.random()*fonts.length);
                fatum.addText().textColor(0,0,0,128).size(vertexSize - 10).text("4").x(xVertex).y(yVertex - 5).font(Math.random()*fonts.length);
                fatum.addText().textColor(0,0,0,128).size(vertexSize - 10).text("10").x(-xVertex).y(-yVertex - 5).font(Math.random()*fonts.length);
                fatum.addText().textColor(0,0,0,128).size(vertexSize - 10).text("12").x(xVertex).y(-yVertex - 5).font(Math.random()*fonts.length);
                */

                fatum.camera().zoom(1 , [0, 0]);
                // on centre la visu (/!\ pas d'effet immediat a cause du double buffering)
				//fatum.center();
                // swap de la camera (applique le centrage de la ligne précédente)
                fatum.camera().swap();
                fatum.animate(2000);

			};
        // initalisation de la lib
        Fatum.init();
        // appelera le callback lorsque Fatum sera entierement initialise
        // plus ou moins necessaire suivant les navigateurs et la version de la lib
      //  Fatum.addInitListener(initVis);
        Fatum.whenReady(initVis);


}

FatumGraph = new FatumGraph();
export default FatumGraph;
