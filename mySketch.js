/*
<Drake X UWaterloo>
Liza Mehta
l3mehta 
21080966

Agamjot Kaur Saini 
ak5saini
21071435

INSTRUCTIONS
<The game features the famous Torontonian singer Drake as he persues a degree at UWaterloo! After reading the storyline,
users move drake along the map using arrow keys to collect hearts, increasing the score by one and avoiding goose poop which 
will decrease the score by one. If users collect 30 hearts, they win the game. If the score reaches - 2, they lose the game. 
After users win or lose the game, they can hover over (changes button colour) and click the restart button with the mouse to 
play the game again.>

VIDEO
<paste video URL here>


RELEASE
I <Liza Mehta and Agamjot Kaur Saini> grant permission to CS105 course staff to use
my Final Project program and video for the purpose of promoting CS105.


BASIC CONCEPTS
< 1. Drawing Shapes and Using Drawing Attributes: 
		 Under function "displayScreen()" multiple shapes including circles, triangles, ellipses, lines, etc. were used to draw
		 complicated shapes like clouds, goose poop, and music notes. Attributes such as fill, stroke, noStroke are also used to make 
		 each drawing unique. 
  2. Conditionals: 
		 Multiple If statements are used throughout the code, the most unique being in function "winScreen()" (lines 553 - 568) and
		 function "loseScreen()" (lines 627 - 639). The conditional if statement in either function checks whether the mouse is 
		 over the restart button and changes the button color to yellow; if the mouse is clicked at that position, it resets game 
		 variables and changes the game state to "start," so the game restarts. 
	3. User Defined Functions: 
		 "gameScreen()" is a user defined function that controls the game loop and displays the best use of user defines functions as it 
		 calls other functions like drawGrassGrid, dayMap, drawHeart, drawGoosePoop, drawMovingGoose, collision, and collisionPoop to 
		 manage various game elements such as regenerating hearts or poop as the user collects them. It further uses the keyPressed 
		 function to control the transition from the "story" to the "game" state.
	4. Loops: 
		 The "drawGrassGrid()" function uses uses nested for loops to create a grid of green squares on the canvas. The outer loop 
		 iterates over the rows, determined by the height and gridSize, while the inner loop iterates over the columns, determined 
		 by the width and gridSize. Inside the loops, the function sets the fill color based on a predefined array (grassColors) and 
		 then draws a square at each grid position.
	5. Arrays: 
		 The "grassColours" array (line ___) contains three colour values that represent different shades of green with varying levels 
		 of transparency. In the drawGrassGrid function, the array is used to set the fill color for each square in the grid.
		 The color for each square is chosen by cycling through the colors in the array, following a repeating pattern.
		 
	6. Mouse or Keyboard Interaction: 
	 	 The "moveDrake()" function uses keyboard interaction to control the character Drake's movement on the canvas. 
		 It adjusts Drake's position (characterX and characterY) and displays the correct image based on the pressed arrow keys, 
		 simulating movement in different directions while ensuring it stays within the canvas boundaries.
	>


EXTENDED CONCEPTS
< 1. Remapping with map(): 
		 The "drawMovingGoose()" function uses map to create a color-changing effect for the moving goose image 
     The map function remaps the frame count (t) values 255 to RGB color values, which adjustes the tint of the goose image over time. 
	   This remapping allows for a continuous and visually appealing color transition.
 2. Rectangle or circle hit testing: 
    The "hitTest" function checks whether a point (px, py) is within the boundaries of a rectangle defined by its center (x, y) 
		and dimensions (w, h). In the startButton function, this hit test is used to determine if the mouse is over a circular button. 
		When the mouse is over the button, the button color changes to yellow, and if the mouse is pressed, the game state changes to 
		"story." If the mouse is not over the button, the color remains red. 
 3. Loading and displaying images: 
 		The function "preload()" loads multiple images from both the web and hand drawn using procreate. The images are then displayed 
		either as background elements or moveable characters throughout the game. 
 4. Image processing: 
 		The function "drawStaticGoose()" The tint function modifies the color of the image based on the calculated RGB values, 
		and noTint is used to reset the tint, ensuring so other elements on the canvas are not affected by the color changes. 
 5. Sound: 
 		After preloading the sound, "playSound.play();" is played under the setup function to play soothing music throughout the game. 
 >


CODING QUALITY AND VISUAL DESIGN
<Our coding proficiency is evident in the well-structured p5.js game code, showcasing organized functions, 
efficient use of arrays for game elements, and the implementation of complex features like collision detection and 
keyboard interactions. The visual design demonstrates creativity with a visually appealing environment, including dynamic 
elements such as a color-changing static goose, animated clouds, and interactive flowers. The game seamlessly transitions 
between various states, including a start screen, story progression triggered by keyboard input, the main game, and distinct 
win/lose screens, highlighting our ability to structure code for diverse user experiences.>

*/

