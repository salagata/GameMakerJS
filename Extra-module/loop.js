let floorDec = (num,q) => Math.floor(num*(10**q))/(10**q);

class ClassicForEverLoop {
    #idExecute;
    #lastLog;
    #ups;
    #fps;
    #looper;
    #tick;
    #initer;
    #stoper;
    #drawer;
    #updater;
    constructor(callback = () => {},testUPSandFPS = () => {},onstop = () => {}) {
        console.log("60 Ticks = 1 Second, 60 Seconds = 1 Minute, 60 = (UPS + FPS) / 2")
        this.forever = callback;
        this.onstop = onstop;
        this.#idExecute = undefined;
        this.#lastLog = 0;
        this.#ups = 0;
        this.#fps = 0;
        this.#tick = 0;
        this.#looper = (tempReg) => {
            this.#idExecute = requestAnimationFrame(this.#looper)
            
            this.#updater(tempReg);
            this.#drawer(tempReg);

            this.#tick++ 

            if(tempReg - this.#lastLog > 999) {
                this.#lastLog = tempReg;
                
                callback(this.#ups,this.#fps,Math.floor(this.#tick/60)+1)

                this.#ups = 0;
                this.#fps = 0;
            }
        }
        this.#drawer = (tempReg) => {
            this.#fps++;
        };
        this.#updater = (tempReg) => {
            this.#ups++;
        };
        this.#looper();

        this.#stoper = () => {
            onstop()
            this.#looper = () => {};
        }

        this.#initer = () => {
            this.#looper = callback;
        }
    }
    stop() {
        this.#stoper()
        return this;
    }

    init() {
        this.#initer()
        return this;
    }
}

class ForEverLoop {
    #idExecute;
    #lastLog;
    #ups;
    #fps;
    #drawer;
    #updater;
    #looper;
    #tick;
    #initer;
    #stoper;
    constructor(onupdate = () => {},ondraw = () => {},testUPSandFPS = () => {},onstop = () => {}) {
        console.log("60 Ticks = 1 Second, 60 Seconds = 1 Minute, 60 = (UPS + FPS) / 2")
        this.onupdate = onupdate;
        this.ondraw = ondraw;
        this.test = testUPSandFPS;
        this.onstop = onstop;
        this.#idExecute = undefined;
        this.#lastLog = 0;
        this.#ups = 0;
        this.#fps = 0;
        this.#tick = 0;
        this.#looper = (tempReg) => {
            this.#idExecute = requestAnimationFrame(this.#looper)
            
            this.#updater(tempReg);
            this.#drawer(tempReg);

            this.#tick++ 

            if(tempReg - this.#lastLog > 999) {
                this.#lastLog = tempReg;
                
                testUPSandFPS(this.#fps,this.#ups)

                this.#ups = 0;
                this.#fps = 0;
            }
        }
        this.#drawer = (tempReg) => {
            this.#fps++;
            ondraw(this.#tick,Math.floor(this.#tick/60),Math.floor(this.#tick/3600))
        };
        this.#updater = (tempReg) => {
            this.#ups++;
            onupdate(this.#tick,Math.floor(this.#tick/60),Math.floor(this.#tick/3600))
        };
        this.#looper();

        this.#stoper = () => {
            onstop()
            this.#looper = () => {};
        }

        this.#initer = () => {
            this.#looper = callback;
        }
    }

    stop() {
        this.#stoper()
        return this;
    }

    init() {
        this.#initer()
        return this;
    }
}
/**
 * Execute a function many times
 * @param {number} times Times to execute the callback
 * @param {Function} callback The function to execute many times
 */
function repeat(times,callback) {
    for (const i of new Array(times)) {
        callback();
    }
}
/**
 * Execute a function for ever
 * @param {Function} onupdate Event that is executed when the screen is updated
 * @param {Function} ondraw Event that is executed when the screen is drawed
 * @param {Function} testUPSandFPS Use UPS and FPS for performance testing
 * @param {Function} onstop Event that is executed when the screen is stop
 * @returns {ForEverLoop} For ever loop
 */
function forEver(onupdate = () => {},ondraw = () => {},testUPSandFPS = () => {},onstop = () => {}) {
    return new ForEverLoop(onupdate,ondraw,testUPSandFPS,onstop);
}
/**
 * Execute the classic function for ever
 * @param {Function} callback Event to execute for ever
 * @param {Function} testUPSandFPS Use UPS and FPS for performance testing
 * @param {Function} onstop Event that is executed when the screen is stop
 * @returns {ClassicForEverLoop} For ever loop
 */
function classicForEver(callback,testUPSandFPS = () => {},onstop = () => {}) {
    return new ClassicForEverLoop(callback,testUPSandFPS,onstop);
}
/**
 * 
 * @param {number} t Time seed
 * @param {number} ms Milliseconds to wait
 * @param {Function} callback 
Event to execute when the milliseconds and the seed match
 */
function wait(t,ms,callback) {
    if(t > ms && ms + 10 > t) {
		callback()
	}
}

function waitAndRepeat(t,ms,callback) {
    if(t % ms == 0) {
		callback()
	}
}

function waitUntil(test,callback) {
    if(test) {
        callback()
    }
}

function waitAndStop(ms) {
    let xhttp = new XMLHttpRequest()

    xhttp.onload = () => {}
    console.log("xd")

    xhttp.open("GET","wait.php?time=" + ms,false)
    xhttp.send()

    console.log("hello world")
}

export {forEver,classicForEver,repeat,wait,waitAndRepeat,waitUntil,waitAndStop}
