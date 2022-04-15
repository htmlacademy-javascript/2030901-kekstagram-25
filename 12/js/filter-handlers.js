import {renderingPosts, getRandomInt} from './util.js';
import {showPhotos} from './show-photos.js';
import {createDataForBigPhotos} from './open-data-photo.js';

const filterButtonsBlock = document.querySelector('.img-filters');
const filterForm = filterButtonsBlock.querySelector('.img-filters__form');

const MAX_RENDERING_TIME = 500;
const LIMIT_RANDOM_PHOTOS = 10;

const sortByCountComment = (a,b) => b.comments.length - a.comments.length;

const clearPosts = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

const sortPostsByFilter = (cards, filter) => {
  let filteredPosts;
  clearPosts();
  switch (filter){
    case 'filter-default': default:
      filteredPosts = cards;
      break;
    case 'filter-random':
      filteredPosts = cards.slice().sort(()=>getRandomInt(-25,25)).slice(0, LIMIT_RANDOM_PHOTOS);
      break;
    case 'filter-discussed':
      filteredPosts = cards.slice().sort(sortByCountComment);
      break;
  }
  showPhotos(filteredPosts);
  createDataForBigPhotos(filteredPosts);
};

const onFilterButtonClick = renderingPosts(sortPostsByFilter, MAX_RENDERING_TIME);

const showFilteredPosts = (posts) => {
  showPhotos(posts);
  createDataForBigPhotos(posts);
  filterButtonsBlock.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    onFilterButtonClick(posts, evt.target.id);
  });
};

export {showFilteredPosts};
