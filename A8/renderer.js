// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// define general variables
var mouse = document.getElementById("mouse");
var currVol;
var prevIndex = -1;
var targetIndex = -1;
const app = require('electron').remote.app;
const fileDir = app.getPath('desktop');
const path = require("path");

var fs = require('fs');

var dataLog = "";

var clicks = 0;

var maxTrials = 6;

var numIcons = 6;

var iconArr = [0,0,0,0,0,0];

var btn0 = document.getElementById("button-0");
var btn1 = document.getElementById("button-1");
var btn2 = document.getElementById("button-2");
var btn3 = document.getElementById("button-3");
var btn4 = document.getElementById("button-4");
var btn5 = document.getElementById("button-5");

var playerBtn = document.getElementById("player-button");
var startBtn = document.getElementById("start-button");
var player = document.getElementById("music-player");
var pauseBtn = document.getElementById("pause-button");

var parent = document.getElementById("volume-bar");
var icons = parent.children;

var counter = document.getElementById("counter");
var volDisplay = document.getElementById("volume-display");

var globVol = 100;




function save() { 
    fs.writeFile( path.resolve(fileDir, "JStest.csv"), dataLog, (err)=> {
      if (err) alert(err);
      alert("Data saved");
      iconArr = [0,0,0,0,0,0];
  });
 }                // saves data to file


function getBoundingBoxCenter(img){
  
  imgBoundingBox = img.getBoundingClientRect();
  
  var imgX = imgBoundingBox.left;
  var imgY = imgBoundingBox.top;

  imgX = imgBoundingBox.left + (50 / 2);
  imgY = imgBoundingBox.top + (50/ 2);
  return [imgX,imgY];
}

function sizeChange(userX, userY){
  
  // get the postion of imgs
  var b0Pos = getBoundingBoxCenter(btn0);
  var b1Pos = getBoundingBoxCenter(btn1);
  var b2Pos = getBoundingBoxCenter(btn2);
  var b3Pos = getBoundingBoxCenter(btn3);
  var b4Pos = getBoundingBoxCenter(btn4); 
  var b5Pos = getBoundingBoxCenter(btn5); 
  
  
  //putting in an array
  var posArr = [b0Pos,b1Pos,b2Pos,b3Pos,b4Pos,b5Pos];
  //travarse
  for(var j = 0; j<6; j++){
    var disX = Math.pow(userX-posArr[j][0],2);
    var disY = Math.pow(userY-posArr[j][1],2);
    //get the distance between user and imgs
    var distance = Math.sqrt(disX + disY);


    // if distance is smaller than 25, then keep the max size
    if(distance<25){
      if(j == 0){
        btn0.style.width = "150px";
        btn0.style.height = "150px";
      }
      if(j == 1){
        btn1.style.width = "150px";
        btn1.style.height = "150px";
      }
      if(j == 2){
        btn2.style.width = "150px";
        btn2.style.height = "150px";
      }
      if(j == 3){
        btn3.style.width = "150px";
        btn3.style.height = "150px";
      }
      if(j == 4){
        btn4.style.width = "150px";
        btn4.style.height = "150px";
      }
      if(j == 5){
        btn4.style.width = "150px";
        btn4.style.height = "150px";
      }
      
    }

    // if distance is smaller than 200, then do increasing 
    if(distance<200){
      if(j == 0){
        btn0.style.width = 50+(200-distance)*0.5+ "px";
        btn0.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 1){
        btn1.style.width = 50+(200-distance)*0.5+ "px";
        btn1.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 2){
        btn2.style.width = 50+(200-distance)*0.5+ "px";
        btn2.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 3){
        btn3.style.width = 50+(200-distance)*0.5+ "px";
        btn3.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 4){
        btn4.style.width = 50+(200-distance)*0.5+ "px";
        btn4.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 5){
        btn5.style.width = 50+(200-distance)*0.5+ "px";
        btn5.style.height = 50+(200-distance)*0.5 + "px";
      }
    
    // if distance is greater than 200, then resize imgs to 50x50
    }
    if(distance>200){
      if(j == 0){
        btn0.style.width = "50px";
        btn0.style.height = "50px";
      }
      if(j == 1){
        btn1.style.width = "50px";
        btn1.style.height = "50px";
      }
      if(j == 2){
        btn2.style.width = "50px";
        btn2.style.height = "50px";
      }
      if(j == 3){
        btn3.style.width = "50px";
        btn3.style.height = "50px";
      }
      if(j == 4){
        btn4.style.width = "50px";
        btn4.style.height = "50px";
      }
      if(j == 5){
        btn5.style.width = "50px";
        btn5.style.height = "50px";
      }
    }
  }
  

}


