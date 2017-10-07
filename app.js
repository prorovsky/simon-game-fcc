"use strict";

const greenBlock = document.querySelector("#green"),
      redBlock = document.querySelector("#red"),
      orangeBlock = document.querySelector("#orange"),
      blueBlock = document.querySelector("#blue"),
      startButton = document.querySelector("#start"),
      resetButton = document.querySelector("#reset");

greenBlock.originColor = "darkgreen";
greenBlock.newColor = "green";
redBlock.originColor = "darkred";
redBlock.newColor = "red";
blueBlock.originColor = "darkblue";
blueBlock.newColor = "blue";
orangeBlock.originColor = "darkorange";
orangeBlock.newColor = "orange";

greenBlock.addEventListener("click", changePropertyOfBlock);
redBlock.addEventListener("click", changePropertyOfBlock);
blueBlock.addEventListener("click", changePropertyOfBlock);
orangeBlock.addEventListener("click", changePropertyOfBlock);

startButton.addEventListener("click", startGame);

function startGame(event) {
    console.log('game started');
    
}

function changePropertyOfBlock(event) {
    changeColorOfBlock(event.target);
    changeSizeOfBlock(event.target);
    disableEvents();
    resetBlockBack(event.target);
}

function resetBlockBack(colorBlock) {
    setTimeout(changeColorBlockToOrigin.bind(null, colorBlock), 500);
}

function changeColorBlockToOrigin(colorBlock) {
    changeColorToOrigin(colorBlock);
    changeSizeToOrigin(colorBlock);
    enableEvents();
}

function changeColorOfBlock(colorBlock) {
    colorBlock.style.backgroundColor = colorBlock.newColor;
}

function changeSizeOfBlock(colorBlock) {
    colorBlock.style.transform = ("scale(1.09, 1.09)");
}

function changeColorToOrigin(colorBlock) {
    colorBlock.style.backgroundColor = colorBlock.originColor;   
}

function changeSizeToOrigin(colorBlock) {
    colorBlock.style.transform = ("scale(1, 1)");
}

function disableEvents() {
    redBlock.style.pointerEvents = 'none';
    blueBlock.style.pointerEvents = 'none';
    orangeBlock.style.pointerEvents = 'none';
    greenBlock.style.pointerEvents = 'none';
}

function enableEvents() {
    redBlock.style.pointerEvents = 'auto';
    blueBlock.style.pointerEvents = 'auto';
    orangeBlock.style.pointerEvents = 'auto';
    greenBlock.style.pointerEvents = 'auto';
}