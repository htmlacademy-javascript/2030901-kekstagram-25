function getRandomInt(min, max){
  if(min<0||max<0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkLengthString(checkString,maxLength){
  return checkString.length <= maxLength;
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const isEscapeKey = (evt) => evt.key==='Escape';
export {getRandomInt, checkLengthString, getRandomArrayElement, isEscapeKey};
