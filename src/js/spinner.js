export default {
    spinnerOn(item) {
        item.classList.remove('is-hidden')
    },
    spinnerOff(item) {
        item.classList.add('is-hidden')
    }
}