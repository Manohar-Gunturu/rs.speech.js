# rs.speech.js
Speech recognition and talk back using Javascript.
rs.speech.js is written on top of Google SpeechRecognition and speechSynthesis. Check at https://jsfiddle.net/gunturumanohar/u3mxghfa/ and https://jsfiddle.net/gunturumanohar/xsf3j64d/1/ .


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
  
  
Speech name and lang table:

| Speech name             | lang          |
| ------------------------| ------------- |
| native (preferable)                  |      native   |
| Google Deutsch          | de-DE         |
| Google US English       | en-US     |
| Google UK English Female| en-GB     |
| Google UK English Male  | en-GB |
| Google español          | es-ES  |
| Google español de Estados Unidos | es-US |
| Google français | fr-FR |
| Google हिन्दी | hi-IN |
| Google Bahasa Indonesia| id-ID |
| Google italiano | it-IT |
| Google 日本語 | ja-JP |
| Google 한국의 | ko-KR |
| Google Nederlands | nl-NL |
| Google polski | pl-PL |
| Google português do Brasil | pt-BR |
| Google русский | ru-RU |
| Google 普通话（中国大陆） | zh-CN |
| Google 粤語（香港）| zh-HK |
| Google 國語（臺灣）| zh-TW |  
  
  The MIT License (MIT)
  Copyright (c) 2016 Manohar Gunturu
