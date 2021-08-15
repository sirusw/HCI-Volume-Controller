// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var mouseTrap = function(e) // more on this function style in a second
{
       // get the user's location
    var userX = e.clientX;
    var userY = e.clientY;

    // now let's print out the user's cursor coordinates
    var coords = document.getElementById("location");
    coords.innerHTML = "You are at: (" + userX + "," + userY + ")";

    imgX = userX - (50 / 2);
    imgY = userY - (50 / 2);
    cat.style.left = imgX + "px";
    cat.style.top = imgY + "px";
}


document.onmousemove = mouseTrap; // this is our event monitor


window.onload = function(){
  document.getElementById("closedbox").onclick = function(){
    document.getElementById("closedbox").style.display = "none";
    document.getElementById("openedbox").style.display="block";
    document.getElementById("cat").style.display="block";
  }
}