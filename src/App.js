import React from "react";
import ReactDOM from 'react-dom';

import GameLevel from "./components/GameLevel";
import WelcomePage from "./components/WelcomePage";
import Timer from "./components/Timer";
import CutScene from "./components/CutScene";

//FireBase
var firebase = require("firebase");

var pool = [];
var generated = [];

// Main App
class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentLevel : 0 ,
      data : [],
      question : [],
      url : "",
      date : null
    };

    this.generateQuestion();
    this.changeLevel = this.changeLevel.bind(this);

  }

  setTestDate(){
    // Set the Test Date on the result dataset
    this.setState({date : new Date()});
  }

  generateQuestion(){

    for(var j = 0 ; j <3 ; j++){
        var my_question = [];
        var my_question2 = [];

        while(my_question.length < 6){
          //Generate Random Number from (1 to 6)
          var randomnumber=Math.ceil((Math.random()*6));
          var found=false;
          // If it exists No Adding
          for(var i=0;i<my_question.length;i++){
        	     if(my_question[i]==randomnumber){found=true;break}
          }
          if(!found){
            my_question[my_question.length]=randomnumber;
            my_question2[my_question.length]=randomnumber;
          }
        }

        //Remove first null
        my_question2.splice(0, 1);
        //Memorize the question
        generated.push(my_question2);

        //Question array to be parse by reference
        pool.push(my_question);
    }
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

  sendFileToServer(filename , payloads , callback){

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCYkMSpWVyRUrCOQNNNGLvrqX9he3gcQuk",
        authDomain: "hci-tutor.firebaseapp.com",
        databaseURL: "https://hci-tutor.firebaseio.com",
        storageBucket: "hci-tutor.appspot.com",
      };
      firebase.initializeApp(config);

      // Create a storage reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      // Create file pointer to the object
      var blob = new Blob([JSON.stringify(payloads, null, 2)], {type : 'text/plain'});
      var uploadTask = storageRef.child(filename).put(blob);

      // Listen to the server(Upload) state change
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      // On snapshot Callbacks
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('[Upload]' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('[Upload]Paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('[Upload]Running');
            break;
        }
      }, function(error) {
        console.log("UPLOAD ERROR");
      }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("[Upload]Completed!")
        callback(downloadURL);
        return downloadURL;
    });

  }

  changeLevel(){
      //Next Level
      this.setState({currentLevel : this.state.currentLevel+1 });
  }

  startGame(){
      //Start the Testing Game
      this.setState({currentLevel : this.state.currentLevel+1,
                            date  : new Date()});

  }

  // Rendering Method
  render() {
    //State machine
    switch (this.state.currentLevel) {
      case 0:
				return (<WelcomePage onClick={this.startGame.bind(this)}/>);
			case 1:
				return (<Timer changeLevel={this.changeLevel.bind(this)}
                       log={this.logging.bind(this)} />);
			case 2:
				return (<GameLevel pool={pool}
                           level={0}
                           changeLevel={this.changeLevel.bind(this)}
                           log={this.logging.bind(this)} />);
      case 3:
  			return (<Timer changeLevel={this.changeLevel.bind(this)}
                       log={this.logging.bind(this)} />);
			case 4:
				return (<GameLevel pool={pool}
                           level={1}
                           changeLevel={this.changeLevel.bind(this)}
                           log={this.logging.bind(this)}/>);
      case 5:
  			return (<Timer changeLevel={this.changeLevel.bind(this)}
                       log={this.logging.bind(this)} />);
			case 6:
				return (<GameLevel pool={pool}
                           level={2}
                           changeLevel={this.changeLevel.bind(this)}
                           log={this.logging.bind(this)}/>);
      case 7:
        return (<CutScene onClick={this.changeLevel.bind(this)}
                          textColor={"#000000"}
                          text={"FINISH."}
                          backgroundColor={"#FFFFFF"} />);
      case 8:
        return (<CutScene onClick={this.changeLevel.bind(this)}
                          textColor={"#000000"}
                          text={"FINISH.."}
                          backgroundColor={"#FFFFFF"} />);
      case 9:
        // Generate Log file here
        console.log(generated);
        var d = this.state.date;
        var rawData = {
                       date: d.toString(),
                       question : generated ,
                       data : this.state.data
                     };

        var file = JSON.stringify(rawData);

        //Send File to server here
        var URL = this.sendFileToServer(d.toString(),rawData,function(_url){
          alert("Upload Completed");
        });

        //Send log to client
        return (<CutScene onClick={this.changeLevel.bind(this)} textColor={"#FFFFFF"} text={"UPLOADING.."} backgroundColor={"#333333"} />);

      case 10:
        var d = this.state.date;
        var rawData = {date: d.toString(), question : generated ,data : this.state.data };
        var file = JSON.stringify(rawData);
        return (<div>{file} </div>);
    }
  }
}

export default App;
