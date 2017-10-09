"use strict";

const greenBlock = document.querySelector("#green"),
      redBlock = document.querySelector("#red"),
      orangeBlock = document.querySelector("#orange"),
      blueBlock = document.querySelector("#blue"),
      startButton = document.querySelector("#start"),
      resetButton = document.querySelector("#reset"),
      arrayOfBlocks = [greenBlock, redBlock, blueBlock, orangeBlock];

let turn = 1;
//
let currentNumbers;
let playerNumbers;
let generatedNumbers;

greenBlock.originColor = "darkgreen";
greenBlock.newColor = "green";
greenBlock.number = 0;
redBlock.originColor = "darkred";
redBlock.newColor = "red";
redBlock.number = 1;
blueBlock.originColor = "darkblue";
blueBlock.newColor = "blue";
blueBlock.number = 2;
orangeBlock.originColor = "darkorange";
orangeBlock.newColor = "orange";
orangeBlock.number = 3;

greenBlock.addEventListener("click", changePropertyOfBlock);
redBlock.addEventListener("click", changePropertyOfBlock);
blueBlock.addEventListener("click", changePropertyOfBlock);
orangeBlock.addEventListener("click", changePropertyOfBlock);
startButton.addEventListener("click", startGame);

function startGame(event) {
    generatedNumbers = generateSequence(20);
    playerNumbers = [];
    
    // game loop
        currentNumbers = generatedNumbers.slice(0, turn);
        runSequence(currentNumbers);
}

function generateSequence(num) {
    const result = [];
    for(let i = 0; i < num; i++) {
        result.push(generateRandomNumber(arrayOfBlocks.length));
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
    changePropertyOfBlock(arrayOfBlocks[num]);
}

function changePropertyOfBlock(event) {
    event.target ? changePlayer(event.target) : change(event);
}

function changePlayer(block) {
    change(block);
    //
    playerNumbers.push(block.number);
    console.log('currentNumbers', currentNumbers);
    console.log('playerNumbers', playerNumbers);
    if(isSame(currentNumbers, playerNumbers)) {
        console.log('good they same');
        turn++;
        currentNumbers = generatedNumbers.slice(0, turn);
        // delay when player complete sequence
        setTimeout(runSequence.bind(null, currentNumbers), 1000);
        playerNumbers.length = 0;
    } else if(!compareArraySeq(currentNumbers, playerNumbers)) {
        playerNumbers.length = 0;
        // delay and run this sequence again
        setTimeout(runSequence.bind(null, currentNumbers), 1000);
        console.log('bad');
        // then get here message about wrong sequence
    }
}
// get better name to this function this is predicate 
function compareArraySeq(arr1, arr2) {
    return arr1.slice(0, arr2.length).join(' ') == arr2.slice(0, arr1.length).join(' ');
}

function isSame(arr1, arr2) {
    return arr1.every((el, index) => {
       return el === arr2[index];
    });
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