// variables for music 
let speedboostSound;  
let winSound; 
let loseSound; 
let playSound; 

// variables for the goose
let imgGoose;
let gooseX;
let gooseY;
let gooseSize = 100;
let gooseSpeed = 0.05; // Adjust the speed of the goose movement

// variables for the display drake
let imgDrakeDisplay;

// variables for the banner
let bannerText = "DRAKE X UWATERLOO";
let xBanner = 0;

// state variable
let state = "start"; // Set the initial state to "start"

// story screen text flags
let textOne = false;
let textTwo = false;

// drake variables
let drake_back, drake_right, drake_left;
let characterX, characterY;
let movementSpeed = 5; // Adjust the movement speed
let flower;
let grassColors = [];

// random hearts array
let hearts = [];
let score = 0;

// random poop array
let goosePoop = [];

// moving goose array
let rareGoose = [];

// preload images and sounds 
// this is an excellent exmaple of loading and displaying images 
function preload() {
	goose = loadImage("images.png"); //citation: Liza Mehta, Agamjot Kaur Saini
	drake_left = loadImage("drake_left.png"); //citation: Liza Mehta, Agamjot Kaur Saini
	drake_right = loadImage("drake_right.png"); //citation: Liza Mehta, Agamjot Kaur Saini
	flower = loadImage("orangeflower.png"); //citation: Sandro Pereira, https://www.shareicon.net/fire-flower-retro-451861
	drake_back = loadImage("drake_back.png"); //citation: Liza Mehta, Agamjot Kaur Saini
	playSound = loadSound("play.mp3"); //citation: Soundroll, https://uppbeat.io/track/soundroll/the-incident
}

// set up function initializes various elements that stay static  
function setup() {
	playSound.play(); // this is an excellent example of sound
	createCanvas(800, 600);
	noStroke(); 

	// different colours for the grass
	grassColors = [
		color(0, 100, 0, 170),
		color(0, 120, 0, 170), 
		color(0, 140, 0, 170), 
	];

	// initial position for the static goose 
	gooseX = width / 6;
	gooseY = height - goose.height / 3;

	characterX = width / 2;
	characterY = height / 2;

	for (let i = 0; i < 5; i++) {
		hearts.push({
			x: random(width),
			y: random(height),
		});
	}
	for (let i = 0; i < 5; i++) {
		goosePoop.push({
			x: random(width),
			y: random(height),
		});
	}
}

// handles the different states for the games 
function draw() {
	if (state === "start") {
		displayScreen();
	} 
	else if (state === "story") {
		storyScreen();
	} 
	else if (state === "game") {
		gameScreen();
		if (score >= 30) {
			state = "win"; // state changes to "win" when the score hits 30
		} 
		else if (score === -2) {
			state = "lose"; // state changes to "lose" when the score is - 2
		}
	} 
	else if (state === "win") {
		winScreen();
	} 
	else if (state === "lose") {
		loseScreen();
	}
}

// this function draws clouds
function clouds(x, y, size) {
	noStroke();
	fill(255, 255, 255);
	circle(x, y, size);
	circle(x - 35, y, size);
	circle(x + 35, y, size);
	circle(x - 15, y - 30, size);
	circle(x + 15, y - 30, size);
}

// this function handles the hit test for the start button which is displayed on the displayScreen
function hitTest(px, py, x, y, w, h) {
	return (
		px >= x - w / 2 && px <= x + w / 2 && py >= y - h / 2 && py <= y + h / 2
	);
}

