import { TextureList } from "./misc.js";
/*
[
    {
        t/txt/text:"Game"
        c/col/color:"rgb(15,17,222)"/^black^
        b/bg/background:Texture system
        f/font:{
            fontProperties
        }
        s/sty/style:["i/italic"/"b/bold"/"u/under/underlined"/"s/strikethrough"]
        ht/hovert/hovertext/htext:"Game"
        e/ev/event:{
            mouseEvent
        }
    }
]
{
    t/txt/text:"Game"
    c/col/color:"rgb(15,17,222)"/^black^
    b/bg/background:Texture system
    f/font:{
        fontProperties
    }
    s/sty/style:["i/italic"/"b/bold"/"u/under/underlined"/"s/strikethrough"]
    ht/hovert/hovertext/htext/hover/h:"Game"
    e/ev/event:{
        mouseEvent
    }
}

[
    "Game"
]

"Game"
*/
class Text {
    #spantext;
    #svgCanvas;
    #w;
    #h;
    #xSVG;
    #ySVG;
    #layer;
    #width;
    #height;
    #formatText;
    constructor(id,SVG,formatText,align,w,h,classs) {
        this.#svgCanvas = SVG;
        this.#w = SVG.width;
        this.#h = SVG.height;
        this.#xSVG = 0;
        this.#ySVG = 0;
        this.rotate = 90;
        this.visible = true;
        this.#layer = 0;
        this.id = id;
        this.#formatText = formatText;
    	this.textures = new TextureList();
        this.#width = w;
        this.#height = h;
        this.#spantext = d3.select("#"+this.#svgCanvas.id)
            .append("span")
            .style("position","absolute")
            .attr("id",id)
            .attr("class",classs)
            .style("left",0)
            .style("top",0)
            .style("width",w+"px")
            .style("height",h+"px")
            .style("transform",`rotate(90)`)
            .style("display","block")
            .style("text-align",align)
        this.updateFormat(formatText);

    } 
    updateFormat(formatText = this.#formatText) {
        let span = this.#spantext
        function convertGlobal(element) {
            let ft;
            if (typeof element == "string") { // formatText is an string
                ft = [{text:element}]; // "element" -> [{text:"element"}]
            } else if (typeof element == "object") {
                if(Array instanceof element) { // formatText is an Array with object or string
                    ft = element.map((text) => typeof text == "string" ? {text : text} : text); // ["Game",{text:"Maker"}] -> [{text:"Game"},{text:"Maker"}]
                } else { // format text is an Object
                    ft = [element]; // {text:"Game"} -> [{text:"Game"}]
                }
            } else {
                throw new SyntaxError(formatText + " is not a valid format text");
            }
            return ft;
        }
        
        let translatorProperties = {
            text: ["text","txt","t"],
            color: ["color","col","c"],
            background:["background","bg","b"],
            font:["font","f"],
            style:["s","sty","style"],
            hover:["h","ht","hover","htext","hovert","hovertext"],
            event:["events","event","ev","e"]
        }
        function translate(translator,objectText) {
            function findTranslatorIndex(translator,text) {
                for (const key in translator) {
                    if (Object.hasOwnProperty.call(translator, key)) {
                        const element = translator[key];
                        if (element.includes(text)) {
                            return key;
                        }
                    }
                }
                return undefined
            }
            let translated = {}
            for (const key in objectText) {
                if (Object.hasOwnProperty.call(objectText, key)) {
                    const element = objectText[key];
                    translated[findTranslatorIndex(translator,key)] = element;
                }
            }
            return translated
        }
        function proccesFormat(format) {
            function setFont(elements) {
                let style = "";
                for (const property in elements) {
                    if (Object.hasOwnProperty.call(elements, property)) {
                        const element = elements[property];
                        style += "font-" + property + ":" + element + ";";
                    }
                }
                return style;
            }
            function setOptions(data) {
                function defineParams(dictionary,elements) {
                    let element = 
                }
            }
            let element = "";
            for (let i = 0; i < format.length; i++) {
                const base = format[i];
                element += 
                `<span title="${this?.hover ?? "" }" style="color:${base?.color ?? "black"};${setFont(base?.font ?? {})}">${base?.text ?? ""}</span>`
            }
            span.html(element)
        }
        let globaled = convertGlobal(formatText);
        let translated = translate(globaled,translatorProperties);
        proccesFormat(translated);
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
        this.#spantext.style("left",(x < (this.#w-this.width) ? x : this.#w) +"px");
        return this;
    }
    /**
     * Set y
     * @param {number} y The y position
     */
    setY(y){
        this.#ySVG = y;
        this.#spantext.style("top",(y < (this.#h-this.height) ? y : this.#h)  +"px");
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
        this.addX(roundDec(step*Math.cos(rad(this.rotate-90)),10));
        this.addY(roundDec(step*Math.sin(rad(this.rotate+90)),10));
        
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
        this.#spantext.style("background", this.textures[name]);
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
        this.#spantext.style("background", value);
        return this
    }

    addAnonymousTextureToList(name){
        this.addTexture(name,this.#spantext.style("background"))
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

export {Text}