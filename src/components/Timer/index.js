import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  constructor(){
    super();
    this.distance=0;
    this.interval=null;
    this.tick = this.tick.bind(this);
    this.state = {
      hours:0,
      minutes:0,
      seconds:0,
    }
  }
  componentWillMount(){
    this.startTimer();
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

  stopTimer(){
    clearInterval(this.interval);
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
      <div className="timerTitle">TIMER</div>
    </div>)
  }

}

export {Timer}
