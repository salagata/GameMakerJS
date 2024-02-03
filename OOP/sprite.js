import {d3} from "./d3.js";
import { TextureList } from "./misc.js";

let rad = deg => deg * (Math.PI/180);
let degs = rad => rad * (180/Math.PI);

let roundDec = (num,q) => Math.round(num*(10**q))/(10**q)

class Sprite {
    #xSVG;
    #ySVG;
    #SVGvector;
    #SVGcanvas;
    #vectorScaleX;
    #vectorScaleY;
    #layer;
    #click;
    #mouseover;
    #mousedown;
    #mouseout;
    #width;
    #height;
    #w;
    #h;
    #rotate;
    constructor(type,SVG,sizeX,sizeY,classs = "",isEllipse = false,data = {}) {
        this.#SVGcanvas = SVG;
        this.#layer = SVG.maxLayer;
        this.#SVGvector = d3.select("#"+this.#SVGcanvas.id).append("div")
            .attr("id",type)
            .attr("class",classs)
            .style("left",0)
            .style("top",0)
            .style("width",sizeX+"px")
            .style("height",sizeY+"px")
            .style("transform",`rotate(90)`)
            .style("background","#" + Math.round((1296 - 216) * Math.random() + 216).toString("16"))
            .style("display","block")
            .style("position","absolute")
            .style("border-radius",isEllipse?"50%":"0")
            .style("z-index",this.#layer);
        this.type = type;
        this.textures = new TextureList();
        //this.classes = new DOMTokenList();
        this.#w = SVG.width
        this.#h = SVG.height
        this.#xSVG = 0;
        this.#ySVG = 0;
        this.#width = sizeX;
        this.#height = sizeY;
        this.#rotate = 90;
        this.ellipse = isEllipse;
        this.visible = true;
        this.#layer = 0;
        this.#click = undefined;
        this.#mousedown =  undefined;
        this.#mouseover = undefined;
        this.#mouseout = undefined;
        this.#vectorScaleX = 100;
        this.#vectorScaleY = 100;
        
        this.setData(data)

    }
    
    set x(data) {
        this.setX(data);
    }
    
    get x() {
        return this.#xSVG
    }

    set y(data) {
        this.setY(data);
    }
    
    get y() {
        return this.#ySVG
    }
    /**
     * Set x
     * @param {number} x The x position
     */
    setX(x){
        this.#xSVG = x;
        this.#SVGvector.style("left",(x < (this.#w-this.width) ? x : this.#w - this.#width ) +"px");
        return this;
    }
    /**
     * Set y
     * @param {number} y The y position
     */
    setY(y){
        this.#ySVG = y;
        this.#SVGvector.style("top",(y < (this.#h-this.height) ? y : this.#h - this.#height)  +"px");
        return this;
    }
    /**
     * Moves in x edge 
     * @param {number} x The x increment
     */
    addX(x){
        this.setX(this.#xSVG+x);
        return this;
    }
    /**
     * Moves in y edge 
     * @param {number} y The y increment
     */
    addY(y){
        this.setY(this.#ySVG+y);
        return this;
    }
    /**
     * Moves the sprite
     * @param {number} step The steps
     * 
     */
    move(step){
        this.addX(roundDec(step*Math.cos(rad(this.#rotate-90)),10));
        this.addY(roundDec(step*Math.sin(rad(this.#rotate+90)),10));
        
        return this;
    }
    /**
     * Moves the sprite in a canvas position
     * @param {number} x The x position
     * @param {number} y The y position
     */
    goTo(x,y) {

        if (typeof x == "number") {
            this.setX(x);
            this.setY(y);
        } else {
            this.setX(x[0]);
            this.setY(x[1])
        }
        return this;
    }
    /**
     * Moves to center
     */
    goToCenterX() {
        this.goTo(this.#w/2 - this.width/2,this.#h/2 - this.height/2);
        return this;
    }
    /**
     * Moves to center
     */
    goToCenterY() {
        this.goTo(this.#w/2 - this.width/2,this.#h/2 - this.height/2);
        return this;
    }
    /**
     * Moves to center
     */
    goToCenter() {
        this.goTo(this.#w/2 - this.width/2,this.#h/2 - this.height/2);
        return this;
    }
    /**
     * Move the sprite in a random x position
     * 
     */
    goToRandomX() {
        this.setX(Math.floor(Math.random() * this.#w));
        return this;
    }
    /**
     * Move the sprite in a random y position
     * 
     */
    goToRandomY() {
        this.setY(Math.floor(Math.random() * this.#h));
        return this;
    }
    /**
     * Move the sprite in a random position
     * 
     */
    goToRandom() {
        this.goToRandomX().goToRandomX()
        return this;
    }
    /**
     * Move the sprite to another sprite
     * @param {Sprite} sprite The sprite
     */
    goToSpriteX(sprite) {
        this.setX(sprite.#xSVG);
        return this;
    }
    /**
     * Move the sprite to another sprite
     * @param {Sprite} sprite The sprite
     */
    goToSpriteY(sprite) {
        this.setY(sprite.#ySVG);
        return this;
    }
    /**
     * Move the sprite to another sprite
     * @param {Sprite} sprite The sprite
     */
    goToSprite(sprite) {
        this.goTo(sprite.#xSVG,sprite.#ySVG);
        return this;
    }
    /**
     * The sprite points to a position
     * @param {number} deg Degrees
     * 
     */
    pointIn(deg) {
        this.#rotate = deg;
        this.#SVGvector.style("transform",`rotate(${90 - this.#rotate}deg)`)
        return this;
    };
    /**
     * Turns the sprite in n degrees
     * @param {number} deg Degrees
     * 
     */
    turn(deg) {
        this.pointIn(this.#rotate + deg)
        return this
    };
    /**
     * Point sprite in random position
     */
    pointInRandom() {
        this.pointIn(Math.floor(Math.random() * 360));
        return this;
    }
    /**
     * Calculates the distance of 2 sprites in x
     * @param {Sprite} sprite Another sprite
     * 
     */
    distanceToSpriteX(sprite) {
        return (
            roundDec(
                this.#xSVG-sprite.xSVG,16)
            );
    }
    /**
     * Calculates the distance of 2 sprites in y
     * @param {Sprite} sprite Another sprite
     * 
     */
    distanceToSpriteY(sprite) {
        return (
            roundDec(
                this.#xSVG-sprite.#ySVG,16)
            );
    }
    /**
     * Calculates the distance of 2 sprites
     * @param {Sprite} sprite Another sprite
     * 
     */
    distanceToSprite(sprite) {
        return (
            roundDec(
                ((Math.abs(this.#xSVG-sprite.xSVG)**2)+
                (Math.abs(this.#ySVG-sprite.ySVG)**2))**0.5,16)
            );
    }
    /**
     * Glides the sprite in a canvas position
     * @param {number} x The x position
     * @param {number} y The y position
     * @param {number} ms The time, in mili-second
     */
    glideTo(x,y,ms) {
        this.#SVGvector.transition().duration(ms)
            .style("left",(this.#w/2) + x+"px")
            .style("bottom",(this.#h/2) + y+"px")
        return this
    }

    /**
     * Glides the sprite in a random position
     * @param {number} ms The time, in mili-second
     */
    glideToRandomX(ms) {
        this.#SVGvector.transition().duration(ms)
            .style("left",(Math.floor(Math.random() * this.#w)-this.#w / 2 )+"px")
        return this
    }
    /**
     * Glides the sprite in a random position
     * @param {number} ms The time, in mili-second
     */
    glideToRandomY(ms) {
        this.#SVGvector.transition().duration(ms)
        .style("bottom",(Math.floor(Math.random() * this.#h) - this.#h / 2)+"px")
        return this
    }
    /**
     * Glides the sprite in a random position
     * @param {number} ms The time, in mili-second
     */
    glideToRandom(ms) {
        this.#SVGvector.transition().duration(ms)
            .style("left",(Math.floor(Math.random() * this.#w)-this.#w / 2 )+"px")
            .style("bottom",(Math.floor(Math.random() * this.#h) - this.#h / 2)+"px")
        return this
    }
    /**
     * Glides the to another sprite
     * @param {Sprite} sprite The sprite 
     * @param {number} ms The time, in mili-second
     */
    glideToSprite(sprite,ms) {
        this.glideTo(sprite.#xSVG,sprite.#ySVG,ms)
        return this;
    }

    pointToSprite(sprite) {
        this.pointIn(degs(Math.atan(
                (this.#xSVG-sprite.xSVG)/
                (this.#ySVG-sprite.ySVG)
            )));

        return this;
        
    }


    // Visual
    /**
     * Make visible the sprite
     * 
     */
    show() {
        this.visible = true;
        this.#SVGvector.style("display","block");
        return this;
    }
    /**
     * Hides the sprite
     * 
     */
    hide() {
        this.visible = false;
        this.#SVGvector.style("display","none");
        return this;
    }

    delete() {
        this.#SVGvector.remove()
    }

    // texture list

    get texturesList() {
        return this.textures.texturesValue
    }

    get textureNames() {
        return this.textures.textures
    }

    get nowTexture() {
        return this.textures.usedTexture
    }

    addTexture(name,type){
        if (typeof name != "object") {
            this.textures.addTexture(name,type)
        } else {
            if (name instanceof Array && type instanceof Array) {
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

    useTexture(name){
        this.#SVGvector.style("background", this.textures[name]);
        this.textures.useTexture(name);
        return this
    };

    modifyTexture(tname,tvalue) {
        this.textures.setTexture(tname,tvalue)
        return
    }

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
        this.#SVGvector.style("background", value);
        return this
    }

    addAnonymousTextureToList(name){
        this.addTexture(name,this.#SVGvector.style("background"))
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

    //border
    /**
     * Defines the stroke Width of border
     * 
     * The style parameter is like (border-style) CSS property
     * @param {string} Width The color of border 
     * 
     */
    setStrokeWidth(Width) {
        this.borderWidth = Width;
        this.#SVGvector.style("border",`${this.borderWidth} ${this.borderStyle} ${this.borderColor}`);

        return this;
    }
    /**
     * Defines the stroke style of border
     * 
     * The style parameter is like (border-style) CSS property
     * @param {string} style The color of border 
     * 
     */
    setStrokeStyle(style) {
        this.borderStyle = style;
        this.#SVGvector.style("border",`${this.borderWidth} ${this.borderStyle} ${this.borderColor}`);

        return this;
    }
    /**
     * Defines the stroke color of border
     * 
     * The style parameter is like (border-style) CSS property
     * @param {string} color The color of border 
     * 
     */
    setStrokeColor(color) {
        this.borderColor = color;
        this.#SVGvector.style("border",`${this.borderWidth} ${this.borderStyle} ${this.borderColor}`);

        return this;
    }

    /**
     * Defines the stroke of border
     * 
     * The style parameter is like (border-style) CSS property
     * @param {string} color The color of border 
     * @param {string} width The width of border
     * @param {string} style The style of border
     * 
     */
    setStroke(color,width,style="solid") {
        this.borderWidth = width;
        this.borderColor = color;
        this.borderStyle = style;
        this.#SVGvector.style("border",`${width} ${style} ${color}`);

        return this;
    }
    /**
     * Defines the stroke of border in string
     * 
     * @param {string} style The string
     * @param {number[]} indexSearch The index to setting data
     */
    setStrokeString(style="solid",indexSearch = [0,1,2]) {
        this.borderWidth = style.split(/\s+/)?.[indexSearch[0]] ?? "0px";
        this.borderColor = style.split(/\s+/)?.[indexSearch[1]] ?? "black";
        this.borderStyle = style.split(/\s+/)?.[indexSearch[2]] ?? "solid";
        this.#SVGvector.style("border",style.split(/\s+/).join(" "));

        return this;
    }

    // Scale and size
    /**
     * Set size in x,y of sprite
     * @example
     * sprite.setSize(50,50);
     * // This set width of sprite to 50 and height to 50
     * @example
     * sprite.setSize(200);
     * // This set width of sprite to 50 and height to the past height
     * @param {number} sizex The x scale of sprite 
     * @param {number} sizey The y scale of sprite
     */
    setSize(sizex = this.#width,sizey = this.#height) {
        this.#SVGvector
            .style("width",sizex)
            .style("height",sizey);
            
        this.#width = sizex
        this.#height = sizey
        return this;
    }
    /**
     * Add size of sprite
     * @param {number} sizex The width of sprite 
     * @param {number} sizey The height of sprite
     */
    addSize(sizex = 0,sizey = 0) {
        this.#SVGvector
            .style("width",this.#width+sizex)
            .style("height",this.#height+sizey);
            
        this.#width += sizex;
        this.#height += sizey;
        return this;
    }
    /**
     * Multiply size of sprite
     * @param {number} sizex The width of sprite 
     * @param {number} sizey The height of sprite
     */
    multiplySize(sizex = 1,sizey = 1) {
        this.#SVGvector
            .style("width",this.#width*sizex)
            .style("height",this.#height*sizey);
            
        this.#width = this.#width*sizex;
        this.#height = this.#height*sizey;
        return this;
    }
    get width() {
        return this.#width;
   }
   get height() {
       return this.#height;
  }

   set width(newSize) {
       this.setSize(newSize);
   }    
   set height(newSize) {
       this.setSize(this.#width,newSize);
   } 
    /**
     * Set scale relative of sprite
     * @example
     * sprite.setScale(50,50);
     * // This set scale of sprite in x to 50% and y to 50%
     * @example
     * sprite.setScale(200);
     * // This set scale of sprite in x to 200% and y to 100%
     * @param {number} sizex The x scale of sprite 
     * @param {number} sizey The y scale of sprite
     */
    setScale(sizex = 100,sizey = 100) {
        this.#vectorScaleX = sizex;
        this.#vectorScaleY = sizey
        this.#SVGvector
            .style("width",this.#width*sizex/100)
            .style("height",this.#height*sizey/100);
        return this;
    }
    /**
     * Add size to sprite
     * @param {number} sizex The x scale of sprite 
     * @param {number} sizey The y scale of sprite
     */
    addScale(sizex = 100,sizey = 100) {
        this.setScale(this.#vectorScaleX + sizex,this.#vectorScaleY + sizey)
        return this;
    }
    /**
     * multiply scale
     * @param {number} sizex The x scale of sprite 
     * @param {number} sizey The y scale of sprite
     */
    multiplyScale(sizex = 100,sizey = 100) {
        this.setScale(this.#vectorScaleX * sizex,this.#vectorScaleY * sizey)
        return this;
    }
    
    get scaleX() {
         return this.#vectorScaleX;
    }
    get scaleY() {
        return this.#vectorScaleY;
   }

    set scaleX(newSize) {
        this.setScale(newSize);
    }    
    set scaleY(newSize) {
        this.setScale(100,newSize);
    }    
    /**
     * Set the layer of sprite
     * @param {number} layer The new layer
     */
    setLayer(layer) {
        this.#SVGvector.style("z-index",layer);
        this.#layer = layer;
        return this;
    }

    get layer() {
        return this.#layer;
    }

    set layer(layer) {
        this.setLayer(layer);
    }
    /**
     * Go to forward layers
     * @param {number} layer The layer
     */
    goForWard(layer) {
        this.setLayer(this.layer + layer);
        this.#SVGcanvas.maxLayer += this.layer + layer
        return this;
    }
    /**
     * Go to backward layers
     * @param {number} layer The layer
     */
    goBackWard(layer) {
        this.setLayer(this.layer - layer);
        this.#SVGcanvas.minLayer += this.layer - layer
        return this;
    }
    /**
     * Go to front layer
     * @param {number} layer The layer
     */
    goToFront(layer) {
        this.goForWard(++this.#SVGcanvas.maxLayer);
        return this;
    }
    /**
     * Go to back layer
     * @param {number} layer The layer
     */
    goToBack(layer) {
        this.goBackWard(--this.#SVGcanvas.minLayer);
        return this;
    }
    /**
     * Set data for sprite
     * 
     * For Stroke the format is :
     * "style border css"
     * [
     *  (color:string),(width:number),(style:string)
     * ]
     * {
     *  color:string,width:number,style:string
     * }
     * @param {object} data The data
     * @param {object} data.textures texture
     * @param {any} data.stroke setStroke
     * @param {number} data.size setSize
     * @param {number} data.layer setLayer
     */
    setData(data) {
        this.setLayer(data?.layer);
        this.setSize(data?.size);
        this.addTexture(data?.textures);
        this[typeof data?.stroke == "string" ? "setStrokeString" : "setStroke"](data?.stroke ?? "")
        return this;
    }
    /**
     * Set data for sprite
     * 
     * For Stroke the format is :
     * "style border css"
     * [
     *  (color:string),(width:number),(style:string)
     * ]
     * {
     *  color:string,width:number,style:string
     * }
     * @param {string} textureData addTexture
     * @param {any[]|object} stroke setStroke
     * @param {number} size setSize
     * @param {number} layer setLayer
     */
    setArrayData(textureData,stroke,size,layer) {
        this.setLayer(layer);
        this.setSize(size);
        this.addTexture(textureData);
        this[typeof stroke == "string" ? "setStrokeString" : "setStroke"](stroke)
        return this;
    }
    // Sensing
    /**
     * Set an event
     * @param {string} event The event
     * @param {Function} callback The listener
     */
    setEvent(event,callback) {
        this.#SVGvector.on(event, callback);
        return this;
    }
    /**
     * Did they click on the sprite?
     * @param {Function} callback The listener
     */
    onClick(callback) {
        this.setEvent("click", callback);
        this.#click = callback;
        return this;
    }
    set onclick(callback) {
        this.onClick(callback);
    }
    get onclick() {
        return this.#click;
    }
    /**
     * Did they mouseover on the sprite?
     * @param {Function} callback The listener
     */
    onMouseOver(callback) {
        this.setEvent("mouseover", callback);
        this.#mouseover = callback;
        return this;
    }
    set onmouseover(callback) {
        this.onMouseOver(callback);
    }
    get onmouseover() {
        return this.#mouseover;
    }
    /**
     * Did the mousedown on the sprite?
     * @param {Function} callback The listener
     */
    onMouseDown(callback) {
        this.setEvent("mousedown", callback);
        this.#mousedown = callback;
        return this;
    }
    set onmousedowm(callback) {
        this.onMouseDown(callback);
    }
    get onmousedowm() {
        return this.#mousedown;
    }
    /**
     * Did the mouse out on the sprite?
     * @param {Function} callback The listener
     */
    onMouseOut(callback) {
        this.setEvent("mouseout", callback);
        this.#mouseout = callback;
        return this;
    }
    set onmouseout(callback) {
        this.onMouseDown(callback);
    }
    get onmouseout() {
        return this.#mousedown;
    }

    /**
     * Detect if a sprite collided with another sprite
     * @param {Sprite} sprite The collided sprite
     * @param {Function} callback The listener
     */
    onCollisionSprite(sprite,callback) {
        return this;
    }
}

export {Sprite}