// this function draws the start button which is displayed on the displayScreen
// this is an excellent exmaple of circle hit test 
function startButton() {
	noStroke();

	// circle
	let buttonRadius = 50;
	let buttonX = width / 2;
	let buttonY = height / 2;
	
	// hit test to change the colour and the state of the game 
	if (hitTest(mouseX, mouseY, buttonX, buttonY, buttonRadius * 2, buttonRadius * 2)) {
		fill(239, 195, 40); 
		if (mouseIsPressed) {
			state = "story";
		}
	} 
	else {
		fill("red");
	}
	
	// button 
	ellipse(buttonX, buttonY, buttonRadius * 2, buttonRadius * 2);
	
	// triangle within the circle
	fill("white");
	triangle(buttonX - 10, buttonY - 15, buttonX - 10, buttonY + 15, buttonX + 15, buttonY);

	// text to indicate the button should be clicked to proceed
	textSize(15);
	textAlign(CENTER);
	text("CLICK HERE TO PLAY!", buttonX, buttonY + 90);
}

// function to draw the static goose displayed in the displayScreen
function drawStaticGoose() {
	// draws goose image with changing colours
	let t = frameCount * 5; 
	let redTint = map((t % 255), 0, 255, 0, 255);
	let greenTint = map((t * 0.5 % 255), 0, 255, 0, 255);
	let blueTint = map((t * 0.25 % 255), 0, 255, 0, 255);

	// apply tin to the image
	tint(redTint, greenTint, blueTint);
	image(goose, gooseX - goose.width / 4, gooseY - goose.height / 2, goose.width / 2, goose.height / 2);
	noTint(); // reset tint
}

// this function draws goose poop 
function drawGoosePoop(x, y) {
	noStroke();
	fill("rgb(71,13,13)");
	ellipse(x, y, 20, 10);
	ellipse(x, y - 5, 15, 10);
	ellipse(x, y - 10, 10, 10);
}

// this function draws music notes 
function musicNotes(x, y) {
	strokeWeight(2);
	stroke("black");
	line(x, y, x, y + 20);
	fill("black");
	circle(x - 5, y + 20, 10);
}

// this function draws hearts 
function drawHeart(x, y, size) {
	fill("#FF66B2"); // Pink color
	noStroke();
	// Left half of the heart
	ellipse(x - size / 4, y - size / 4, size / 2, size / 2);
	ellipse(x + size / 5, y - size / 4, size / 2, size / 2);
	triangle(x - size / 2, y - size / 6, x + size / 2 - 2, y - size / 6, x, y + size / 2 - 2);
}

/* this function includes everything shown when the player initially starts to play the game. 
this includes, all shapes, text, images and the start button. 

this is the best example of drawing shapes and using drawing attributes.
*/
function displayScreen() {
	background("deepSkyBlue");

	// hills
	noStroke();
	fill("rgb(66,162,16)");
	ellipse(100, 600, 700, 400);
	ellipse(700, 600, 700, 400);

	// clouds
	clouds(50, 150, 60);
	clouds(200, 50, 60);
	clouds(350, 150, 60);
	clouds(500, 50, 60);
	clouds(650, 150, 60);
	clouds(800, 50, 60);

	// background of the banner
	noStroke();
	fill(24, 157, 201, 60);
	rect(0, 0, width, height - 450);

	// banner text
	strokeWeight(10);
	stroke(239, 195, 40);
	fill(255);
	textSize(50);
	textFont("monospace");
	textStyle(BOLD);
	text(bannerText, xBanner, height - 500);

	// move the text to the right
	xBanner += 2;

	// once the text leaves the canvas, reset the position
	if (xBanner > width) {
		xBanner = -textWidth(bannerText);
	}

	// check if the mouse is over the button
	startButton();
	
	//draw the static goose 
	drawStaticGoose(); 

	// draw goose poop
	drawGoosePoop(200, 500);
	drawGoosePoop(80, 530);
	drawGoosePoop(70, 450);
	drawGoosePoop(170, 570);
	drawGoosePoop(260, 450);

	// draw drake
	image(drake_left, 600, 350, 150, 150);

	// draw music notes 
	musicNotes(600, 400);
	musicNotes(610, 470);
	musicNotes(730, 350);
	musicNotes(750, 500);

	// draw hearts
	drawHeart(600, 450, 20);
	drawHeart(750, 400, 20);
	drawHeart(730, 450, 20);
	drawHeart(630, 350, 20);
	drawHeart(650, 520, 20);
}

