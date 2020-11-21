import '../sass/main.scss';
import '../js/myLibrary';

const emptyNotice = document.querySelector('.empty-collection');
const bodyref = document.querySelector('.gallery-list');


// подключить пагинацию 


// =============================
// подставить в логику рендера колекции
if(bodyref.length === 0){
    emptyNotice.classList.add('is-hidden')
}
else{
    emptyNotice.classList.remove("is-hidden")
}