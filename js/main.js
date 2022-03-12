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

checkLengthString('Привет, как дела?',20);

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Дмитрий',
  'Мария',
  'Анатолий',
  'Вячеслав',
  'Елизавета',
  'Юлия',
  'Ирина',
  'Евгения',
  'Анна',
  'Иван'
];
const DESCRIPTION = [
  'Красивый пляж',
  'Гуляю в парке с собакой',
  'Пью кофе в любимом кафе',
  'Еда - моя страсть',
  'Загараю на солнце',
  'Чилю в машине',
  'Самые красивые цветы!'
];

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

let globalIdPhoto = 1;
let globalIdComment = 1;

const getRandomComments = () => {
  const currentPhotoId = globalIdComment++;
  return {
    id:currentPhotoId,
    avatar:`img/avatar-${getRandomInt(1,6)}.svg`,
    message:getRandomArrayElement(MESSAGES),
    name:getRandomArrayElement(NAMES)
  };
};

const getRandomPhoto = () => {
  const currentPhotoId = globalIdPhoto++;
  return {
    id:currentPhotoId,
    url:`photos/${currentPhotoId}.png`,
    description:getRandomArrayElement(DESCRIPTION),
    likes:getRandomInt(15,200),
    comments: Array.from({length: getRandomInt(1, 3)}, getRandomComments)
  };
};
const createdPhoto = Array.from({length: 25}, getRandomPhoto);
// eslint-disable-next-line no-console
console.log(createdPhoto);


