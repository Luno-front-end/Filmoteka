import axios from 'axios';

export default {
  API_KEY: '9bc134247462ae6a5927de0341a3dea9',
  page: 10,
  searchquery: '',

  defaultPage() {
    this.page = 1;
  },
  setPage(pageValue) {
    this.page = pageValue;
  },

  getTrendFilms() {
    return axios
      .get(
        `https://api.themoviedb.org/3/trending/movies/day?api_key=${this.API_KEY}&page=${this.page}&per_page=5`,
      )
      .then(({ data }) => {
        console.log(data);
        // const newData = JSON.stringify(data);
        // console.log(newData);
        return data;
      })
      .catch(err => console.log(err));
  },
};
