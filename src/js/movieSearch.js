import fetchFunc from '../js/apiRequest';
import card from '../tools/imageCard.hbs';
import '../tools/styles.css';

// let page = 1;
let query = '';

const key = '9bc134247462ae6a5927de0341a3dea9';

// const root = document.querySelector('.root');
const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

// function moreBtnCreate() {
//   if (!document.querySelector('.more')) {
//     const moreBtn = document.createElement('button');
//     moreBtn.classList.add('more');
//     root.append(moreBtn);
//     moreBtn.textContent = 'більше';
//   }
// }

function renderImages(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  query = input.value;
  fetchFunc(query, key).then(results => {
    const markup = card(results);
    gallery.innerHTML = markup;
    // moreBtnCreate();
    // document.querySelector('.more').addEventListener('click', renderMoreImages);
    form.reset();
  });
}

// function renderMoreImages() {
//   page += 1;
//   fetchFunc(query, page, key).then(results => {
//     const markup = card(results);
//     gallery.insertAdjacentHTML('beforeend', markup);
//     setTimeout(() => {
//       window.scrollBy({
//         top: document.documentElement.clientHeight - 100,
//         behavior: 'smooth',
//       });
//     }, 1000);
//   });
// }

form.addEventListener('submit', renderImages);