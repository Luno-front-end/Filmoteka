import request from '../js/apiRequest';
import debounce from 'lodash.debounce';
import {createGallery} from './createGallery';
import Pagination from 'tui-pagination';

import refs from './refs'
import { getTotalPages , options } from './pagination';

const pagination = new Pagination(refs.container, options);
let query = ''

let genresArr=[]


searchFilms();

async function searchFilms() {
   
  refs.input.addEventListener(
    'input',
    debounce(async (e) => {
      try {
        // e.preventDefault();

        if (genresArr.length === 0) {
          await request.getApiGenresList().then(data => {
            genresArr = data.data.genres;
          });
        }
        query = refs.input.value
        const data = await request.searchFilms(refs.input.value)
        refs.galleryList.innerHTML = '';

          if (refs.input.value.length < 1) {
            console.log(refs.input.value.length);
             document.querySelector('.err-search').style.opacity = 1;
          }
        else{
          console.log("data", data);
          document.querySelector('.err-search').style.opacity = 0;
          createGallery(data.results, refs.galleryList, genresArr);
          pagination.reset(getTotalPages(data));
        }
      
    }
      catch (err) {
        console.dir(err)
        console.dir(err.response.data.errors[0])
        if (refs.input.value.length <= 1 || err) {
          document.querySelector('.err-search').style.opacity = 1;
          function ucFirst(str) {
            if (!str) return str;
            return str[0].toUpperCase() + str.slice(1);
          }
          document.querySelector('.err-search').textContent=ucFirst(err.response.data.errors[0])
        }
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
  createGallery(data.results, refs.galleryList, genresArr);
})

