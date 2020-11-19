import request from './apiRequest'

// Получить список объектов с жанрами
//  let ids = function getGenresIds(){
// return request.getApiGenresList();
// } 

// async function switchGenresList() {
//     let genresData = await request.getApiGenresList()
//     const newArr = []

//     const genresNames = genresData.data.genres
//     genresNames.map((e) => {
//         if (array.includes(e.id)) {
//             newArr.push(e.name)
//         }
//     })

//     await request.getTrendFilms().then( data => {

//     console.log(data.results);

//     data.results.forEach((e) => {
//         console.log(e.genre_ids); 

//         // switchGenresList(e.genre_ids).then(arr => {
//         //     console.log("arr" , arr);

//         // })
//     })
//      }



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