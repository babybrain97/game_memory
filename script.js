import GameSquare from "./modules/GameSquare.js"
import {
    insertSquares,
    deleteSquares
} from "./modules/insertSquares.js"

// variables
let gameSquares = [];
let lockedSquares = [];
let gameRunning = false;
let moveCount = 0;

let gameDifficulty = {
    easy: {
        numberOfSquares: 16,
        secondsToFinish: 60,
        numberOfImages: 8
    },
    hard: {
        numberOfSquares: 36,
        secondsToFinish: 135,
        numberOfImages: 18
    }
}

//default difficulty
let difficulty = gameDifficulty.easy;
let numberOfImages = difficulty.numberOfImages;

// Reference some elements from the DOM
const resetBtn = document.getElementById('resetBtn');
const gameArea = document.getElementById('game');
const movesArea = document.getElementById('move-count');
const timer = document.getElementById('timer');


const resetValues = () => {
    //referencingDOM elements
    const gameWonScreen = document.getElementById('game-won');
    const gameOverScreen = document.getElementById('game-over');

    //reseting the values
    moveCount = 0;
    gameDifficulty.easy.secondsToFinish = 60;
    gameDifficulty.hard.secondsToFinish = 135;
    gameRunning = true;

    //DOM changes
    movesArea.innerText = moveCount;
    timer.innerText = '00:00';
    gameArea.classList.remove('game-won');
    gameWonScreen.style.display = 'none';
    gameArea.classList.remove('game-over');
    gameOverScreen.style.display = 'none';
    gameArea.addEventListener('click', moveCounter);
}

// Reference the image classes
let images = [];

const distributeImages = (difficulty) => {
    images = [];
    for (let i = 0; i < difficulty.numberOfImages; i++) {
        images.push(`square-${i}`)
        console.log(images);
    }
}

// Returns a random number between 0 and n - 1
const randomNr = n => Math.floor(Math.random() * n);

const getSomeImages = () => {
    let imagesCopy = images.slice();
    let randomImages = [];

    for (let i = 0; i < numberOfImages; i++) {
        let index = randomNr(imagesCopy.length); 
        randomImages.push(imagesCopy.splice(index, 1)[0]) 
    }
    return randomImages.concat(randomImages.slice()); 
}


const randomizeImages = () => {
    let randomImages = getSomeImages();
    gameSquares.forEach(square => {
        let index = randomNr(randomImages.length);
        let image = randomImages.splice(index, 1)[0];
        square.setImage(image);
    });
};

const clearGame = () => {
    gameSquares.forEach(square => square.reset());
    setTimeout(() => {
        randomizeImages();
    }, 500);
    resetValues();
}

const setupGame = (difficulty) => {
    gameSquares = [];
    deleteSquares();
    distributeImages(difficulty);
    insertSquares(difficulty.numberOfSquares);
    let squares = document.getElementsByClassName('game-square');

    let randomImages = getSomeImages();
    document.getElementById('game').addEventListener('click', moveCounter);
    console.log(squares.length);
    for (let i = 0; i < squares.length; i++) {
        let index = randomNr(randomImages.length);
        let image = randomImages.splice(index, 1)[0] // Get the color at the index
        let curr = squares[i];
        gameSquares.push(new GameSquare(curr, image));
    }
}

const moveCounter = () => {
    moveCount++;
    document.getElementById('move-count').innerText = moveCount;
}

resetBtn.addEventListener('click', clearGame);

let timeRemaining = document.getElementById('timer');

const countdown = () => {
    lockedSquares = gameSquares.filter(gameSquares => gameSquares.isLocked);
    if (lockedSquares.length > 0 && lockedSquares.length == gameSquares.length) {
        gameWon();
        return
    }
    if (difficulty.secondsToFinish > 0) {
        difficulty.secondsToFinish--;
        let minutes = Math.floor(difficulty.secondsToFinish / 60);
        let minuteCounter = '0' + minutes;
        let secondsCounter = difficulty.secondsToFinish - (60 * minutes)
        if (secondsCounter.toString().length == 1) {
            timeRemaining.innerText = `${minuteCounter}:` + `0${secondsCounter}`;
        } else {
            timeRemaining.innerText = `${minuteCounter}:` + (difficulty.secondsToFinish.toString().length == 1 ? `0${difficulty.secondsToFinish}` : secondsCounter);
        }
    } else {
        timeRemaining.innerText = '00:00';
        gameOver();
        return
    }
}

setInterval(countdown, 1000);

document.getElementById('easy').addEventListener("change", function () {
    difficulty = gameDifficulty.easy;
    numberOfImages = difficulty.numberOfSquares / 2;
    clearGame();
    setupGame(difficulty);
})

document.getElementById('hard').addEventListener("change", function () {
    difficulty = gameDifficulty.hard;
    numberOfImages = difficulty.numberOfSquares / 2;
    console.log('changed to hard')
    clearGame();
    setupGame(difficulty);
})

//start the game
setupGame(difficulty);

const gameOver = () => {
    gameArea.classList.add('game-over');
    document.getElementById('game-over').style.display = 'flex';
    gameArea.removeEventListener('click', moveCounter)
}

const gameWon = () => {
    gameArea.classList.add('game-won');
    document.getElementById('game-won').style.display = 'flex';
    gameArea.removeEventListener('click', moveCounter)
}