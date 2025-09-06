$(function () {
    // меню
    const menubtn = document.querySelector('.menu_btn');
    const menu = document.querySelector('.menu_nav');
    const logo_top = document.querySelector('.logo_top');

    menubtn.addEventListener('click', () => {
        menu.classList.toggle('open')
        if (window.innerWidth > 891) {
            logo_top.classList.toggle('logo_open')
        }
    })
});