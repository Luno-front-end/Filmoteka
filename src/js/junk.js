// Получить масситв объектов первой страницы
// request.getTrendFilms();

// Получить массив объектов заданной страницы
// request.setPage(25);

// Пайти фильм по по ключевым словам
// request.searchFilms("matrix")

// Найти фильм по id
// request.getFilmById(26214)

// =============================
// При входе на главную страницу рендерится разметка трендовых фильмов

// let ArrayOfFilms = []
// let currentPage = 1;

// request.getTrendFilms()
// .then(data => {
//     ArrayOfFilms = [...ArrayOfFilms, ...data.results]
//     return data
// })
// .then(data => {

// // Если в массиве больше елементов чем   номер стр * ко-во ел. на странице, то

// if (ArrayOfFilms.length >= currentPage * getCardsPerPage()) {

// let arr = ArrayOfFilms.slice(0, getCardsPerPage());
// console.log("arr", arr);
// const markup = galleryCardTemplate(arr)
// console.log('markup', markup);
// refs.gallery.insertAdjacentHTML('beforeend', markup)
// }
// })
// .catch(err => console.log(err))

// function getCardsPerPage (){

//     if(window.innerWidth < 768 ){
//         return 4
//     }
//     if (window.innerWidth < 1024){
//         return 8
//     }
//     return 9
// }
// console.log(getCardsPerPage());
