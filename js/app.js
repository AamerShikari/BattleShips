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
playerDiv.addEventListener('click', function(e) {
    console.log(e.target)
})

compDiv.addEventListener('click', function(e) {
    console.log(e.target)
})

//PROBLEM - > Need to accommodate to rotating ship divs

let playerGrid = makeRows(playerDiv, 7, 7);

//Two
playerGrid[0].style.background = "url('pics/Two/TwoLeft.png')";
playerGrid[1].style.background = "url('pics/Two/TwoRight.png')";

// playerGrid[0].style.transform = "rotate(90deg)";

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


let computerGrid = makeRows(compDiv, 7, 7);


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