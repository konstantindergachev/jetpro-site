import './main.scss';

window.addEventListener('load', () => {
  const currentLocation = location.href;
  const menuLinks = document.querySelectorAll('.nav__link');
  const menuLength = menuLinks.length;
  for (let i = 0; i < menuLength; i++) {
    menuLinks[i].classList.remove('active__title');
    if (menuLinks[i].href === currentLocation) {
      menuLinks[i].classList.add('active__title');
    }
  }
});
