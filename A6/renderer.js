// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// Tips and hints are provided throughout, make sure to read them!



var mouse = document.getElementById("mouse");
var currSrc;
var prevIndex = -1;
var targetIndex = -1;
const app = require('electron').remote.app;
const fileDir = app.getPath('desktop');
const path = require("path");

var fs = require('fs');

// this will hold all the data we need
var dataLog = "";

// this will count how many clicks have occured
var clicks = 0;
// max number of trials to run 
var maxTrials = 5;

var numIcons = 5;

var iconArr = [0,0,0,0,0];

var i0 = document.getElementById("i0");
var i1 = document.getElementById("i1");
var i2 = document.getElementById("i2");
var i3 = document.getElementById("i3");
var i4 = document.getElementById("i4");



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO: Complete these declaration statements to get all the required elements from your HTML file! 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// reference our start button
var startButton = document.getElementById("startBtn");

// display how many tasks a user has completed (choose the correct HTML element)
var counterDisplay = document.getElementById("counter");
counterDisplay.innerHTML = clicks + " tasks of 5 completed";

// display the target icon to click (find the element with this HTML tag)
var indicator = document.getElementById("indicator");


// element that holds all your icons 
var parent = document.getElementById("iconDrawer");


// array of all icons (hint: use the parent var to reference its children icons)
var icons = parent.children;


/////////////////////////////////////////////////////////////////////////////////////
// TODO: Set the filepath so you know where the .csv file is going! 
/////////////////////////////////////////////////////////////////////////////////////

function save()
{
  // change the filepath in the writeFile() function
  fs.writeFile( path.resolve(fileDir, "JStest.csv"), dataLog, (err)=> {
    if (err) alert(err);
    alert("Data saved");
    iconArr = [0,0,0,0,0];
  });
}

/////////////////////////////////////////////
// TODO: Complete the randomIcon function! //
/////////////////////////////////////////////
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
  var i0Pos = getBoundingBoxCenter(i0);
  var i1Pos = getBoundingBoxCenter(i1);
  var i2Pos = getBoundingBoxCenter(i2);
  var i3Pos = getBoundingBoxCenter(i3);
  var i4Pos = getBoundingBoxCenter(i4); 
  
  
  //putting in an array
  var posArr = [i0Pos, i1Pos, i2Pos, i3Pos, i4Pos];
  //travarse
  for(var j = 0; j<5; j++){
    var disX = Math.pow(userX-posArr[j][0],2);
    var disY = Math.pow(userY-posArr[j][1],2);
    //get the distance between user and imgs
    var distance = Math.sqrt(disX + disY);


    // if distance is smaller than 25, then keep the max size
    if(distance<25){
      if(j == 0){
        i0.style.width = "150px";
        i0.style.height = "150px";
      }
      if(j == 1){
        i1.style.width = "150px";
        i1.style.height = "150px";
      }
      if(j == 2){
        i2.style.width = "150px";
        i2.style.height = "150px";
      }
      if(j == 3){
        i3.style.width = "150px";
        i3.style.height = "150px";
      }
      if(j == 4){
        i4.style.width = "150px";
        i4.style.height = "150px";
      }
      
    }

    // if distance is smaller than 200, then do increasing 
    if(distance<200){
      if(j == 0){
        i0.style.width = 50+(200-distance)*0.5+ "px";
        i0.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 1){
        i1.style.width = 50+(200-distance)*0.5+ "px";
        i1.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 2){
        i2.style.width = 50+(200-distance)*0.5+ "px";
        i2.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 3){
        i3.style.width = 50+(200-distance)*0.5+ "px";
        i3.style.height = 50+(200-distance)*0.5 + "px";
      }
      if(j == 4){
        i4.style.width = 50+(200-distance)*0.5+ "px";
        i4.style.height = 50+(200-distance)*0.5 + "px";
      }
    
    // if distance is greater than 200, then resize imgs to 50x50
    }
    if(distance>200){
      if(j == 0){
        i0.style.width = "50px";
        i0.style.height = "50px";
      }
      if(j == 1){
        i1.style.width = "50px";
        i1.style.height = "50px";
      }
      if(j == 2){
        i2.style.width = "50px";
        i2.style.height = "50px";
      }
      if(j == 3){
        i3.style.width = "50px";
        i3.style.height = "50px";
      }
      if(j == 4){
        i4.style.width = "50px";
        i4.style.height = "50px";
      }
    }
  }
  

}
var mouseTrap = function(e)
{
    // get the user's location
    var userX = e.clientX;
    var userY = e.clientY;

    // now let's print out the user's cursor coordinates
    var coords = document.getElementById("location");
    coords.innerHTML = "You are at: (" + userX + "," + userY + ")";
    
    

    imgX = userX - (50 / 2);
    imgY = userY - (50 / 2);


      // get the postion of imgs
    var i0Pos = getBoundingBoxCenter(i0);
    var i1Pos = getBoundingBoxCenter(i1);
    var i2Pos = getBoundingBoxCenter(i2);
    var i3Pos = getBoundingBoxCenter(i3);
    var i4Pos = getBoundingBoxCenter(i4); 

    var startButton = document.getElementById("startBtn");
    var sttBtnPos = getBoundingBoxCenter(startButton);
    var btnX = Math.abs(userX - sttBtnPos[0]);
    var btnY = Math.abs(userY - sttBtnPos[1]);
    //putting in an array
    var posArr = [i0Pos, i1Pos, i2Pos, i3Pos, i4Pos];
    //travarse
    for(var j = 0; j<5; j++){
      var disX = Math.abs(userX-posArr[j][0]);
      var disY = Math.abs(userY-posArr[j][1]);

      if(btnX < 25 && btnY < 25){
        mouse.style.display = "none";
        continue;
      }
      if(disY<250 && disX<100){
        
        mouse.style.left = imgX + "px";
        mouse.style.top = imgY + "px";
        switch(j){
          case 0:
            mouse.src = i0.getAttribute("src");
            currSrc = i0.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 1:
            mouse.src = i1.getAttribute("src");
            currSrc = i1.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 2:
            mouse.src = i2.getAttribute("src");
            currSrc = i2.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 3:
            mouse.src = i3.getAttribute("src");
            currSrc = i3.getAttribute("src");
            mouse.style.display = "block";
            break;
          case 4:
            mouse.src = i4.getAttribute("src");
            currSrc = i4.getAttribute("src");
            mouse.style.display = "block";
            break;
        }
      }
    }



    sizeChange(userX, userY);
}

