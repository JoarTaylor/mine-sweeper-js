const playingField = document.querySelector('.playing-field');
const boardOptions = document.querySelectorAll('nav button');
const scoreElement = document.querySelector('.score');
const navElement = document.querySelector('nav');

createBoard();

function createBoard() {


boardOptions.forEach((option) => {
    //parse number of squares of board
    let squareNumber = parseInt(option.textContent);
    option.addEventListener('click', boardArea);

    
    function boardArea() {
        playingField.innerHTML = null;
        //add squares
        for(let i=0; i<squareNumber ; i++) {
            const singleSquare = document.createElement('div');
            singleSquare.className = "single-square";
            playingField.appendChild(singleSquare);
            //set css variable to number of squares wanted
            document.documentElement.style.setProperty('--squares-root', Math.sqrt(squareNumber));
        }
        //add mines at random to emtpy squares
        let emtpySquares = document.querySelectorAll('.single-square');
   
        let emptySquaresArray = Array.from(emtpySquares);
        let minesNum = Math.floor(squareNumber * 0.20);

        let randomNumArray = []
        do {
            let randomNum = Math.floor(Math.random() * squareNumber);
            //non-repeating randomnumber-array, add mine to empty squares only
            if(!randomNumArray.includes(randomNum)) {
            randomNumArray.push(randomNum);
            } 
            for(let i=0; i<randomNumArray.length; i++) {
                emptySquaresArray[randomNum].classList.add('mine');
                emptySquaresArray[randomNum].id = "mine";
            }  
        
        } while (randomNumArray.length < minesNum)

        //check for mines
        const maybeMineNodes = document.querySelectorAll('.single-square')
        const maybeMineArray = Array.from(maybeMineNodes);
        const totalSquares = maybeMineArray.length;
        maybeMineArray.forEach((check) => {
            check.addEventListener(('click'), clearMines);
            function clearMines() {
                //if clicked on mine
                if(check.id == "mine") {
                    console.log('exploded');
                    alert('game over');
                //cleared square
                } else if (check.id != "mine") {
                    check.id = "square-cleared";    

                    this.removeEventListener('click', clearMines);

                    //check surrounding squares
                    let checkSquare = maybeMineArray.indexOf(check);
                    let numMinesAround = 0;
                    let baseNum = Math.sqrt(totalSquares)
                    let mineToTheRight = maybeMineArray[checkSquare + 1];
                    let mineToTheLeft = maybeMineArray[checkSquare - 1];
                    let mineOnTop = maybeMineArray[checkSquare - (baseNum)];
                    let mineOnBottom = maybeMineArray[checkSquare + (baseNum)];
                    let mineUpperRight = maybeMineArray[checkSquare - (baseNum) + 1];
                    let mineUpperLeft = maybeMineArray[checkSquare - (baseNum) - 1];
                    let mineLowerRight = maybeMineArray[checkSquare + (baseNum) + 1];
                    let mineLowerLeft = maybeMineArray[checkSquare + (baseNum) -1];

                    //check upper-left corner 
                    if((checkSquare + 1) == 1 ) {
                        console.log('hit');
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnBottom.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineLowerRight.id = "square-cleared";
                        }
                    } 

                    //check upper-right corner
                     else if((checkSquare + 1) == baseNum) {
                        console.log('hit');
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnBottom.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineLowerLeft.id = "square-cleared";
                        }
                    }

                    //check lower-left corner
                    else if((checkSquare) == (totalSquares-(baseNum))) {
                        console.log('hit');
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnTop.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineUpperRight.id = "square-cleared";
                        }
                    }

                    //check lower-right corner
                    else if((checkSquare + 1) == totalSquares) {
                        console.log('hit');
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnTop.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineUpperLeft.id = "square-cleared";
                        }
                    } 
                    
                    //check upper un-cornered squares
                    else if(checkSquare > 0 && checkSquare < (baseNum - 1)) {
                        console.log('hit upper');
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnBottom.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineLowerLeft.id = "square-cleared";
                            mineLowerRight.id = "square-cleared";
                        }
                    } 
                    
                    //check lower un-cornered squares
                    else if(checkSquare >= (totalSquares-baseNum) && checkSquare <= totalSquares) {
                        console.log('hit upper');
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineOnTop.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineUpperLeft.id = "square-cleared";
                            mineUpperRight.id = "square-cleared";
                        }
                    } 
                    
                    //check right un-cornered squares
                    else if(checkSquare > baseNum && (checkSquare + 1) != totalSquares && ((checkSquare + 1)%baseNum == 0)) {
                        console.log('hit upper');
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(numMinesAround == 0) {
                            mineOnBottom.id = "square-cleared";
                            mineUpperLeft.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineLowerLeft.id = "square-cleared";
                            mineOnTop.id = "square-cleared";
                        }
                    } 
                    //check left un-cornered squares
                    else if(checkSquare > 0 && (checkSquare + 1) != (totalSquares - baseNum) && ((checkSquare + 1)%baseNum == 1)) {
                        console.log('hit left');
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(numMinesAround == 0) {
                            mineOnBottom.id = "square-cleared";
                            mineUpperRight.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineLowerRight.id = "square-cleared";
                            mineOnTop.id = "square-cleared";
                        }
                    } 
                    else {

                        //check squares that has 8 squares around it
                        if(mineToTheRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineToTheLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnTop.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineUpperLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerLeft.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineOnBottom.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        if(mineLowerRight.id == "mine") {
                            console.log('1 mine');
                            numMinesAround++;
                        }
                        //if no mines around square
                        if(numMinesAround == 0) {
                            mineLowerRight.id = "square-cleared";
                            mineOnBottom.id = "square-cleared";
                            mineOnTop.id = "square-cleared";
                            mineUpperRight.id = "square-cleared";
                            mineToTheRight.id = "square-cleared";
                            mineToTheLeft.id = "square-cleared";
                            mineLowerLeft.id = "square-cleared";
                            mineUpperLeft.id = "square-cleared";
                        }
                    }


                    
                    console.log('numMines around: ' + numMinesAround);
                    check.textContent = numMinesAround;
                    if(check.textContent == "3") {
                        check.style.color = "red";
                    } else if (check.textContent == "2") {
                        check.style.color = "green";
                    } else if (check.textContent == "1") {
                        check.style.color = "blue";
                    } else if (check.textContent == "0") {
                        check.style.color = "white";
                    }

                    //check current score
                    let score = 0;
                    for(let i=0; i<maybeMineArray.length; i++) {
                        if(maybeMineArray[i].id== "square-cleared") {
                            score++;
                            scoreElement.textContent = score;
                            if(score == (squareNumber-minesNum)) {
                                setTimeout(() => {
                                    let winElement = document.createElement('h3');
                                    winElement.textContent = 'Game Won!';
                                    navElement.appendChild(winElement);
                                  }, "500")
                            }
                        }
                    }
                  
                
                }
            }
            check.addEventListener("contextmenu", e => e.preventDefault());
            check.addEventListener('mousedown', (e) => {
                if(e.button == 2) {
                    check.classList.toggle('potential-mine');
                    check.innerHTML = `<i class="fa-solid fa-flag-swallowtail"></i>`
                }
            })
        })
    }
})
}


