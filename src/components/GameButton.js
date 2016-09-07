import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

class GameButton extends React.Component{

  constructor(){
    super();
    this.state = {
        disabled : false,
        className : "btn btn-primary active",
        show : true
    };
  }

  handleClickEvent(){
    /*
    getDate()	Returns the day of the month (from 1-31)
    getDay()	Returns the day of the week (from 0-6)
    getFullYear()	Returns the year
    getHours()	Returns the hour (from 0-23)
    getMilliseconds()	Returns the milliseconds (from 0-999)
    getMinutes()	Returns the minutes (from 0-59)
    getMonth()	Returns the month (from 0-11)
    getSeconds()	Returns the seconds (from 0-59)
    */

    // Time Stamp
    var d = new Date();

    // Send the Button Value
    if(this.props.onClick(this.props.value)){
        this.setState({
          disabled : true,
          className: "btn btn-primary disabled",
          show: false
        });
        console.log("[Correct]Click Event at " + this.props.value );
    }else{
        console.log("[Wrong]Click Event at " + this.props.value + "[" + d + "]");
    }

    console.log(d.toJSON());



  }

  render(){
        if(this.state.show)
            return (
              <div style={{
                 backgroundColor:"#FFFFFF",
                 borderColor:"#000",
                 width: 200 + 'px' ,
                  height: 200 + 'px',
                  display:"inline-block",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: 190 +'px',
                  fontSize: 40 + 'px',
                  borderStyle : "solid",
                  boxSizing : "border"
                }}
               onClick={this.handleClickEvent.bind(this)} >

                    {this.props.children}

               </div>
             );
              else
              return (
                <div style={{
                  color:"#FFF",
                  backgroundColor:"#FFFFFF",
                  borderColor:"#FFF",
                  width: 200 + 'px' ,
                  height: 200 + 'px' ,
                  display:"inline-block",
                  textAlign: "center",
                  verticalAlign: "middle",
                  lineHeight: 190 +'px'
                }}>

                    &nbsp;

                </div>
              );
  }
}

export default GameButton;
