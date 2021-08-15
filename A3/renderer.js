// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var clicked = false;
var portraitSection = document.getElementById("portrait-section");
var portraits = portraitSection.children;
var anxiety = portraits[2];
var despair = portraits[1];
var scream = portraits[0];
portraitSection.appendChild( anxiety );
portraitSection.appendChild( despair );
portraitSection.appendChild( scream );
window.onload = function(){
    var startTime = performance.now();

    for(var i=0; i < portraits.length; i++){
        if(i==1){
        portraits[1].onclick = function(){ 
          if(clicked==false){
            if(Math.random()>0.5){
              portraits[1].height += 50;
              portraits[1].width += 50;
            }
            else{
              portraits[1].height -= 50;
              portraits[1].width -= 50;
            }
            clicked=true;
          }
          else{
            clicked=false;
            portraits[1].height = 200;
            portraits[1].width = 200;
          }
          
            
            
        }
          continue;
        }
        portraits[i].onclick = function(){ 

            alert("Don't Touch The Paintings! "); 
            
        }
    }
    var doneViewing = document.getElementById("fee");
    doneViewing.onclick = function(){
      var endTime = performance.now();
      var timeTaken = Math.round(endTime - startTime);
      var fee = Math.round(( timeTaken / 60 / 1000 ) * 20);
      alert("You need to pay $"+fee);
    }
}