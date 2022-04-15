const isEscapeKey = (evt) => evt.key==='Escape';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const showAlert = (text)=>{
  const alert = document.querySelector('#alert-bad-request').content.querySelector('.alert-bad-request').cloneNode(true);
  alert.textContent = text;
  document.body.appendChild(alert);
};

const renderingPosts = (callback, timeout) =>{
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeout);
  };
};

export {renderingPosts, showAlert, getRandomInt, isEscapeKey};
