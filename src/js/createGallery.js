import switchGenresList from './getGenres';
import galleryCardTemplate from '../templates/gallery-card-main.hbs';



function createGallery(dataArray, rootRef, genresArr=[]) {
    // initialization pagination
  
    dataArray.map(e => {
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
    const markup = galleryCardTemplate(dataArray);
    rootRef.insertAdjacentHTML('beforeend', markup);
  
    // get right formatt for genres string
    const genresSpan = document.querySelectorAll('.remove-last-symbol');
    genresSpan.forEach(e => {
      const shortString = e.textContent.slice(0, -2);
      e.textContent = shortString;
    });
  
    // render for missing img
    const images = rootRef.querySelectorAll('img');
  
    images.forEach(img => {
      if (img.src === 'https://image.tmdb.org/t/p/w500') {
        img.src = './src/images/no-image-icon-min.png';
        img.setAttribute('height', '400px');
      }
    });
  }

export {createGallery}