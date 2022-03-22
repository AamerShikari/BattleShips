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
let phrase = document.createElement('h2');
setOfPhrases = ["Select the start index of your ", "Select the end index of your ", "Your all set! Let the battle begin!", "Note: Boat length must match the description, no overlapping, and no diagonals allowed! Try again by entering a start index for a "]
setOfBoats = ["2-length boat", "3-length boat", "2nd 3-length boat", "4-length boat", "5-length boat"];
playerBoats = []
phraseCount = 0
boatCount = 0
phrase.innerText = setOfPhrases[0] + setOfBoats[0]
document.querySelector("#playerBoard").after(phrase)
let enemyTalks = document.createElement("h2")
document.querySelector("#computerBoard").after(enemyTalks)
let x;
let y;
let boatType = [1, 2, 2, 3, 4]
let playerShips;
let playerBoardInitialized = false;

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
playerDiv.addEventListener('click', function(e) {
    
    if (boatCount === 5) {
        //Come back to this whent he game has more functionality
    }
    if (phraseCount === 0 || phraseCount === 3){
        x = e.target.innerText
        phraseCount = 1
    } else if (phraseCount === 1){
        y = e.target.innerText
        if (boatIsValid(x, y, playerBoats, boatType[boatCount])){
            placeBoat(playerGrid, playerBoats[playerBoats.length - 1], boatType[boatCount], boatCount !== 2, convertToVal([playerBoats[boatCount][0], playerBoats[boatCount][2]]))
            boatCount++;
            if (boatCount === 5){
                phraseCount = 2
            } else {
                phraseCount = 0
            }
        } else {
            phraseCount = 3;
        }
    }
    if (boatCount === 5) {
        phrase.innerText = setOfPhrases[phraseCount]
        playerShips = createBoatArr(playerBoats)
        playerBoardInitialized = true
    } else {
        phrase.innerText = setOfPhrases[phraseCount] + setOfBoats[boatCount]
    }
    
})

let twoBoatHor = ["url('pics/Two/Hor/TwoLeft.png')", "url('pics/Two/Hor/TwoRight.png')"];
let twoBoatVert = ["url('pics/Two/Vert/TwoLeft.png')", "url('pics/Two/Vert/TwoRight.png')"]
let threeSlickHor = ["url('pics/ThreeSlick/Hor/ThreeSlickLeft.png')", "url('pics/ThreeSlick/Hor/ThreeSlickMiddle.png')", "url('pics/ThreeSlick/Hor/ThreeSlickRight.png')"]
let threeSlickVert = ["url('pics/ThreeSlick/Vert/ThreeSlickLeft.png')", "url('pics/ThreeSlick/Vert/ThreeSlickMiddle.png')", "url('pics/ThreeSlick/Vert/ThreeSlickRight.png')"]
let threeWideHor = ["url('pics/ThreeWide/Hor/ThreeWideLeft.png')", "url('pics/ThreeWide/Hor/ThreeWideMiddle.png')", "url('pics/ThreeWide/Hor/ThreeWideRight.png')"]
let threeWideVert = ["url('pics/ThreeWide/Vert/ThreeWideLeft.png')", "url('pics/ThreeWide/Vert/ThreeWideMiddle.png')", "url('pics/ThreeWide/Vert/ThreeWideRight.png')"]
let fourHor = ["url('pics/Four/Hor/FourLeft.png')", "url('pics/Four/Hor/FourMidLeft.png')", "url('pics/Four/Hor/FourMidRight.png')", "url('pics/Four/Hor/FourRight.png')"]
let fourVert = ["url('pics/Four/Vert/FourLeft.png')", "url('pics/Four/Vert/FourMidLeft.png')", "url('pics/Four/Vert/FourMidRight.png')", "url('pics/Four/Vert/FourRight.png')"]
let fiveHor = ["url('pics/Five/Hor/FiveLeft.png')", "url('pics/Five/Hor/FiveMidLeft.png')", "url('pics/Five/Hor/FiveMid.png')", "url('pics/Five/Hor/FiveMidRight.png')", "url('pics/Five/Hor/FiveRight.png')"]
let fiveVert = ["url('pics/Five/Vert/FiveLeft.png')", "url('pics/Five/Vert/FiveMidLeft.png')", "url('pics/Five/Vert/FiveMid.png')", "url('pics/Five/Vert/FiveMidRight.png')", "url('pics/Five/Vert/FiveRight.png')"]
let imgArr = [twoBoatHor, twoBoatVert, threeSlickHor, threeSlickVert, threeWideHor, threeWideVert, fourHor, fourVert, fiveHor, fiveVert]

