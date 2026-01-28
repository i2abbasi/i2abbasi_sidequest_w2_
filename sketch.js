// Object representing a soft animated blob
let blob = {
  x: 240,
  y: 160,
  r: 28,
  points: 48,
  wobble: 8,
  wobbleFreq: 0.8,
  t: 0,
  tSpeed: 0.01,
};

let panic = false; // emotion toggle

function setup() {
  createCanvas(480, 320);
  noStroke();
  textFont("sans-serif");
  textSize(14);
}

function draw() {
  // background changes based on emotion
  if (panic) {
    background(255, 80, 80); // panic red
  } else {
    background(240); // normal grey
  }

  // animate time
  blob.t += blob.tSpeed;

  // tiny panic movement
  if (panic) {
    blob.x += random(-5, 5);
    blob.y += random(-5, 5);
  }

  // draw blob
  if (panic) {
    fill(255, 255, 0); // panic yellow
  } else {
    fill(20, 120, 255); // normal blue
  }

  beginShape();
  for (let i = 0; i < blob.points; i++) {
    const a = (i / blob.points) * TAU;
    const n = noise(
      cos(a) * blob.wobbleFreq + 100,
      sin(a) * blob.wobbleFreq + 100,
      blob.t,
    );
    const r = blob.r + map(n, 0, 1, -blob.wobble, blob.wobble);
    vertex(blob.x + cos(a) * r, blob.y + sin(a) * r);
  }
  endShape(CLOSE);

  fill(0);
  text("Press SPACE to toggle PANIC", 10, 18);
}

function keyPressed() {
  if (key === " ") {
    panic = !panic; // toggle emotion
  }
}