/* this function draws the storyScreen which includes the backstory and the 
instructions for the game.
*/
function storyScreen() {
	background("deepSkyBlue");

	// clouds
	clouds(50, 150, 60);
	clouds(200, 50, 60);
	clouds(350, 150, 60);
	clouds(500, 50, 60);
	clouds(650, 150, 60);
	clouds(800, 50, 60);
	
	// grass
	fill("rgb(66,162,16)");
	rect(0, 540, width, 60);

	// flowers
	image(flower, 10, 500, 90, 90);
	image(flower, 380, 500, 90, 90);
	image(flower, 450, 520, 90, 90);
	image(flower, 700, 500, 90, 90);
	
	// drake
	image(drake_right, 20, 250, 350, 350);
	
	// speech bubble
	fill(239, 195, 40);
	circle(310, 290, 10);
	circle(340, 270, 20);
	circle(370, 250, 30);
	ellipse(580, 180, 350, 300);
	
	// instructions
	textSize(20);
	fill("black");
	text("CLICK ANY KEY TO PROCEED!", 570, 380);
	
	// changes the text once the players has clicked any key and wants to proceed 
	if (textOne) {
		fill(239, 195, 40, 245); 
		ellipse(580, 180, 350, 300); 

		textSize(18);
		fill("white");
		textAlign(CENTER);
		text("Yeooo! It's your boy \n Drake here, I decided to \n go to UWaterloo to get my \n degree in Rizzology.", 580, 150);
	}

	if (textTwo) {
		fill(239, 195, 40, 245);
		ellipse(580, 180, 350, 300); 

		textSize(18);
		fill("white");
		textAlign(CENTER);
		text("Help me collect all the \n hearts to pass this program! \n Avoid goose poop and try \n to touch the magic goose \n to increase your speed!", 580, 140);
	}
}

/* function that draws the game screen after a key is pressed after viewing the last text on the 
storyScreen. it draws the grass background, the moving character, the magic goose which appears when 
the player hits 15 points and random hearts and goose poop on the screen. 

this is the best exmaple of using a user defined function. 
*/
function gameScreen() {
	background("deepskyblue");

	// draws the grass and flowers each time
	drawGrassGrid(10, 10, width - 20, height - 20, 20);
	dayMap();
	
	// draws random hearts on the screen for the player to collect
	for (let i = 0; i < hearts.length; i++) {
		drawHeart(hearts[i].x, hearts[i].y, 20);
	}
	
	// draws random goose poop that the players needs to avoid
	for (let i = 0; i < goosePoop.length; i++) {
		drawGoosePoop(goosePoop[i].x, goosePoop[i].y);
	}
	
	// calls the function that draws the moving goose
	drawMovingGoose();

	// displays the score in the top right corner
	fill("white");
	textSize(15);
	textAlign(RIGHT, TOP);
	text("Score: " + score, width - 20, 20);
	
	// identifys when the character (drake) collides with hearts, goose poop and the magic goose
	collision();
	collisionPoop();
	collisionGoose();
}

/* this function handles what happens when the key is pressed which includes the text in the 
storyDisplay and moves to the gameDisplay once all the text has been executed. 
*/
function keyPressed() {
	if (state === "story") {
		if (!textOne && !textTwo) {
			textOne = true;
		} 
		else if (textOne && !textTwo) {
			textTwo = true;
		} 
		else {
			state = "game"; // changes to the gaem state
		}
	}
}

/* this functions draws the grass for the gameDisplay

this is the best example of using loops and arrays
*/
function drawGrassGrid(x, y, width, height, gridSize) {
	// number of rows and columns
	let rows = floor(height / gridSize);
	let cols = floor(width / gridSize);

	// grid of green squares 
	// used loops and arrays
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let colorIndex = (i + j) % grassColors.length; 
			let grassColor = grassColors[colorIndex];
			fill(grassColor);
			noStroke();
			rect(x + j * gridSize, y + i * gridSize, gridSize, gridSize);
		}
	}
}

/* this function draws the flowers, the moving character and the instructions located at the bottom
of the gameDisplay. 
*/
function dayMap() {
	// flowers
	image(flower, 100, 100, 70, 70);
	image(flower, 50, 50, 70, 70);
	image(flower, 600, 350, 70, 70);
	image(flower, 650, 400, 70, 70);
	image(flower, 50, 500, 70, 70);
	image(flower, 700, 50, 70, 70);
	
	// character (drake)
	moveDrake();
	
	// instructions
	fill("white");
	textSize(15);
	textAlign(CENTER);
	text("Use the arrow keys to move Drake!", width / 2, height - 30)
}

