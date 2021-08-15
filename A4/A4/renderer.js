// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// Tips and hints are provided throughout, make sure to read them!
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
  });
}

/////////////////////////////////////////////
// TODO: Complete the randomIcon function! //
/////////////////////////////////////////////

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
    counterDisplay.innerHTML = clicks + " tasks of 5 completed";
    save();
    alert("Game reset.");
  }
  // disables the start button so user can't press it twice 
  startButton.onclick = function(){      

};

  // call randomIcon function to get random index and the matching icon
  
  
  while(targetIndex==prevIndex){
      targetIndex = randomIcon();
      var targetIcon = icons[targetIndex];
  }
  prevIndex = targetIndex;


  // Update the 'indicator' element to show the target icon 
  // Hint: you need to access the attribute of targetIcon
  indicator.src = targetIcon.getAttribute("src");

  // start timing right here
  var startTime = performance.now();
  // this is where we are going to start watching for clicks on icons
  // this loop will add an onclick function to each icon
  for(var i=0; i < icons.length; i++)
  {
    icons[i].onclick = function()
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
      for(var i = 0 ; i<icons.length; i++){
          icons[i].onclick = function(){};
      }

      // record the time and positions of the target icon and the icon the user actually pressed

      // this is to be stored in a new line in the 'dataLog' variable
      // append to the 'dataLog' variable, a line like 'timeTaken','targetIndex','iconClicked'
      // to save you some headache, we define iconClicked for you
      var iconClicked = this.id[1]; // INCLUDE THIS
      
      if(iconClicked==targetIndex && clicks<maxTrials){
        clicks++;
        var data = clicks+","+targetIndex+","+iconClicked+","+timeElapsed+"\n";
        dataLog += data;
        //document.getElementById("data").innerHTML = datalog;
        counterDisplay.innerHTML = clicks + " tasks of 5 completed";
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
  }
}

window.onload = function() 
{ 
  // majority of the work will be done in timedClick
  startButton.onclick = timedClick;
}