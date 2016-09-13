import React from 'react';
import ReactDOM from 'react-dom';
import ReactCountdownClock from 'react-countdown-clock'

class CutScene extends React.Component{

  constructor(){
    super();
  }

  handleClickEvent(e){
    this.props.onClick();
  }

  render(){

      return (
        <div style={{
          backgroundColor:this.props.backgroundColor,
          borderColor:"#FFFFFF",
          color:(this.props.textColor)? this.props.textColor:"#000000",
            width:100+"%",
            height:100+"vh",
           display:"inline-block",
           textAlign: "center",
           verticalAlign: "middle",
           lineHeight: 190 +'px',
           fontSize: 120 + 'px',
           borderStyle : "solid",
           boxSizing : "border"
        }} onClick={this.handleClickEvent.bind(this)}>

            {this.props.text}

        </div>);

  }


}

export default CutScene;
