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
  return f.toString();
};

Helpers.prototype.generateId = function() {
  let uuid = '', i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
};

export default new Helpers();
