import React from 'react';
import ReactDOM from 'react-dom';
//import {Col} from 'react-bootstrap';

import GameButton from "./GameButton";

// const question= [
//                   [6,3,4,5,10,2],
//                   [1,2,3,4,5,6],
//                   [4,5,2,1,3,6]
//                 ];
// const question_value = [
//                   [6,3,4,5,1,2],
//                   [1,2,3,4,5,6],
//                   [4,5,2,1,3,6]
//                 ];

class GameLevel extends React.Component{

  constructor(props){
    super(props);
    this.generateButton.bind(this);

    this.state = {
        buttons: [],
        currentValue : Math.min.apply(null, this.props.pool[this.props.level]),
        buttonCount: this.props.pool[this.props.level].length,
        count:0
    };

      // Game Level Log Entry
      var d = new Date();
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
      console.log("Game Level entry : "+d.toJSON());
      var data = {
        level : this.props.level,
        timestamp : d.toJSON(),
        button : "Level Loaded"
      };
      this.props.log(data);


      //console.log(this.props.pool);
  }

  componentDidMount(){
    this.generateButton(this.state.buttonCount);
  }

  componentWillReceiveProps(){
    this.setState({
      buttons: [],
      currentValue : 1,
      buttonCount: this.props.pool[this.props.level].length
    },function(){
          this.generateButton(this.props.pool[this.props.level].length);
    });

  }

  onButtonClick(clickedValue){

    var sorted = this.props.pool[this.props.level].sort(function(a, b){return a-b});
    //console.log(sorted);
    if(this.state.count == this.props.pool[this.props.level].length-1){
      this.props.changeLevel();
      return true;
    }

    if(clickedValue == sorted[this.state.count]){
      this.setState({count:this.state.count+1});
      return true;
    }else{
      return false;
    }

    // if(this.state.currentValue == question[this.props.level].length){
    //   this.props.changeLevel();
    //   return true;
    // }
    //
    //   if(clickedValue == this.state.currentValue){
    //     this.setState({currentValue: clickedValue+1});
    //     return true;
    //   }else{
    //     return false;
    //   }
  }

  logButton(button,correct){
    var d = new Date();
    d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
    console.log("Click Detected : "+d.toJSON());
    var data = {
      level : this.props.level,
      timestamp : d.toJSON(),
      button : button,
      correct : correct
    };
    this.props.log(data);
  }

  generateButton(count){
    var buttons_array = [];
    for (var i = 0; i < this.props.pool[this.props.level].length; i++) {
        buttons_array.push(
              <GameButton
              disabled={false}
              key={this.props.pool[this.props.level][i]}
              value={this.props.pool[this.props.level][i]}
              onClick={this.onButtonClick.bind(this)}
              log= {this.logButton.bind(this)}>
              {this.props.pool[this.props.level][i]}
              </GameButton>
        );
    }
    this.setState({buttons: buttons_array});
  }

  render(){
    //<h1>กรุณาเรียงเลขจากน้อยไปมาก </h1>
    return (
        <div className="container">
        <center>

            <div className="row vertical-center-row" style={{width:700+'px',marginTop: 100 + 'px'}}>
              <div id="myid" className="col-md-12">
                  {this.state.buttons}
              </div>
            </div>
            </center>
        </div>
    );
  }
}

export default GameLevel;
