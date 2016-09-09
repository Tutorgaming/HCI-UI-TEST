import React from 'react';
import ReactDOM from 'react-dom';
//import {Col} from 'react-bootstrap';

import GameButton from "./GameButton";

const question= [
                  [1,3,4,5,0,2],
                  [0,1,2,3,4,5],
                  [2,1,0],
                  [4,5,0,2,1,3]
                ];

class GameLevel extends React.Component{

  constructor(props){
    super(props);
    this.generateQuestion.bind(this);
    this.state = {
        buttons: [],
        currentValue : 0,
        buttonCount: question[this.props.level].length
    };

      // console.log("Log Gamme Level " + this.props.level);
      var d = new Date();
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
      console.log(d.toJSON());
      var data = {
        level : this.props.level,
        timestamp : d.toJSON(),
        button : "Level Loaded"
      };
      this.props.log(data);
  }

  componentDidMount(){
    this.generateQuestion(this.state.buttonCount);
  }

  componentWillReceiveProps(){
    this.setState({
      buttons: [],
      currentValue : 0,
      buttonCount: question[this.props.level].length
    },function(){
          this.generateQuestion(question[this.props.level].length);
    });

  }

  onButtonClick(clickedValue){
    if(this.state.currentValue == question[this.props.level].length-1){
      this.props.changeLevel();
      return true;
    }

      if(clickedValue == this.state.currentValue){
        this.setState({currentValue: this.state.currentValue+1});
        return true;
      }else{
        //do nothing
        return false;
      }
  }

  logButton(button,correct){
    var d = new Date();
    d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
    console.log(d.toJSON());
    var data = {
      level : this.props.level,
      timestamp : d.toJSON(),
      button : button,
      correct : correct
    };
    this.props.log(data);
  }

  generateQuestion(count){
    var buttons_array = [];
    for (var i = 0; i < question[this.props.level].length; i++) {
        buttons_array.push(
              <GameButton
              disabled={false}
              key={question[this.props.level][i]}
              value={question[this.props.level][i]}
              onClick={this.onButtonClick.bind(this)}
              log= {this.logButton.bind(this)}>
              {question[this.props.level][i]}
              </GameButton>
        );
    }
    this.setState({buttons: buttons_array});
  }

  render(){
    return (
        <div className="container">
            <h1>กรุณาเรียงเลขจากน้อยไปมาก </h1>
            <div className="row vertical-center-row">
              <div id="myid" className="col-md-12">
                  {this.state.buttons}
              </div>
            </div>
        </div>
    );
  }
}

export default GameLevel;
