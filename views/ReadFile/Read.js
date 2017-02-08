
window.onload = function() {  
            var inp = document.getElementById('file');
            inp.onchange = function() {
                readFile(this, function(res) {
                    var ligne = res;
                    ligne = res.split("\n");
                    var collone = ligne[0].split(",");
                });
            };
        };

        function readFile(input, callback) {
            if (typeof FileReader !== 'undefined') {
                var fr = new FileReader();
                fr.readAsText(input.files[0]);
                fr.onload = function() {
                    callback(fr.result);
                };
            }
        };
