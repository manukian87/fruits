window.addEventListener('DOMContentLoaded', () => {
    //tabs

    const tabsWrapper = document.querySelector('.catalog__tabs'),
        tabs = document.querySelectorAll('.catalog__tabs_item'),
        content = document.querySelectorAll('#catalog');
         
    
    function hideContent() {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        content.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });
       


    }
    function showContent(i = 0) {
        tabs[i].classList.add('active');
        content[i].classList.add('show','fade');
        content[i].classList.remove('hide');
      
    }
    
    hideContent();
    showContent();

    tabsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('catalog__tabs_item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideContent();
                    showContent(i);
                   
                }
            });
        }
    });


});