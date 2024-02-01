class Ratio {
    #ratio
    constructor(antecedent,consequent) {
        this.antecedent = Number(antecedent);
        this.consecuent = Number(consequent);
        this.#ratio = antecedent/consequent;
    }
    // Background and consequent
    get ratio() {
        return this.#ratio;
    }
}
export {}