import {showPhotos} from './showPhotos.js';
import {createDataForBigPhotos} from './openDataPhoto.js';
import {checkEscapeDown, photoFormValidation} from './formValidation.js';
import {initialSlider,eventScaleButtons} from './slider.js';
import {getData} from './api.js';

getData((photoCards) =>{
  showPhotos(photoCards);
  createDataForBigPhotos(photoCards);
});
checkEscapeDown();
photoFormValidation();
initialSlider();
eventScaleButtons();

