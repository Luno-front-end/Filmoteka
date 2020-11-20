import request from '../js/apiRequest';
import cards from "../Templates/myLibrary.hbs"; // заглушка

// localStorage.setItem('queue', '[625512,612568,625128]')
// localStorage.setItem('watched', '[625312]')

const btnWatched = document.querySelector('.btn-watched'); // класс кнопки
const btnQueue = document.querySelector('.btn-queue'); // класс кнопки

const libraryContainer = document.querySelector(".gallery"); // js-menu замінить на почактовий класс розмітки

class ButtonsLibrary {
  constructor(btnName) {
    this.btnName = btnName;
    this.response = JSON.parse(localStorage.getItem(this.btnName))
  }
  cardData() {
    this.response.map(id => {
                 return request.getFilmById(id).then(data => {
    const markup = cards(data.results);
    libraryContainer.innerHTML = markup;
          });
      })
    }
}

const watchedClick = new ButtonsLibrary('watched')
btnWatched.addEventListener('click', watchedClick.cardData.bind(watchedClick));

const queueClick = new ButtonsLibrary('queue')
btnQueue.addEventListener('click', queueClick.cardData.bind(queueClick));
