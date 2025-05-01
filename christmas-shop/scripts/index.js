const menu = document.querySelector('.menu');
const iconMenu = document.querySelector('.header__icon');
const upBtn = document.querySelector('.up');
const days = document.querySelector('.timer_days');
const hours = document.querySelector('.timer_hours');
const minutes = document.querySelector('.timer_minutes');
const seconds = document.querySelector('.timer_seconds');
const timer = document.querySelector('.timer');
const mGifts = document.querySelector('.best-gifts__items');
const gGifts = document.querySelector('.block-gifts__items');
const allTab = document.querySelector('.block-gifts__point_a');
const workTab = document.querySelector('.block-gifts__point_w');
const healthTab = document.querySelector('.block-gifts__point_h');
const harmonyTab = document.querySelector('.block-gifts__point_har');
const wrapper = document.querySelector('.wrapper');
const slider = document.querySelector('.block-slider__body');
const btnRight = document.querySelector('.block-slider__btn_right');
const btnLeft = document.querySelector('.block-slider__btn_left');
let currentModal = null;
let currentTab = allTab;
const newYear = '01 01 2026 00:00:00 UTC+0';
let timerId = null;
let moveSlider = 0;
let clickSlider = 0;

function toggleMenu() {
  document.body.classList.toggle('_lock');
  menu.classList.toggle('_active');
  iconMenu.classList.toggle('_active');
}
function getTime(nY) {
  let masDateTime = [];
  let millisec = Date.parse(nY) - Date.parse(new Date());
  if (millisec <= 0) {
    clearInterval(timerId);
  }
  masDateTime[0] = Math.floor(millisec / (1000 * 60 * 60 * 24));
  masDateTime[1] = Math.floor((millisec / (1000 * 60 * 60)) % 24);
  masDateTime[2] = Math.floor((millisec / 1000 / 60) % 60);
  masDateTime[3] = Math.floor((millisec / 1000) % 60);
  masDateTime[4] = millisec;
  return masDateTime;
}

function drawDateTime() {
  listDateTime = getTime(newYear);
  if (listDateTime[4] >= 0) {
    days.textContent = listDateTime[0];
    hours.textContent = listDateTime[1];
    minutes.textContent = listDateTime[2];
    seconds.textContent = listDateTime[3];
  }
}
function randomGifts(min, max, count) {
  let arrPets = [];
  for (let i = 0; i < count; i++) {
    while (arrPets.length != count) {
      let n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (arrPets.indexOf(n) == -1) arrPets.push(n);
    }
  }
  return arrPets;
}

function createCard(category, name) {
  let classCard = '';
  let img = '';
  switch (category) {
    case 'For Work':
      classCard = '_work';
      img = 'assets/img/image1.png';
      break;
    case 'For Health':
      classCard = '_health';
      img = 'assets/img/image2.png';
      break;
    case 'For Harmony':
      classCard = '_harmony';
      img = 'assets/img/image4.png';
      break;
  }
  let el = document.createElement('a');
  el.classList = 'item-best-gifts';
  el.innerHTML = `
    <div class="item-best-gifts__image">
        <img src="${img}" alt="image" class="item-best-gifts__img">
    </div>
    <div class="item-best-gifts__text">
        <div class="item-best-gifts__title ${classCard}">
            ${category}
        </div>
        <div class="item-best-gifts__subtitle">
            ${name}
        </div>
    </div>
    `;
  return el;
}

