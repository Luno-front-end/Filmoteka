import modalMovieTpl from '../templates/modal.hbs';
import apiRequest from './apiRequest';
import refs from './refs';

const API = apiRequest

refs.moviesGallery.addEventListener('click', clickOnGallery);

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
}

function closeModal({ type, key }) {
  const clearModal = () => {
    refs.body.classList.remove('modal-open');
    refs.modal.classList.remove('is-open');
    refs.modalOverlay.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    refs.modalContent.innerHTML = '';
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
