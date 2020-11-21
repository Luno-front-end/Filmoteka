import modalMovieTpl from '../templates/modal.hbs';
import API from './apiRequest';
import AddLocalStorage from './AddLocalStorage';


const body = document.querySelector('body');
const modal = document.querySelector('.js-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const refsModal = {}
let queue = {}
let watched = {}


// const API = new API();

export function openModal(id) {
  API
    .singleRequest(id)
    .then(film => renderPage(film))
    .catch(error => console.log(error));

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
    body.classList.remove('modal-open');
    modal.classList.remove('is-open');
    modalOverlay.removeEventListener('click', closeModal);
    window.removeEventListener('keyup', closeModal);
    modalContent.innerHTML = '';
    refs.queue.removeEventListener('click', queue.addLocalStorage.bind(queue));
    refs.watched.removeEventListener('click', watched.addLocalStorage.bind(watched));
  };

  if (type === 'keyup') {
    if (key === 'Escape') {
      clearModal();
    }
  } else {
    clearModal();
  }
}

function renderPage(film) {
  const markup = modalMovieTpl(film);
  modalContent.innerHTML = markup;
}
