// references to HTML elements
var knob = document.querySelector(".circle");
var volumeDisplay = document.getElementById("volume-display");
var musicPlayer = document.getElementById("music-player");
var sliderBar = document.getElementById("slider-bar");

// check the state of the gesture every 20ms
setInterval(checkGesture,20);

// holds the most recently sampled gesture value
var currGestureValue = -1;

// function will be called at set intervals to check the gesture state
function checkGesture()
{
  // if a gesture is occuring, sample gesture parameter values
  if(gestureOccuring)
  {
    currGestureValue = Math.round((xValue-50)/2);
    if(currGestureValue<0)currGestureValue=0;
    if(currGestureValue>100)currGestureValue=100;
    
    setVolume(currGestureValue);
    
  }
}


function getBoundingBoxLR(img){
  imgBoundingBox = img.getBoundingClientRect();
  
  var imgL = imgBoundingBox.left;
  var imgR = imgBoundingBox.right;
  return [imgL, imgR];
}

// this function handles volume setting 
// translates the desired volume into the actual pixel placement of the slider
function setVolume(volume)
{
  volumeDisplay.innerHTML = volume;
  volPercent = volume/100;
  musicPlayer.volume = volPercent;
  var sliderLR = getBoundingBoxLR(sliderBar);
  var lineStart = sliderLR[0] + 253;
  var lineEnd = sliderLR[0] + 548;
  var lineLen = lineEnd - lineStart;
  var volChange = lineStart+volPercent*lineLen + "px";
  knob.style.left = volChange;
}
