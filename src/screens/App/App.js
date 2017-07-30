import React, { Component } from 'react';
import './App.css';
import {Puzzle} from '../../components'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="Title">
          <div>15 Puzzle</div>
          <div>New York (version 1.0)</div>
        </div>
        <div className='Game'>
          <Puzzle bordeSize={{width:500,height:500}}/>
        </div>
      </div>
    );
  }
}

export {App};
