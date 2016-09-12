import React from 'react';
import ReactDOM from 'react-dom';
//import {Col} from 'react-bootstrap';
import ReactCountdownClock from 'react-countdown-clock'

class Timer extends React.Component{

  constructor(){
    super();
    this.state={
      count : 5
    };
  }

  timerCallback(timeRemaining){
    this.setState({count : this.state.count - 1})
  }


  render(){
    return (

        <center><div className="container">
          <div className="wrapper">
          <div style={{marginTop: 100 + 'px'}}>
          <ReactCountdownClock seconds={0.5}
                   color="#000"
                   alpha={0}
                   size={500}
                   onComplete={this.props.changeLevel}
                   showMilliseconds={false} /></div>
        </div></div></center>
    );
  }


}

export default Timer;
