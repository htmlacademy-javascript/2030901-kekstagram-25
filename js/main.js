/**
 * Возвращает случайное число диаппазона (включительно)
 * @param {number} min - целое число >=0
 * @param {number} max - целое число >=0
 * @returns {number} - возвращает случайное число. Если min или max отрицательные числа, то возвращает -1
 */
function getRandomInt(min, max){//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if(min<0||max<0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Проверяет соответствие проверяемой длины строки с максимально допустимой длиной
 * @param {string} checkString - проверяемая строка
 * @param {number} maxLength - максимально допустимая длина строки
 * @returns {boolean} - возвращает true или false
 */
function checkLengthString(checkString,maxLength){
  return checkString.length <= maxLength;
}
getRandomInt(5,10);
checkLengthString('Привет, как дела?',20);
