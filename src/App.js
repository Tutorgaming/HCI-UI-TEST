import React from "react";
import ReactDOM from 'react-dom';

import GameLevel from "./components/GameLevel";
import WelcomePage from "./components/WelcomePage";
import Timer from "./components/Timer";

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
      question : []
    };

    this.generateQuestion();
  }

  generateQuestion(){

    for(var j = 0 ; j <3 ; j++){
        var my_question = [];
        var my_question2 = [];
        while(my_question.length < 6){
          var randomnumber=Math.ceil((Math.random()*6));
          var found=false;
          for(var i=0;i<my_question.length;i++){
        	     if(my_question[i]==randomnumber){found=true;break}
          }
          if(!found){
            my_question[my_question.length]=randomnumber;
            my_question2[my_question.length]=randomnumber;
          }
        }
        // for(var i = 0 ; i < 6 ; i++){
        //     my_question.push(Math.floor((Math.random() * 50) + 1));
        // }
        my_question2.splice(0, 1);
        generated.push(my_question2);
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

  sendFileToServer(filename , payloads , callback){
      // Config params for firebase
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCYkMSpWVyRUrCOQNNNGLvrqX9he3gcQuk",
        authDomain: "hci-tutor.firebaseapp.com",
        databaseURL: "https://hci-tutor.firebaseio.com",
        storageBucket: "hci-tutor.appspot.com",
      };
      firebase.initializeApp(config);

      // Create a storage reference
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      // Create file pointer to the object
      var blob = new Blob([JSON.stringify(payloads, null, 2)], {type : 'text/plain'});
      var uploadTask = storageRef.child(filename).put(blob);

      // LISTEN TO STATE CHANGE
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
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
      //console.log("UPLOAD COMPLETED!!!");
      var downloadURL = uploadTask.snapshot.downloadURL;
      return downloadURL;
    });

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

            FINISH

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

              FINISH.

          </div>);
      case 9:
        // Generate Log file here

        console.log(generated);
        var d = new Date();

        //d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000);
        var rawData = {date: d.toString(), question : generated ,data : this.state.data };
        var file = JSON.stringify(rawData);

        //Send log to client
        this.sendLog(d.toString(),file);

        //Send File to server here
        var URL = this.sendFileToServer(d.toString(),rawData);

        return (<div>{URL}</div>);
    }
  }
}

export default App;
