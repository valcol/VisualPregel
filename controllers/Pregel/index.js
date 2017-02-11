let Pregel = function() {};

Pregel.prototype.initialize = function(value) {
  // init function here
  return value;
};

Pregel.prototype.dispatch = function(value) {
  // dispatch function here
  return value;
};

Pregel.prototype.aggregate = function(values) {
  // aggregate function here
  return Math.min(...values);
};

export default new Pregel();
