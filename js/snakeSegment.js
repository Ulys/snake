/**
 * @fileoverview Snake segment 
 * @author anton.razumovskyy@gmail.com
 */
"use strict";
/**
 * SnakeSegment
 * @contructor
 * @this {snakeSegment}
 * @param {Number} x - row number
 * @param {Number} y - column number
 * @param {String} direction SnakeSegment.DOWN || SnakeSegment.UP ||
 *     SnakeSegment.LEFT || SnakeSegment.RIGHT
 */
function SnakeSegment(x, y, direction) {
	// console.log("snake segment @constructor ...");
	this.coordinates = {"x": x,
						"y": y};
	this.direction = direction;
}
/**
 * @const
 * @type{String}
 */
SnakeSegment.DOWN = "down";
/**
 * @const
 * @type{String}
 */
SnakeSegment.UP = "up";
/**
 * @const
 * @type{String}
 */
SnakeSegment.LEFT = "left";
/**
 * @const
 * @type{String}
 */
SnakeSegment.RIGHT = "right";
/** @function move segment according to direction*/
SnakeSegment.prototype.move = function() {
	// console.log("snake segment move ...");
	switch(this.direction){
		case SnakeSegment.UP:
			return new SnakeSegment(this.coordinates.x - 1, this.coordinates.y, this.direction);
		case SnakeSegment.DOWN:
			return new SnakeSegment(this.coordinates.x + 1, this.coordinates.y, this.direction);
		case SnakeSegment.RIGHT:
			return new SnakeSegment(this.coordinates.x, this.coordinates.y + 1, this.direction);
		case SnakeSegment.LEFT:
			return new SnakeSegment(this.coordinates.x, this.coordinates.y - 1, this.direction);
		default:
			return;
	}
}