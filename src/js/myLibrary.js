import { construct } from 'core-js/fn/reflect';
import request from '../js/apiRequest';
import cards from "../tools/myLibrary.hbs";



const watchedObj = request.getFilmById(localStorage.getItem('watched'));
const queueObj = request.getFilmById(localStorage.getItem('queue'));

const btnWatched = document.querySelector('.btn-watched'); // класс кнопки
const btnQueue = document.querySelector('.btn-queue'); // класс кнопки
const libraryContainer = document.querySelector(".js-menu"); // js-menu замінить на почактовий класс розмітки
const cardsMarkup = createMarkupWatched(watchedObj);
const cardsMarkup = createMarkupQueue(queueObj);




btnWatched.addEventListener('click', onWatchedClick);

  
function onWatchedClick() {
  libraryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
}
function createMarkupWatched(watchedObj) {
  return cards(watchedObj);
}




btnQueue.addEventListener('click', onQueueClick);

function onQueueClick() {
libraryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
}
function createMarkupQueue(queueObj) {   
  return cards(queueObj);  
}


// class Btnlibrary{
//   construct(){
//     this.watchedObj 
//   }

// }