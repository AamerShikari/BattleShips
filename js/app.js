const playerDiv = document.getElementById("player");
const compDiv = document.getElementById("comp");

function makeRows(container, rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  let arr = []
  for (c = 0; c < (rows * cols); c++) {
    
    let cell = document.createElement("button");
    cell.innerText = (c + 1);

    container.appendChild(cell).className = "grid-item";
    arr[c] = cell
  };
  return arr
};

//Event Listener Functions 
/*
Responsibilities: 
- Handle when game starts and player placement is in effect 
- Handle when the player selects an enemy location to fire on 
- Passes turn to the computer 
- Must run an isGameOver function at the end of every round 
- 
*/

playerDiv.addEventListener('click', function(e) {
    playerGrid.forEach((elem) => {
        if (elem.innerText === e.target.innerText) {
            if (elem.id === 'hit') {
                elem.id = ''
            } else {
                elem.id = 'hit'
            }
        }
    })
})

compDiv.addEventListener('click', function(e) {
    computerGrid.forEach((elem) => {        
        if (elem.innerText === e.target.innerText) {
            if (isAHit(e.target.innerText)){
                elem.id = 'hit'
            } else {
                elem.id = 'miss'
            }
        }
    })

})

//PROBLEM - > Need to accommodate to rotating ship divs

let playerGrid = makeRows(playerDiv, 7, 7);
/*
//Two
playerGrid[0].style.background = "url('pics/Two/TwoLeft.png')";
playerGrid[1].style.background = "url('pics/Two/TwoRight.png')";
//ThreeSlick
playerGrid[7].style.background = "url('pics/ThreeSlick/ThreeSlickLeft.png')";
playerGrid[8].style.background = "url('pics/ThreeSlick/ThreeSlickMiddle.png')";
playerGrid[9].style.background = "url('pics/ThreeSlick/ThreeSlickRight.png')";

//ThreeWide
playerGrid[14].style.background = "url('pics/ThreeWide/ThreeWideLeft.png')";
playerGrid[15].style.background = "url('pics/ThreeWide/ThreeWideMiddle.png')";
playerGrid[16].style.background = "url('pics/ThreeWide/ThreeWideRight.png')";

//Four
playerGrid[21].style.background = "url('pics/Four/FourLeft.png')";
playerGrid[22].style.background = "url('pics/Four/FourMidLeft.png')";
playerGrid[23].style.background = "url('pics/Four/FourMidRight.png')";
playerGrid[24].style.background = "url('pics/Four/FourRight.png')";

//Five
playerGrid[28].style.background = "url('pics/Five/FiveLeft.png')";
playerGrid[29].style.background = "url('pics/Five/FiveMidLeft.png')";
playerGrid[30].style.background = "url('pics/Five/FiveMid.png')";
playerGrid[31].style.background = "url('pics/Five/FiveMidRight.png')";
playerGrid[32].style.background = "url('pics/Five/FiveRight.png')";



function setBackground(i, j) {
    for (let n = i; n <= j; n++){
        playerGrid[n].style.backgroundSize = "100%"
        playerGrid[n].style.backgroundRepeat = "no-repeat"
    }
}
setBackground(0, 1);
setBackground(7,9);
setBackground(14,16);
setBackground(21,24);
setBackground(28,32);
*/

let computerGrid = makeRows(compDiv, 7, 7);



let boatPositions = [];
let boatType = [1, 2, 2, 3, 4]
function loadCPUBoard () {
    for (let numBoats = 0; numBoats < 5; numBoats++){
        let isHorizontal = Math.floor(Math.random() * 2) % 2 !== 0
        let hasPlace = false;
        while (!hasPlace) {
            let xStartPos = Math.floor(Math.random() * 7)
            let yStartPos = Math.floor(Math.random() * 7)
            let xEndPos;
            let yEndPos;
            if (!isHorizontal){
                if(xStartPos + boatType[numBoats] >= 7){
                    if (xStartPos - boatType[numBoats] < 0){
                        continue;
                    }
                    xEndPos = xStartPos;
                    xStartPos = xStartPos - boatType[numBoats]
                } else {
                    xEndPos = xStartPos + boatType[numBoats]
                }
                yEndPos = yStartPos
            } else {
                if (yStartPos + boatType[numBoats] >= 7 ){
                    if (yStartPos - boatType[numBoats] < 0){
                        continue;
                    }
                    yEndPos = yStartPos
                    yStartPos = yStartPos - boatType[numBoats]
                } else {
                    yEndPos = yStartPos + boatType[numBoats]
                }
                xEndPos = xStartPos
            }
            //console.log(`(${xStartPos}, ${yStartPos}), (${xEndPos} , ${yEndPos}) ${isHorizontal}`)
            if (isntTaken(boatPositions, xStartPos, xEndPos, yStartPos, yEndPos, isHorizontal)){
                hasPlace = true;
            }
        }
    }
    //console.log(boatPositions)
}

function isntTaken (pos, x1, x2, y1, y2, hor){
    let counter = 0;
    if (pos.length === 0){
        pos.push([x1,x2,y1,y2, hor])
        return true;
    }
    for (let i = 0; i < pos.length; i++) {
        if (hor) {
            if ((pos[i][1] < x1) || (x2 < pos[i][0]) || (pos[i][2] < y1 || pos[i][2] > y2)){
                counter++  
            }
        } else {
            if ((pos[i][3] < y1) || (pos[i][2] > y2 ) || (pos[i][1] < x1 || pos[i][1] > x2)){
                counter++
            }
        }
    }
    if (counter === pos.length){
        pos.push([x1, x2, y1, y2, hor]);
        return true;
    }
    return false;
}
loadCPUBoard()

class ship {
    constructor(shipType, x1, y1, x2, y2){
        this.shipType = shipType;
        this.indexArr = [];
        for (let i = x1; i <= x2; i++){
            for (let j = y1; j <= y2; j++){
                this.indexArr.push({x: i, y: j, isHit: false});
            }
        }
    }

    //function to determine if the ship has been hit at each index 
    isDown () {
        let counter = 0;
        this.indexArr.forEach((elem) => {
            if (elem.isHit){
                counter++;
            }
        });
        if (counter === this.indexArr.length) {
            return true
        } else {
            return false
        }
    }
}
 

const shipper = new ship("2row", 0, 0, 0, 1)
//console.log(shipper.isDown())

boatArry = createBoatArr()
function createBoatArr() {
    let arr = [];
    let counter = 0
    boatPositions.forEach((elem) => {
        arr.push(new ship(boatType[counter] + 1, elem[0], elem[2], elem[1], elem[3]))
        counter++
    })
    return arr;
}
console.log(boatArry[0])

function isAHit(num) {
    let location = convertToPos(num)
    console.log(location)
    for (let i = 0; i < boatArry.length; i++) {
        for (let j = 0; j < boatArry[i].indexArr.length; j++){
            if (boatArry[i].indexArr[j].x === location[0] && boatArry[i].indexArr[j].y === location[1]){
                console.log(boatArry[i].indexArr[j]);
                boatArry[i].indexArr[j].isHit = true;
                //INSERT DISPLAY ISDOWN BOAT HERE
                return true
            }
        }
    }
    return false
}


function convertToPos(index) {
    return [Math.floor((index-1)/7), (index-1) % 7]
}
// console.log(convertToPos(14))