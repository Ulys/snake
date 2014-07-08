/**
 * @fileoverview Snake class
 * @author anton.razumovskyy@gmail.com
 */
 "use strict";

/**
 * A Snake
 * @constuctor
 * @this {Snake}
 * @param {SnakeSegment}
 */

function Snake(head) {
	// console.log("snake @constructor ...")
	this.length = 3;
	this.head = head;
	this.generateBody();
	this.eatFlg = false;
};
 /** @function add segment to body, update.head*/
Snake.prototype.move = function() {
	// console.log("snake move ...");
	this.body.unshift(this.body[0].move());
	this.headUpdate();
	if (!this.eatFlg) {
		this.body.pop();
	} else {
		this.eatFlg = false;
	}
		
};
/** @function 
 * Add onesegment to head when snake head
 * find meal item on the field
 */
Snake.prototype.eat = function() {
	// console.log("snake eat ...");
	++this.length;
	this.eatFlg = true;
};
/** @function change head direction to left*/
Snake.prototype.turnLeft = function() {
	// console.log("snake turn left ...");
	if (this.head.direction !== SnakeSegment.RIGHT){
		this.head.direction = SnakeSegment.LEFT;
	}
};
/** @function change head direction to right*/
Snake.prototype.turnRight = function() {
	// console.log("snake turn right ...");
	if (this.head.direction !== SnakeSegment.LEFT){
		this.head.direction = SnakeSegment.RIGHT;
	}
};
/** @function change head direction to up*/
Snake.prototype.turnUp = function() {
	// console.log("snake turn up ...");
	if (this.head.direction !== SnakeSegment.DOWN){
		this.head.direction = SnakeSegment.UP;
	}
};
/** @function change head direction to down*/
Snake.prototype.turnDown = function() {
	// console.log("snake turn down ...");
	if (this.head.direction !== SnakeSegment.UP){
		this.head.direction = SnakeSegment.DOWN;
	}
};
/** @function generate snake body from head to tail*/
Snake.prototype.generateBody = function() {
	// console.log("snake generate body ...");
	var i,
		segment,
		len = this.length;
	this.body = [];
	this.tail = [];
	this.body.push(this.head);
	switch (this.head.direction) {
		case SnakeSegment.UP:
			for (i = 1; i < len; i++) {
				segment = new SnakeSegment(this.head.coordinates.x - i, this.head.coordinates.y, SnakeSegment.UP);
				this.body.push(segment);
			}
			break;
		case SnakeSegment.DOWN:
			for (i = 1; i < len; i++) {
				segment = new SnakeSegment(this.head.coordinates.x + i, this.head.coordinates.y, SnakeSegment.DOWN);
				this.body.push(segment);
			}
			break;
		case SnakeSegment.RIGHT:
			for (i = 1; i < len; i++) {
				segment = new SnakeSegment(this.head.coordinates.x, this.head.coordinates.y - i, SnakeSegment.RIGHT);
				this.body.push(segment);
			}
			break;
		case SnakeSegment.LEFT:
			for (i = 1; i < len; i++) {
				segment = new SnakeSegment(this.head.coordinates.x, this.head.coordinates.y + i, SnakeSegment.LEFT);
				this.body.push(segment);
			}
			break;
		default:
			break;
	}
	this.tail = this.body[this.length - 1]
}
/**
 * @function
 * Update this.head
 */
Snake.prototype.headUpdate = function() {
	// console.log("snake head update ...");
	this.head = this.body[0];
}