function randomIcon()
{
  // Generate a random number in the appropriate range 
  var iconIndex = Math.round(Math.random()*4);

  return iconIndex;
}



/////////////////////////////////////////////
// TODO: Complete the timedClick function! //
/////////////////////////////////////////////
var timedClick = function()
{
  if(clicks==maxTrials){
    clicks=0;
    iconArr = [0,0,0,0,0];
    counterDisplay.innerHTML = clicks + " tasks of 5 completed";
    save();
    alert("Game reset.");
  }
  // disables the start button so user can't press it twice 
  startButton.onclick = function(){      

  };

  // call randomIcon function to get random index and the matching icon
  
  
  while(true){
    targetIndex = randomIcon();
    if(iconArr[targetIndex]<(maxTrials/numIcons)){
      break;
    }
  }  
    
    var targetIcon = icons[targetIndex];


  // Update the 'indicator' element to show the target icon 
  // Hint: you need to access the attribute of targetIcon
  var tarSrc = targetIcon.getAttribute("src"); 
  indicator.src = tarSrc;

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
      
      if(currSrc==tarSrc && clicks<maxTrials){
        iconArr[targetIndex]++;
        clicks++;
        var iconClicked;
        for(var k = 0; k<5; k++){
          if(document.getElementById("i"+k).getAttribute("src") == currSrc){
            iconClicked = k;
          }
        }
        var data = clicks+","+targetIndex+","+iconClicked+","+timeElapsed+"\n";
        dataLog += data;
        //document.getElementById("data").innerHTML = datalog;
        counterDisplay.innerHTML = clicks + " tasks of 5 completed";
        currSrc="";
      }



      

      // now add to the end of the 'dataLog' variable as explained above

      // increment clicks completed
      

      // update what the counterDisplay says!
      // modify the innerHTML property of counterDisplay
      // it should show the user how many clicks have currently been completed

      // if maxTrials is reached, then data collection is over, so call save and reset 'clicks' and 'dataLog'

      // reactivate the start button by changing the onclick function from nothing back to starting the trial
      startButton.onclick = timedClick;
    }
  //}
}



document.onmousemove = mouseTrap;



window.onload = function() 
{ 
  // majority of the work will be done in timedClick

  startButton.onclick = timedClick;



  //document.onmousemove =  sizeChange;
}