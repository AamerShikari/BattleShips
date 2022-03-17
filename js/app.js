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

let playerGrid = makeRows(playerDiv, 7, 7);

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