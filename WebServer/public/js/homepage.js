var hamburger = document.getElementsByClassName('hamburger')[0];
var mainNavBar = document.getElementsByClassName('.main-nav-bar')[0];
hamburger.addEventListener('click', function (e) {
    hamburger.classList.toggle("active");
    mainNavBar.classList.toggle("active");
});
