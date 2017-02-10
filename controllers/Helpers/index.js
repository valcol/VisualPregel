let Helpers = function() {};

Helpers.prototype.stringToFunction = function(s) {
  let f;
  try {
    eval('f = ' + s);
  } catch (e) {
    throw e;
  }
  return f;
};

Helpers.prototype.functionToString = function(f) {
  return f.toSting();
};

export default new Helpers();
