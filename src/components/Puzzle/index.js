import React, { Component } from 'react';
import keydown from 'react-keydown';
import background from './images/background-image.jpg'
import {Piece} from '../'
import './Puzzle.css';
import _ from 'lodash';


class Puzzle extends Component {
constructor(){
  super()
  this.piecesNum = 16;
  this.state={
    board:[],
    pieces:[]
  }
}
componentWillMount(){
  this.buildPuzzle();
}

buildPuzzle(){
  const {bordeSize} = this.props;
  const sqrt = Math.sqrt(this.piecesNum);//to build n*n board fron the pieces Num
  const stepX = bordeSize.width/sqrt;//the width of pieces == the distatnce we need to move in x
  const stepY = bordeSize.height/sqrt;//the height of pieces == the distatnce we need to move in y
  const board = [];
  const pieces=[];
  let counter =0;
  const pieceSize = {
    width:stepX,
    height:stepY,
  };
  const positions = {
    x:0,
    y:0,
  }
  for(let i = 0;i<this.piecesNum;i++){
    counter = parseInt(i/sqrt,10);
    positions.x = (i%4) * stepX;
    positions.y = counter * stepY;
    let piece = {pieceSize,backgroundPosition:{...positions}}
    pieces.push({id:i+1,...piece});
    board.push({positions:{...positions}});
  }
  this.setState((state) => ({board,pieces}))
}

renderPieces(data,index){
  const piece = data
  const positions = this.state.board[index].positions;
  if(index===this.piecesNum-1){
    return;
  }
  return(
    <Piece
      pieceSize={piece.pieceSize}
      backgroundPosition={piece.backgroundPosition}
      positions={positions}
      bordeSize={this.props.bordeSize}
      key={index}
      id={index}
      image={background} />
  )
}
 change(){
   const b = _.shuffle(this.state.board);
   this.setState({pieces:b})
 }

 shuffle(){
   const b = _.shuffle(this.state.board);
   this.setState((state)=>{
       state.board = b;
   })

 }
 @keydown('up', 'down', 'right', 'left' )
 move(event){
   console.log(event);
 }


render() {
    return (
      <div onClick={()=>this.shuffle()} className='puzzle' style={this.props.bordeSize}>
        {this.state.pieces.map((entry,index) => this.renderPieces(entry,index))}
      </div>
    );
  }
}


export {Puzzle}
