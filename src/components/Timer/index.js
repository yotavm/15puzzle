import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import './Timer.css';
import _ from 'lodash';

class Timer extends Component {
  constructor(){
    super();
    this.distance=0;
    this.interval=null;
    this.tick = this.tick.bind(this);
    this.saveResult =this.saveResult.bind(this);
    this.state = {
      title:true,
      start:false,
      hours:0,
      minutes:0,
      seconds:0,
    }
  }
  componentWillMount(){
    if(this.props.setTime){
      this.setTime(this.props.setTime);
      this.setState({
        title:false,
      })
    }
  }
  renderTitle(){
    if(this.state.title){
      return <div className="timerTitle">TIMER</div>
    }else{
      return
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.start && !this.state.start){
      this.setState({start:true})
      this.startTimer();
    }else if(!this.state.start && nextProps.save){
      console.log('yotav');
      this.setState({start:false})
      this.saveResult();
      this.stopTimer();
    }else if(!nextProps.start){
      this.setState({start:false})
      this.stopTimer();
    }
  }

  startTimer(){
      this.distance = 0;
      this.interval = setInterval(this.tick, 1000);
  }
  tick(){
    this.distance += 1000;
    this.setState({hours:Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))});
    this.setState({minutes:Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))});
    this.setState({seconds:Math.floor((this.distance % (1000 * 60)) / 1000)});
  }

  setTime(distance){
    this.distance = distance
    this.setState({hours:Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))});
    this.setState({minutes:Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))});
    this.setState({seconds:Math.floor((this.distance % (1000 * 60)) / 1000)});
  }

  saveResult(){
    let scoreBoard = reactLocalStorage.getObject('scoreBoard');
    const timeStemp = new Date();
    const time = this.distance;
    const score = [timeStemp,time];
    if(_.isEmpty(scoreBoard)){
      scoreBoard = [];
      scoreBoard.push(score);
    }else{
      scoreBoard.push(score)
      scoreBoard = _.sortBy(scoreBoard,['1']).slice(0,10);
    }
    this.setState({start:false});
    reactLocalStorage.setObject('scoreBoard',scoreBoard);
  }

  stopTimer(){
    clearInterval(this.interval);
    this.setState({
      hours:0,
      minutes:0,
      seconds:0,
    })
  }

  //add zero to timer
  _pad(str, max) {
  str = str.toString();
  return str.length < max ? this._pad("0" + str, max) : str;
  }

  render(){

    return(
    <div className='timerContiner'>
      <div className='timer'>
        <div className="number">{this._pad(this.state.hours,2)}</div>
        <div className="number">:</div>
        <div className="number">{this._pad(this.state.minutes,2)}</div>
        <div className="number">:</div>
        <div className="number">{this._pad(this.state.seconds,2)}</div>
      </div>
      {this.renderTitle()}
    </div>)
  }

}

export {Timer}
