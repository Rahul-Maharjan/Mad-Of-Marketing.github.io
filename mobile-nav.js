// Mobile navigation toggle for the static pages
(function(){
  function toggleMenu(open){
    const overlay = document.getElementById('mobileNav');
    const panel = document.getElementById('mobileNavPanel');
    const btns = document.querySelectorAll('#mobileMenuButton');
    if(!overlay || !panel) return;
    if(open){
      // Show menu
      overlay.classList.remove('pointer-events-none');
      overlay.classList.add('bg-black', 'bg-opacity-50');
      overlay.setAttribute('aria-hidden','false');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
      btns.forEach(b=>b.setAttribute('aria-expanded','true'));
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Hide menu
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
      overlay.classList.remove('bg-black', 'bg-opacity-50');
      overlay.setAttribute('aria-hidden','true');
      // Wait for transition end then disable pointer events
      panel.addEventListener('transitionend', function handler(){
        overlay.classList.add('pointer-events-none');
        panel.removeEventListener('transitionend', handler);
      });
      btns.forEach(b=>b.setAttribute('aria-expanded','false'));
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  // open buttons (multiple pages include a button with same id)
  document.addEventListener('click', function(e){
    const openBtn = e.target.closest('#mobileMenuButton');
    const closeBtn = e.target.closest('#mobileClose');
    const overlay = e.target.closest('#mobileNav');
    if(openBtn){
      toggleMenu(true);
    } else if(closeBtn){
      toggleMenu(false);
    } else if(overlay && e.target === overlay){
      // click on backdrop closes
      toggleMenu(false);
    }
  });

  // close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') toggleMenu(false);
  });
})();
