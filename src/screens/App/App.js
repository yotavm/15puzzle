import React, { Component } from 'react';
import keydown,{Keys} from 'react-keydown';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import './App.css';

import {Puzzle,Timer,Button,ScoreBoard} from '../../components'

const {UP,DOWN,RIGHT,LEFT} = Keys
@keydown(UP,DOWN,RIGHT,LEFT)
class App extends Component {
  constructor(){
    super()
    this.startPuzzle = this.startPuzzle.bind(this);
    this.finishPuzzle= this.finishPuzzle.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.state = {
      start:false,
      save:false,
      route:'',
      width:500,
      height:500,
    }
  }
  componentWillMount(){
    if(window.screen.width<500){
      this.setState({
        width:300,
        height:300,
      })
    }
  }

  startPuzzle(){
    this.setState({start:true,save:false});
  }

  finishPuzzle(){
    this.setState({start:false,save:true});
  }

  changeRoute(route,props){
    this.setState({start:false,save:false});
    props.history.push(route);
  }

  runderButton(route,props){
    if(route === 'home'){
      return (
        <div className='buttonContiner'>
          <Button onClick={this.startPuzzle}>START PUZZLE</Button>
          <br/>
          <Button onClick={()=>this.changeRoute('/scoreBoard',props)}>SCORE BOARD</Button>
        </div>
      )
    }else if(route === 'scoreboard'){
      return (
      <div className='buttonContiner'>
        <Button onClick={()=>this.changeRoute('/',props)}>BACK</Button>
      </div>)
    }

  }

  render() {
    const{width,height} =this.state;
    return (
      <Router>
        <div className='App'>
          <div className="Title">
            <div>15 Puzzle</div>
            <div>New York (version 1.0)</div>
          </div>
          <div className='Game' style={{width,height}}>
            <Route exact={true} path="/" render={()=>
              <Puzzle {...this.props}  start={this.state.start} onSolve={this.finishPuzzle} bordeSize={{width,height}}/>
            }/>
            <Route path="/scoreboard" component={ScoreBoard}/>
          </div>
          <div className='actions'>
            <Route path="/scoreboard" render={(props)=>this.runderButton('scoreboard',props)
            }/>
            <Route exact={true} path="/" render={(props)=>this.runderButton('home',props)
            }/>
            <Timer save={this.state.save} start={this.state.start}/>
          </div>

        </div>
      </Router>
    );
  }
}

export {App};
