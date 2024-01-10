import { setNoEditable } from "./miscellaneous";
// Measures system
const CONVERTIBLES_TO_PIXEL = {
    cm:(x) => x * 3.846153,
    in:(x) => this.cm(x) * 2.54,
    mm:(x) => this.cm(x) / 10,
    mt:(x) => this.cm(x) * 100,
    q:(x) => x * 0.248,
    pt:(x) => this.in(x) / 72,
    pc:(x) => this.pt(x) * 12,
    px:(x) => x,
    atom:(x) => this.mt(x) * (10**(-10))
}
/*
Measure: Speed
Quantities: meters per second, kilometers per hour
*/
var measureSystem = {
    measures : [], // speed, distance, time
    newMeasure(...name) { // "Speed","Distance","Time"
        name.flat().forEach((n) => {
            this.measures.push(setNoEditable(new Measure(n)))
        })
    }
}
// new Measure("speed")
class Measure {
    constructor(name,formula) {
        this.name = name;
        this.formula = (formula); 
        this.quantities = [];
    }
    addUnity(quantity) {
        if (typeof quantity == "string") { // meters per second
            this.quantities.push(quantity)
        } else {
            for (const q of quantity) {
                this.quantities.push(quantity) // [meters per second, kilometers per hour]
            }
        }
    }

}
// new Unity("Meters per second")
class Unity {
    constructor(quantityName,scaleToReference,reference) {
        this.quantityName = quantityName;
        this.scaleToReference = scaleToReference;
        this.reference = reference;
    }
}
export {Unity,measureSystem,CONVERTIBLES_TO_PIXEL}