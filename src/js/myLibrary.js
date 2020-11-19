import request from '../js/apiRequest';
import cards from "../Templates/myLibrary.hbs";

localStorage.setItem('queue', '[625512,612568,625128]')
localStorage.setItem('watched', '[625312]')

const btnWatched = document.querySelector('.btn-watched'); // класс кнопки
const btnQueue = document.querySelector('.btn-queue'); // класс кнопки

const libraryContainer = document.querySelector(".js-menu"); // js-menu замінить на почактовий класс розмітки


class ButtonsLibrary {
  constructor(btnName) {
    this.btnName = btnName;
    this.response = JSON.parse(localStorage.getItem(this.btnName))
    console.log('inStorage', this.response)
    console.log('inStoragelength', this.response.length)
  }
  onClick() {
      this.response.map(e => {
      return request.getFilmById(e)
      })
   
  // this.cardsMarkup()

}
  //  cardsMarkup() {
  // //   libraryContainer.insertAdjacentHTML("beforeend", createMarkup(data));// json??
  // //   return cards(data.results)

  //    this.onClick().then(data => {
  //      console.dir(data);
  //   const markup = cards(data.results);
  //   libraryContainer.innerHTML = markup;
  // });
  // }
}

const watchedClick = new ButtonsLibrary('watched')
btnWatched.addEventListener('click', watchedClick.onClick.bind(watchedClick));

const queueClick = new ButtonsLibrary('queue')
btnQueue.addEventListener('click', queueClick.onClick.bind(queueClick));
