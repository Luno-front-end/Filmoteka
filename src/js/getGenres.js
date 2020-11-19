import request from './apiRequest'

// Получить список объектов с жанрами
function createGenresList(arr){
    request.getApiGenresList().then(({data: genres}) => console.log("genres", genres))
}


// Получить Список жанров

request.getTrendFilms().then(data =>{
 const genresList = data.results.map(({genre_ids}) => {
    console.log(genre_ids);
    });
    console.log("film" , genresList)
    });

// request.getTrendFilms().then(({data: {results: genres}}) => console.log("filmGenres", genres));

// Создать пустой массив
// Перебрать список жанров, при совпадении занести значение в массив
// вернуть массив елементов
// вставить массив елементов в карточку 