var mouseTrap = function(e)
{
    // get the user's location
    var userX = e.clientX;
    var userY = e.clientY;


    //var coords = document.getElementById("location");
    //coords.innerHTML = "You are at: (" + userX + "," + userY + ")";
    
    

    imgX = userX - (50 / 2);
    imgY = userY - (50 / 2);


      // get the postion of imgs
    var b0Pos = getBoundingBoxCenter(btn0);
    var b1Pos = getBoundingBoxCenter(btn1);
    var b2Pos = getBoundingBoxCenter(btn2);
    var b3Pos = getBoundingBoxCenter(btn3);
    var b4Pos = getBoundingBoxCenter(btn4); 
    var b5Pos = getBoundingBoxCenter(btn5); 

    
    var sttBtnPos = getBoundingBoxCenter(startBtn);
    var btnX = Math.abs(userX - sttBtnPos[0]);
    var btnY = Math.abs(userY - sttBtnPos[1]);
    //putting in an array
    var posArr = [b0Pos, b1Pos, b2Pos, b3Pos, b4Pos, b5Pos];
    //travarse
    for(var j = 0; j<6; j++){
      var disX = Math.abs(userX-posArr[j][0]);
      var disY = Math.abs(userY-posArr[j][1]);

      if(btnX < 25 && btnY < 25){
        mouse.style.display = "none";
        continue;
      }
      if(disY<150 && disX<100){
        
        mouse.style.left = imgX + "px";
        mouse.style.top = imgY + "px";
        mouse.style.zIndex = "99";


        switch(j){
          case 0:
            mouse.src = btn0.getAttribute("src");
            mouse.dataset.volume = btn0.dataset.volume;
            currSrc = btn0.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 1:
            mouse.src = btn1.getAttribute("src");
            mouse.dataset.volume = btn1.dataset.volume;
            currSrc = btn1.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 2:
            mouse.src = btn2.getAttribute("src");
            mouse.dataset.volume = btn2.dataset.volume;
            currSrc = btn2.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 3:
            mouse.src = btn3.getAttribute("src");
            mouse.dataset.volume = btn3.dataset.volume;
            currSrc = btn3.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 4:
            mouse.src = btn4.getAttribute("src");
            mouse.dataset.volume = btn4.dataset.volume;
            currSrc = btn4.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 5:
            mouse.src = btn5.getAttribute("src");
            mouse.dataset.volume = btn5.dataset.volume;
            currSrc = btn5.getAttribute("src");
            mouse.style.display = "block";
            break;
        }
      }
    }



    sizeChange(userX, userY);
}

function randomTarget() { 
    var iconIndex = Math.round(Math.random()*5);
    return iconIndex;
 }        // generates random volume to select

