function setNoEditable(obj) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            Object.defineProperty(obj,key,{
                value: value,
                writable: false
            })
        }
    };
    return obj;
}


function twoArraysToObject(arr1, arr2) {
    let keys = arr1;
    let value = arr2.slice(0, arr1.length);
    let obj = {};
    for (let i = 0; i < arr1.length; i++) {
      obj[keys[i]] = value[i];
    }
    return obj;
  }

  let floorDec = (num,q) => Math.floor(num*(10**q))/(10**q);
  let toRad = deg => deg * (Math.PI/180);
  let toDegs = rad => rad * (180/Math.PI);
  
  let roundDec = (num,q) => Math.round(num*(10**q))/(10**q)
  
  function getSign(n) {
      return Math.abs(n) / n;
  }
  
export {setNoEditable,twoArraysToObject,floorDec,toDegs,toRad,roundDec}