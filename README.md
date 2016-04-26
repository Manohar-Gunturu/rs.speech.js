# rs.speech.js
Speech recognition and talk back using Javascript.
rs.speech.js is written on top of Google SpeechRecognition and speechSynthesis.

To check the demo and documentation go to http://uikindle.com/speech/index.html


<h4>To Start speech recognition</h4>

 <pre> <code style="white-space: pre;">
    var speech = new rsSpeech(); <br>
     speech.start("en-IN",function(){ <br>
       //started recognition. </br>
     }); <br>
  </code> </pre>
  
  <h4>To make your webapp speak, use <code>.speak()</code> method as shown below</h4>
  
  <pre> <code style="white-space: pre;">
    var speech = new rsSpeech(); <br>
    speech.speak("Hello how it is going");
  </code> </pre>
