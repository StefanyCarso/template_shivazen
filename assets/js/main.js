(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    
    if (!selectHeader) return;
    
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  function setupMobileNav() {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
    if (!mobileNavToggleBtn) return;

    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  }

  /**
   * Scroll top button
   */
  function setupScrollTop() {
    let scrollTop = document.querySelector('.scroll-top');
    
    if (!scrollTop) return;

    function toggleScrollTop() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animation on scroll
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }

  /**
   * GLightbox
   */
  function setupGlightbox() {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox'
      });
    }
  }

  /**
   * Pure Counter
   */
  function setupPureCounter() {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  }

  /**
   * Swiper
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      if (!swiperElement) return;
      
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /**
   * FAQ Toggle
   */
  function setupFaq() {
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });
  }

  /**
   * Destacar página atual no menu
   */
  window.highlightCurrentPage = function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    setTimeout(() => {
      const navLinks = document.querySelectorAll('.navmenu a');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
        }
      });
    }, 100);
  };

  /**
   * Inicializar todos os componentes
   */
  window.initializeAllComponents = function() {
    aosInit();
    setupGlightbox();
    setupPureCounter();
    initSwiper();
    setupFaq();
    setupMobileNav();
    setupScrollTop();
    window.highlightCurrentPage();
  };

  /**
   * Carregar cabeçalho
   */
  window.loadHeader = async function() {
    try {
      const response = await fetch('../estrutura/cabecalho.html');
      const data = await response.text();
      document.getElementById('header-placeholder').innerHTML = data;
      
      setTimeout(() => {
        setupMobileNav();
        window.highlightCurrentPage();
      }, 100);
      
    } catch (error) {
      console.error('Erro ao carregar cabeçalho:', error);
    }
  };

  /**
   * Carregar rodapé
   */
  window.loadFooter = async function() {
    try {
      const response = await fetch('../estrutura/rodape.html');
      const data = await response.text();
      document.getElementById('footer-placeholder').innerHTML = data;
      
      setTimeout(() => {
        setupScrollTop();
      }, 100);
      
    } catch (error) {
      console.error('Erro ao carregar rodapé:', error);
    }
  };

  /**
   * Inicializar tudo
   */
  window.initShivaZen = async function() {
    await Promise.all([
      window.loadHeader(),
      window.loadFooter()
    ]);

    window.initializeAllComponents();

    setInterval(() => {
      toggleScrolled();
    }, 500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initShivaZen);
  } else {
    window.initShivaZen();
  }

})();