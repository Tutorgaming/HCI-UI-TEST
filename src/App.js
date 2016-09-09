import React from "react";
import ReactDOM from 'react-dom';

import GameLevel from "./components/GameLevel";
import WelcomePage from "./components/WelcomePage";


const button_count = [5,7,12];
// Main App
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentLevel : 0 ,
      data : []
    };
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

  startGame(){

  }

  changeLevel(){
      //Next Level
      console.log(this.state.currentLevel);
      this.setState({currentLevel : this.state.currentLevel+1 });
  }

  // Rendering Method
  render() {

    switch (this.state.currentLevel) {
			case 0:
				return (<WelcomePage changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 1:
				return (<GameLevel level={0} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
      case 2:
  			return (<WelcomePage changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 3:
				return (<GameLevel level={1} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)}/>);
      case 4:
  			return (<WelcomePage changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)} />);
			case 5:
				return (<GameLevel level={2} changeLevel={this.changeLevel.bind(this)} log={this.logging.bind(this)}/>);
      case 6:
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
