import {createdPhoto} from './data.js';
import {showPhotos} from './showPhotos.js';
import {createDataForBigPhotos} from './openDataPhoto.js';

const allPhotos = createdPhoto();
showPhotos(allPhotos);
createDataForBigPhotos(allPhotos);
