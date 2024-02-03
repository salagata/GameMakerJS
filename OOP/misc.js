// Texture 
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
        for (let i = 0; i < this.entries.length; i++) {
            this.setTexture(this.textures[i],callback(this.textures[i],this.texturesValue[i]));
        }
    }
    mapTextures(callback) {
        for (let i = 0; i < this.entries.length; i++) {
            this.setTexture(callback(this.textures[i],this.texturesValue[i]),this.textures[i]);
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
// Table
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
// Formateable text
class FormatText {
    constructor(element) {
        
    }
}

export {TextureList,TableData}