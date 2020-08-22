var speechRs = speechRs || {};
speechRs.speechinit = function(lang,cb,bcolor,color,pitch,rate){
   this.speaker = new SpeechSynthesisUtterance();
   this.speaker.pitch=pitch || 1;
   this.speaker.rate=rate || 1;  
   this.lan = lang;
   var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.rsClass{background-color:'+(bcolor || "#4f91e6")+';color:'+(color || "#fff")+';}';
	document.getElementsByTagName('head')[0].appendChild(style);
   setTimeout(function(){
   speechRs.speaker.voice = speechSynthesis.getVoices().
     filter(function(voice) {  return voice.name == speechRs.lan; })[0];
   },500);
   if(lang == 'native'){
	cb(this);
   }else{
     setTimeout(function(){
	 cb(speechRs)
	 },1000);
   }
  }
  
speechRs.speak = function(text,cb,isHighlightText) {
	 let j=0,el,ar=[];
     speechRs.speaker.voice = speechSynthesis.getVoices().
     filter(function(voice) {  return voice.name == speechRs.lan; })[0];
	 this.speaker.onend = function(e) {
		cb(e);
      };
      if (typeof text == 'string') {
        this.speaker.text = text;
         speechSynthesis.speak(this.speaker);
      } else {
	   if(isHighlightText){
		    j = 0;
		    el = text;
		    ar = (text.innerHTML).split(".");
		    readop(ar[j]);		
	    }else{
		  this.speaker.text = text.innerHTML;
                  speechSynthesis.speak(this.speaker);
	    }     
       }
	
	function readop(x){
	  speechRs.speaker.text = x;
	  if(j != 0){
	    //el.querySelector(".rsClass").className = "";
	  }
	  el.innerHTML = (el.innerHTML).replace(ar[j],"<span class='rsClass'>"+ar[j]+"</span>");
	  speechSynthesis.speak(speechRs.speaker);
	  speechRs.speaker.onend = function(e){
	     if(j < ar.length){
	       speechRs.unwrap(document.querySelector('.rsClass'));
	       readop(ar[++j]);
	    }
	  }
	}
  }
  
speechRs.rec_start = function(l,callback){
    
	 this.recognition = new webkitSpeechRecognition();
	 this.recognition.continuous = true;
	 this.recognition.interimResults = true;
         this.arry_com = {};
	 this.final_transcript = '';
         this.recognition.lang = l;
	 this.recognition.start();
	 this.ignore_onend = false;
	 this.recognition.onstart = function(c) {	
	    
         }
	let prev_res='';
	this.recognition.onresult = function(event) {
			 let interim_transcript = '';			 
			    if (typeof(event.results) == 'undefined') {
			      speechRs.recognition.onend = null;
			      speechRs.recognition.stop();
			      return;
			    }
			    
			    for (var i = event.resultIndex; i < event.results.length; ++i) {
			        if (event.results[i].isFinal) {
				   prev_res='';
			           speechRs.final_transcript += event.results[i][0].transcript;
			           } else {
			          interim_transcript += event.results[i][0].transcript;
			          
                                 }
			     }
			  
			  if(prev_res != interim_transcript && speechRs.arry_com[interim_transcript.toLowerCase().trim()]){				  
			       prev_res = interim_transcript;	  
                               speechRs.arry_com[interim_transcript.toLowerCase().trim()]();
				  				  
			  }else{
			  } 

			    callback(speechRs.final_transcript.replace("undefined",""),interim_transcript); 
              			  
		       }	
}

speechRs.unwrap = function(wrapper) {
    // place childNodes in document fragment
    var docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
        var child = wrapper.removeChild(wrapper.firstChild);
        docFrag.appendChild(child);
    }
    // replace wrapper with document fragment
    wrapper.parentNode.removeChild(document.querySelector('.rsClass'));
}

speechRs.on = function(s,f){
	this.arry_com[s.toLowerCase()] = f;
} 

speechRs.rec_stop = function(callback){
  this.recognition.stop();
  this.recognition.onstop = function() {
	 return callback(); 
  }	   
}
