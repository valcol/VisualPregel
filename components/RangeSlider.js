import React, {Component} from 'react';
import Slider from 'rc-slider';




class RangeSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 100,
      value: 0
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({step: 100/(nextProps.graph.graphs.length - 1), value: (100 * nextProps.graph.index) / (nextProps.graph.graphs.length - 1)});
  }

  render() {
    return (
      <div>
        <Slider  dots step={this.state.step} defaultValue={0} value={this.state.value} onChange = {this.props.setNodesWithIndex}/>
      </div>
    );
  }
}
export default RangeSlider;
