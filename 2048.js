var board;
var score =0;
var highestScore = 0;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board=[
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // board=[
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]
    for (let r = 0; r < rows; r++){
        for (let c= 0; c<columns; c++){
            //<div id="#-#"></div>
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+ c.toString();
            let num = board[r][c]
            updateTile(tile, num);
            document.getElementById("board").append(tile);

        }
    }
    setTwo();
    setTwo();

}

function hasEmptyTile(){
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 0){
                return true;
            }

        }
    }
    GameOver();
    return false;
}

function setTwo() {
    if (!hasEmptyTile()){

        return;
    }
    let found = false;
    while (!found){
        // get random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function updateTile(tile, num){
    tile.innerText="";
    tile.classList.value=""; // clear the classList (give it it's new identity)
    tile.classList.add("tile");
    if (num>0){
        tile.innerText=num;
        if (num <= 4096){
            tile.classList.add("x"+num.toString());
        } else{
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
if (e.code == "ArrowLeft"){
    slideLeft();
    setTwo();
}
else if (e.code == "ArrowRight"){
    slideRight();
    setTwo();
}
else if (e.code == "ArrowUp"){
    slideUp();
    setTwo();
}
else if (e.code == "ArrowDown"){
    slideDown();
    setTwo();
}
document.getElementById("score").innerText = score;

});

function filterZero(row){
    return row.filter(num => num != 0); // clear 0's from new row
}

function slide(row) {
    //[0, 2, 2, 2]
    row = filterZero(row);
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]){
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } //[2, 2, 2] -> [4, 0, 2]
        row = filterZero(row) // [4, 2]
    }

        while (row.length < columns){
            row.push(0);
        } //[4, 2, 0, 0]

        return row;
    
}

function slideLeft(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideRight(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideUp(){
    for (let c = 0; c < columns; c++){ // silly we are coding in JS not c++ XD
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        
        for (let r = 0; r < rows; r++){
            board[r][c]=row[r];
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
        

    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = row[r]; // Use row[r] to get the value
            updateTile(tile, num);
        }
    }
}

function GameOver(){
    for (let r = 0; r < rows; r++){
        for ( let c = 0; c < columns; c++){
            if (board[r][c] == 0){
            return false;
            }
        }
    }
    for (let r = 0; r < rows-1; r++){
        for (let c = 0; c < columns -1; c++){
            if (board[r][c] == board[r][c+1]){
                return false;
            }
            if (board[r][c] == board[r+1][c]){
                return false;
            }
        }
    }
    
    const gameOverBanner = document.getElementById("GameOver");
    gameOverBanner.style.display = "block";

    const restartButton = document.getElementById("RestartButton");
    restartButton.addEventListener("click", () => {
        gameOverBanner.style.display = "none";

        location.reload(); 
    });

    return true;

    
}