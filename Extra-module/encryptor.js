import {CryptoJS} from "./crypto-js.js"
/**
 * All characters non alphanumeric without numbers and bar down
 * @constant
 */
const NOT_ALPHANUMERIC = "1234567890 !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüüýþÿ"

function toObject(arr1, arr2) {
  let keys = arr1;
  let value = arr2.slice(0, arr1.length);
  let obj = {};
  for (let i = 0; i < arr1.length; i++) {
    obj[keys[i]] = value[i];
  }
  return obj;
}
/**
 * Encript a message in SHA-1
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @async 
 * @example await sha1Encript("Hello world")
 * @param {*} message The message to be encripted
 * @returns {string} The encripted message
 */
async function sha1Encript(message) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encript a message in SHA-128
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @example await sha128Encript("Hello world")
 * @param {*} message The message to be encripted
 * @returns {string} The encripted message
 */
async function sha128Encript(message) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encript a message in SHA-256
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @example await sha256Encript("Hello world")
 * @param {*} message The message to be encripted
 * @returns {string} The encripted message
 */
async function sha256Encript(message) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encript a message in SHA-384
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @example await sha384Encript("Hello world")
 * @param {*} message The message to be encripted
 * @returns {string} The encripted message
 */
async function sha384Encript(message) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-384', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encript a message in SHA-512
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @example await sha512Encript("Hello world")
 * @param {*} message The message to be encripted
 * @returns {string} The encripted message
 */
async function sha512Encript(message) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encript a message in SHA-[N]
 * 
 * !!!! WARNIRG !!!! 
 * THIS FUNCTION IS ASYNCHRONOUS USE "await statement"
 * @async 
 * @example await shaNEncript("Hello world")
 * @param {*} message The message to be encripted
 * @param {number} n The message to be encripted
 * @returns {string} The encripted message
 */
async function shaNEncript(message, n) {
  let m = typeof message == "object" ? JSON.parse(message) : String(message)
  const msgBuffer = new TextEncoder().encode(m);
  const hashBuffer = await crypto.subtle.digest('SHA-' + n, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}
/**
 * Encripts a message in Cesar Encryption
 * 
 * It consists of replacing each letter of the text with a separate letter with a fixed number of letters of the alphabet.
 * @param {string} msg The message to be encripted
 * @param {number} scroll Number of spaces to advance in the alphabet for each letter
 * @returns Message encripted
 */
function cesarEncryption(msg, scroll) {
  let s = (Math.sign(scroll) == 1 ? scroll : 1) % 26;
  let abc = "abcdefghijklmnopqrstuvwxyz".slice(s) + "abcdefghijklmnopqrstuvwxyz".slice(0, s)
  let obj = toObject("abcdefghijklmnopqrstuvwxyz".split("") + "ABCDEFGHIJKLMNOPQRSTUVWXYS".split(""),
    abc.split("") + abc.toUpperCase().split(""));
  obj = Object.assign(obj, toObject(NOT_ALPHANUMERIC.split(""), NOT_ALPHANUMERIC.split("")))

  let message = "";
  for (const i of msg) {
    message += obj[i]
  }
  return message
}
/**
 * Encrypts each character of message in Cesar encriptor with key the array of scrolls
 * @param {string} msg The message to be encripted
 * @param {number[]} scrolls An array with numbers, the number of letters that are going to be moved each one
 * @returns 
 */
function multiCesarEncryption(msg, scrolls) {
  let message = "";
  for (let i = 0; i < msg.length; i++) {
    message += cesarEncrytion(msg[i],scrolls[i] ?? false ? scrolls[i] : 0)
  }
  return message
}
/**
 * Encripts a message in MD5 with CryptoJS
 * 
 * i can't program this algorithms because i don't know nothing about cyber-security
 * Developer: salagata
 * @param {string} msg The message to be encripted
 * @returns The message encripted in MD5
 */
function MD5(msg) {
  return CryptoJS.MD5("Message").toString();
}
/**
 * Encripts a message in RIPEMD-160 with CryptoJS
 * 
 * i can't program this algorithms because i don't know nothing about cyber-security
 * Developer: salagata
 * @param {string} msg The message to be encripted
 * @returns The message encripted in RIPEMD-160 algorithm
 */
function RIPEMD160(msg) {
  let crypted = CryptoJS.RIPEMD160(msg).toString();
  return crypted
}
/**
 * Encripts a passphrase in PBKDF2 in N bytes in CryptoJS
 * 
 * i can't program this algorithms because i don't know nothing about cyber-security
 * Developer: salagata
 * @param {string} psp The passphrase to be encripted
 * @param {number} keySize The bit length of key 
 * @param {number} [iteration=100] The cost to produce keys from a passphrase
 * @returns The new key
 */
function PBKDF2(psp,keySize,iteration = 100) {
  let salt = CryptoJS.lib.WordArray.random(128 / 8);
  let crypted = CryptoJS.PBKDF2(psp,salt,{
    keySize: keySize/32,
    iteration: iteration
  });
  return crypted
}
// /**
//  * Encripts a message in DES with CryptoJS
//  * 
//  * i can't program this algorithms because i don't know nothing about cyber-security
//  * Developer: salagata
//  * @param {string} msg The message to be encripted
//  * @param {string} key The key for encript
//  * @returns The message encripted in DES algorithm
//  */
// function DESencrypt(msg,key) {
//   let crypted = CryptoJS.DES.encrypt(msg, key);
//   return crypted
// }



export {sha1Encript,sha128Encript,sha256Encript,sha384Encript,sha512Encript,shaNEncript}

export {cesarEncryption,multiCesarEncryption,MD5,RIPEMD160,PBKDF2}