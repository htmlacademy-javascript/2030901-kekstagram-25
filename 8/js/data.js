import {getRandomArrayElement, getRandomInt} from './util.js';

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
    url:`photos/${currentPhotoId}.jpg`,
    description:getRandomArrayElement(DESCRIPTION),
    likes:getRandomInt(15,200),
    comments: Array.from({length: getRandomInt(1, 15)}, getRandomComments)
  };
};
const createdPhoto = () => Array.from({length: 25}, getRandomPhoto);

export {createdPhoto};
