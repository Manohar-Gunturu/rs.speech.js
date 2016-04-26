function rsSpeech(){var e,t,n,o
if("webkitSpeechRecognition"in window){e=new webkitSpeechRecognition,t=new SpeechSynthesisUtterance,e.continuous=!0
var s={}
e.interimResults=!0
var i=""
this.start=function(t,o){i="",e.lang=t,e.start(),ignore_onend=!1,e.onstart=function(){n=!0,o()}},this.on=function(e,t){e=e.toLowerCase(),s[e]=t},this.onresult=function(t){e.onresult=function(n){var r=""
if(void 0===n.results)return e.onend=null,void e.stop()
for(var c=n.resultIndex;c<n.results.length;++c)n.results[c].isFinal?(i+=n.results[c][0].transcript,o=""):r+=n.results[c][0].transcript
o!=r&&s[r.toLowerCase().trim()]?(s[r.toLowerCase().trim()](),o=r):console.log("nottt"),t(i.replace("undefined",""),r)}},this.speak=function(e){t.text=e,speechSynthesis.speak(t)},this.onerror=function(t){e.onerror=function(e){"no-speech"==e?t("No speech was detected. You may need to adjust your microphone settings"):"audio-capture"==e?t("No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly."):"not-allowed"==e&&t(" Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream")}},this.stop=function(){e.stop()}}else console.error("Speech recognition is not supported")}