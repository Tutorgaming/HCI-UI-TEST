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
            width:100+"%",
            height:100+"%",
           display:"inline-block",
           textAlign: "center",
           verticalAlign: "middle",
           lineHeight: 190 +'px',
           fontSize: 120 + 'px',
           borderStyle : "solid",
           boxSizing : "border"
        }}  onTouchStart={this.handleClickEvent.bind(this)}
           onClick={this.handleClickEvent.bind(this)} >

            START

        </div>);

  }


}

export default WelcomePage;
