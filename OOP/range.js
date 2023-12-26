function getSign(n) {
    return Math.abs(n) / n;
}
/**
 * Create a new range
 * @param {number} start Start range
 * @param {number} stop End range
 * @param {number} step Step range
 * @returns Range
 */
function Range(start,stop,step = 1) {
    let r = [];
    for (let i = (getSign(step) == 1 ? start : stop); (getSign(step) == 1 ? i : start) < (getSign(step) == 1 ? stop : i) + 1; i += step) {
        r.push(i)
    }
    return r;
}
export { Range }