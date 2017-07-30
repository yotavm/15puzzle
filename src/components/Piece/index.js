import React, { Component } from 'react';
import './Piece.css';

class Piece extends Component {

buildStyle(){
  const {pieceSize,backgroundPosition,positions,bordeSize,image} = this.props;
  const pieceStyle = {
    ...pieceSize,
    left: positions.x,
    top: positions.y,
    backgroundPositionX:-backgroundPosition.x,
    backgroundPositionY:-backgroundPosition.y,
    backgroundSize: `${bordeSize.width}px,${bordeSize.height}px`,
    backgroundImage:`url(${image})`,
  }
  return pieceStyle;

}

render() {
    return (
      <div id={this.props.id} className='piece' style={this.buildStyle()}/>
    );
  }
}

export {Piece}
