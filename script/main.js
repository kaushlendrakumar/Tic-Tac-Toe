let counter = 0;
let playerObj = {
    player1 : [],
    player2 : []
};
let winningCells = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,6,9],
    [4,5,6],
    [7,8,9],
    [3,5,7]
];
let gameOver = false;
function paintGrid(){
    let grid = '';
    let index = 1;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            grid += '<div class="grid-item" data-cell='+(index++)+' data-row='+i+' data-column='+j+' contenteditable="true"></div>';
        }
    }
    let gameCotainer = document.getElementById('game');
    gameCotainer.innerHTML = '';
    gameCotainer.innerHTML = grid;
    let game = document.getElementById('game');
    game.addEventListener('click', checkGridItem, false);
}

function checkGridItem(evt){
    let editEnabled = evt.target.getAttribute('contenteditable');
    if(evt.target.classList.contains('grid-item') && editEnabled !== 'false' && !gameOver){
        counter++;
        document.getElementById('resetButton').disabled = false;
        let enterValue = 'X';
        if(counter % 2 === 0){
            enterValue = '0';
        }
        evt.target.innerText = enterValue;
        evt.target.setAttribute('contenteditable', false)
        storePlayerCells(evt, enterValue);
        if(counter > 4) checkWinner();
    }
}
function storePlayerCells(evt, value){
    let cell = parseInt(evt.target.dataset.cell, 10);
    if(value === 'X'){
        playerObj['player1'].push(cell);
    }else{
        playerObj['player2'].push(cell);
    }
    console.log(playerObj);
}
function checkWinner(){
    let result;
    for(let i = 0; i < winningCells.length; i++){
        result = compareCells(winningCells[i])
        if(result){
            showGameOver(result);
            break;
        }else{
            if(i === winningCells.length-1 && counter == 9){
                showGameOver(false)
            }
        }
    }
}

function showGameOver(result){
    let popUp = document.getElementsByClassName('popup')[0];
    popUp.classList.remove('hide');
    gameOver = true;
    if(!result){
        popUp.innerHTML = '<div>Game Tie. Please Play again.</div><div><span class="restart">restart</span></div>';
    }else{
        popUp.innerHTML = '<div>Winner: '+result+'</div><div><span class="restart">restart</span></div>';
    }
    let restartBtn = document.getElementsByClassName('restart')[0];
    restartBtn.addEventListener('click', restartGame, false);
}

function restartGame(){
    let popUp = document.getElementsByClassName('popup')[0];
    popUp.classList.add('hide');
    counter = 0;
    document.getElementById('resetButton').disabled = true;
    gameOver = false;
    playerObj = {
        player1 : [],
        player2 : []
    };
    paintGrid();
}

function compareCells(data){
    let playerOneCount = 0,
        playerTwoCount = 0;
    for(let j = 0; j < data.length; j++){
        if(playerObj['player1'].indexOf(data[j]) > -1){
            playerOneCount++;
        }
        if(playerObj['player2'].indexOf(data[j]) > -1){
            playerTwoCount++;
        }
    }
    if(playerOneCount === data.length){
        return 'player1'
    }else if(playerTwoCount === data.length){
        return 'player2'
    }else{
        return false;
    }
}
