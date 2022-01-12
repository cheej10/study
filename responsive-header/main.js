const toggleBtn = document.querySelector('.toggleBtn');
const menu = document.querySelector('.navbar-menu');
const icon = document.querySelector('.navbar-icon');


toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icon.classList.toggle('active');
})