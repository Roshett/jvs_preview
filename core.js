import {encodeImage, decodeImage} from './hash/dummy.js'

let baseImage = document.querySelector('#myImage');
let canvas = document.createElement('canvas');
canvas.style.display = 'none';
const context = canvas.getContext('2d');
let hash;

const getHashValue = () => {
  return document.getElementById("hashInput").value
}

const encode = () => {
  hash = getHashValue();
  encodeImage(context, baseImage, baseImage.naturalWidth, baseImage.naturalHeight, hash);
  let url = canvas.toDataURL();
  baseImage.src = url;
}

const decode = () => {
  hash = getHashValue();
  decodeImage(context, baseImage, baseImage.naturalWidth, baseImage.naturalHeight, hash);
  let url = canvas.toDataURL();
  baseImage.src = url;
}

window.encode = encode;
window.decode = decode;