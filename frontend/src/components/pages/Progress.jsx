import * as React from 'react';
import LineLinearProgressWithLabel from './Line.jsx'
import './Progress.css'

function Progress(props) {

  return (
    <div className='progressDiv'>
        Loss
        <LineLinearProgressWithLabel value={4.5} color={"rgba(255, 159, 64, 0.6)"}/>
        Accuracy
        <LineLinearProgressWithLabel value={91.1} color={"rgba(75, 192, 192, 0.6"}/>
        MAPE
        <LineLinearProgressWithLabel value={1.02} color={"rgba(255, 99, 132, 0.6)"}/>
    </div>
  );
}

export default Progress