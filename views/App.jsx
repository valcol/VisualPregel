import React, { Component } from 'react';
import {render} from 'react-dom';

import css from './App.less';

export default class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container">
          Hello world
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
