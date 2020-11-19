import axios from 'axios';

export default {
  API_KEY: '9bc134247462ae6a5927de0341a3dea9',
  BASE_URL: "https://api.themoviedb.org/3",
  page: 1,

  defaultPage() {
    this.page = 1;
  },

  setPage(pageValue) {
    this.page = pageValue;
  },

  searchFilms(query){
    return axios
    .get(
      `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`
    )
    .then(({ data }) => {

      return data;
    })
    .catch(err => {throw err});
  },

  getFilmById(id){
    return axios
    .get(
      `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch(err => {throw err});
  },

  getTrendFilms() {
    return axios
      .get(
        `${this.BASE_URL}/trending/movies/day?api_key=${this.API_KEY}&page=${this.page}`,
      )
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch(err => {throw err});
  },

  getImgURL(size='original', url){ 
    return `https://image.tmdb.org/t/p/${size}${url}`
  }
};

// IMG URL
// "https://image.tmdb.org/t/p/original"
// "https://image.tmdb.org/t/p/w500"
