import React, { Component } from 'react';
import {Keys,keydownScoped} from 'react-keydown';
import background from './images/background-image.jpg'
import {Piece} from '../'
import './Puzzle.css';
import _ from 'lodash';

const {UP,DOWN,RIGHT,LEFT} = Keys
class Puzzle extends Component {
constructor(){
  super()
  this.piecesNum = 16;
  this.checkSolve = this.checkSolve.bind(this);
  this.state={
    start:false,
    board:[],
    pieces:[],
    gameBoard:[],
  }
}
componentWillMount(){
  this.buildPuzzle();
}


componentWillReceiveProps(nextProps){
  if(nextProps.start && !this.state.start){
    this.setState({start:true})
    this.shuffle();

  }

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
    pieces.push({id:i,...piece});
    board.push({boardPlace:{col:(i%4),row:counter},positions:{...positions}});
  }
  this.setState((state) => ({board,pieces,gameBoard:board}))
}

renderPieces(data,index){
  const piece = data
  const positions = this.state.gameBoard[index].positions;
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
 shuffle(){
   const shuffle = _.shuffle(this.state.gameBoard);
   this.setState((state)=>{
       state.gameBoard = shuffle;
   })

 }

 checkSolve(){
   const {onSolve} = this.props;
   if(_.isEqual(this.state.board,this.state.gameBoard)){
    console.log('yesss!!!!!');
    this.setState({start:false})
    onSolve();
   }
 }

 @keydownScoped(UP,DOWN,RIGHT,LEFT)
 move(event){
     if(this.state.start){
       const emptyBoardPlace = this.state.gameBoard[this.piecesNum-1].boardPlace;
       let row;
       let col;
       switch (event.which) {
         case UP:
           row=emptyBoardPlace.row+1;
           col=emptyBoardPlace.col;
           this.piecesToMove(col,row);
          break;
         case DOWN:
            row=emptyBoardPlace.row-1;
            col=emptyBoardPlace.col;
            this.piecesToMove(col,row);
          break;
         case LEFT:
             row=emptyBoardPlace.row;
             col=emptyBoardPlace.col+1;
             this.piecesToMove(col,row);
           break;
         case RIGHT:
             row=emptyBoardPlace.row;
             col=emptyBoardPlace.col-1;
             this.piecesToMove(col,row);
          break;
         default:
     }
   }
 }

 piecesToMove(col,row){
     const to = 15;
     const from = _.findIndex(this.state.gameBoard, {boardPlace:{row,col}})
     const temp = this.state.gameBoard[15];
     if(from!==-1){
       this.setState((state)=>{
         state.gameBoard[to] =  state.gameBoard[from];
         state.gameBoard[from] = temp;
       })
     }
     this.checkSolve()
 }


render() {
    return (
      <div className='puzzle' style={this.props.bordeSize}>
        {this.state.pieces.map((entry,index) => this.renderPieces(entry,index))}
      </div>
    );
  }
}


export {Puzzle}
