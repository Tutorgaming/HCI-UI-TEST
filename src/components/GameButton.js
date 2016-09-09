import React from 'react';
import ReactDOM from 'react-dom';
//import {Button} from 'react-bootstrap'

class GameButton extends React.Component{

  constructor(){
    super();
    this.state = {
        disabled : false,
        className : "btn btn-primary active",
        show : true
    };
  }

  handleClickEvent(e){

    console.log(e);
    // Time Stamp
    var d = new Date();

    // Send the Button Value
    if(this.props.onClick(this.props.value)){
        this.props.log(this.props.value,this.props.onClick(this.props.value));//console.log("[Correct]Click Event at " + this.props.value );
        this.setState({
          disabled : true,
          className: "btn btn-primary disabled",
          show: false
        });

    }else{
        this.props.log(this.props.value,this.props.onClick(this.props.value));//console.log("[Wrong]Click Event at " + this.props.value + "[" + d + "]");
    }

    //console.log(d.toJSON());



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
                  fontSize: 150 + 'px',
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
