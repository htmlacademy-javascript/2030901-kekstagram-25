const cardBigPhoto = document.querySelector('.big-picture');
const cardBigPhotoImage = cardBigPhoto.querySelector('.big-picture__img img');
const closeBigPhoto = document.querySelector('.big-picture__cancel');
const commentTemplate = cardBigPhoto.querySelector('.social__comment');
const likesCount = cardBigPhoto.querySelector('.likes-count');
const commentsCount = cardBigPhoto.querySelector('.comments-count');

function setComments (comments) {
  const commentsList = cardBigPhoto.querySelector('.social__comments');
  commentsList.innerHTML = '';
  comments.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('img');
    commentImg.src = commentData.avatar;
    commentImg.alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    commentsList.append(comment);
  });
}

function setDataForBigPhoto (card) {
  cardBigPhotoImage.src = card.url;
  likesCount.textContent = card.likes;
  commentsCount.textContent = card.comments.length.toString();
  setComments(card.comments);
  cardBigPhoto.classList.remove('hidden');
  closeBigPhoto.addEventListener('click', () =>{
    cardBigPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (event) =>{
    if(event.key === 'Escape') {
      cardBigPhoto.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
}

function createDataForBigPhotos(cards) {
  const photo = document.querySelectorAll('.picture');
  for(let i = 0; i < photo.length; i++){
    photo[i].addEventListener('click', (event) => {
      const cardId = event.target.closest('.picture').dataset.cardId;
      setDataForBigPhoto(cards[cardId]);
      cardBigPhoto.querySelector('.social__comment-count').classList.add('hidden');
      cardBigPhoto.querySelector('.comments-loader').classList.add('hidden');
      document.body.classList.add('modal-open');
    });
  }
}

export {createDataForBigPhotos};
