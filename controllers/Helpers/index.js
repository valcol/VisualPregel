let Helpers = function() {};


Helpers.prototype.stringToFunction = function(s) {
  let f;
  eval('f = ' + s);
  return f;
};

Helpers.prototype.functionToString = function(f) {
  return f.toSting();
};

export default new Helpers();