function createModal(i) {
  let img = '';
  let category = '';
  switch (jsonPresents[i].category) {
    case 'For Work':
      img = 'assets/img/m1.png';
      category = 'modal__category_work';
      break;
    case 'For Health':
      img = 'assets/img/m2.png';
      category = 'modal__category_health';
      break;
    case 'For Harmony':
      img = 'assets/img/m3.png';
      category = 'modal__category_harmony';
      break;
  }
  let el = document.createElement('div');
  el.classList = 'main-modal__body';
  el.innerHTML = `
            <div class="main-modal_wrapper">
                <div class="modal">
                    <div class="modal__close">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div class="modal__image">
                        <img src="${img}" alt="image" class="modal__img">
                    </div>
                    <div class="modal__info">
                        <div class="modal__category ${category}">
                            ${jsonPresents[i].category}
                        </div>
                        <div class="modal__name">
                            ${jsonPresents[i].name}
                        </div>
                        <div class="modal__description">
                            ${jsonPresents[i].description}
                        </div>
                    </div>
                    <div class="modal__superpowers">
                        <div class="modal__title">
                            Adds superpowers to:
                        </div>
                        <div class="modal__power power-modal">
                            <div class="power-modal__names">
                                <div class="power-modal__name">Live</div>
                                <div class="power-modal__name">Create</div>
                                <div class="power-modal__name">Love</div>
                                <div class="power-modal__name">Dream</div>
                            </div>
                            <div class="power-modal__points">
                                <div class="power-modal__point">${jsonPresents[i].superpowers.live}</div>
                                <div class="power-modal__point">${jsonPresents[i].superpowers.create}</div>
                                <div class="power-modal__point">${jsonPresents[i].superpowers.love}</div>
                                <div class="power-modal__point">${jsonPresents[i].superpowers.dream}</div>
                            </div>
                            <div class="power-modal__stars">
                                <div class="power-modal__star power-modal__star_live">
                                </div>
                                <div class="power-modal__star power-modal__star_create">
                                </div>
                                <div class="power-modal__star power-modal__star_love">
                                </div>
                                <div class="power-modal__star power-modal__star_dream">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
    `;
  currentModal = el;
  return el;
}
function ratingModal(index) {
  let snow = null;
  let snowN = null;
  let arrRat = [
    parseInt(jsonPresents[index].superpowers.live[1]),
    parseInt(jsonPresents[index].superpowers.create[1]),
    parseInt(jsonPresents[index].superpowers.love[1]),
    parseInt(jsonPresents[index].superpowers.dream[1]),
  ];
  let arrClass = [
    '.power-modal__star_live',
    '.power-modal__star_create',
    '.power-modal__star_love',
    '.power-modal__star_dream',
  ];
  for (let j = 0; j < arrRat.length; j += 1) {
    let elem = document.querySelector(arrClass[j]);
    for (let i = 0; i < 5; i += 1) {
      snow = document.createElement('div');
      snow.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_23_3274)">
                        <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646" />
                    </g>
                    <defs>
                        <clipPath id="clip0_23_3274">
                        <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            `;
      snowN = document.createElement('div');
      snowN.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_23_3276)">
                        <path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646" fill-opacity="0.1" />
                    </g>
                    <defs>
                        <clipPath id="clip0_23_3276">
                        <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            `;
      if (arrRat[j] !== 0) {
        elem.appendChild(snow);
        arrRat[j] = arrRat[j] - 1;
      } else {
        elem.appendChild(snowN);
      }
    }
  }
}

function indexModal(name) {
  for (let i = 0; i < jsonPresents.length; i += 1) {
    if (jsonPresents[i].name === name.trim()) {
      return i;
    }
  }
}

function mainGifts() {
  rand = randomGifts(0, 35, 4);
  for (let i = 0; i < 4; i += 1) {
    mGifts.append(createCard(jsonPresents[rand[i]].category, jsonPresents[rand[i]].name));
  }
}

function giftsGifts(j, n) {
  gGifts.innerHTML = '';
  for (let i = j; i < n; i += 1) {
    gGifts.append(createCard(jsonPresents[i].category, jsonPresents[i].name));
  }
}
function showModal(name) {
  let i = indexModal(name);
  document.body.classList.toggle('_lock');
  wrapper.prepend(createModal(i));
  ratingModal(i);
}

function calcMove() {
  let move = 0;
  if (parseInt(window.innerWidth) > 1280) {
    move = (1991 - slider.clientWidth) / 3;
  } else if (parseInt(window.innerWidth) < 1281 && parseInt(window.innerWidth) > 768) {
    move = (1991 - slider.clientWidth) / 3;
  } else if (parseInt(window.innerWidth) <= 768) {
    move = (1991 - slider.clientWidth) / 6;
  }
  return move;
}

function countClick() {
  if (parseInt(window.innerWidth) > 768) {
    return 3;
  } else {
    return 6;
  }
}

if (timer !== null) {
  timerId = setInterval(drawDateTime, 1000);
}

if (mGifts !== null) {
  mainGifts();
}

if (gGifts !== null) {
  giftsGifts(0, 36);
}

