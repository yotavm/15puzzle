import React, { Component } from 'react';
import './App.css';
import keydown,{Keys} from 'react-keydown';
import {Puzzle,Timer,Button} from '../../components'

const {UP,DOWN,RIGHT,LEFT} = Keys
@keydown(UP,DOWN,RIGHT,LEFT)
class App extends Component {
  constructor(){
    super()
    this.startPuzzle = this.startPuzzle.bind(this);
    this.finishPuzzle = this.finishPuzzle.bind(this);
    this.state = {
      start:false,
    }
  }

  startPuzzle(){
    this.setState({start:true});
  }

  finishPuzzle(){
    this.setState({start:false});
  }

  render() {
    return (
      <div className='App'>
        <div className="Title">
          <div>15 Puzzle</div>
          <div>New York (version 1.0)</div>
        </div>
        <div className='Game'>
          <Puzzle {...this.props}  start={this.state.start} onSolve={this.finishPuzzle} bordeSize={{width:500,height:500}}/>
        </div>
        <div className='actions'>
          <div className='buttonContiner'>
            <Button onClick={this.startPuzzle}>START PUZZLE</Button>
            <br/>
            <Button>SCORE BOARD</Button>
          </div>
          <Timer start={this.state.start}/>
        </div>

      </div>
    );
  }
}

export {App};
