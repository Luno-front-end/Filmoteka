import request from '../js/apiRequest';
import cards from "../tools/myLibrary.hbs";


const btnWatched = document.querySelector('.btn-watched'); // класс кнопки
const btnQueue = document.querySelector('.btn-queue'); // класс кнопки

const libraryContainer = document.querySelector(".js-menu"); // js-menu замінить на почактовий класс розмітки


class ButtonsLibrary {
  constructor(btnName) {
    this.btnName = btnName;
      this.object = JSON.parse(localStorage.getItem(this.btnName))
  }
  onClick() {
    this.Object.map(e => {
      return request.getFilmById(e)
    });
  this.cardsMarkup()
  }
  cardsMarkup() {
    libraryContainer.insertAdjacentHTML("beforeend", createMarkup(object));// json??
    return cards(object)
  }
}
const watched = new ButtonsLibrary('watched')
btnWatched.addEventListener('click', watched.onClick.bind(watched));
const queue = new ButtonsLibrary('queue')
btnQueue.addEventListener('click', queue.onClick.bind(queue));
