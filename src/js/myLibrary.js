import request from '../js/apiRequest';
import cards from "../Templates/gallery-card-library.hbs"; // заглушка

// localStorage.setItem('queue', '[625512,612568,625128]')
// localStorage.setItem('watched', '[625312]')

const btnWatched = document.querySelector('#watched');
const btnQueue = document.querySelector('#queue'); 

const libraryContainer = document.querySelector(".gallery"); 
class ButtonsLibrary {
  constructor(btnName) {
    this.btnName = btnName;
    this.btnObject = [ ];
    this.response = JSON.parse(localStorage.getItem(this.btnName))
  }
  cardData() {
    this.response.map(id => {
                 return request.getFilmById(id).then(data => {
                   this.btnObject.push(data)
                   console.dir(data)
                 });
    })
    this.renderCard()
  }
  renderCard() {
    libraryContainer.innerHTML = cards(this.btnObject);
    console.log(this.btnObject);
  }
}

const watchedClick = new ButtonsLibrary('watched')
btnWatched.addEventListener('click', watchedClick.cardData.bind(watchedClick));

const queueClick = new ButtonsLibrary('queue')
btnQueue.addEventListener('click', queueClick.cardData.bind(queueClick));
