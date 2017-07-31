import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import './ScoreBoard.css';
import {Timer} from '../'
import _ from 'lodash';
class ScoreBoard extends Component {

  constructor(){
    super();
    this.scoreBoard = [];
    this.state = {
      scoreBoard:[],
    }
  }

  componentWillMount(){
    this.getScore();
  }

  renderScores(entry,index){

    return(
      <div key={index} className='row'>
        <div className='col'>{entry[0].split('T')[0]}</div>
        <div className='col right'>{<Timer setTime={entry[1]||0} start={false}/>}</div>
      </div>
    )
  }

  getScore(){
    if(!_.isEmpty(reactLocalStorage.getObject('scoreBoard'))){
      this.scoreBoard = reactLocalStorage.getObject('scoreBoard')
    }
  }

  render(){
    return(
      <div className='box'>
        <div className='row top'>
          <div className='col'>DATE</div>
          <div className='col right'>TIME</div>
        </div>
        {this.scoreBoard.map((entry,index) => this.renderScores(entry,index))}
      </div>
    )
  }
}

export {ScoreBoard}
