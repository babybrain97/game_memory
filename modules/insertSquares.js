const insertSquares = (numberOfSquares) => {
    //square root of numberOfSquares calculates the squares per row
    let squaresPerRow = Math.sqrt(numberOfSquares);
    //the width of the game board is fixed at 400px in css
    let gameAreaWidth = 400;
    //calculating the side of a square based on the previous values 
    let squareWidth = gameAreaWidth / squaresPerRow;
    
    //inserting the elements (squares)
    for(let i = 0; i < numberOfSquares; i++){
        document.getElementById('game').innerHTML += `
        <div class="game-square" style=" width: ${squareWidth}px; height: ${squareWidth}px">
            <div class="drawer">
                <div></div>
                <div></div>
            </div>
        </div>`
    }  
}

//deletes squares so changing to a bigger/smaller board and setting up the new amount of squares is possible
const deleteSquares = () => {
    let divsToRemove = document.getElementsByClassName('game-square');
    for (let i = divsToRemove.length-1; i >= 0; i--) {
    divsToRemove[i].remove();
    }
    }  

export {insertSquares, deleteSquares}