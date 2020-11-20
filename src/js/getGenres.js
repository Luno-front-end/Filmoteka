import request from './apiRequest';
// import genresList from '../genresList.json';
// console.log('genresList', genresList);
// let genresIds = [];

//  =====================================
// Получить список объектов с жанрами
// let genresObg = async function () {
//   return await request
//     .getApiGenresList()
//     .then(data => (genresIds = data.data.genres));
// };

// ====================================
//  Функция подмены массива из чисел в значение

function switchGenresList(database, array) {
  const newArr = [];
  database.map(e => {
    if (array.includes(e.id)) {
      newArr.push(e.name);
    }
  });
  return newArr;
}

export default switchGenresList;
//     await request.getTrendFilms().then(data => {
//         console.log(data.results);

//         data.results.forEach((e) => {
//             console.log(e.genre_ids);

//             // switchGenresList(e.genre_ids).then(arr => {
//             //     console.log("arr" , arr);

//             // })
//         })
//     }
//    .then(data => console.log('data', data)) // финишь
// switchGenresList(arr)
// console.log(switchGenresList(arr));
// export { switchGenresList }

// Получить Список жанров

// request.getTrendFilms().then(({data: {results: genres}}) => console.log("filmGenres", genres));

// Создать пустой массив
// Перебрать список жанров, при совпадении занести значение в массив
// вернуть массив елементов
// вставить массив елементов в карточку
