import {createdPhoto} from './data.js';
import {showPhotos} from './showPhotos.js';
import {createDataForBigPhotos} from './openDataPhoto.js';
import {checkEscapeDown, photoFormValidation} from './formValidation.js';
import {initialSlider,eventScaleButtons} from './slider.js';

const allPhotos = createdPhoto();
showPhotos(allPhotos);
createDataForBigPhotos(allPhotos);
checkEscapeDown();
photoFormValidation();
initialSlider();
eventScaleButtons();
