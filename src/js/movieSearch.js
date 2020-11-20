import request from '../js/apiRequest';
import debounce from 'lodash.debounce';
import createGallery from './trendFilms';

const input = document.querySelector('input');
const galleryList = document.querySelector('.gallery-list');

searchFilms();

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
