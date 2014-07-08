/**
 * @fileoverview Field items: apples
 * @author anton.razumovskyy@gmail.com
 */
"use strict";
/**
 * An Field Item
 * @constuctor
 * @this {Snake}
 * @param {String} type Item.BONUS || Item.Standart
 * @param {Number} x
 * @param {Number} y
 */
function Item(x, y, type) {
	// console.log("item @constructor");
	this.type = type;
	this.coordinates = { "x": x,
						"y": y };
}
/**
 * @const
 * @type{String}
 */
Item.BONUS = "bonus";
/**
 * @const
 * @type{String}
 */
Item.STANDART = "standart";
/**
 * @const
 * @type{String}
 */
Item.WALL = "wall";
