class TextureList {
    constructor() {
        this.usedTexture = undefined
    }
    addTexture(tname,texture) {
        this[tname] = texture;
    }
    getTexture(tname) {
        return this.textures[tname]
    }
    setTexture(tname,texture) {
        this[tname] = texture;
    }
    hasTexture(tname) {
        return this.hasOwnProperty(tname);
    }
    hasTextureValue(tname,texture) {
        return this[tname] = texture;
    }
    hasValue(texture) {
        return this.texturesValue.includes(texture);
    }
    removeTexture(tname) {
        delete this[tname]
    }
    useTexture(tname) {
        this.usedTexture = [tname,this[tname]]
    }
    forEach(callback) {
        for (const [key,value] of this.entries) {
            callback(key,value)
        }
    }
    mapTexturesValue(callback) {
        for (const [key,value] of this.entries) {
            value = callback(key,value);
        }
    }
    mapTextures(callback) {
        for (const [key,value] of this.entries) {
            key = callback(key,value);
        }
    }
    get textures() {
        return Object.keys(this);
    }
    get texturesValue() {
        return Object.values(this);
    }
    get entries() {
        return Object.entries(this);
    }
}

class TableData {
    constructor(...array) {
		this.tableArray = [];

        for (let i = 0; i < array.length; i++) {
			this.tableArray[i] = []
            for (let j = 0; j < array[0].length; j++) {
					this.tableArray[i][j] = array[i][Array.from(array[0].keys())[j]];
            }
        }
    }

	row(index) {
		return this.tableArray[index]
	}

	column(index) {
		return (() => {
			let a = [];
			for (let i = 0; i < this.tableArray.length; i++) {
				a.push(this.tableArray[i][index])
			}
			return a;
		})()
	}

	item(row,col) {
		return this[row][col];
	}

	removeRow(row) {
		this.tableArray = this.tableArray.filter((x,i) => i != row);
	}

	removeColumn(col) {
		this.tableArray = this.tableArray.map(x => {return x.filter((y,i) => i != col)});
	}

	setRow(row,data) {
		for (let i = 0; i < this.tableArray[0].length; i++) {
			this.tableArray[row][i] = data[i];
		}// [2][]
		
	}

	setColumn(col,data) {
		console.log(this.tableArray.map((x,i) => {x[i] = data[i]; return x}))
		//this.tableArray = this.tableArray.map((x,i) => x == i ? x[col] : x[i])
	}

	forEachRow(row,fn) {
		this.tableArray.map((x,i) => x == i ? x[col] : x[i])
	}
}

class FormatText {
    constructor(element) {
        
    }
}
const CONVERTS_TO_PIXEL = {
    /**
     * Converts pixel to centimeter
     * @param {number} x The number
     * @returns The number in centimeters
     */
    cm:(x) => x * 3.846153,
    in:(x) => this.cm(x) * 2.54,
    mm:(x) => this.cm(x) / 10,
    mt:(x) => this.cm(x) * 100,
    q:(x) => x * 0.248,
    pt:(x) => this.in(x) / 72,
    pc:(x) => this.pt(x) * 12,
    px:(x) => x,
    at:(x) => this.mt(x) * (10**(-10))
}
var quantitySystem = {
    quantities:[]
};

class Quantity {
    constructor(quantityName,scaleToReference,reference) {
        this.quantityName = quantityName;
        this.scaleToReference = scaleToReference;
        this.reference = reference;
        quantitySystem.quantities.push(this)
        return this
    }
}

new Quantity()
export {TextureList,TableData,Quantity,quantitySystem,CONVERTS_TO_PIXEL}