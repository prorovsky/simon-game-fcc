"use strict";

const greenBlock = document.querySelector("#green"),
      redBlock = document.querySelector("#red"),
      orangeBlock = document.querySelector("#orange"),
      blueBlock = document.querySelector("#blue"),
      startButton = document.querySelector("#start"),
      resetButton = document.querySelector("#reset");

let turn = 1; 

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

// TODO: variable turn decide how many numbers will be displayed
// create array playerNumbers when player click block this array add number to it
// compare sequence and playerNumbers if they equal then turn++ if not equal then start again

function startGame(event) {
    console.log('game started');
    const generatedNumbers = generateSequence(20);
    runSequence(generatedNumbers);
}

function generateSequence(num) {
    const result = [];
    for(let i = 0; i < num; i++) {
        result.push(generateRandomNumber(4));
    }
    return result;
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function runSequence(numbers) {
    for(let [index, number] of numbers.entries()) {
        setTimeout(activateBlockAI.bind(null, number), 1000 * index);
    }
}

function activateBlockAI(num) {
    switch(num) {
        case 0: 
            changePropertyOfBlock(greenBlock);
            break;
        case 1: 
            changePropertyOfBlock(redBlock);
            break;
        case 2: 
            changePropertyOfBlock(blueBlock);
            break;
        case 3: 
            changePropertyOfBlock(orangeBlock);
            break;
    }
}

function changePropertyOfBlock(event) {
    const block = event.target ? event.target : event;
    change(block);    
}

function change(block) {
    changeColorOfBlock(block);
    changeSizeOfBlock(block);
    disableEvents();
    resetBlockBack(block);
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