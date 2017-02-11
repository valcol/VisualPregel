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

Pregel.prototype.mock = function(values, initialize, dispatch, aggregate) {
  let nodesValues = [1, 2, 3, 4, 5, 6];
  nodesValues.map((v) => (initialize(v)));
  nodesValues.map((v) => (dispatch(v)));
  console.log(aggregate(nodesValues));
};

Pregel = new Pregel();
export default Pregel;
