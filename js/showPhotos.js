const usersListPhotos = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const miniPhotos = document.createDocumentFragment();

function showPhotos(photos) {
  photos.forEach(({ url, likes, comments }) => {
    const photo = photoTemplate.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;
    miniPhotos.append(photo);
  });
  usersListPhotos.append(miniPhotos);
}

export {showPhotos};
