// // пример кнопок
// <button class="" data-name-button="queue">add to queue</button>
// <button class="" data-name-button="watched">add to Watched</button> 
// // в переменную id добать id обьекта из API
// const id = 123

// // если нет переменной refs, ничего не делай)
// // если уже есть переменная refs, просто добавь к себе в рефы всё что находится в обьекте refs 
// const refs = {
//     queue: document.querySelector('[data-name-button="queue"]'),
//     watched: document.querySelector('[data-name-button="watched"]')
// }

// const queue = new AddLocalStorage('queue', id, refs.queue, 'asssss')
// refs.queue.addEventListener('click', queue.addLocalStorage.bind(queue))
// const watched = new AddLocalStorage('watched', id, refs.watched, 'asssss', queue)
// refs.watched.addEventListener('click', watched.addLocalStorage.bind(watched))

export default class AddLocalStorage{
    constructor(listName, idMovie, button, classCSS, queue = {}) {
        if (!localStorage.getItem(listName)) {
            localStorage.setItem(listName, '[]')
        }
   
        this.id = Number(idMovie)
        this.listName = listName
        this.localStorageArray = JSON.parse(localStorage.getItem(this.listName))
        this.newLocalStorageArray = []
        this.isActive = this.localStorageArray.includes(this.id)
        this.queue = queue
        this.button = button
        this.classCSS = classCSS
        this._amountPage = Math.ceil(JSON.parse(localStorage.getItem(this.listName)).length / 20)
        this.active()
    }

    active() {
        if (this.isActive) {
            this.button.classList.add(this.classCSS)
            return this.active
        }
        this.button.classList.remove(this.classCSS)
        return this.active
    }

    get amountPage() {
        return this._amountPage
    }

    set amountPage(item) {
        this._amountPage = Math.ceil(JSON.parse(localStorage.getItem(item)).length / 20)
        return this._amountPage
    }

    checkQueue() {
        this.queue.newLocalStorageArray = [...this.queue.localStorageArray.filter(id => id !== this.id)]
        localStorage.setItem('queue', JSON.stringify(this.queue.newLocalStorageArray))
        this.queue.isActive = false
    }

    addLocalStorage() {
        if (this.listName === 'watched' && this.isActive === false) {
            this.checkQueue()
        }

        if (!this.isActive) {
            this.newLocalStorageArray = [...this.localStorageArray.filter(id => id !== this.id), this.id]
            localStorage.setItem(this.listName, JSON.stringify(this.newLocalStorageArray))
            this.isActive = true
            this.active()
            return
        }

        this.newLocalStorageArray = this.localStorageArray.filter(id => id !== this.id)
        localStorage.setItem(this.listName, JSON.stringify(this.newLocalStorageArray))
        this.isActive = false
        this.active()
    }
}

// function amountPage(item) {
//     const maxPage = Math.ceil(JSON.parse(localStorage.getItem(item)).length / 20)
//     return maxPage
// }