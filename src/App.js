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
        console.log(this.state.data);
  			return (<div>Data Saving {this.state.data.toJSON}</div>);
		}


    // return (
    //
    //     <div className="container">
    //       <h1>จงเรียงลำดับตัวเลขจากน้อยไปมาก</h1>
    //       <GameLevel level={this.state.currentLevel} changeLevel={this.changeLevel.bind(this)} />
    //     </div>
    // );
  }
}

export default App;
