

window.addEventListener('DOMContentLoaded', () => {
    //tabs

    const tabsWrapper = document.querySelector('.catalog__tabs'),
        tabs = document.querySelectorAll('.catalog__tabs_item'),
        content = document.querySelectorAll('#catalog'),
        weightWrapper = document.querySelector('.catalog__card_weight-wrapper'),
        price = document.querySelectorAll('.price'),
        weigth = document.querySelectorAll('.catalog__card_weight-item'),
        nuts = document.querySelectorAll('.catalog__card'),
        price1 = document.querySelectorAll('#price1');
        // btnW100 = document.querySelector('#W100'),
        // btnW200 = document.querySelector('#W200'),
        // btnW300 = document.querySelector('#W300'),
        // btnW500 = document.querySelector('#W500'),
        // btnW1000 = document.querySelector('#W1000'),





        // btnW100 = document.querySelector('#W100'),
        // btnW200 = document.querySelector('#W200'),
        // btnW300 = document.querySelector('#W300'),
        // btnW500 = document.querySelector('#W500'),
        // btnW1000 = document.querySelector('#W1000'),
        // price = document.querySelectorAll('#price100'),
        // 
        // parentWeight = document.querySelector('.catalog__card_weight-wrapper'),
        // fruits = document.querySelector('.catalog__fruits'),
        // chocolat = document.querySelector('.catalog__chocolate'),
        // nuts = document.querySelector('.catalog__nuts');
    
     
    function hideMenu(item) {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    }

    function showMenu(item, i) {
        item[i].classList.add('show', 'fade');
        item[i].classList.remove('hide');
    }


    function hideContent() {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        content.forEach(item =>  hideMenu(item));

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


   

  
    function hidePrice() {
        weigth.forEach((item) => {
            item.classList.remove('active-min');
            
        });
           price.forEach(item =>  hideMenu(item));
        // price.forEach(item => {
        //     item.classList.add('hide');
        //     item.classList.remove('show');
        // });

    }

    function showPrice(i = 0) {
        
        weigth[i].classList.add('active-min');
        // price[i].classList.add('show');
        // price[i].classList.remove('hide');
        showMenu(price, i);
        
    }
    
    hidePrice();
    showPrice();

    function updatePrice() {
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('catalog__card_weight-item')) {
                weigth.forEach((item, i) => {
                    if (item == e.target) {
                        hidePrice();
                        showPrice(i);
                    }
                });
            }
        });
    }
    updatePrice();

   
 

    

    


    const modalTrigger = document.querySelectorAll('[data-btn]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');
    
    
    function showModal() {
        // modal.classList.add('show','fade');
        // modal.classList.remove('hide');
         modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    function closeModal() {
        // modal.classList.add('hide');
        // modal.classList.remove('show', 'fade');
         modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', showModal);
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
      const modalTimer = setTimeout(showModal, 40000);

    
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
                saccess: 'Спасибо Мы с Вами свяжемся',
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
                .finaly(() => {
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
        },4000);

    }

    // CardMenu

        class CardMenu{
        constructor(title, src, alt, price1, price2, price3, price4, price5, subtitle, parentSelector, ...classes) {
            this.title = title;
            this.src = src;
            this.alt = alt;
            this.price1 = price1;
            this.price2 = price2;
            this.price3 = price3;
            this.price4 = price4;
            this.price5 = price5;
            this.subtitle = subtitle;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;

        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('catalog__card', 'title');
                // element.classList.add('title');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <h3 class="catalog__card_subtitle">${this.title}</h3><img src=${this.src} alt=${this.alt}>
                <div class="catalog__card_price title title_fz22"> 
                    <div class="catalog__card_price-title">Цена</div>
                    <div class="catalog__card_price-total">
                        <span class="price show" id="price1">${this.price1}</span>
                        <span class="price hide" id="price2">${this.price2}</span>
                        <span class="price hide" id="price3">${this.price3}</span>
                        <span class="price hide" id="price4">${this.price4}</span>
                        <span class="price hide" id="price5">${this.price5}</span>
                        <div class="catalog__card_price_descr">грн. </div>
                    </div>

                </div>
              <h4 class="catalog__card_subtitle-min title title_fz12">${this.subtitle}</h4>
              <div class="catalog__card_weight title">
                <div class="catalog__card_weight-title title_fz12">Вес<span>*</span></div>
                <ul class="catalog__card_weight-wrapper">
                  <li class="catalog__card_weight-item">100 г</li>
                  <li class="catalog__card_weight-item">200 г</li>
                  <li class="catalog__card_weight-item">300 г</li>
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
    new CardMenu(
       "Фрукт1",
        "img/card/fruits/fr1.jpg",
        "fr1",
        40,
        50,
        60,
        70,
        80,
        "Фрукт1",
        '.catalog .catalog__fruits .catalog__wrapper'
        // 'catalog__card'

    ).render();
    new CardMenu(
       "Фрукт1",
        "img/card/fruits/fr1.jpg",
        "fr1",
        40,
        50,
        60,
        70,
        80,
        "Фрукт1",
        '.catalog .catalog__fruits .catalog__wrapper'
        // 'catalog__card'

    ).render();

    const slides = document.querySelectorAll('.aboutUs__slider_inner-slide'),
        prevBtn = document.querySelector('.aboutUs__slider_btn-prev '),
        nexBtn = document.querySelector('.aboutUs__slider_btn-next'),
        sliderInner = document.querySelector('.aboutUs__slider_inner'),
        sliderWrapper = document.querySelector('.aboutUs__slider_wrapper'),
        width = window.getComputedStyle(sliderWrapper).width;
    
    let offset = 0,
        timer;
    
        

    
    slides.forEach(slide => {
        slide.style.width = width;
    });
    sliderInner.style.width = 100 * slides.length + '%';
    sliderWrapper.style.overflow = 'hidden';

    AutoSlide();
    function AutoSlide() {
        timer = setTimeout(nextSlid, 3000);
    }

    function nextSlid() {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        AutoSlide();
    }
    nextSlid();

    

        
    nexBtn.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        clearInterval(AutoSlide);
    });
  

    
    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;
        clearInterval(AutoSlide);

    });

    
    const Menu = document.querySelector('.menu__item'),
        humburger = document.querySelector('.hamburger'),
        menuLink = document.querySelectorAll('.menu__link');
    
    const addActive = act => {
        Menu.classList.toggle(act);
        humburger.classList.toggle(act);
    };

    humburger.addEventListener('click', () => {
        addActive('active-menu');
    });

    menuLink.forEach(item => {
        item.addEventListener('click', () => {
            addActive('active-menu');
        });
    });






    
   


   







    // не работае

    // axios.get('http://localhost:3000/catalog__fruits')
    //     .then(data => console.log(data));
 


 //  data.data.forEach(({ title, img, altimg, price1, price2, price3, price4, price5, subtitle }) => {
 //                 new CardMenu( title, img, altimg, price1, price2, price3, price4, price5, subtitle, '.catalog__fruits .catalog__wrapper').render();
 //             });


       
    // ,
    // {
    //  "title": "Фрукт2",
    //   "img": "img/card/fruits/fr2.jpg",
    //   "altimg": "fr2",
    //   "price1": 400,
    //   "price2": 500,
    //   "price3": 600,
    //   "price4": 70,
    //   "price5": 80,
    //   "subtitle": "Фрукт2"
    // },
    // {
    //   "title": "Фрукт3",
    //   "img": "img/card/fruits/fr3.jpg",
    //   "altimg": "fr3",
    //   "price1": 500,
    //   "price2": 700,
    //   "price3": 900,
    //   "price4": 70,
    //   "price5": 80,
    //   "subtitle": "Фрукт3"
    // }


    
  
    
  

    


});

