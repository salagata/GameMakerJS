import {d3} from "./d3.js";
import {Sprite} from "./sprite.js";
import { Text } from "./text.js";
import { TextureList } from "./misc.js";


class SVGcanvas {
    #svg;
    constructor(id,w,h,textureData) {
        this.id = id;
    	this.textures = new TextureList();
        this.width = w;
        this.height = h;
        this.maxLayer = 0;
        this.minLayer = 0;
        this.nowLayer = 0;
        this.nowTexture = undefined;
        this.#svg = d3.select("#"+id).style("position","relative");
        this.cursor = this.newSprite("cursor",1,1,"default",false,{}).hide()
        this.center = this.newSprite("center",1,1,"default",false,{}).hide().goTo(this.width,this.height)
    };

    
    /**
     * Create an sprite in this canvas
     * @param {string} name Name of sprite
     * @param {number} sizeX Width of sprite
     * @param {number} sizeY Height of sprite
     * @param {string} classs Class of sprite
     * @param {boolean} isEllipse The sprite is an ellipse?
     * @param {object} data Data of sprite to init
     */
    newSprite(name,sizeX,sizeY,classs = "",isEllipse = false,data={}){
        let sprite = new Sprite(name,this,sizeX,sizeY,classs,isEllipse,data)

        return sprite;
    };

    addText(id,textFormat,width,height,classs= "",data = "") {
        let text = new Text(id,this,textFormat,width,height,classs,data)
    
        return text
    }

    startCursorMovement() {
        document.getElementById(this.id).addEventListener("mousemove",(e) => {
            let c = document.getElementById(this.id).getBoundingClientRect();
            
            this.cursor.goTo(
                Math.round(e.clientX-c.left),// - this.width, // x
                Math.round(e.clientY-c.top)// - this.height  // y
            );
        })
        return this
    }

    get texturesList() {
        return this.textures.texturesValue
    }

    get textureNames() {
        return this.textures.textures
    }

    addTexture(name,type){
        if (typeof name != "object") {
            this.textures.addTexture(name,type)
        } else {
            if (name instanceof Array || type instanceof Array) {
                console.log(name,type)
                for(let i = 0; i < name.length;i++ ) {
                    this.textures.addTexture(name[i],type[i])
                }
            } else {
                for(let [n,v] of Object.entries(name)) {
                    this.textures.addTexture(n,v)
                }
            }
        }
        
    };

    setTexture(name){
        this.#svg.style("background", this.textures[name]);
        return this
    };

    texture(name) {
        return this.textures.getTexture(name);
    };

    removeTexture(name) {
        if (typeof name != "object") {
            this.textures.removeTexture(name)
        } else {
            for (const n of name) {
                this.textures.removeTexture(name)
            }
        }
        return this
    };

    anonymousTexture(value) {
        this.#svg.style("background", value);
        return this
    }

    addAnonymousTextureToList(name){
        this.addTexture(name,this.#svg.style("background"))
    }

    forEachTexture(fn) {
        this.textures.forEach(fn)
    }
    
    mapTexture(fn) {
        this.textures.mapTextures(fn)
    }

    mapTextureValue(fn) {
        this.textures.mapTexturesValue(fn)
    }
}

export {SVGcanvas};