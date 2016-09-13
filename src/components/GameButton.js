import React from 'react';
import ReactDOM from 'react-dom';

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
    //console.log(e.nativeEvent);
    e.persist();
    if(e.targetTouches != null){
      // Touch event logging
        var rect = e.target.getBoundingClientRect();
        var x = e.targetTouches[0].pageX - rect.left;
        var y = e.targetTouches[0].pageY - rect.top;
        var clickedPosition ={x:x,y:y};
    }else{
        // Click event logging
        var x_mouse = e.nativeEvent.offsetX;
        var y_mouse = e.nativeEvent.offsetY;
        var clickedPosition ={x:x_mouse,y:y_mouse};
    }

    // Send the Button Value
    if(this.props.onClick(this.props.value)){
        this.props.log(this.props.value,this.props.onClick(this.props.value),clickedPosition);//console.log("[Correct]Click Event at " + this.props.value );
        this.setState({
          disabled : true,
          className: "btn btn-primary disabled",
          show: false
        });

    }else{
        this.props.log(this.props.value,this.props.onClick(this.props.value),clickedPosition);//console.log("[Wrong]Click Event at " + this.props.value + "[" + d + "]");
    }
  }

  render(){
        if(this.state.show)
            return (
              <div style={{
                 backgroundColor:"#FFFFFF",
                 borderColor:"#000",
                 width        : 200 + 'px' ,
                 height       : 200 + 'px',
                 display      :"inline-block",
                 textAlign    : "center",
                 verticalAlign: "middle",
                 lineHeight   : 190 +'px',
                 fontSize     : 150 + 'px',
                 borderStyle  : "solid",
                 boxSizing    : "border"
                }}
               onTouchStart={this.handleClickEvent.bind(this)}
               onClick={this.handleClickEvent.bind(this)}  >

                    {this.props.children}

               </div>
             );
            else
              return (
                <div style={{
                  backgroundColor:"#FFFFFF",
                  borderColor  :"#FFFFFF",
                  width        : 200 + 'px' ,
                  height       : 200 + 'px',
                  display      :"inline-block",
                  textAlign    : "center",
                  verticalAlign: "middle",
                  lineHeight   : 190 +'px',
                  fontSize     : 150 + 'px',
                  borderStyle  : "solid",
                  boxSizing    : "border"
                }}>

                    &nbsp;

                </div>
              );
  }
}

export default GameButton;
