import request from './apiRequest.js';
import galleryCardTemplate from '../templates/gallery-card-main.hbs';
import refs from './refs';
import switchGenresList from './getGenres';

//  Pagination
// ===================================
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {options, getTotalPages} from './pagination';

const pagination = new Pagination(refs.container, options);

let genresArr = [];
renderMainPageGallery();

async function renderMainPageGallery() {
  try {

    // Get genres list
    if (genresArr.length === 0) {
      await request.getApiGenresList().then(data => {
        genresArr = data.data.genres;
      });
    }

    // get data from API
    request.getTrendFilms().then(data => {
      createGallery(data);
      pagination.reset(getTotalPages(data));
    });

  } catch (error) {
    console.log(err);
  }
}

pagination.on('beforeMove', async ({ page }) => {
  refs.galleryList.innerHTML = '';

  request.setPage(page)
  const data = await request.getTrendFilms(refs.input.value)
  createGallery(data);
})

function createGallery(data) {
  console.log('data', data);
  // initialization pagination

  data.results.map(e => {
    //  get right formatt for genres List
    let newGenres = switchGenresList(genresArr, e.genre_ids);
    e.genre_ids = newGenres;

    // get right formatt for date
    if (typeof e.release_date === 'string') {
      const shortDate = e.release_date.slice(0, 4);
      e.release_date = shortDate;
    }

    // get right formatt for another date
    if (typeof e.first_air_date === 'string') {
      const shortFirstAirDate = e.first_air_date.slice(0, 4);
      e.first_air_date = shortFirstAirDate;
    }
  });

  // create markup
  const markup = galleryCardTemplate(data.results);
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  // get right formatt for genres string
  const genresSpan = document.querySelectorAll('.remove-last-symbol');
  genresSpan.forEach(e => {
    const shortString = e.textContent.slice(0, -2);
    e.textContent = shortString;
  });

  // render for missing img
  const images = refs.gallery.querySelectorAll('img');
  console.log(images);

  images.forEach(img => {
    if (img.src === 'https://image.tmdb.org/t/p/w500') {
      img.src = './src/images/no-image-icon-min.png';
      img.setAttribute('height', '400px');
    }
  });
}

export default createGallery;
