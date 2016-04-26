/**
 * By Manohar Gunturu
 * Mail at gunturumanohar2@gmail.com
 */


function rsSpeech(){
	
	var recognition,speaker,recognizing,prev_res;
	if (!('webkitSpeechRecognition' in window)) {
		console.error("Speech recognition is not supported");
	 }else{		 
		 recognition = new webkitSpeechRecognition();
		 speaker = new SpeechSynthesisUtterance();
		 recognition.continuous = true;
		 var arry_com = {};
		 recognition.interimResults = true;
		 var final_transcript = '';
		 this.start = function(l,callback){
			  final_transcript = '';
			  recognition.lang = l;
			  recognition.start();
			  ignore_onend = false;
			  recognition.onstart = function() {
					 recognizing = true;
					 callback();
			  }
		 }
		 
		this.on = function(s,f){
			s = s.toLowerCase();
			arry_com[s] = f;
		}
		 
		this.onresult = function(f){ 
		 recognition.onresult = function(event) {
			 var interim_transcript = '';
			 
			    if (typeof(event.results) == 'undefined') {
			      recognition.onend = null;
			      recognition.stop();
			      return;
			    }
			    
			    for (var i = event.resultIndex; i < event.results.length; ++i) {
			        if (event.results[i].isFinal) {
			          final_transcript += event.results[i][0].transcript;
					  prev_res = "";
			        } else {
			          interim_transcript += event.results[i][0].transcript;
			        }
			     }
			  
			  if(prev_res != interim_transcript && arry_com[interim_transcript.toLowerCase().trim()]){				  
				  arry_com[interim_transcript.toLowerCase().trim()]();
				  prev_res = interim_transcript;				  
			  }else{
				  console.log("nottt");
			  } 

			    f(final_transcript.replace("undefined",""),interim_transcript); 
              			  
		 }	 
		}
		
		this.speak = function(s){
			speaker.text = s;
			speechSynthesis.speak(speaker);
		}
		
		this.onerror = function(f){ 
		 recognition.onerror = function(e){
			 if(e == 'no-speech'){
				 f("No speech was detected. You may need to adjust your microphone settings");
			 }else if(e == 'audio-capture'){
				 f("No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.");
			 }
			 else if(e == 'not-allowed'){
				 f(" Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream");
			 }else{
				 
			 }
		 }
		}
		 
		 this.stop = function(){
			 recognition.stop();
		 }
		 
	 }
	
}
