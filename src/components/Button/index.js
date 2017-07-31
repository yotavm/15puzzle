import React from 'react';
import './Button.css';

const Button = (props) =>{
  const {onClick}  = props;
  return(
    <a className="btn" onClick={()=>onClick()}>
      <span className="text">
        <span className="inner">{props.children}</span>
      </span>
      <span className="hover">
        <span className="inner">{props.children}</span>
    </span>
		</a>
  )
}

export {Button}
