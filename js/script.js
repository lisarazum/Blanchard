window.addEventListener('DOMContentLoaded', function() {
  if (window.matchMedia("screen and (max-width: 576px)").matches) {
    burgerMenu()
  }
  function burgerMenu() {
    const burger = document.querySelector('.header-top__burger');
    const menu = document.querySelector('.header-top__nav');
    const menuItems = document.querySelectorAll('.header-top__item');
    const overlay = document.querySelector('.overlay');
  
    burger.addEventListener('click', (e) => {
      burger.classList.toggle('open-menu');
      menu.classList.toggle('open-menu');
      overlay.classList.toggle('is-active');
    })
  
    overlay.addEventListener('click', () => {
      burger.classList.remove('open-menu');
      menu.classList.remove('open-menu');
      overlay.classList.toggle('is-active');
      enableScroll()
    })
  
    menuItems.forEach(el => {
      el.addEventListener('click', () => {
        burger.classList.remove('open-menu');
        menu.classList.remove('open-menu');
        overlay.classList.toggle('is-active');
        enableScroll()
      })
    })
  }

  // search

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);
  
    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });
    
    search.addEventListener('click', function(evt) {
      evt._isSearch = true;
    });
  
    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;
      this.style.opacity = 0;
  
      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.disabledClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });
    
    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      openBtn.style.opacity = '';
      search.classList.add(params.hiddenClass);
    });
    
    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        openBtn.style.opacity = '';
        search.classList.add(params.hiddenClass);
      }
    });
  }
  
  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  // header-bottom
  const params = {
    btnClassName: "styles__item-btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }
  
  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }
  
  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.activeClassName}`);
  
      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }
  
      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`[data-target="${path}"]`);
  
        btn.classList.toggle(params.activeClassName);
  
        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }
  
  setMenuListener();

  // hero
  var hero__swiper = new Swiper('.hero__swiper', {
    allowTouchMove: false,
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  // galery-select
  const defaultSelect = () => {
    const element = document.querySelector('.filter');
    const choices = new Choices (element, {
      searchEnabled: false,
      position: 'bottom'
    });
  };

  defaultSelect();

  // galery-swiper
  var galery__swiper = new Swiper('.galery__swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    },
    navigation: {
      nextEl: '.galery__next',
      prevEl: '.galery__prev',
    },
    pagination: {
      el: ".galery__pagination",
      type: "fraction"
    },
  });

  // galery modals

  function openModal() {
    const modalLink = document.querySelectorAll('.galery__swiper-slide')
    const overlay = document.querySelector('.overlay')

    modalLink.forEach(function(item) {
      item.addEventListener('click', (event) => {
        event.preventDefault();

        const modalId = item.getAttribute('data-modal')
        const modal = document.querySelector('.galery-modal[data-modal="' + modalId + '"]')
        const closeModal = document.querySelector('.galery-modal__close[data-modal-close="' + modalId + '"]')


        modal.classList.toggle('is-active')
        overlay.classList.toggle('is-active')

        closeModal.addEventListener('click', () => {
          modal.classList.toggle('is-active')
          overlay.classList.toggle('is-active')
        })
    
        overlay.addEventListener('click', () => {
          modal.classList.remove('is-active')
          overlay.classList.remove('is-active')
        })
      })
    })
  }

  openModal();

  // catalogue accordion

  $( function() {
    $( "#accordion" ).accordion({
      collapsible: true,
      icons: false,
      heightStyle: 'content',
      animate: 200
    });
  } );

  document.querySelectorAll('.accordion__desc-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path
      document.querySelectorAll('.catalogue-desk__slider').forEach(function(tabContent) {
        tabContent.classList.remove('catalogue-desk__slider--active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('catalogue-desk__slider--active')
    })
  });

  // events-swiper

  var swiper = new Swiper('.events__swiper', {
    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 50,

    breakpoints: {
      768: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      970: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 27,
      },
      1300: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      }
    },

    pagination: {
      el: '.events__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.events__next-btn',
      prevEl: '.events__prev-btn',
    },
  });

  // tooltip

  tippy('.js-tooltip-btn', {
    maxWidth: 264,
    theme: 'tooltip',
  });

  // projects-swiper

  var swiper = new Swiper('.projects-partners__slider', {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
      651: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    navigation: {
      nextEl: '.projects-partners__next-btn',
      prevEl: '.projects-partners__prev-btn',
    },
  });

  // form

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+ 7 (999) 999-99-99");
  im.mask(selector);

  new JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          console.log(phone)
          return Number(phone) && phone.length === 10
        }
      },
    },
    messages: {
      name: 'Недопустимый формат',
      tel: 'Недопустимый формат',
    },
  });

  // map

  ymaps.ready(init);
  function init(){
      var myMap = new ymaps.Map("map", {

        center: [55.76021343, 37.61441115],
        zoom: 13,
        autoFitToViewport: 'always',
        controls: ['geolocationControl', 'zoomControl']
      },
      { 
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "360px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "260px", right: "20px" }
      }
      );

      var MyhPlacemark = new ymaps.Placemark([55.76034652, 37.61376742], {}, {
        iconLayout: "default#image",
        iconImageHref: '../img/ymap_icon.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42]
      });

      myMap.geoObjects.add(MyhPlacemark);
      myMap.behaviors.disable('scrollZoom');
  }
})