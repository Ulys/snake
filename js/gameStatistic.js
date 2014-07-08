/**
 * @fileoverview Collect statistic of game:
 * score, length, level
 * @author anton.razumovskyy@gmail.com
 */
"use strict";
 /**
 * Game Statistic
 * @constuctor
 * @this {gameStatistic}
 * @param {Field} field
 * @param {Snake} snake
 */
function GameStatistic(field, snake) {
 	console.log("game statistic @constructor ...");
 	this.field = field;
 	this.snake = snake;
 	this.level = 1;
 	this.score = 0;
 	this.meal = 0;
 	this.length = this.snake.length;
	this.levelView = document.createElement("div"),
	this.scoreView = document.createElement("div");
	this.createPanel();
}
/**
 * @const
 * @type {NUmber}
 */ 
GameStatistic.LEVEL_UP_BONUS = 10;
/**
 * @const
 * @type {NUmber}
 */ 
GameStatistic.SCORE_FOR_MEAL = 10;
/**
 * @const
 * @type {NUmber}
 */ 
GameStatistic.LEVEL_FACTOR = 0.1;
/**
 * @const
 * @type {NUmber}
 */ 
GameStatistic.MEAL_FOR_NEXT_LEVEL = 5;
/**
 * @function create game statistic panel
 */
 GameStatistic.prototype.createPanel = function() {
	console.log("game statistic create panel...");
	var panel = document.createElement("div"),
		wrapper = document.getElementById("wrapper");
	panel.id = "statistic";
	this.levelView.id = "level";
	this.scoreView.id = "score";
	
	this.levelView.innerHTML = "<h3>Level<br>" + this.level + "</h3>" ;
	this.scoreView.innerHTML = "<h3>Score<br>" + this.score + "</h3>";
	panel.appendChild(this.levelView);
	panel.appendChild(this.scoreView);
	wrapper.appendChild(panel);
 };
/**
 * @function update game statistic parameters
 * @retutn true level up
 * 		   false same level
 */
GameStatistic.prototype.update = function() {
	// console.log("game statistic update ...");
	var levelUp = false;
	if (this.lengthUpdate()) {
		++this.meal;
		levelUp = this.levelUpdate();
		this.scoreUpdate();
		this.updateView();
		
	}
	return levelUp;
};
/** 
 * @function update level
 * @return true level up
 *		   false
 */
GameStatistic.prototype.levelUpdate = function() {
	// console.log("game statistic level update ...");
	if ((this.meal % (GameStatistic.MEAL_FOR_NEXT_LEVEL * this.level)) === 0) {
		this.meal = 0;
		this.score += (GameStatistic.LEVEL_UP_BONUS * this.level);
		return !!(++this.level);
	}
	return false;
};
/** 
 * @function length update
 * @return true length up
 *		   false
 */
 GameStatistic.prototype.lengthUpdate = function() {
 	// console.log("game statistic length update ...");
 	var newLength = this.snake.length;
 	return newLength > this.length ? !!(++this.length) : false;
 };
 /** 
 * @function score update
 * @return true score update
 */
 GameStatistic.prototype.scoreUpdate = function() {
 	// console.log("game statistic score update ...");
 	this.score += Math.floor(GameStatistic.SCORE_FOR_MEAL + (this.level * GameStatistic.LEVEL_FACTOR));
 	return true;
 };
 /** @function update view of score and level */
 GameStatistic.prototype.updateView = function() {
	console.log("game statistic update view ...");
	console.log(this.scoreView);
	console.log(this.score);
	this.levelView.innerHTML = "<h3>Level<br>" + this.level + "</h3>";
	this.scoreView.innerHTML = "<h3>Score<br>" + this.score + "</h3>";
 }