var timedClick = function()
{
  counter.innerHTML = "Trials Completed: " + clicks; 
  if(clicks==maxTrials){
    clicks=0;
    iconArr = [0,0,0,0,0,0];
    counter.innerHTML = "Trials Completed: " + clicks; 
    save();
    alert("Game reset.");
  }
  // disables the start button so user can't press it twice 
  startBtn.onclick = function(){      

  };

  // call randomIcon function to get random index and the matching icon
  
  
  while(true){
    targetIndex = randomTarget();
    if(iconArr[targetIndex]<(maxTrials/numIcons)){
      break;
    }
    
  }  
    
    var targetVol = targetIndex * 20;
    var currIcon = icons[targetIndex];

    document.getElementById("volume-target").innerHTML = "Set the volume to: " + targetVol;

  // Update the 'indicator' element to show the target icon 
  // Hint: you need to access the attribute of targetIcon
  //var tarSrc = targetIcon.getAttribute("src"); 
  //indicator.src = tarSrc;

  // start timing right here
  var startTime = performance.now();
  // this is where we are going to start watching for clicks on icons
  // this loop will add an onclick function to each icon
  //for(clicks; i < icons.length; i++)
  //{
    mouse.onclick = function()
    {

      // everything in here will occur when an icon is pressed

      // stop timing and record how long it took
      var stopTime = performance.now();
      // calculate time elapsed 
      var timeElapsed = Math.round(stopTime - startTime);
      // record whole milliseconds (use Math.round())
      alert("That took you: " + timeElapsed + " milliseconds.");
      
      

      // we want to ensure only 1 icon can be clicked at a time, so disable all the onclicks now! 
      // HINT: loop through all the icons and disable the function like we did with the start button
      //for(var i = 0 ; i<icons.length; i++){
      mouse.onclick = function(){};
      //}

      // record the time and positions of the target icon and the icon the user actually pressed

      // this is to be stored in a new line in the 'dataLog' variable
      // append to the 'dataLog' variable, a line like 'timeTaken','targetIndex','iconClicked'
      // to save you some headache, we define iconClicked for you
      //var iconClicked = this.id[1]; // INCLUDE THIS
      
      //if(iconClicked==targetIndex && clicks<maxTrials){
      var tarVol = mouse.dataset.volume;
      var currVol = currIcon.dataset.volume;

      if(currVol==tarVol && clicks<maxTrials){
        globVol = currVol;
        volDisplay.innerHTML = "Volume is set to: " + globVol;
        volPercent = currVol/100;
        player.volume = volPercent;
        iconArr[targetIndex]++;
        clicks++;
        var iconClicked;
        for(var k = 0; k<6; k++){
          iconClicked = parseInt(currVol)/20;
        }
        var data = clicks+","+targetIndex+","+iconClicked+","+timeElapsed+"\n";
        dataLog += data;
        //document.getElementById("data").innerHTML = datalog;
        counter.innerHTML = "Trials Completed: " + clicks; 
        //currVol="";
        currSrc="";
      }

      startBtn.onclick = timedClick;
    }





    //  disables the start button so it can't be clicked twice
    //  update task selection instruction 
    //  start timer 

    //  watch and see which button is clicked on during the task
    //////for( var i=0; i<buttons.length; i++ )
    //////{
        // attach an event listener to each button click
    /////    buttons[i].onclick = function()
    /////    {
            // 1. adjust volume
            // 2. call your technique specific function
            // 3. when task selection is completed, do all this:
            // - stop timer
            // - prevent other buttons from being selected
            // - figure out which button was clicked on
            // - log trial data 
            // - update/reset various interface elements
            // - check if maxTrials completed yet 
    /////   }
    /////}
}




document.onmousemove = mouseTrap;



window.onload = function()
{   
    playerBtn.onclick = function(){

        player.play();
        playerBtn.style.display = "none";
        pauseBtn.style.display = "block";
        volDisplay.innerHTML = "Volume is set to: " + globVol;

    }

    pauseBtn.onclick = function(){
        player.pause();
        playerBtn.style.display = "block";
        pauseBtn.style.display = "none";
        volDisplay.innerHTML = "Music Paused";
    }


    startBtn.onclick = timedClick;
    // setup technique specific callback function here
}