/* OPPARC Master Navigation — animated drawer */
(function(){
  function initOPPARCMenu(){
    const button=document.querySelector('.opparc-menu-button');
    const panel=document.querySelector('.opparc-menu-panel');
    const backdrop=document.querySelector('.opparc-menu-backdrop');
    if(!button||!panel||!backdrop) return;
    const links=panel.querySelectorAll('.opparc-menu-link');
    const currentPage=(window.location.pathname.split('/').pop()||'index.html').toLowerCase();
    links.forEach(function(link){
      const raw=(link.getAttribute('href')||'').split('#')[0];
      const target=(raw.split('/').pop()||'index.html').toLowerCase();
      const isHome=(target===''||target==='index.html');
      const active=(isHome&&currentPage==='index.html')||target===currentPage;
      if(active){
        link.classList.add('is-active');
        link.setAttribute('aria-current','page');
      }
    });

    function setOpen(open){
      button.setAttribute('aria-expanded',String(open));
      button.setAttribute('aria-label',open?'Close navigation':'Open navigation');
      panel.classList.toggle('is-open',open);
      backdrop.classList.toggle('is-open',open);
      document.body.classList.toggle('opparc-menu-open',open);
    }
    button.addEventListener('click',function(){setOpen(button.getAttribute('aria-expanded')!=='true')});
    backdrop.addEventListener('click',function(){setOpen(false)});
    links.forEach(function(link){link.addEventListener('click',function(){setOpen(false)})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape') setOpen(false)});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initOPPARCMenu);
  else initOPPARCMenu();
})();