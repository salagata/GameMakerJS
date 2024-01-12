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
// new Measure("speed")
class Measure {
    #setMainUnit;
    #removeMainUnit;
    constructor(name,formula) { // (distance,time) => distance/time 
        this.name = name;
        this.formula = formula; 
        this.units = [];
        this.mainUnit;
    }
    addUnit(unit,scale = 1,reference = undefined,mainUnit = false) {// "Meters per second", 1 , undefined , true
        this.units.push(setNoEditable(new Unit(unit,scale,reference)));
        return this.findUnit(unit);
    }
    spreadUnit(start = 1,main,step = 10,...units) { // 1 , "meters per seconds", 10, "decameters per seconds", "hectameters per second", "kilometers per second"
        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            this.addUnit(unit,start * (step ** i),main)
        }
    }
    findUnit(unit) {
        return this.units.find(u => u == unit);
    }
    setMainUnit(unit) { // Main unit is used in formulas in Measures, distance (meters) , time (seconds) , 
        this.units.forEach(u => u.#removeMainUnit());
        this.findUnit(unit).#setMainUnit();
    }
}
// new Unit("Meters per second")
class Unit {
    #setMainUnit;
    #removeMainUnit;
    constructor(unitName,scaleToReference,reference,mainUnit) {
        this.unitName = unitName;
        this.scaleToReference = scaleToReference;
        this.reference = reference ?? unitName;
        this.mainUnit = mainUnit;
        this.#setMainUnit = () => {
            this.mainUnit = true;
        }
        this.#removeMainUnit = () => {
            this.mainUnit = false
        }
    }
}
export {measureSystem,CONVERTIBLES_TO_PIXEL}