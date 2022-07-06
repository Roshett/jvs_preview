export const makeHash = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}

export const makeIntegerArrayFromString = (str) => {
  return str.split('').map(e => e.charCodeAt(0) * 50)
}

window.makeHash = makeHash;