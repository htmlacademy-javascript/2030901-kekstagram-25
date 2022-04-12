const cardBigPhoto = document.querySelector('.big-picture');
const cardBigPhotoImage = cardBigPhoto.querySelector('.big-picture__img img');
const closeBigPhoto = document.querySelector('.big-picture__cancel');
const commentTemplate = cardBigPhoto.querySelector('.social__comment');
const likesCount = cardBigPhoto.querySelector('.likes-count');
const commentsCount = cardBigPhoto.querySelector('.comments-count');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsList = cardBigPhoto.querySelector('.social__comments');
let lastCountComments = 0;
let listCommentsInBlock=[];

function setComments () {
  const countCommentInBlock = document.querySelector('.comments-in-block-count');
  const blockComment = listCommentsInBlock.slice(lastCountComments,lastCountComments+5);
  blockComment.forEach((commentData) => {
    const comment = commentTemplate.cloneNode(true);
    const commentImg = comment.querySelector('img');
    commentImg.src = commentData.avatar;
    commentImg.alt = commentData.name;
    comment.querySelector('.social__text').textContent = commentData.message;
    commentsList.append(comment);
  });
  lastCountComments+=blockComment.length;
  if (lastCountComments>=listCommentsInBlock.length){
    commentsLoader.classList.add('hidden');
  }
  countCommentInBlock.textContent = lastCountComments;
}

function setDataForBigPhoto (card) {
  commentsLoader.classList.remove('hidden');
  lastCountComments = 0;
  cardBigPhotoImage.src = card.url;
  likesCount.textContent = card.likes;
  listCommentsInBlock = card.comments;
  commentsCount.textContent = listCommentsInBlock.length.toString();
  commentsList.innerHTML='';
  setComments();
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
  commentsLoader.addEventListener('click',setComments);
}

function createDataForBigPhotos(cards) {
  const photo = document.querySelectorAll('.picture');
  for(let i = 0; i < photo.length; i++){
    photo[i].addEventListener('click', (event) => {
      const cardId = event.target.closest('.picture').dataset.cardId;
      setDataForBigPhoto(cards[cardId]);
      document.body.classList.add('modal-open');
    });
  }
}

export {createDataForBigPhotos};
