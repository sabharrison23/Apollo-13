// Variables
let imgCover;
let nasaFont, spaceMonoFont, spaceMonoBoldFont;
let rocketX, rocketY, rocketWidth, rocketHeight;
let isBlastOff = false;
let showCover = true;
let speed = 3;
let stars = [];
let currentIndex = 0;

// Data
const slides = [
    { image: 'assets/1.jpg', sentence: 'Richard Nixon with James A. Lovell Jr., John L. Swigert Jr., and Fred W. Haise Jr.' },
    { image: 'assets/5.jpg', sentence: 'Recovery crew secures command module.' },
    { image: 'assets/4.jpg', sentence: 'Fred Haise rests in the recovery raft.' },
    { image: 'assets/3.jpg', sentence: 'Located after splashdown.' },
    { image: 'assets/2.jpg', sentence: 'Splashdown in the South Pacific Ocean.' },
    { image: 'assets/6.jpg', sentence: 'Mission Control works through solutions.' },
    { image: 'assets/7.jpg', sentence: 'Astronauts manage supplies inside the lunar module.' },
    { image: 'assets/8.jpg', sentence: 'The Lunar Module with the improvised "mailbox" CO₂ scrubber.' },
    { image: 'assets/9.jpg', sentence: 'View of Apollo 13 from the Lunar Module after separation.' },
    { image: 'assets/10.jpg', sentence: 'Final preparations before the mission launch.' },
    { image: 'assets/11.jpg', sentence: 'Launch of Apollo 13 on its journey to the Moon.' }
];

// Assets
function preload() {
    imgCover = loadImage('assets/see if it works.jpg');
    nasaFont = loadFont('fonts/Nasa.ttf');
    spaceMonoFont = loadFont('fonts/SpaceMono-Regular.ttf');
    spaceMonoBoldFont = loadFont('fonts/SpaceMono-Bold.ttf');
    slides.forEach(slide => slide.img = loadImage(slide.image));
}

function setup() {
    createCanvas(800, 600).parent("sketch-holder");

    // Stars
    for (let i = 0; i < 12; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(10, 25)
        });
    }

    // Rocket
    rocketX = width / 2;
    rocketY = height - 80;
    rocketWidth = 200;
    rocketHeight = 50;
}

// Loop
function draw() {
    background(20);
    drawBorder();

    if (showCover) {
        drawCoverScreen();
    } else if (isBlastOff) {
        animateBlastOff();
    } else {
        displaySlide(currentIndex);
    }
}

function drawBorder() {
    stroke(150);
    strokeWeight(13);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width - 1, 0, width - 1, height);
    line(0, height - 1, width, height - 1);
}

function drawStar(x, y, size) {
    fill(255, 223, 0);
    noStroke();
    beginShape();
    for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i - HALF_PI;
        let px = x + cos(angle) * size;
        let py = y + sin(angle) * size;
        vertex(px, py);
        angle += TWO_PI / 10;
        px = x + cos(angle) * size * 0.5;
        py = y + sin(angle) * size * 0.5;
        vertex(px, py);
    }
    endShape(CLOSE);
}

function drawCoverScreen() {
    // Draw stars
    for (let star of stars) {
        drawStar(star.x, star.y, star.size);
    }

    // Gradient
    let gradientStart = color(0, 39, 112);
    let gradientEnd = color(29, 78, 216);
    let steps = 15;
    textFont(nasaFont);
    textSize(50);
    textAlign(CENTER, TOP);
    for (let i = 0; i < steps; i++) {
        let interColor = lerpColor(gradientStart, gradientEnd, i / steps);
        fill(interColor);
        text("Mission in Motion", width /2, 25 + i * 0.8);
    }

  
    textFont(spaceMonoFont);
    textSize(24);
    fill(255);
    text("Apollo 13", width / 2, 78);
  
  textFont(spaceMonoFont);
    textSize(24);
    fill(255);
    text("By Sabrina Harrison", width / 2, 108);

    
    imageMode(CENTER);
    image(imgCover, width / 2, height / 2);

    
    drawRocketButton();
}

function displaySlide(index) {
    const slide = slides[index];
    imageMode(CENTER);
    image(slide.img, width / 2, height / 2);

    textFont(spaceMonoFont);
    textSize(15);
    fill(255);
    textAlign(CENTER, TOP);
    text(slide.sentence, width / 2, 30);
 
    textFont(spaceMonoFont);
    textSize(20);
    fill(255);
    textAlign(LEFT, BOTTOM);
  text(11 - currentIndex, 20, height - 20);

    document.getElementById("button-container").style.display = "flex";
}

// Rocket animation
function drawRocketButton() {
    fill(180);
    noStroke();
    rectMode(CENTER);
    rect(rocketX, rocketY, rocketWidth, rocketHeight);

    // Nose cone
    fill(220);
    triangle(
        rocketX + rocketWidth / 2, rocketY - rocketHeight / 2,
        rocketX + rocketWidth / 2, rocketY + rocketHeight / 2,
        rocketX + rocketWidth / 2 + 50, rocketY
    );
   fill(30, 100, 200); // Windows
  ellipse(rocketX - 70, rocketY, 20, 20);
  ellipse(rocketX - 40, rocketY, 20, 20);
  ellipse(rocketX - 10, rocketY, 20, 20);

  fill(200); // Fins
  triangle(rocketX - 100, rocketY - 25, rocketX - 130, rocketY - 50, rocketX - 130, rocketY - 25);
  triangle(rocketX - 100, rocketY + 25, rocketX - 130, rocketY + 50, rocketX - 130, rocketY + 25);

  fill(220); // Boosters
  rect(rocketX - 115, rocketY - 20, 30, 15);
  rect(rocketX - 115, rocketY + 20, 30, 15);

  // Flames 
  if (!isBlastOff) {
  }
   fill(250, 180, 60);
    ellipse(rocketX - 135, rocketY - 30, 20, 20);
    ellipse(rocketX - 135, rocketY + 30, 20, 20);
    fill(255, 100, 0);
    ellipse(rocketX - 135, rocketY, 25, 25);

    if (isBlastOff) {
        rocketX += speed;
        speed *= 1.05;
        ellipse(rocketX - 200, rocketY, 50, 20);
    ellipse(rocketX - 240, rocketY, 70, 30);
    ellipse(rocketX - 280, rocketY, 90, 40);
    }

   
    fill(255);
    textFont(spaceMonoBoldFont);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Blast Off!", rocketX, rocketY);
}

function animateBlastOff() {
    drawRocketButton();
    if (rocketX > width + 100) {
        isBlastOff = false;
        showCover = false;
        document.getElementById("button-container").style.display = "flex";
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
}

function randomSlide() {
    currentIndex = Math.floor(Math.random() * slides.length);
}

function correctSlide() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
}

function mousePressed() {
    if (
        mouseX > rocketX - rocketWidth / 2 &&
        mouseX < rocketX + rocketWidth / 2 &&
        mouseY > rocketY - rocketHeight / 2 &&
        mouseY < rocketY + rocketHeight / 2
    ) {
        isBlastOff = true;
        showCover = false;
    }
}