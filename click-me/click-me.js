let pointer = { size: 10 };
let textBckg;
let grid = [];
let maxDepth = 10;

let alphaPointer = 0;
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();

  textBckg = createGraphics(width, height);
  textBckg.textAlign(CENTER, CENTER);
  textBckg.fill(0);
  textBckg.noStroke();

  pointer.size = windowWidth/150;

  initGrid();
}

function initGrid() {
  grid = [{
    x: 0,
    y: 0,
    w: width,
    h: height,
    depth: 0,
  }];

  updateDrawBckg();
}

function draw() {
  background(10);
  image(textBckg, 0, 0);

  drawPointer(mouseX, mouseY, [255, 0, 0, alphaPointer]);

  let normX = mouseX / width;
  let normY = mouseY / height;

  for (let cell of grid) {
    push();
    translate(cell.x, cell.y);

    let localX = normX * cell.w;
    let localY = normY * cell.h;

    drawPointer(localX, localY, 220);
    pop();
  }

  for(let cell of grid){
    noFill();
    stroke(220);
    strokeWeight(0.5);
    rect(cell.x, cell.y, cell.w, cell.h);
  }
}

function mousePressed() {
  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];
    if (mouseX >= cell.x && mouseX < cell.x + cell.w && mouseY >= cell.y && mouseY < cell.y + cell.h && cell.depth < maxDepth) {
      
      grid.splice(i, 1);

      let direction = random(["horizontal", "vertical"]);

      if (direction === "horizontal") {
        let h = cell.h / 2;
        grid.push(
          { x: cell.x, y: cell.y, w: cell.w, h: h, depth: cell.depth + 1 },
          { x: cell.x, y: cell.y + h, w: cell.w, h: h, depth: cell.depth + 1 }
        );
      } else {
        let w = cell.w / 2;
        grid.push(
          { x: cell.x, y: cell.y, w: w, h: cell.h, depth: cell.depth + 1 },
          { x: cell.x + w, y: cell.y, w: w, h: cell.h, depth: cell.depth + 1 }
        );
      }

      break; 
    }
  }

  updateDrawBckg();
}

function drawPointer(x, y, color) {
  let s = pointer.size;
  stroke(color);
  strokeWeight(2);
  line(x - s, y, x + s, y);
  line(x, y - s, x, y + s);
}

function updateDrawBckg() {
  textBckg.clear();

  for (let cell of grid) {
    let size = (windowWidth/10) / pow(1.5, cell.depth);
    textBckg.textSize(size);
    textBckg.fill(220);
    textBckg.text("click me", cell.x + cell.w / 2, cell.y + cell.h / 2);
  }
}

function easyMode(event){
  count++
  if (count % 2 === 0) {
  alphaPointer = 0;
} else {
  alphaPointer = 255;}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
