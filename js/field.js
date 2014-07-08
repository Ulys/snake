/**
 * @fileoverview Game field for snake game
 * @author anton.razumovskyy@gmail.com
 */
"use strict";
 /**
 * A game field
 * @constuctor
 * @this {Field}
 * @param {Snake} snake
 * @param {}
 */
function Field(snake) {
	console.log("field @constructor ...");
	this.snake = snake;
	this.meal = null;
	this.bonus = null;
	this.walls = [];
	this.gameData = this.generateField();
	this.drawSnake();
	this.createStuff();
}
/**
 * @const
 * @type {Number}
 */
Field.COL = 40;
/**
 * @const
 * @type {Number}
 */
Field.ROW = 30;
/** 
 * @function Create gameData {Array[{Numbers}]
 * append gameField to page
 */
Field.prototype.generateField = function () {
	// console.log("field generate field ...");
	var i, j, row, cell,
		gameData = new Array(),
		field = document.createElement("div");
	field.id = "snakeField";
	for (i = 0; i < Field.ROW; i++) {
		gameData[i] = new Array();
		row = document.createElement("div");
		row.className = "row";
		for (j = 0; j < Field.COL; j++) {
			cell = document.createElement("div");
			cell.className = "empty";
			row.appendChild(cell);
			gameData[i].push(cell);
		}
		field.appendChild(row);
	}
	document.getElementById("wrapper").appendChild(field);
	return gameData;
};
/** @function draw snake*/
Field.prototype.drawSnake = function () {
	// console.log("field draw snake ...");
	var i, len, segment;
	for (i = 0, len = this.snake.body.length; i < len; i++) {
		segment = this.snake.body[i];
		this.gameData[segment.coordinates.x][segment.coordinates.y].className = "body";	
	}
};
/** @function draw snake*/
Field.prototype.eraseSnake = function () {
	// console.log("field erase snake ...");
	var i, len, segment;
	for (i = 0, len = this.snake.body.length; i < len; i++) {
		segment = this.snake.body[i];
		this.gameData[segment.coordinates.x][segment.coordinates.y].className = "empty";
	}
};
/** 
 * @function put additional stuff on field
 * @param {String} name Item.MEAL || Item.WALL || Item.BONUS
 */
Field.prototype.createStuff = function (name) {
	// console.log("field create stuff...");
	var i, j, coord, item;
	do {
		i = Math.floor(Math.random() * Field.ROW);
		j = Math.floor(Math.random() * Field.COL);
		coord = {"x": i,
				 "y": j};
	} while (!this.checkCoordinates(coord));
	switch (name) {
		case Item.MEAL:
			item = new Item(coord.x, coord.y, Item.MEAL)
			this.meal = item;
			break;
		case Item.WALL:
			item = new Item(coord.x, coord.y, Item.WALL)
			this.wall.push(item);
			break;
		case Item.BONUS:
			item = new Item(coord.x, coord.y, Item.BONUS)
			this.bonus = item;
			break;
		default: break;
	}
	this.putStuff();
};
/** 
 * @function put additional stuff on field
 * @param {Object{
 *				x: {Number},
 *				y: {Number}
 * 			}} coordinate of item to check for avalability
 * @return true - available
 *		   false - occupaied by snake
 */
Field.prototype.checkCoordinates = function (coord) {
	// console.log("field check coordinate ...");
	var i, len;
	for (i = 0, len = this.snake.body.length; i < len; i++){
		if (this.snake.body[i].coordinates.x === coord.x &&
			this.snake.body[i].coordinates.y === coord.y) {
			return false;
		}
	}
	return true;
};
/** @function draw items: bonus, wall, meal on the field */
Field.prototype.putStuff = function () {
	// console.log("field put stuff ...");
	var i, len;

	if (this.meal){
		this.gameData[this.meal.coordinates.x][this.meal.coordinates.y].className = "meal";;
	}

	if (this.bonus){
		this.gameData[this.bonus.coordinates.x][this.bonus.coordinates.y].className = "bonus";;
	}

	if(this.walls.length) {
		for (i = 0, len = this.walls.length; i < len; i++){
			this.gameData[this.walls[i].coordinates.x][this.walls[i].coordinates.y].className = "wall";
		}
	}
};
/**
 * @function check snake.head coordinate and
 * coordiantes of stuff and field walls
 * @return true - Item.BONUS || Item.MEAL, nothing
 *         false - game over
 */ 
Field.prototype.checkForMeeting = function () {
	// console.log("field check for meeting ...");
	var i, len, element;
	if (this.meal.coordinates.x === this.snake.head.coordinates.x &&
		this.meal.coordinates.y === this.snake.head.coordinates.y) {
		this.createStuff(Item.MEAL);
		this.snake.eat();
		return true
	}
	if (this.snake.head.coordinates.x >= Field.ROW || this.snake.head.coordinates.x < 0 ||
		this.snake.head.coordinates.y >= Field.COL || this.snake.head.coordinates.y < 0) {
		return false;
	}
	for (i = 1, len = this.snake.body.length; i < len; i++) {
		element = this.snake.body[i];
		if (element.coordinates.x === this.snake.head.coordinates.x &&
			element.coordinates.y === this.snake.head.coordinates.y) {
			return false;
		}
	}
	if (this.walls.length){
		for (i = 0, len = this.walls.length; i < len; i++) {
			element = this.walls[i];
			if (element.coordinates.x === this.snake.head.coordinates.x &&
				element.coordinates.y === this.snake.head.coordinates.y) {
				return false;
			}
		}
	}
	return true;
};