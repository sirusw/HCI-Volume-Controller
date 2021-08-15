// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// making sure the JavaScript and HTML are in the correct files
document.getElementById("message").innerHTML = "You Put The JS and HTML in The Right Files!";

var game = document.getElementById("message");

var userNumber = document.getElementById("number");

var gameButton = document.getElementById("startGame");
gameButton.onclick = function(){
    
    var randomNumber = Math.round(Math.random()*20 + 5);
    var userNum = userNumber.value;
    if (randomNumber == userNum){
        game.innerHTML = "You won! It was " + randomNumber;
    }
    else{
        game.innerHTML = "You lost! It was " + randomNumber;
    }
    
}