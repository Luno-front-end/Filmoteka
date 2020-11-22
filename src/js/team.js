
import refs from './refs';

refs.openTeamModal.addEventListener('click', openModal);

function openModal() {
  window.addEventListener('keydown', escKey);
  refs.blackdropTeamModal.addEventListener('click', blackdropClick);
  refs.body.classList.add('modal-team-open');
  refs.teamModal.classList.remove('is-hiddden');
}

function closeTeamModal() {
  window.removeEventListener('keydown', escKey);
  refs.body.classList.remove('modal-team-open');
  refs.teamModal.classList.add('is-hiddden');
  refs.blackdropTeamModal.removeEventListener('click', blackdropClick);
}

function blackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeTeamModal();
  }
}

function escKey(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
  }
}
