import modalMovieTpl from '../templates/modal.hbs';
import API from './apiRequest';


const body = document.querySelector('body');
const modal = document.querySelector('.js-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');


// const API = new API();

export function openModal(id) {
  API
    .singleRequest(id)
    .then(film => renderPage(film))
    .catch(error => console.log(error));

  body.classList.add('modal-open');
  modal.classList.add('is-open');
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
