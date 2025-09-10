let links;
let hoverColor = false;

function setup(){
  createCanvas(windowWidth, windowHeight);

  links = selectAll('a');
}

function draw(){
  background(245, 35);

  for (let l of links) {
    l.mouseOver(() => hoverColor = true);
    l.mouseOut(() => hoverColor = false);
  }

  let base = drawingContext;

  let gradient = base.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 20);

  if (hoverColor) {
    gradient.addColorStop(0, 'rgba(255, 236, 70, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 236, 70, 0)');
  } else {
    gradient.addColorStop(0, 'rgba(190, 190, 190, 0.5)');
    gradient.addColorStop(1, 'rgba(190, 190, 190, 0)');
  }

  base.fillStyle = gradient;
  base.fillRect(0, 0, width, height);
}

function mousePressed(){
  clear();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}