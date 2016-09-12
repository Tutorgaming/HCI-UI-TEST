import React from "react";
import ReactDOM from 'react-dom';

import GameLevel from "./components/GameLevel";
import WelcomePage from "./components/WelcomePage";
import Timer from "./components/Timer";

var pool = [];

// Main App
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentLevel : 0 ,
      data : [],
      question : []
    };

    this.generateQuestion();
  }

  generateQuestion(){

    for(var j = 0 ; j <3 ; j++){
        var my_question = [];
        while(my_question.length < 6){
          var randomnumber=Math.ceil((Math.random()*6));
          var found=false;
          for(var i=0;i<my_question.length;i++){
        	if(my_question[i]==randomnumber){found=true;break}
          }
          if(!found)my_question[my_question.length]=randomnumber;
        }
        // for(var i = 0 ; i < 6 ; i++){
        //     my_question.push(Math.floor((Math.random() * 50) + 1));
        // }
        pool.push(my_question);
    }
    //console.log(pool);
    //this.setState({question:pool});
    //console.log(this.state.question);
  }

  logging(data){
      /*
        Data format {
            level : Number
            timestamp : Date
            correct : Boolean
            button : Number
        }
      */
      this.state.data.push(data);

  }

  sendLog(filename , payloads){

      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(payloads));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

  }


  changeLevel(){
      //Next Level
      //console.log(this.state.currentLevel);
      this.setState({currentLevel : this.state.currentLevel+1 });
  }

  // Rendering Method
  render() {

    switch (this.state.currentLevel) {
      case 0:
				return (<WelcomePage onClick={this.changeLevel.bind(this)}/>);
			case 1:
				return (<Timer changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 2:
				return (<GameLevel pool={pool} level={0} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
      case 3:
  			return (<Timer changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 4:
				return (<GameLevel pool={pool} level={1} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)}/>);
      case 5:
  			return (<Timer changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 6:
				return (<GameLevel pool={pool} level={2} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)}/>);
      case 7:
      return (
        <div style={{
          backgroundColor:"#FFFFFF",
          borderColor:"#FFFFFF",
          width: 3000 + 'px' ,
           height: 1500 + 'px',
           display:"inline-block",
           textAlign: "center",
           verticalAlign: "middle",
           lineHeight: 190 +'px',
           fontSize: 150 + 'px',
           borderStyle : "solid",
           boxSizing : "border"
        }}
            onClick={this.changeLevel.bind(this)}>

            &nbsp;

        </div>);
        case 8:
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
          }}
              onClick={this.changeLevel.bind(this)}>

              &nbsp;

          </div>);
      case 9:
        //console.log(this.state.data);
        //var myJsonString = JSON.stringify(this.state.data);
  			//return (<div>Data Saving {myJsonString}</div>);
        var d = new Date();
        //d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
        var file = {date: d.toString(),data : this.state.data };
        file = JSON.stringify(file);

        this.sendLog(d.toString(),file);
        return (<div></div>);
    }
  }
}

export default App;
