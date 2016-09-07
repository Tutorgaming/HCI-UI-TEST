import React from 'react';
import ReactDOM from 'react-dom';
import {Col} from 'react-bootstrap';
import ReactCountdownClock from 'react-countdown-clock'

class WelcomePage extends React.Component{

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

        <div className="container">
          <div className="wrapper">
          <ReactCountdownClock seconds={3}
                   color="#000"
                   alpha={0.9}
                   size={500}
                   onComplete={this.props.changeLevel}
                   showMilliseconds={false} /></div>
        </div>
    );
  }


}

export default WelcomePage;
