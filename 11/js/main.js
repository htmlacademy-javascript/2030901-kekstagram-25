import {checkEscapeDown, photoFormValidation} from './formValidation.js';
import {initialSlider,eventScaleButtons} from './slider.js';
import {getData} from './api.js';
import {showFilteredPosts} from './filterHandlers.js';

getData((photoCards) =>{
  showFilteredPosts(photoCards);
});
checkEscapeDown();
photoFormValidation();
initialSlider();
eventScaleButtons();

