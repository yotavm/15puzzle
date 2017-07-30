import React, { Component } from 'react';
import './App.css';
import {Puzzle} from '../../components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Puzzle bordeSize={{width:500,height:500}}/>
      </div>
    );
  }
}

export {App};
