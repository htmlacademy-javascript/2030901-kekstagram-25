const uploadScale = document.querySelector('.img-upload__scale');
const uploadScaleValue = uploadScale.querySelector('.scale__control--value');
const photoUploadPreview = document.querySelector('.img-upload__preview');
const finalPhoto = photoUploadPreview.querySelector('img');
const sliderEffectLevel = document.querySelector('.img-upload__effect-level');
const valueSliderEffectLevel = document.querySelector('.effect-level__value');

const SCALE_STEP = 25;
let currentEffect = 'none';
let currentValueScale = parseInt(uploadScaleValue.value, 10);

const EFFECT_UNITS = {
  none: '',
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};
const FILTER_EFFECT = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};
const EFFECT_PARAMETERS = {
  none: {},
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100
  },
  phobos: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3
  }
};

function resetEffects() {
  finalPhoto.className = 'effects effects__preview--none';
  finalPhoto.style.filter = '';
  sliderEffectLevel.classList.add('hidden');
}

function initialSlider() {
  const slider = document.querySelector('.effect-level__slider');
  const effects = document.querySelector('.img-upload__effects');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  });
  slider.noUiSlider.on('update', () => {
    valueSliderEffectLevel.value = slider.noUiSlider.get();
    finalPhoto.style.filter = `${FILTER_EFFECT[currentEffect]}(${valueSliderEffectLevel.value}${EFFECT_UNITS[currentEffect]})`;
  });
  effects.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    finalPhoto.className = `effects effects__preview--${currentEffect}`;
    slider.noUiSlider.updateOptions(EFFECT_PARAMETERS[currentEffect]);
    // eslint-disable-next-line no-unused-expressions
    currentEffect === 'none'? resetEffects() : sliderEffectLevel.classList.remove('hidden');
  });
}

function eventScaleButtons() {
  uploadScale.querySelector('.scale__control--smaller').addEventListener('click', ()=> {
    if (currentValueScale > 25 && currentValueScale <= 100) {
      currentValueScale -= SCALE_STEP;
      uploadScaleValue.value = `${currentValueScale}%`;
      photoUploadPreview.style.transform = `scale(${currentValueScale}%)`;
    }
  });
  uploadScale.querySelector('.scale__control--bigger').addEventListener('click', ()=> {
    if (currentValueScale >= 25 && currentValueScale < 100) {
      currentValueScale += SCALE_STEP;
      uploadScaleValue.value = `${currentValueScale}%`;
      photoUploadPreview.style.transform = `scale(${currentValueScale}%)`;
    }
  });
}

export {eventScaleButtons, initialSlider, resetEffects};
