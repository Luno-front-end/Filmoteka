import request from '../js/apiRequest';
import refs from "./library-refs"
import {createGallery} from './createGallery'

//  Pagination

// // ===================================
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import {options} from './pagination';
const pagination = new Pagination(refs.container, options);

const btnWatched = document.querySelector('#watched'); // класс кнопки
const btnQueue = document.querySelector('#queue'); // класс кнопки


getDataFromLocalStorage('watched')
btnSwitch(btnWatched,btnQueue)


btnWatched.addEventListener("click", (e) => {
  getDataFromLocalStorage('watched')
  btnSwitch(btnWatched,btnQueue)


  
} )
btnQueue.addEventListener('click' , (e) => {
  getDataFromLocalStorage('queue')
  btnSwitch(btnQueue, btnWatched)
})

function btnSwitch(btnRefA, btnRefB){
 btnRefA.classList.add('is-active')
 btnRefA.setAttribute('disabled','')
  if  (btnRefA.hasAttribute('active')){
 btnRefA.removeAttribute('active')
  }
 btnRefB.classList.remove('is-active')
 btnRefB.removeAttribute('disabled')
 btnRefB.setAttribute('active', '')
}

// function btnD

// // =============================
// подставить в логику рендера колекции

async function getDataFromLocalStorage(ListName) {
  try {
    refs.galleryList.innerHTML= ''

    const response = JSON.parse(localStorage.getItem(ListName))
    if(response === null){
      return
    }

    const responseArr = response.map(id => {
    return request.getFilmById(id)
    })
    const dataArr = await Promise.all(responseArr)

    const amountOfPages = Math.ceil(Number(dataArr.length) /20)
    pagination.reset(amountOfPages)

    createGallery(dataArr, refs.galleryList)
    isGalleryEmpty()

  } catch (error) {
    console.log(error);
  }

}

function isGalleryEmpty(){
  if(Number(refs.galleryList.childElementCount) !== 0){
    refs.emptyNotice.classList.add('is-hidden')
  }
  else{
    refs.emptyNotice.classList.remove("is-hidden")
  }
  }

// pagination.on('beforeMove', async ({ page }) => {
//   refs.galleryList.innerHTML = '';

//   request.setPage(page)
//   const data = await request.getTrendFilms(refs.input.value)
//   createGallery(data.results, refs.galleryList);
// })




