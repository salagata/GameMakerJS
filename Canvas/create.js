import { SVGcanvas } from "../OOP/SVGcanvas.js"
import {d3} from "../OOP/d3.js";
/**
 * Creates a new svg
 * 
 * The selector has normal CSS selectors,
 * If the selector selects more than one element, the first one will be chosen.
 * @example 
 * var canvas = gameMaker.createSVG(100,100,"canvas");
 * // This create a canvas with id "canvas" 100x100 in body
 * @example
 * var canvas = gameMaker.createSVG(100,100,"canvas","#container")
 * // This create a canvas with id "canvas" 100x100 in the selection of id container
 * @param {number} width The width of canvas
 * @param {number} height The height of canvas
 * @param {string} id The id of canvas
 * @param {string} selector The selector of the parent element to which it is to be append
 * @returns {SVGcanvas} The canvas ready to use
 */
function createSVG(width,height,id,selector = "body"){
    let svg = d3.select(selector).append("div");
    svg.attr("id",id).style("width",width).style("height",height);
    
    return new SVGcanvas(id,width,height)
}

export { createSVG };