function convertToVal (pos) {
    let x = pos[0]
    let y = pos[1]
    return y + (x * 7) + 1
}
function placeBoat(grid, boat, type, isSecond, targetVal) {
    let index;
    if (type === 1) {
        if (boat[4]){
            index = 0;
        } else {
            index = 1
        }
    } else if (type === 2){
        if (isSecond){
            if (boat[4]){
                index = 2
            } else {
                index = 3
            }
        } else {
            if (boat[4]){
                index = 4
            } else {
                index = 5
            }
        }
    } else if (type === 3){
        if (boat[4]){
            index = 6
        } else {
            index = 7
        }
    } else {
        if (boat[4]){
            index = 8
        } else {
            index = 9
        }
    }
    let temp = imgArr[index]
    let j;
    let diff;
    if (boat[1] - boat[0] === 0){
        j = 1
        diff = 1
    } else {
        j = 1
        diff = 7
    }
    temp.forEach((elem) => {
        grid[targetVal - j].style.background = elem
        grid[targetVal - j].style.backgroundSize = "100%"
        grid[targetVal - j].style.backgroundRepeat = "no-repeat"
        j -= diff
    })
}
//[x1,x2,y1,y2, hor]

function boatIsValid (x, y, boatArr, len) {
    let arrOfPos = []
    let pos1 = convertToPos(x)
    let pos2 = convertToPos(y)
    let temp;
    if (pos1[0] - pos2[0] > 0 || pos1[1] - pos2[1] > 0) {
        temp = pos1
        pos1 = pos2
        pos2 = temp
    }
    // if (pos1[0] - pos2[0] < 0) {
    //     temp = pos1[0]
    //     pos1[0] = pos2[0]
    //     pos2[0] = temp
    // }
    //  else if(pos1[1] - pos2[1] < 0){
    //     temp = pos1[1]
    //     pos1[1] = pos2[1]
    //     pos2[1] = temp
    // }
    if (boatArr.length === 0 && (y-x === 1 || y-x === 7)){
        boatArr.push([pos1[0], pos2[0], pos1[1], pos2[1], pos1[0]-pos2[0] === 0])
        return true;
    } else if (boatArr.length === 0 && (y-x === -1 || y-x === -7)){
        boatArr.push([pos1[0], pos2[0], pos1[1], pos2[1], pos1[0]-pos2[0] === 0])
        return true;
    } else {
        if (pos1[0] - pos2[0] !== 0 && pos1[1] - pos2[1] !== 0){
            return false
        } else if ((pos1[0] - pos2[0] === 0 && Math.abs(pos1[1] - pos2[1]) !== len) || (Math.abs(pos1[0] - pos2[0]) !== len && pos1[1] - pos2[1] === 0)) {
            return false
        } else {
            return isntTaken(boatArr, pos1[0], pos2[0], pos1[1], pos2[1], pos1[0]-pos2[0] === 0)
        }
    }
}

compDiv.addEventListener('click', function(e) {
    let target
    if (isGameOver(boatArry)) {

    } else if (isGameOver(playerShips)){

    } else {
        if (playerBoardInitialized){
            computerGrid.forEach((elem) => {        
                if (elem.innerText === e.target.innerText) {
                    target = convertToPos(e.target.innerText)
                    if (isAHit(e.target.innerText, boatArry, true)){
                        elem.id = 'hit'
                        phrase.innerText = `Nice! (${target[0] + 1}, ${target[1] + 1}) was a hit!`
                    } else {
                        elem.id = 'miss'
                        phrase.innerText = `Oh no! (${target[0] + 1}, ${target[1] + 1}) was a miss! We'll get em next time!`
                    }
                }
            })
            if (isGameOver(boatArry)){
                phrase.innerText = "GAME OVER, YOU WON!"
                enemyTalks = "I'LL HAVE MY VENGANCE ONE DAY..."
            } else {
                runComputerTurn()
                if (isGameOver(playerShips)){
                    phrase.innerText = "GAME OVER, ENEMY WON"
                    enemyTalks = "YOU THOUGHT YOU COULD DEFEAT ME?!?! MUAHAHAH!"
                }
            } 
        } else {
            phrase.innerText = "You haven't finished your board yet! " + phrase.innerText
        }
    }
})

