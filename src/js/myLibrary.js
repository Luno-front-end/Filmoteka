import request from '../js/apiRequest';
import cards from "../Templates/gallery-card-library.hbs"; // заглушка

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
    if (this.btnObject.length === 0) {
      document.querySelector('.empty-collection').style.opacity = 1;
    }
    else{ libraryContainer.innerHTML = cards(this.btnObject);
    console.log(this.btnObject);
      document.querySelector('.empty-collection').style.opacity = 0;
    }
     }
}

const watchedClick = new ButtonsLibrary('watched')
btnWatched.addEventListener('click', watchedClick.cardData.bind(watchedClick));

const queueClick = new ButtonsLibrary('queue')
btnQueue.addEventListener('click', queueClick.cardData.bind(queueClick));

