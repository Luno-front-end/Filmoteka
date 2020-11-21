import modalMovieTpl from '../templates/modal.hbs';

import apiRequest from './apiRequest';
import refs from './refs';
// import API from './apiRequest';
import AddLocalStorage from './AddLocalStorage';


const API = apiRequest

refs.moviesGallery.addEventListener('click', clickOnGallery);
// const body = document.querySelector('body');
// const modal = document.querySelector('.js-modal');
// const modalOverlay = document.querySelector('.modal-overlay');
// const modalContent = document.querySelector('.modal-content');
const refsModal = {}
let queue = {}
let watched = {}

function clickOnGallery(e) {
  if (e.target.tagName === 'IMG') {
    openModal(e.target.dataset.id);
  }
}

function openModal(id) {
  API
    .getFilmById(id)
    .then(film => renderModal(film))
    .catch(error => console.log(error));

  refs.body.classList.add('modal-open');
  refs.modal.classList.add('is-open');
  refs.modalOverlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);  
  refs.queue = document.querySelector('.js-watched')
  refs.watched = document.querySelector('.js-queue')
  queue = new AddLocalStorage('queue', id, refs.queue, 'is-active-modal')
  watched = new AddLocalStorage('watched', id, refs.watched, 'is-active-modal', queue)

  body.classList.add('modal-open');
  modal.classList.add('is-open');
  refs.queue.addEventListener('click', queue.addLocalStorage.bind(queue));
  refs.watched.addEventListener('click', watched.addLocalStorage.bind(watched));
  modalOverlay.addEventListener('click', closeModal);
  window.addEventListener('keyup', closeModal);
}

function closeModal({ type, key }) {
  const clearModal = () => {
    refs.body.classList.remove('modal-open');
    refs.modal.classList.remove('is-open');
    refs.modalOverlay.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    refs.modalContent.innerHTML = '';
    // body.classList.remove('modal-open');
    // modal.classList.remove('is-open');
    // modalOverlay.removeEventListener('click', closeModal);
    // window.removeEventListener('keyup', closeModal);
    // modalContent.innerHTML = '';
    refs.queue.removeEventListener('click', queue.addLocalStorage.bind(queue));
    refs.watched.removeEventListener('click', watched.addLocalStorage.bind(watched));
  };

  if (type === 'keydown') {
    if (key === 'Escape') {
      clearModal();
    }
  } else {
    clearModal();
  }
}

function renderModal(film) {
  const markup = modalMovieTpl(film);
  refs.modalContent.innerHTML = markup;
}
