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

Pregel.prototype.mock = function(initialize, dispatch, aggregate) {
  let nodesValues = [10, 2, 3, 4, 5, 6];
  nodesValues = nodesValues.map((v) => (initialize(v)));
  nodesValues = nodesValues.map((v) => (dispatch(v)));
  console.log('Result: '+aggregate(nodesValues));
};

Pregel = new Pregel();
export default Pregel;