window.addEventListener('resize', () => {
  if (parseInt(window.innerWidth) >= 768 && menu.classList.contains('_active')) {
    toggleMenu();
  }
  if (parseInt(window.innerWidth) > 768 && upBtn !== null) {
    upBtn.style.display = 'none';
  }
  if (btnLeft.closest('.block-slider__btn_enable')) {
    btnLeft.classList.toggle('block-slider__btn_enable');
    btnLeft.classList.toggle('block-slider__btn_disable');
  }
  if (btnRight.closest('.block-slider__btn_disable')) {
    btnRight.classList.toggle('block-slider__btn_enable');
    btnRight.classList.toggle('block-slider__btn_disable');
  }
  clickSlider = 0;
  moveSlider = 0;
  slider.style.transform = `translateX(0px)`;
});

window.addEventListener('scroll', (e) => {
  if (upBtn !== null) {
    if (parseInt(window.scrollY) >= 300 && parseInt(window.innerWidth) <= 768) {
      upBtn.style.display = 'block';
    }
    if (parseInt(window.scrollY) < 300) {
      upBtn.style.display = 'none';
    }
  }
});

document.addEventListener('click', (e) => {
  const targetElement = e.target;
  if (targetElement.closest('.header__icon')) {
    toggleMenu();
  }
  if (targetElement.closest('.menu__item') && parseInt(window.innerWidth) <= 768) {
    toggleMenu();
  }
  if (targetElement.closest('.up')) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  if (
    targetElement.closest('.block-gifts__point_a') &&
    !targetElement.closest('.block-gifts__point_active')
  ) {
    giftsGifts(0, 36);
    allTab.classList.toggle('block-gifts__point_active');
    currentTab.classList.toggle('block-gifts__point_active');
    currentTab = allTab;
  }
  if (
    targetElement.closest('.block-gifts__point_w') &&
    !targetElement.closest('.block-gifts__point_active')
  ) {
    giftsGifts(0, 12);
    workTab.classList.toggle('block-gifts__point_active');
    currentTab.classList.toggle('block-gifts__point_active');
    currentTab = workTab;
  }
  if (
    targetElement.closest('.block-gifts__point_h') &&
    !targetElement.closest('.block-gifts__point_active')
  ) {
    giftsGifts(12, 24);
    healthTab.classList.toggle('block-gifts__point_active');
    currentTab.classList.toggle('block-gifts__point_active');
    currentTab = healthTab;
  }
  if (
    targetElement.closest('.block-gifts__point_har') &&
    !targetElement.closest('.block-gifts__point_active')
  ) {
    giftsGifts(24, 36);
    harmonyTab.classList.toggle('block-gifts__point_active');
    currentTab.classList.toggle('block-gifts__point_active');
    currentTab = harmonyTab;
  }
  if (targetElement.closest('.item-best-gifts')) {
    let card = targetElement.closest('.item-best-gifts');
    showModal(card.querySelector('.item-best-gifts__subtitle').innerHTML);
  }
  if (
    targetElement.closest('.modal__close') ||
    targetElement.classList.contains('main-modal_wrapper')
  ) {
    document.body.classList.toggle('_lock');
    currentModal.remove();
  }
  if (
    targetElement.closest('.block-slider__btn_right') &&
    targetElement.closest('.block-slider__btn_enable')
  ) {
    if (clickSlider >= 0 && clickSlider < countClick()) {
      if (btnLeft.closest('.block-slider__btn_disable')) {
        btnLeft.classList.toggle('block-slider__btn_enable');
        btnLeft.classList.toggle('block-slider__btn_disable');
      }
      btnLeft.classList.add('block-slider__btn_enable');
      clickSlider += 1;
      moveSlider -= calcMove();
      slider.style.transform = `translateX(${moveSlider}px)`;
      if (clickSlider == countClick()) {
        btnRight.classList.toggle('block-slider__btn_enable');
        btnRight.classList.toggle('block-slider__btn_disable');
      }
    }
  }
  if (
    targetElement.closest('.block-slider__btn_left') &&
    targetElement.closest('.block-slider__btn_enable')
  ) {
    if (clickSlider > 0) {
      if (btnRight.closest('.block-slider__btn_disable')) {
        btnRight.classList.toggle('block-slider__btn_enable');
        btnRight.classList.toggle('block-slider__btn_disable');
      }
      clickSlider -= 1;
      moveSlider += calcMove();
      slider.style.transform = `translateX(${moveSlider}px)`;
      if (clickSlider == 0) {
        btnLeft.classList.toggle('block-slider__btn_enable');
        btnLeft.classList.toggle('block-slider__btn_disable');
      }
    }
  }
});
