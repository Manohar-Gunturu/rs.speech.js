# rs.speech.js
Speech recognition and talk back using Javascript.
rs.speech.js is written on top of Google SpeechRecognition and speechSynthesis.


<h4>To Make Web Application speak</h4>

 <pre> <code style="white-space: pre;">
     speechRs.speechinit('Google UK English Female',function(e){
	        speechRs.speak("Heyy how its going", function() {
                   //speaking completed.
               }, false);	  
     });
  </code> </pre>
  
  <h4>To make your webapp listen</h4>
  
  <pre> <code style="white-space: pre;">
    speechRs.rec_start('en-IN',function(final_transcript,interim_transcript){
      console.log(final_transcript,interim_transcript);
    });   
    speechRs.on("I am fine",function(){	
      alert("user spoken I am fine");
    });</code> </pre>

<p>
<code>final_transcript</code> is full transcript that captured from beginning of recording. <code>interim_transcript</code> is recent transcript that captured after the last break.
</p>

Don't run two <code>.speak()</code> at a time, instead use callback functions as shown below.
  
  <pre> <code style="white-space: pre;">
     speechRs.speechinit('Google UK English Female',function(e){
	  speechRs.speak("Heyy how its going", function() {
              speechRs.speak("This is after Heyy how its going",function(e) {	  
	      }, false); 
          }, false);	   
      });
  </code> </pre>
  
  The MIT License (MIT)
  Copyright (c) 2016 Manohar Gunturu
