import request from '../js/apiRequest';
import refs from "./library-refs"
// import galleryCardTemplate from '../Templates/gallery-card-library.hbs'
import { createGallery } from './createGallery'

//  Pagination
// // ===================================
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

function getLenght() {
  const array = JSON.parse(localStorage.getItem('watched'))
  return array.length
}

const options = {
  totalItems: getLenght(),
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: "<button id='page' class='tui-page-btn page-btn'>{{page}}</button>",
    currentPage: '<button id="page" class="tui-page-btn tui-is-selected active-page-btn">{{page}}</button>',
    moveButton: '<button id="page" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</button>',
    moreButton: '<button id="page" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</button>',
    disabledMoveButton:
      '<button id="page" class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<button  class="tui-ico-{{type}}">{{type}}</button>' +
      '</button>',
  }
}
const pagination = new Pagination(refs.container, options);

const btnWatched = document.querySelector('#watched'); // класс кнопки
const btnQueue = document.querySelector('#queue'); // класс кнопки

let genresArr = []

getDataFromLocalStorage('watched', 2)
btnSwitch(btnWatched, btnQueue)


btnWatched.addEventListener("click", (e) => {
  getDataFromLocalStorage('watched')
  btnSwitch(btnWatched, btnQueue)
})

btnQueue.addEventListener('click', (e) => {
  currentListName()
  getDataFromLocalStorage('queue')
  btnSwitch(btnQueue, btnWatched)
})

function btnSwitch(btnRefA, btnRefB) {
  btnRefA.classList.add('is-active')
  btnRefA.setAttribute('disabled', '')

  if (btnRefA.hasAttribute('active')) {
    btnRefA.removeAttribute('active')
  }

  btnRefB.classList.remove('is-active')
  btnRefB.removeAttribute('disabled')
  btnRefB.setAttribute('active', '')
}

// // =============================
// подставить в логику рендера колекции

async function getDataFromLocalStorage(ListName, page=1) {
  try {
    refs.galleryList.innerHTML = ''

    const response = JSON.parse(localStorage.getItem(ListName))
    if (response === null) {
      return
    }

    const amountOfLoad = 12;
    const firstIndex = page * amountOfLoad - amountOfLoad; 
    const lastIndex = page * amountOfLoad;
    const shortResponse = response.slice(firstIndex, lastIndex)

    const responseArr = shortResponse.map(id => {
      return request.getFilmById(id)
    })

    const dataArr = await Promise.all(responseArr)

    createGallery(dataArr, refs.galleryList, genresArr)
    isGalleryEmpty()

  } catch (error) {
    console.log(error);
  }
}

function isGalleryEmpty() {
  if (Number(refs.galleryList.childElementCount) !== 0) {
    refs.emptyNotice.classList.add('is-hidden')
  }
  else {
    refs.emptyNotice.classList.remove("is-hidden")
  }
}

function currentListName() {
  if( btnWatched.hasAttributes('disabled') ){return 'watched'}
  if(btnQueue.hasAttributes('disabled')){return 'queue'}
}

pagination.on('beforeMove', async ({ page }) => {
  refs.galleryList.innerHTML = '';
  console.log(page);
  getDataFromLocalStorage(currentListName(), page)
})