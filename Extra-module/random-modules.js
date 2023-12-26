import {Range} from "../OOP/range.js"
let {floor,random,round} = Math;
/**
 * Generates a random float number
 * random
 * @param {number} init Start Number
 * @param {number} end End Number
 * @returns {number} The random number
 */
function randomFloat(init,end) {
    return (random() * (end-init)) + init
}
/**
 * Generates a random integer number
 * random
 * @param {number} init Start Number
 * @param {number} end End Number
 * @param {number} step Step number
 * @returns {number} The random int number
 */
function randomInt(init,end,step = 1) {
    return round(floor(randomFloat(init,end))/step)*step
}
/**
 * Select a random choice in an array
 * random
 * @param {any[]} arr The array to select
 * @param {number} step The step
 * @returns {any} Random choice
 */
function randomChoice(arr,step = 1) {
    return arr[randomInt(0,arr.length-1,step)]
}
/**
 * Select a random choice in a set
 * random
 * @param {Set} set The set to select
 * @param {number} step The step
 * @returns {any} Random choice
 */
function randomChoiceSet(set,step = 1) {
    return Array.from(set)[randomInt(0,set.size-1,step)]
}
/**
 * Select a random choice in an object
 * random
 * @param {object} obj The object to select
 * @param {number} step The step
 * @returns {any} Random choice
 */
function randomValue(obj,step = 1) {
    return obj[randomChoice(Object.keys(obj),step)]
}
/**  
 * Select a random choice in a map
 * random
 * @param {Map} map The Map to select
 * @param {number} step The step
 * @returns {any} Random choice
 */
function randomValueMap(map,step = 1) {
    return randomChoice([...map.values()])
}
/**
 * Mutes a array shuffling him
 * random
 * @param {any[]} arr The array to shuffle
 */
function mRandomShuffle(arr) {
    arr.sort(() => randomFloat(-1,1))
}
/**
 * Mutes a set shuffling him
 * random
 * @param {Set} set The set to shuffle
 */
function mRandomShuffleSet(set) {
    set = Array.from(set).sort(() => randomFloat(-1,1))
}
/**
 * Shuffles an array
 * random
 * @param {any[]} arr The array to shuffle
 */
function randomShuffle(arr) {
    return [...arr].sort(() => randomFloat(-1,1))
}
/**
 * Shuffles a set
 * random
 * @param {Set} set The set to shuffle
 */
function randomShuffleSet(set) {
    return Array.from(set).sort(() => randomFloat(-1,1))
}
/**
 * Create a random int range
 * @param {number} length The length of range
 * @param {number} init Start point
 * @param {number} end End point
 * @param {number} step Step point
 * @returns {number[]} A range with random int numbers range
 */
function randomIntRange(length,init,end,step=1) {
    let r = [];
    for(let i of new Array(length)){
        r.push(randomInt(init,end,step))
    }
    return r;
}
/**
 * Create a random float range
 * @param {number} length The length of range
 * @param {number} init Start point
 * @param {number} end End point
 * @returns {number[]} A range with random float numbers range
 */
function randomFloatRange(length,init,end) {
    let r = [];
    for(let i of new Array(length)){
        r.push(randomFloat(init,end))
    }
    return r;
}
export {randomFloat,randomInt,randomChoice,randomChoiceSet,randomValue,randomValueMap,mRandomShuffle,randomShuffle,mRandomShuffleSet,randomShuffleSet,randomIntRange,randomFloatRange}