import '../sass/main.scss';


const emptyNotice = document.querySelector('.empty-collection');
const bodyref = document.querySelector('.gallery-list');


// =============================
// подставить в логику рендера колекции
if(bodyref.length === 0){
    emptyNotice.classList.add('is-hidden')
}
else{
    emptyNotice.classList.remove("is-hidden")
}