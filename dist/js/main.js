window.addEventListener('DOMContentLoaded', () => {
    //tabs

    const tabsWrapper = document.querySelector('.catalog__tabs'),
        tabs = document.querySelectorAll('.catalog__tabs_item'),
        content = document.querySelectorAll('.catalog__card-item'),
        nuts = document.querySelectorAll('.catalog__card');
    let tabweigth = document.querySelectorAll('.catalog__card_weight-item'),
        price = document.querySelectorAll('.price'),
        weightWrapper = document.querySelectorAll('.catalog__card_weight-wrapper');
        
    function hideMenu(item) {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        
    }

    function showMenu(item, i) {
        item[i].classList.add('show', 'fade');
        item[i].classList.remove('hide');
    }
    function showClass(item) {
        item.classList.add('show', 'fade');
        item.classList.remove('hide');
    }


    function hideContent() {
        tabs.forEach(tab => tab.classList.remove('active'));
        content.forEach(item => hideMenu(item));

    }
  
    function showContent(i = 0) {
        tabs[i].classList.add('active');
        showMenu(content, i);
      
    }

    hideContent();
    showContent();

    tabsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('catalog__tabs_item')) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });


    // show price
 
  
    function hidePrice() {
        tabweigth.forEach(item => item.classList.remove('active-min'));
        price.forEach(item => hideMenu(item));
    }
    function showPrice(i = 0) {
        price = document.querySelectorAll('.price');
        tabweigth[i].classList.add('active-min');
        showMenu(price, i);

    }
   
    
    hidePrice();
    showPrice();
    
    document.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('catalog__card_weight-item')) {
            tabweigth = document.querySelectorAll('.catalog__card_weight-item');
            tabweigth.forEach((item, i) => {
                if (target == item) {
                    hidePrice();
                    showPrice(i);
                    
                }
            });
        }
    });
        

    //modal & btn
    
    const modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
    let   modalTrigger = document.querySelectorAll('[data-btn]');

  
    
    function showModal() {
        showClass(modal);
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    function closeModal() {
        hideMenu(modal);
        document.body.style.overflow = '';
    }
      
    window.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.getAttribute('data-btn')=='') {
            modalTrigger = document.querySelectorAll('[data-btn]');
            modalTrigger.forEach(btn => {
                btn.addEventListener('click', showModal);
            });
        }
      
    });
    
    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // modalTimer
    const modalTimer = setTimeout(showModal, 4000);

    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json;
    };

    const forms = document.querySelectorAll('form');
    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = {
                loading: 'img/form/spinner.svg',
                saccess: 'Спасибо!!! Мы с Вами свяжемся.',
                failure: 'Произошла ошибка, пожалуйста, попробуйте позже'
            };

            const formData = new FormData(form);

            const statusMessage = document.createElement('div');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(() => {
                    showThanksModal(message.saccess);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
            
        });
    }

    function showThanksModal(message) {
        const prevThanksDialog = document.querySelector('.modal__dialog');
        prevThanksDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__catalog">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevThanksDialog.classList.add('show');
            prevThanksDialog.classList.remove('hide');
            closeModal();
        }, 3000);

    }

    // CardMenu

    class CardMenu {
        constructor(title, src, alt, price1, price2, price3, price4, subtitle, parentSelector, ...classes) {
            this.title = title;
            this.src = src;
            this.alt = alt;
            this.price1 = price1;
            this.price2 = price2;
            this.price3 = price3;
            this.price4 = price4;
            this.subtitle = subtitle;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;

        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('catalog__card', 'title');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <h3 class="catalog__card_subtitle">${this.title}</h3>
                <img src=${this.src} alt=${this.alt}>
                <div class="catalog__card_price title title_fz22"> 
                    <div class="catalog__card_price-title">Цена</div>
                    <div class="catalog__card_price-total">
                        <span class="price show">${this.price1}</span>
                        <span class="price hide">${this.price2}</span>
                        <span class="price hide">${this.price3}</span>
                        <span class="price hide">${this.price4}</span>
                        <div class="catalog__card_price_descr">грн. </div>
                    </div>

                </div>
              <h4 class="catalog__card_subtitle-min title title_fz12">${this.subtitle}</h4>
              <div class="catalog__card_weight title">
                <div class="catalog__card_weight-title title_fz12">Вес<span>*</span></div>
                <ul class="catalog__card_weight-wrapper">
                  <li class="catalog__card_weight-item active-min">100 г</li>
                  <li class="catalog__card_weight-item">200 г</li>
                  <li class="catalog__card_weight-item">500 г</li>
                  <li class="catalog__card_weight-item">1000 г</li>
                </ul>
              </div>
              <div class="catalog__card_divider"></div>
              <button class="catalog__card_btn btn btn-min" data-btn>купить</button>
            
            `;
            this.parent.append(element);
        }
    }


    axios.get('http://localhost:3000/catalog__nuts')
        .then(data => {
            console.log(data);
            data.data.forEach(({ title, img, altimg, price1, price2, price3, price4, subtitle }) => {
                new CardMenu(title, img, altimg, price1, price2, price3, price4, subtitle, '.catalog__fruits .catalog__wrapper').render();
            });

        });
    axios.get('http://localhost:3000/catalog__fruits')
        .then(data => {
            console.log(data);
            data.data.forEach(({ title, img, altimg, price1, price2, price3, price4, subtitle }) => {
                new CardMenu(title, img, altimg, price1, price2, price3, price4, subtitle, '.catalog__fruits .catalog__wrapper').render();
            });

        });
    axios.get('http://localhost:3000/catalog__chocolate')
        .then(data => {
            console.log(data);
            data.data.forEach(({ title, img, altimg, price1, price2, price3, price4, subtitle }) => {
                new CardMenu(title, img, altimg, price1, price2, price3, price4, subtitle, '.catalog__chocolate .catalog__wrapper').render();
            });

        });
    
    //slides

    const slides = document.querySelectorAll('.aboutUs__slider_inner-slide'),
        prevBtn = document.querySelector('.aboutUs__slider_btn-prev '),
        nexBtn = document.querySelector('.aboutUs__slider_btn-next'),
        sliderInner = document.querySelector('.aboutUs__slider_inner'),
        sliderWrapper = document.querySelector('.aboutUs__slider_wrapper'),
        width = window.getComputedStyle(sliderWrapper).width;
        
    
    let offset = 0,
        timer,
        offsetWidth = +width.slice(0, width.length - 2);
    

    slides.forEach(slide => slide.style.width = width);
    sliderInner.style.width = 100 * slides.length + '%';
    sliderWrapper.style.overflow = 'hidden';

    const sliderInnerOffset = () => sliderInner.style.transform = `translateX(-${offset}px)`;

    AutoSlide();
    function AutoSlide() {
        timer = setTimeout(nextSlid, 3000);
    }
    

    function nextSlid() {
        if (offset == offsetWidth * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += offsetWidth;
        }
        sliderInnerOffset();
        AutoSlide();
    }

    nexBtn.addEventListener('click', () => {
        nextSlid();
        clearInterval(AutoSlide);
    });
  

    
    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = offsetWidth * (slides.length - 1);
        } else {
            offset -= offsetWidth;
        }
        sliderInnerOffset();
        clearInterval(AutoSlide);

    });

    
    const Menu = document.querySelector('.menu__item'),
        humburger = document.querySelector('.hamburger'),
        menuLink = document.querySelectorAll('.menu__link');
    
    const addActive = act => {
        Menu.classList.toggle(act);
        humburger.classList.toggle(act);
    };

    humburger.addEventListener('click',() =>  addActive('active-menu'));

    menuLink.forEach(item => {
        item.addEventListener('click', () => {
            addActive('active-menu');
        });
    });

    // scrool up and smooth

    const anchors = document.querySelectorAll('a[href*="#"]');
    
    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
   


    const up = document.querySelector('.pageUp');
    hideMenu(up);
    window.addEventListener('scroll', () => {
        if (window.pageYOffset + document.documentElement.clientHeight > 1000) {
           showClass(up);
        } else {
            hideMenu(up);
        }
    });


    // catalogMenu
    

    const catalogBtn = document.querySelector('.header__catalog-btn'),
        catalogMenu = document.querySelector('.header__catalog-item');
       let catalogLink = document.querySelectorAll('.header__catalog-link');
        
    
    
    const actCatlMenu = () => {
        catalogMenu.classList.toggle('hide');
    };

    catalogBtn.addEventListener('click', actCatlMenu);

    catalogLink.forEach((item,i) => {
        item.addEventListener('click', () => {
            actCatlMenu();
            hideContent();
            showContent(i);
        });
    });

     

 
    // hellpMePlease!))
    // 1. при первом нажатии на кнопку модальное окно не открывается, при повторном нажатии
    //    срабатывает(нужно чтобы с первого раза)
    // 2. при запросе через axios для получения данных, нужно чтобы подтягивала карточки в нужный таб (запрос задаю походу не правильный); 
    //  или как-то можно по другому ?
    // 3. на всех карточках нужно чтобы  весь (100г) был активен и соответсвующая цена была видна,
    //  на данный момент только первая карточка высвечивается правильно, а остальные при нажатии только срабатывают, и 
    //  не все кнопки срабатывают на карточках(купить, цены, весь)
    // 4.1 При нажатии на кнопку купить, подтягивала именно тот товар на которую кликнули (при отправке на почту)
            //  4.1 Если будет возможность.
    // 5. нужен хостинг
    // 6. и помочь залить БД (чтобы в дальнейшем клиент мог зайти туда, и коректировать даныые, добавлять, изменять цены).




    

   
       
    
  


});

   



    
   


   







   

    
  
    
  

    




