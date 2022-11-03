const hamburger = document.getElementsByClassName('hamburger')[0] as HTMLDivElement
const mainNavBar = document.getElementsByClassName('.main-nav-bar')[0] as HTMLElement

hamburger.addEventListener('click', e => {
    hamburger.classList.toggle("active")
    mainNavBar.classList.toggle("active")
})
