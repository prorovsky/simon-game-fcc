"use strict";

const greenBlock = document.querySelector("#green"),
      redBlock = document.querySelector("#red"),
      orangeBlock = document.querySelector("#orange"),
      blueBlock = document.querySelector("#blue"),
      startButton = document.querySelector("#start"),
      resetButton = document.querySelector("#reset"),
      strictMode = document.querySelector("#strictMode"),
      arrayOfBlocks = [greenBlock, redBlock, blueBlock, orangeBlock],
      gameState = Object.seal({
          turn: 1,
          strict: false,
          currentNumbers: [],
          playerNumbers: [],
          generatedNumbers: []
      });

function startGame(event) {
    gameState.generatedNumbers = generateSequence(20);
    gameState.playerNumbers = [];
    
    // game loop
        gameState.currentNumbers = gameState.generatedNumbers.slice(0, gameState.turn);
        runSequence(gameState.currentNumbers);
}

function setStrictMode(event) {
    gameState.strict = event.target.checked;
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

//===================================
function changePlayer(block) {
    change(block);
    //
    gameState.playerNumbers.push(block.number);
    console.log('currentNumbers', gameState.currentNumbers);
    console.log('playerNumbers', gameState.playerNumbers);
    if(isSame(gameState.currentNumbers, gameState.playerNumbers)) {
        console.log('good they same');

        // reset game and show win message
        if(gameState.turn === 3) {
            console.log("You Win");
        }

        gameState.turn += 1;
        gameState.currentNumbers = gameState.generatedNumbers.slice(0, gameState.turn);
        delayAndRunSequenceAgain(1000);
        gameState.playerNumbers.length = 0;
    } else if(!compareArraySeq(gameState.currentNumbers, gameState.playerNumbers)) {
        gameState.playerNumbers.length = 0;
        gameState.strict ? resetGame() : delayAndRunSequenceAgain(1000);
        console.log('bad');
        // then get here message about wrong sequence
    }
}
//======================================================

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

function resetGame() {
    resetGameState();
    delayAndRunSequenceAgain(1500);
}

function resetGameState() {
    gameState.turn = 1;
    gameState.generatedNumbers = generateSequence(20);
    gameState.playerNumbers.length = 0;
    gameState.currentNumbers = gameState.generatedNumbers.slice(0, gameState.turn);
}

function delayAndRunSequenceAgain(ms) {
    setTimeout(runSequence.bind(null, gameState.currentNumbers), ms);
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

(function prepareGame(aob) {
    aob.forEach(block => {
        switch(block.id) {
            case "green":
                setBlockProperty(block, "darkgreen", "green", 0);
                break;
            case "red":
                setBlockProperty(block, "darkred", "red", 1);
                break;
            case "blue":
                setBlockProperty(block, "darkblue", "blue", 2);
                break;
            case "orange":
                setBlockProperty(block, "darkorange", "orange", 3);
                break;
        }
    });
    setEventsToButtons();

    function setBlockProperty(block, originColor, newColor, number) {
        block.originColor = originColor;
        block.newColor = newColor;
        block.number = number;
    }

    function setEventsToButtons() {
        aob.forEach(block => block.addEventListener("click", changePropertyOfBlock));
        startButton.addEventListener("click", startGame);
        resetButton.addEventListener("click", resetGame);
        strictMode.addEventListener("change", setStrictMode);
    }

}(arrayOfBlocks));