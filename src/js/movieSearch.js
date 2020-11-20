import request from '../js/apiRequest';
import card from '../Templates/imageCard.hbs';
import debounce from 'lodash.debounce';
import createGallery from './trendFilms';
// import '../tools/styles.css';

let query = '';
const input = document.querySelector('input');
const form = document.querySelector('#search-form');
const galleryList = document.querySelector('.gallery-list'); // замінить клас

searchFilms();

// form.addEventListener('submit', renderImages);
// function renderImages(e) {
//   e.preventDefault();
//   gallery.innerHTML = '';
//   query = input.value;
//   request.searchFilms(query).then(data => {
//     const markup = card(data.results);
//     gallery.innerHTML = markup;
//     form.reset();
//   });
// }

function searchFilms() {
  input.addEventListener(
    'input',
    debounce(() => {
      const inputValue = input.value;

      request.searchFilms(inputValue).then(data => {
        galleryList.innerHTML = '';
        createGallery(data);
      });
    }, 1000),
  );
}
