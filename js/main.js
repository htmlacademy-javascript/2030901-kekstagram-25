import {initialUploadPhoto, photoFormValidation} from './form-validation.js';
import {initialSlider,eventScaleButtons} from './slider.js';
import {getData} from './api.js';
import {showFilteredPosts} from './filter-handlers.js';

getData((photoCards) =>{
  showFilteredPosts(photoCards);
});
initialUploadPhoto();
photoFormValidation();
initialSlider();
eventScaleButtons();

