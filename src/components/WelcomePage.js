import React from 'react';
import ReactDOM from 'react-dom';
import ReactCountdownClock from 'react-countdown-clock'

class WelcomePage extends React.Component{

  constructor(){
    super();
    this.state={
      count : 5
    };
  }

  handleClickEvent(){
    this.props.onClick();
  }


  render(){

      return (
        <div style={{
          backgroundColor:"#FFFFFF",
          borderColor:"#FFFFFF",
          width: 1500 + 'px' ,
           height: 1500 + 'px',
           display:"inline-block",
           textAlign: "center",
           verticalAlign: "middle",
           lineHeight: 190 +'px',
           fontSize: 150 + 'px',
           borderStyle : "solid",
           boxSizing : "border"
        }}  onTouchStart={this.handleClickEvent.bind(this)}
           onClick={this.handleClickEvent.bind(this)} >

            START

        </div>);

  }


}

export default WelcomePage;
