import request from '../js/apiRequest';
import debounce from 'lodash.debounce';
import createGallery from './trendFilms';
import Pagination from 'tui-pagination';
import refs from './refs'
import { getTotalPages , options } from './pagination';

const pagination = new Pagination(refs.container, options);
let query = ''

searchFilms();

async function searchFilms() {
  refs.input.addEventListener(
    'input',
    debounce(async () => {
      query = refs.input.value
      const data = await request.searchFilms(refs.input.value)
      refs.galleryList.innerHTML = '';

      if (refs.input.value.length === 1 ) {
       document.querySelector('.err-search').style.opacity = 1;
      } 
      else{
      document.querySelector('.err-search').style.opacity = 0;
        createGallery(data);
        pagination.reset(getTotalPages(data));
      }

    }, 1000)
  )
}

pagination.on('beforeMove', async ({ page }) => {
  refs.galleryList.innerHTML = '';

  refs.input.addEventListener('input', e => {
    if (e.value !== query) {
      request.setPage(1)
    }
  })

  request.setPage(page)
  const data = await request.searchFilms(refs.input.value)
  createGallery(data);
})


// ==============================================
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