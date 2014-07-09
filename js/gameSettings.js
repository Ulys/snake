/**
 * @fileoverview Snake game conditions
 * @author anton.razumovskyy@gmail.com
 */
 "use strict";
 
/**
 * @constructor
 * @this {GameSettings}
 */
function GameSettings() {
	console.log("game settings @constructor");
	this.bonus = false;
	this.transparentWalls = false;
	this.fieldWalls = false;
}
/** @function classic mode */
GameStatistic.prototype.setClassicMode = function() {
	this.bonus = false;
	this.transparentWalls = false;
	this.fieldWalls = false;
}
/** @function bonus mode */
GameSettings.prototype.setBonusMode = function() {
	this.bonus = true;
	this.transparentWalls = false;
	this.fieldWalls = false;
}
/** @function addittionalWalls mode */
GameSettings.prototype.setAdditionalWallsMode = function() {
	this.bonus = false;
	this.transparentWalls = true;
	this.fieldWalls = true;
}