/* function that creates the moving character and based on the direction chosen by the player with 
the arrow keys on their keyboard, it chooses the image to display. this function
also makes sure that the character does not leave the screen.

this function is the best use of using keyboard interactions. 
*/
function moveDrake() {
	// Determine the appropriate image based on the arrow keys
	if (keyIsDown(RIGHT_ARROW)) {
		characterX = constrain(characterX + movementSpeed, 0, width - 100);
		image(drake_right, characterX, characterY, 100, 100);
	} 
	else if (keyIsDown(LEFT_ARROW)) {
		characterX = constrain(characterX - movementSpeed, 0, width - 100);
		image(drake_left, characterX, characterY, 100, 100);
	} 
	else {
		image(drake_back, characterX, characterY, 100, 100);
	}

	if (keyIsDown(UP_ARROW)) {
		characterY = constrain(characterY - movementSpeed, 0, height - 100);
	} 
	else if (keyIsDown(DOWN_ARROW)) {
		characterY = constrain(characterY + movementSpeed, 0, height - 100);
	}
}

/* this function increases the score by 1 when the character collides with 
the hearts on the gameDisplay. 
*/
function collision() {
	for (let i = 0; i < hearts.length; i++) {
		let heartSize = 20;
		let D = dist(
			hearts[i].x + heartSize / 2,
			hearts[i].y + heartSize / 2,
			characterX + 50, 
			characterY + 50
		);

		if (D < (heartSize + 50) / 2) {
			score++;
			hearts[i].x = random(width - 20);
			hearts[i].y = random(height - 20);
		}
	}
}

/* this function decreases the score by 1 when the character collides with 
the goose poop on the gameDisplay. 
*/
function collisionPoop() {
	for (let i = 0; i < goosePoop.length; i++) {
		let poopSize = 20;
		let D = dist(
			goosePoop[i].x + poopSize / 2,
			goosePoop[i].y + poopSize / 2,
			characterX + 50, 
			characterY + 50
		);

		if (D < (poopSize + 50) / 2) {
			score--;
			goosePoop[i].x = random(width - 20);
			goosePoop[i].y = random(height - 20);
		}
	}
}

/* this function creates the magic goose that comes during the gameDisplay. 
this function mainly handles the directiona and the speed of the goose.
*/
function moveGoose() {
	let gooseSpeed = 0.010; // speed 

	targetX = random(width - goose.width); 
	targetY = random(height - goose.height); 

	// updates the goose's position
	gooseX += (targetX) * gooseSpeed;
	gooseY += (targetY - gooseY) * gooseSpeed;

	// updates the target position
	if (frameCount % 60 === 0) {
		targetX = random(width - goose.width); 
		targetY = random(height - goose.height); 
	}
}

// this function's goal is to draw the actual goose that moves accross the screen during gameDisplay
// this is the best example of remapping with map()
function drawMovingGoose() {
	if (score >= 15) {
		// draw the moving goose image with colour changing affects 
		let t = frameCount * 5; 
		let redTint = map((t % 255), 0, 255, 0, 255);
		let greenTint = map((t * 0.5 % 255), 0, 255, 0, 255);
		let blueTint = map((t * 0.25 % 255), 0, 255, 0, 255);

		// applies the tint to the image
		tint(redTint, greenTint, blueTint);
		image(goose, gooseX - goose.width / 4, gooseY - goose.height / 2, goose.width / 2, goose.height / 2);
		noTint();
		
		moveGoose();
	}
}

/* this function increases the speed of the character when it collides with the 
magic goose during the game Display.
*/
function collisionGoose() {
	if (score >= 15) {
		let gooseRadius = gooseSize / 4; // Assuming goose.width / 2 and goose.height / 2
		let drakeRadius = 50; // Assuming drake width and height are both 100

		let distance = dist(gooseX, gooseY, characterX + 50, characterY + 50);

		if (distance < gooseRadius + drakeRadius) {
			// Collision detected
			movementSpeed += 0.2; // Increase the speed of the drake
		}
	}
}

