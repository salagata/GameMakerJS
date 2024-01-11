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
    newMeasure(name,formula) { // "Speed","Distance","Time"
        this.measures.push(setNoEditable(new Measure(name,formula)))
    }
}
/*
speed
*/
class Formula {
    constructor(primitive) {
        
    }
}
// new Measure("speed")
class Measure {
    constructor(name,formula) {
        this.name = name;
        this.formula = (formula); 
        this.units= [];
    }
    addUnity(unit) {
        if (unit instanceof Unit) { // meters per second
            this.units.push(unit)
        } 
    }

}
// new Unit("Meters per second")
class Unit {
    constructor(quantityName,scaleToReference,reference) {
        this.quantityName = quantityName;
        this.scaleToReference = scaleToReference;
        this.reference = reference;
    }
}
export {Unit,measureSystem,CONVERTIBLES_TO_PIXEL}