/**
 * All valid format to data-driven
 * Data-driven
 * @constant
 */
const VALID_FORMATS = [
    "text/csv",
    "text/xml",
    "text/plain",
    "application/json",
    "application/x-www-form-urlencodeds"
];

Object.freeze(VALID_FORMATS);

/**
 * Send POST requests 
 * @param {string} url The file path of POST method
 * @param {function} callback Callback
 * @param {boolean} async The request is Asyncronous
 * @param {any} body The body of POST method
 * @param {object} header The header of POST method
 */
function post(url,callback,async,body,header) {
    let xhttp = new XMLHttpRequest();
    
    let data = [
        xhttp.responseText,xhttp.readyState
    ]

    xhttp.onload = () => {
        callback(xhttp.responseText,xhttp.status);
    }

    xhttp.open("POST",url,async);

    Object.entries(header).forEach((x) => {
        xhttp.setRequestHeader(x[0],x[1]);
    })

    xhttp.send(body)
}
/**
 * Reads Normal text files text/plain GET
 * @param {string} url The file path
 * @param {function} callback Callback
 * @param {boolean} async The request is Asyncronous
 */
function text(url,callback,async) {
    let xhttp = new XMLHttpRequest();

    xhttp.onload = () => {
        callback(xhttp.responseText,xhttp.status);
    };

    xhttp.open("GET",url,async);
    xhttp.send()
}

/**
 * Reads XML files text/xml GET
 * 
 * Xtensible markup language 
 * @param {string} url The file path
 * @param {function} callback Callback
 * @param {boolean} async The request is Asyncronous
 */
function xml(url,callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.onload = () => {
        callback(xhttp.responseXML,xhttp.status);
    };

    xhttp.open("GET",url,async);
    xhttp.send()
}

/**
 * Reads CSV files text/csv GET
 * 
 * Comma Separated Values
 * To use comma, use double scape char (\\)
 * @param {string} url The file path
 * @param {function} callback Callback
 * @param {boolean} async The request is Asyncronous
 * @param {string} comma The comma
 */
function csv(url,callback,async,comma = ",") {
    function parse(data){
        const csvData = [];
        const lines = data.split("\n");
        for (let i = 0; i < lines.length; i++) {
            lines[i].push("")
            lines[i] = lines[i].split(comma).reduce((a,x,i) => {
                return a.concat([x == undefined ? undefined : x.includes("\\") ? x.slice(0,-1) + "," + (function(){
                let a = lines[i][i+1];
                lines[i][i+1] = undefined;
                    return a
                })() : x])
            },[])
            lines[i].pop();
            lines[i].filter(x => x != undefined)
            csvData[i] = lines[i]
        }
        return csvData;
      };
      let xhttp = new XMLHttpRequest();

      xhttp.onload = () => {
          callback(parse(xhttp.responseText),xhttp.status);
      };
  
      xhttp.open("GET",url,async);
      xhttp.send()
}

/**
 * Reads CSV files in Map format text/csv GET
 * 
 * Comma Separated Values
 * To use comma, use double scape char (\\)
 * @param {string} url The file path
 * @param {function} callback Callback
 * @param {string} comma The comma
 */
function csvToMap(url,callback,comma = ",") {
    function parse(data){
        const csvData = [];
        const lines = data.split("\n");
        for (let i = 0; i < lines.length; i++) {
            csvData[i] = lines[i].split(comma);
        }
        return csvData;
      };
    fetch(url) 
    .then(x => x.text())
    .then(txt => {
        fetch(url)
        .then(z => z.status)
        .then(status => callback(new Map(parse(txt)),status))
    });
}

/**
 * Reads Urlencoded files application/x-www-form-urlencoded GET
 * 
 * Same as query strings key=value
 * @param {string} url The file path
 * @param {function} callback Callback
 * @param {boolean} async The request is Asyncronous
 * Data-driven
 */
function urlencoded(url,callback,async) {
    function parse(data) {
        let json = {};
        let f1 = [];
        let f2 = [];
        let query = new URL("http://gamemaker.com/gm?"+data.replaceAll("\n","")).searchParams // a=b&b=c&b=d
        for(let i of query.keys()) {
            json[i] = query.getAll(i).length == 1 ? query.get(i) : query.getAll(i);
        }
        return json;
    }
    
    fetch(url)
    .then(x => x.text())
    .then(txt => {
        fetch(url)
        .then(z => z.status)
        .then(status => callback(parse(txt),status))
    });
}

/**
 * Reads Urlencoded files to Map format application/x-www-form-urlencoded GET
 * 
 * Same as query strings key=value
 * Data-driven
 * @param {string} url The file path
 * @param {function} callback Callback
 */
function urlToMap(url,callback) {
    function parse(data) {
        let json = {};
        let f1 = [];
        let f2 = [];
        let query = new URL("http://gamemaker.com/gm?"+data.replaceAll("\n","")).searchParams // a=b&b=c&b=d
        for(let i of query.keys()) {
            json[i] = query.getAll(i).length == 1 ? query.get(i) : query.getAll(i);
        }
        return json;
    }
    
    fetch(url)
    .then(x => x.text())
    .then(txt => {
        fetch(url)
        .then(z => z.status)
        .then(status => callback(new Map(Object.entries(parse(txt))),status))
    });
}

/**
 * Reads JSON files application/json GET
 * 
 * Java Script Object Notation
 * Data-driven
 * @param {string} url The file path
 * @param {function} callback Callback
 */
function json(url,callback) {
    fetch(url)
    .then(x => x.json())
    .then(txt => {
        fetch(url)
        .then(z => z.status)
        .then(status => callback(txt,status))
    });
}

/**
 * Reads JSON files to Map format application/json GET
 * 
 * Java Script Object Notation
 * Data-driven
 * @param {string} url The file path
 * @param {function} callback Callback
 */
function jsonToMap(url,callback) {
    fetch(url)
    .then(x => x.json())
    .then(txt => {
        fetch(url)
        .then(z => z.status)
        .then(status => callback(new Map(Object.entries(txt)),status))
    });
}


export {xml,csv,text,json,urlencoded,csvToMap,jsonToMap,urlToMap,post,VALID_FORMATS};