let hitArr = []
let recentHit = false

function isGameOver(ships) {
    for (let i = 0; i < ships.length; i++){
        if(!ships[i].isDown()){
            return false;
        }
    }
    return true;
}

let hunted;
function runComputerTurn() {
    let inArry = true
    let randIndex;
    if (recentHit){
        for (let i = 0; i < hunted.indexArr.length; i++){
            if (!hunted.indexArr[i].isHit){
                randIndex = convertToVal([hunted.indexArr[i].x, hunted.indexArr[i].y]);
            }
        }
    } else {
        while (inArry){
            randIndex = Math.floor(Math.random() * 49) + 1;
            if (!hitArr.includes(randIndex)){
                inArry = false;
            }
        } 
    }
    playerGrid.forEach((elem) => {   
        if (elem.innerText == randIndex) {
            target = convertToPos(randIndex)
            if (isAHit(randIndex, playerShips, false)){
                elem.id = 'hit'
                hitArr.push(randIndex)
                enemyTalks.innerText = `Nice! (${target[0] + 1}, ${target[1] + 1}) was a hit!`
                if (recentHit){
                    if (hunted.isDown()){
                        recentHit = false;
                    }
                } else {
                    hunted = shipAt(randIndex);
                    recentHit = true;
                    console.log(hunted)
                }
            } else {
                elem.id = 'miss'
                hitArr.push(randIndex)
                enemyTalks.innerText = `Oh no! (${target[0] + 1}, ${target[1] + 1}) was a miss! We'll get em next time!`
            }
        }
    })
}

function shipAt (num) {
    for (let i = 0; i < playerShips.length; i++) {
        for(let j = 0; j < playerShips[i].indexArr.length; j++) {
            let pos = convertToPos(num)
            if (playerShips[i].indexArr[j].x === pos[0] && playerShips[i].indexArr[j].y === pos[1]){
                return playerShips[i]
            }
        }
    }
}

function isAHit(num, boats, isComp) {
    let location = convertToPos(num)
    for (let i = 0; i < boats.length; i++) {
        for (let j = 0; j < boats[i].indexArr.length; j++){
            if (boats[i].indexArr[j].x === location[0] && boats[i].indexArr[j].y === location[1]){
                boats[i].indexArr[j].isHit = true;
                if(boats[i].isDown() && isComp){
                    displayDownedBoat(boats[i])
                }
                return true
            }
        }
    }
    return false
}
/*
To Do List: 
- Computer AI 
- End Screen 
- Restart 
Animating the water 
Exploding effect 
Water splash when miss 
fit in with water better 

*/

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
            if (isntTaken(boatPositions, xStartPos, xEndPos, yStartPos, yEndPos, isHorizontal)){
                hasPlace = true;
            }
        }
    }
}

function isntTaken (pos, x1, x2, y1, y2, hor){
    let counter = 0;
    if (pos.length === 0){
        pos.push([x1,x2,y1,y2, hor])
        return true;
    }
    for (let i = 0; i < pos.length; i++) {
        if (hor) {
            if ((pos[i][1] < x1) || (x2 < pos[i][0]) || (pos[i][3] < y1 || pos[i][2] > y2)){
                counter++  
            }
        } else {
            if ((pos[i][3] < y1) || (pos[i][2] > y2 ) || (pos[i][1] < x1 || pos[i][0] > x2)){
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



 



boatArry = createBoatArr(boatPositions)

function createBoatArr(poses) {
    let arr = [];
    let counter = 0
    poses.forEach((elem) => {
        arr.push(new ship(boatType[counter] + 1, elem[0], elem[2], elem[1], elem[3]))
        counter++
    })
    return arr;
}



function displayDownedBoat(boat) {
    placeBoat(computerGrid, [boat.indexArr[0].x, boat.indexArr[boat.indexArr.length - 1].x, boat.indexArr[0].y, boat.indexArr[boat.indexArr.length-1].y, boat.indexArr[boat.indexArr.length - 1].x - boat.indexArr[0].x === 0], boat.shipType - 1, false, convertToVal([boat.indexArr[0].x, boat.indexArr[0].y]))
}

function convertToPos(index) {
    return [Math.floor((index-1)/7), (index-1) % 7]
}
