import {renderingPosts, getRandomInt} from './util.js';
import {showPhotos} from './showPhotos.js';
import {createDataForBigPhotos} from './openDataPhoto.js';

const filterButtonsBlock = document.querySelector('.img-filters');
const filterForm = filterButtonsBlock.querySelector('.img-filters__form');

const MAX_RENDERING_TIME = 500;

const sortByCountComment = (a,b) => b.comments.length - a.comments.length;

const onFilterButtonClick = renderingPosts(sortPostsByFilter, MAX_RENDERING_TIME);

function clearPosts(){
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
}

function sortPostsByFilter(cards, filter) {
  let filteredPosts;
  clearPosts();
  switch (filter){
    case 'filter-default': default:
      filteredPosts = cards;
      break;
    case 'filter-random':
      filteredPosts = cards.slice().sort(()=>getRandomInt(-25,25)).slice(0, 10);
      break;
    case 'filter-discussed':
      filteredPosts = cards.slice().sort(sortByCountComment);
      break;
  }
  showPhotos(filteredPosts);
  createDataForBigPhotos(filteredPosts);
}

function showFilteredPosts(posts) {
  showPhotos(posts);
  createDataForBigPhotos(posts);
  filterButtonsBlock.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    filterForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    onFilterButtonClick(posts, evt.target.id);
  });
}

export {showFilteredPosts};
