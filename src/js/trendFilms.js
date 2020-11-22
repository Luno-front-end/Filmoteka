import request from './apiRequest.js';
import refs from './refs';
import {createGallery} from './createGallery'

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
      let newDataArray = data.results

      createGallery(newDataArray, refs.galleryList, genresArr);
      pagination.reset(getTotalPages(data));
    });

  } catch (error) {
    console.log(error);
  }
}

pagination.on('beforeMove', async ({ page }) => {
  refs.galleryList.innerHTML = '';

  request.setPage(page)
  const data = await request.getTrendFilms(refs.input.value)
  createGallery(data.results, refs.galleryList, genresArr);
})


export {genresArr}