/* this function draws the winScreen, which includes all the images and shapes and the restart button,
when the player achives 30 points by collecting the hearts.

this is the best example of using conditionals.
*/
function winScreen() {
	background("deepSkyBlue");

	// clouds
	clouds(50, 150, 60);
	clouds(200, 50, 60);
	clouds(350, 150, 60);
	clouds(500, 50, 60);
	clouds(650, 150, 60);
	clouds(800, 50, 60);
	
	// grass
	fill("rgb(66,162,16)");
	rect(0, 540, width, 60);
	
	// flowers
	image(flower, 10, 500, 90, 90);
	image(flower, 150, 520, 90, 90);
	image(flower, 380, 500, 90, 90);
	image(flower, 450, 520, 90, 90);
	image(flower, 700, 500, 90, 90);
	
	// win display
	strokeJoin(BEVEL);
	strokeWeight(5);
	stroke(0);
	fill(239, 195, 40, 240);
	rect(width - 600, height - 450, 400, 300);

	noStroke();
	fill(255);
	textSize(65);
	textAlign(CENTER);
	text("YOU WIN!", width / 2, height - 380);

	textSize(15);
	fill("rgb(206,97,11)");
	text("Thank you for helping Drake \n get his degree in rizzology! \n", width / 2, height - 305);
	
	// drake and the goose
	image(goose, 90, 320, 200, 200);
	image(drake_left, 500, 300, 200, 200);

	// variables for the restart button
	let restartButtonX = width / 2;
	let restartButtonY = height - 220;
	let restartButtonWidth = 150;
	let restartButtonHeight = 50;

	// hit test for the restart button and changes the colours when the mouse hovers over the button
	if (hitTest(mouseX, mouseY, restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight)) {
		fill("rgb(66,162,16)"); 
		if (mouseIsPressed) {
			// reset the state of the game to "start"
			score = 0;
			movementSpeed = 5;
			state = "start";
			gooseX = width / 6;
			gooseY = height - goose.height / 3;
			displayScreen();
			 
		}
	} 
	
	else {
		fill(255, 0, 0); 
	}

	strokeJoin(BEVEL);
	strokeWeight(3);
	stroke(0);
	rect(restartButtonX - restartButtonWidth / 2, restartButtonY - restartButtonHeight / 2, restartButtonWidth, restartButtonHeight);
	
	// retest button text
	noStroke();
	fill(255);
	textFont("monospace");
	textSize(20);
	textAlign(CENTER);
	text("RESTART", restartButtonX, 370);
}

/* this function draws the loseScreen, which includes all the images and shapes and the restart button,
when the player achives -2 points by collecting the goose poop.

this is the best example of using conditionals.
*/
function loseScreen() {
	background("deepSkyBlue");

	// clouds
	clouds(50, 150, 60);
	clouds(200, 50, 60);
	clouds(350, 150, 60);
	clouds(500, 50, 60);
	clouds(650, 150, 60);
	clouds(800, 50, 60);
	
	// grass
	fill("rgb(66,162,16)");
	rect(0, 540, width, 60);

	// flowers
	image(flower, 10, 500, 90, 90);
	image(flower, 150, 520, 90, 90);
	image(flower, 380, 500, 90, 90);
	image(flower, 450, 520, 90, 90);
	image(flower, 700, 500, 90, 90);
	
	// lose display 
	strokeJoin(BEVEL);
	strokeWeight(5);
	stroke(0);
	fill(239, 195, 40, 240);
	rect(width - 600, height - 450, 400, 300);

	noStroke();
	fill(255);
	textSize(60);
	textAlign(CENTER);
	text("YOU LOST!", width / 2, height - 380);

	textSize(15);
	fill("rgb(206,97,11)");
	text("You did not help Drake \n get his degree in rizzology. \n", width / 2, height - 305);

	image(goose, 90, 320, 200, 200);
	image(drake_left, 500, 300, 200, 200);
	
	// variables for the restart button
	let restartButtonX = width / 2;
	let restartButtonY = height - 220;
	let restartButtonWidth = 150;
	let restartButtonHeight = 50;
	
	// hit test for the restart button and changes the colours when the mouse hovers over the button
	if (hitTest(mouseX, mouseY, restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight)) {
		fill("rgb(66,162,16)"); 
		if (mouseIsPressed) {
			// reset the game state to "start"
			score = 0;
			movementSpeed = 5;
			state = "start";
			displayScreen();
		}
	} 
	else {
		fill(255, 0, 0); 
	}
	strokeJoin(BEVEL);
	strokeWeight(3);
	stroke(0);
	rect(restartButtonX - restartButtonWidth / 2, restartButtonY - restartButtonHeight / 2, restartButtonWidth, restartButtonHeight);
	
	// retest button text 
	noStroke();
	fill(255);
	textFont("monospace");
	textSize(20);
	textAlign(CENTER);
	text("RESTART", restartButtonX, 370);
}