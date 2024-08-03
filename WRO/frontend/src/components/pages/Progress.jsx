import * as React from 'react';
import LineLinearProgressWithLabel from './Line.jsx'
import './Progress.css'

function Progress(props) {

  return (
    <div className='progressDiv'>
        Loss
        <LineLinearProgressWithLabel value={props.loss} color={"rgba(255, 159, 64, 0.6)"}/>
        Accuracy
        <LineLinearProgressWithLabel value={props.accuracy} color={"rgba(75, 192, 192, 0.6"}/>
        MAPE
        <LineLinearProgressWithLabel value={props.mape} color={"rgba(255, 99, 132, 0.6)"}/>
    </div>
  );
}

export default Progress