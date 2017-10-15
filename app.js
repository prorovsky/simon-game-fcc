"use strict";

const greenBlock = document.querySelector("#green"),
      redBlock = document.querySelector("#red"),
      orangeBlock = document.querySelector("#orange"),
      blueBlock = document.querySelector("#blue"),
      count = document.querySelector("#count"),
      startButton = document.querySelector("#start"),
      resetButton = document.querySelector("#reset"),
      strictMode = document.querySelector("#strict-mode"),
      gameMessage = document.querySelector("#game-message"),
      requiredTurns = 3,
      arrayOfBlocks = [greenBlock, redBlock, blueBlock, orangeBlock],
      gameState = Object.seal({
          turn: 1,
          strict: false,
          currentNumbers: [],
          playerNumbers: [],
          generatedNumbers: []
      });

disableEvents();

function startGame(event) {
    enableEvents();
    gameState.generatedNumbers = generateSequence(20);
    gameState.playerNumbers = [];
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

function changePlayer(block) {
    change(block);
    gameState.playerNumbers.push(block.number);
    if(isSame(gameState.currentNumbers, gameState.playerNumbers)) {
        isPlayerWin();
        handleRightMove();
    } else if(!compareArraySeq(gameState.currentNumbers, gameState.playerNumbers)) {
        handleErrorMove();   
    }
}

function compareArraySeq(arr1, arr2) {
    return arr1.slice(0, arr2.length).join(' ') == arr2.slice(0, arr1.length).join(' ');
}

function isPlayerWin() {
    if(gameState.turn === requiredTurns) {
        writeGameMessage("You Win!", "alert-success", "alert-danger");
        confirm("Do you want to continue?") ? continueGame() : stopGame();
    }
}

function handleRightMove() {
    count.innerHTML = gameState.turn;
    gameState.turn += 1;
    gameState.currentNumbers = gameState.generatedNumbers.slice(0, gameState.turn);
    delayAndRunSequenceAgain(1000);
    gameState.playerNumbers.length = 0;
}

function handleErrorMove() {
    gameState.playerNumbers.length = 0;
    gameState.strict ? resetGame() : delayAndRunSequenceAgain(1000);
    writeGameMessage("Wrong!", "alert-danger", "alert-success");
    setTimeout(clearGameMessage, 1000);
}

function continueGame() {
    writeGameMessage("Go as much as you can!", "alert-success", "alert-danger");
    setTimeout(clearGameMessage, 2000);
}

function stopGame() {
    gameState.turn = 1;
    gameState.generatedNumbers.length = 0;
    count.innerHTML = 0;
    setTimeout(clearGameMessage, 2000);
    removeEvents();
}

function removeEvents() {
    arrayOfBlocks.forEach(block => {
        block.removeEventListener("click", changePropertyOfBlock);
    });
    startButton.removeEventListener("click", startGame);
    resetButton.removeEventListener("click", resetGame);
}

function isSame(arr1, arr2) {
    return arr1.every((el, index) => {
       return el === arr2[index];
    });
}

function writeGameMessage(text, style, oldStyle) {
    gameMessage.classList.remove(oldStyle);
    gameMessage.classList.add(style);
    gameMessage.innerHTML = text;
}

function clearGameMessage() {
    gameMessage.innerHTML = "";
}

function change(block) {
    playSound(block);
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
    count.innerHTML = gameState.turn - 1;
    gameState.generatedNumbers = generateSequence(20);
    gameState.playerNumbers.length = 0;
    gameState.currentNumbers = gameState.generatedNumbers.slice(0, gameState.turn);
}

function delayAndRunSequenceAgain(ms) {
    setTimeout(runSequence.bind(null, gameState.currentNumbers), ms);
}

function playSound(colorBlock) {
    colorBlock.sound.play();
}

function changeColorOfBlock(colorBlock) {
    colorBlock.style.backgroundColor = colorBlock.newColor;
}

function changeSizeOfBlock(colorBlock) {
    colorBlock.style.transform = ("scale(1.09, 1.16)");
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

    const greenProperty = {
        originColor: "darkgreen",
        newColor: "green",
        number: 0,
        sound: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
    },
    redProperty = {
        originColor: "darkred",
        newColor: "red",
        number: 1,
        sound: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
    }, 
    blueProperty = {
        originColor: "darkblue",
        newColor: "blue",
        number: 2,
        sound: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
    },
    orangeProperty = {
        originColor: "darkorange",
        newColor: "orange",
        number: 3,
        sound: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    };

    aob.forEach(block => {
        switch(block.id) {
            case "green":
                setBlockProperty(block, greenProperty);
                break;
            case "red":
                setBlockProperty(block, redProperty);
                break;
            case "blue":
                setBlockProperty(block, blueProperty);
                break;
            case "orange":
                setBlockProperty(block, orangeProperty);
                break;
        }
    });
    setEventsToButtons();

    function setBlockProperty(block, propertyObj) {
        block.originColor = propertyObj.originColor;
        block.newColor = propertyObj.newColor;
        block.number = propertyObj.number;
        block.sound = new Audio(propertyObj.sound);
    }

    function setEventsToButtons() {
        aob.forEach(block => block.addEventListener("click", changePropertyOfBlock));
        startButton.addEventListener("click", startGame);
        resetButton.addEventListener("click", resetGame);
        strictMode.addEventListener("change", setStrictMode);
    }

}(arrayOfBlocks));