/**
 * @fileoverview Game Class
 * @author anton.razumovskyy@gmail.com
 */
"use strict";
/**
 * A Game
 * @constructor
 * @this {Game}
 */
function Game() {
	console.log("game @constructor ...");
	var curTime, prevTime,
		DIF_DECREMENT = 3,
		difficulty = 100,
		gameOverFlg = false,
		pauseFlg = false,
		head = new SnakeSegment(10, 10, SnakeSegment.RIGHT),
		snake = new Snake(head),
		field = new Field(snake),
		gameStatistic = new GameStatistic(field, snake),
		animationFrame =  window.requestAnimationFrame || window.msRequestAnimationFrame ||
						  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	curTime = prevTime = 0;
	window.requestAnimationFrame = animationFrame;
	window.addEventListener("keydown", getInput);
	requestAnimationFrame(update);

	/** 
	 * @function snake moving
	 */
	function update() {
		if (!gameOverFlg){
			requestAnimationFrame(update);
		}
		var state;
		curTime = new Date().getTime();
		if ( (curTime - prevTime > difficulty) && !pauseFlg){
			field.eraseSnake();
			snake.move();
			state = field.checkForMeeting();
			if (!state){
				gameOver();
				return;
			}
			if(gameStatistic.update()){
				difficulty -= DIF_DECREMENT;
			}
			field.drawSnake();
			prevTime = curTime;
		}
	}
	/** 
	 * @function catch key button
	 */
	function getInput(e) {
		// console.log("game get input "  + e.keyCode + " ...");
		if (!e) {
			var e = window.event;
		}
		e.preventDefault();
		var key = e.keyCode, state;
		if (key === 37 || key === 38 || key === 39 || key === 40 || key === 32) {
			curTime = new Date().getTime();
		}
		if (key === 32){
			pauseFlg = !pauseFlg;
		}
		if (!pauseFlg){
			switch (key) {
				case 37: snake.turnLeft();
					break;
				case 38: snake.turnUp();
					break;
				case 39: snake.turnRight();
					break;
				case 40: snake.turnDown();
					break;
			}
			if (key === 37 || key === 38 || key === 39 || key === 40) {
				field.eraseSnake();
				snake.move();
				state = field.checkForMeeting();
				if (!state){
					gameOver();
					return;
				}
				gameStatistic.update();
				field.drawSnake();
				prevTime = curTime;
			}	
		}
		
	}
	/** 
	 * @function game over
	 * remove current field and ask user to play again
	 */
	function gameOver() {
		// console.log("game game over...");
		
		var dialog, button, par,
			wrapper = document.getElementById("wrapper"),
			result = gameResult();
		gameOverFlg = true;
		window.removeEventListener("keydown", getInput);
		wrapper.removeChild(document.getElementById("snakeField"));
		wrapper.removeChild(document.getElementById("statistic"));

		button = document.createElement("div");
		button.innerText = "Yes";
		button.id = "button";
		button.addEventListener("click", function () {
			prepareForSecondGame();
			Game();
		});
		par = document.createElement("h3");
		par.innerText = "Do you like to play again?"

		dialog = document.createElement("div");
		dialog.appendChild(result);
		dialog.appendChild(par);
		dialog.appendChild(button);
		dialog.id = "end";
		wrapper.appendChild(dialog);
	}
	/** 
	 * @function prepare page nex game
	 */
	function prepareForSecondGame() {
		// console.log("game prepare for secong game ...");
		var dialog = document.getElementById("end"),
			button = document.getElementById("button"),
			wrapper = document.getElementById("wrapper");
		button.removeEventListener("click", Game);
		dialog.removeChild(button);
		wrapper.removeChild(dialog);
	}
	/**
	 * @function collect all statistical parameters
	 * @return {DOM Element}
	 */
	 function gameResult() {
	 	console.log("game game result ...");
	 	var panel = document.createElement("div"),
	 		level = document.createElement("h2"),
	 		score = document.createElement("h2");
	 	level.innerText = "Level: " + gameStatistic.level;
	 	score.innerText = "Score: " + Math.floor(gameStatistic.score);
	 	panel.appendChild(level);
	 	panel.appendChild(score);
	 	panel.id = "end-statistic"
	 	return panel;
	 }
}

