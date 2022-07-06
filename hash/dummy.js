import { makeIntegerArrayFromString } from '../helpers.js';

const VERIFICATION_RATE = 10;
const COUNTER_ERROR_MAX = 10;

export const encodeImage = (context, image, width, hight, hash) => {
  const hashInteger = makeIntegerArrayFromString(hash);
  context.canvas.width = width;
  context.canvas.height = hight;
  context.drawImage(image, 0, 0);
  let surface = context.getImageData(
    0,
    0,
    context.canvas.width,
    context.canvas.height
  );
  for (let i = 0; i < surface.data.length - hashInteger.length; i += 4) {
    const j = i % surface.data.length;
    const r = j;
    const g = j + 1;
    const b = j + 2;
    const hashIndex = (j / 4) % hashInteger.length;

    surface.data[r] = (surface.data[r] + hashInteger[hashIndex] + j) % 256;
    surface.data[g] = (surface.data[g] + hashInteger[hashIndex] + j) % 256;
    surface.data[b] = (surface.data[b] + hashInteger[hashIndex] + j) % 256;
  }
  signImage(surface, hashInteger);
  context.putImageData(surface, 0, 0);
}

export const decodeImage = (context, image, width, hight, hash) => {
  const hashInteger = makeIntegerArrayFromString(hash);
  context.canvas.width = width;
  context.canvas.height = hight;
  context.drawImage(image, 0, 0);
  let surface = context.getImageData(
    0,
    0,
    context.canvas.width,
    context.canvas.height
  );
  if(!checkSignByHash(surface, hashInteger)) {
    return
  };
  console.log('decrypt');
  for (let i = 0; i < surface.data.length; i += 4) {
    const j = i % surface.data.length;
    const r = j;
    const g = j + 1;
    const b = j + 2;
    const hashIndex = (j / 4) % hashInteger.length;

    let dr = (surface.data[r] - hashInteger[hashIndex] - j) % 256;
    let dg = (surface.data[g] - hashInteger[hashIndex] - j) % 256;
    let db = (surface.data[b] - hashInteger[hashIndex] - j) % 256;


    if (dr < 0) {
      dr = dr + 256
    }
    if (dg < 0) {
      dg = dg + 256
    }
    if (db < 0) {
      db = db + 256
    }

    surface.data[r] = dr
    surface.data[g] = dg
    surface.data[b] = db
  }
  context.putImageData(surface, 0, 0);
}

export const signImage = (surface, hashInteger) => {
  for (let i = surface.data.length - hashInteger.length; i < surface.data.length; i++) {
    const hashIndex = i + hashInteger.length - surface.data.length;
    surface.data[i] = hashInteger[hashIndex] % 256;
  }
};

export const checkSignByHash = (surface, hashInteger) => {
  let mistakesCounter = 0;
  for (let i = surface.data.length; i >= surface.data.length - hashInteger.length; i--) {
    const hashIndex = hashInteger.length + (i - surface.data.length) - 1;
    const surfaceValue = surface.data[i - 1];
    const hashIndexValue = hashInteger[hashIndex] % 256;
    if (surfaceValue < hashIndexValue + VERIFICATION_RATE && surfaceValue < hashIndexValue - VERIFICATION_RATE) {
      mistakesCounter++;
    }

    if(mistakesCounter > COUNTER_ERROR_MAX) {
      return false;
    }
  }
  return true;
};