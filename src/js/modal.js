import modalMovieTpl from '../templates/modal.hbs';

import apiRequest from './apiRequest';
import refs from './refs';
import AddLocalStorage from './AddLocalStorage';


const API = apiRequest

refs.moviesGallery.addEventListener('click', clickOnGallery);

const refsModal = {}
let queue = {}
let watched = {}

function clickOnGallery(e) {
  if (e.target.tagName === 'IMG') {
    openModal(e.target.dataset.id);
  }
}

async function openModal(id) {
  await API
    .getFilmById(id)
    .then(film => renderModal(film))
    .catch(error => {
        // если Error вывести на экран сообщение "Missed in Db" 
      console.log(error)
    });

  refs.body.classList.add('modal-open');
  refs.modal.classList.add('is-open');
  refs.modalOverlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);  
  refsModal.queue = document.querySelector('.js-queue')
  refsModal.watched = document.querySelector('.js-watched')
  
  queue = new AddLocalStorage('queue', id, refsModal.queue, 'js-active-btn')
  watched = new AddLocalStorage('watched', id, refsModal.watched, 'js-active-btn', queue)

  // refs.body.classList.add('modal-open');
  // refs.modal.classList.add('is-open');

  refsModal.queue.addEventListener('click', queue.addLocalStorage.bind(queue));
  refsModal.watched.addEventListener('click', watched.addLocalStorage.bind(watched));

  // refs.modalOverlay.addEventListener('click', closeModal);
  // window.addEventListener('keyup', closeModal);
}

function closeModal({ type, key }) {
  const clearModal = () => {
    refs.body.classList.remove('modal-open');
    refs.modal.classList.remove('is-open');
    refs.modalOverlay.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    refs.modalContent.innerHTML = '';
    refsModal.queue.removeEventListener('click', queue.addLocalStorage.bind(queue));
    refsModal.watched.removeEventListener('click', watched.addLocalStorage.bind(watched));
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
  console.log('film', film);
  console.log('markup', markup);
  refs.modalContent.innerHTML = markup;
}
