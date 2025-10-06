

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

/*============ Dark Theme  ==================*/

document.addEventListener('DOMContentLoaded', () => {
  const darkButton = document.getElementById('darkButton');
  if (!darkButton) return;

  // State
  let isDark = localStorage.getItem('theme') === 'dark';
  let dragging = false;
  let moved = false;        // <<-- important: declared!
  let offsetX = 0, offsetY = 0;

  // Apply saved theme & optional saved position
  function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    darkButton.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }
  setTheme(isDark);

  // Optional: restore saved button position
  const savedPos = JSON.parse(localStorage.getItem('darkButtonPos') || 'null');
  if (savedPos) {
    darkButton.style.left = Math.min(window.innerWidth - darkButton.offsetWidth, Math.max(0, savedPos.x)) + 'px';
    darkButton.style.top  = Math.min(window.innerHeight - darkButton.offsetHeight, Math.max(0, savedPos.y)) + 'px';
  }

  // Use Pointer Events (works for mouse + touch + stylus)
  darkButton.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    dragging = true;
    moved = false;
    const rect = darkButton.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    darkButton.setPointerCapture(e.pointerId);
  });

  document.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    moved = true;
    // compute clamped position so the button doesn't go off-screen
    const btnRect = darkButton.getBoundingClientRect();
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    x = Math.max(0, Math.min(x, window.innerWidth - btnRect.width));
    y = Math.max(0, Math.min(y, window.innerHeight - btnRect.height));
    darkButton.style.left = x + 'px';
    darkButton.style.top  = y + 'px';
  });

  document.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    try { darkButton.releasePointerCapture(e.pointerId); } catch (err) {}
    // If it was a tap (no movement), toggle theme; otherwise treat as drag
    if (!moved) {
      isDark = !isDark;
      setTheme(isDark);
    } else {
      // save final position after dragging
      const finalRect = darkButton.getBoundingClientRect();
      localStorage.setItem('darkButtonPos', JSON.stringify({ x: finalRect.left, y: finalRect.top }));
    }
    dragging = false;
  });

  // Prevent synthetic click after pointer interactions from causing double toggles:
  darkButton.addEventListener('click', (e) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // If not moved, clicks are fine — toggle handled already on pointerup for taps,
    // so ignore here to avoid double toggle. (But allow keyboard activation)
    // If you want clicks to toggle in non-pointer environments, uncomment below:
    // isDark = !isDark; setTheme(isDark);
  });

  // reposition/clamp on resize so button always visible
  window.addEventListener('resize', () => {
    const btnRect = darkButton.getBoundingClientRect();
    const x = Math.max(0, Math.min(btnRect.left, window.innerWidth - btnRect.width));
    const y = Math.max(0, Math.min(btnRect.top,  window.innerHeight - btnRect.height));
    darkButton.style.left = x + 'px';
    darkButton.style.top  = y + 'px';
  });

});