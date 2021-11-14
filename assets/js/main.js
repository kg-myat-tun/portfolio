/*==================== MENU SHOW Y HIDDEN ====================*/

    const navMenu = document.querySelector("#nav-menu"),
          navToggle = document.querySelector("#nav-toggle"),
          navClose = document.querySelector("#nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */

    if (navToggle){
        navToggle.addEventListener("click",()=>{
            navMenu.classList.add("show-menu");
        })
    }

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */

    if (navClose){
        navClose.addEventListener("click",()=>{
            navMenu.classList.remove("show-menu");
        })
    }

/*==================== REMOVE MENU MOBILE ====================*/

    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
        navMenu.classList.remove("show-menu")
    }
    navLink.forEach(n => n.addEventListener("click",linkAction))

/*==================== ACCORDION SKILLS ====================*/

    const skillContent = document.getElementsByClassName("skills__content")
          skillHeader = document.querySelectorAll(".skills__header")

    function toggleSkills() {
        let itemClass = this.parentNode.className

        for ( i = 0 ; i < skillContent.length; i ++ ){
            skillContent[i].className = "skills__content skills__close"
        }

        if (itemClass ===  "skills__content skills__close" ){
            this.parentNode.className =  "skills__content skills__open"
        }
    }

    skillHeader.forEach((el) => {
        el.addEventListener("click",toggleSkills)
    })


/*==================== QUALIFICATION TABS ====================*/

    const tabs = document.querySelectorAll('[data-target]'),
          tabContents = document.querySelectorAll('[data-content]')

    tabs.forEach(tab =>{
        tab.addEventListener("click",()=>{
            const target = document.querySelector(tab.dataset.target)

            tabContents.forEach(tabContent =>{
                tabContent.classList.remove('qualification__active')
            })

            target.classList.add('qualification__active')

            tabs.forEach(tab =>{
                tab.classList.remove('qualification__active')
            })

            tab.classList.add('qualification__active')
        })
    })

/*==================== SERVICES MODAL ====================*/

    const modalViews = document.querySelectorAll('.services__modal'),
          modalBtns = document.querySelectorAll('.services__button'),
          modalCloses = document.querySelectorAll('.services__modal-close')

    let x=0

    let modal = function (modalClick) {
        modalViews[modalClick].classList.add('active-modal')
        x=1
    }

    modalBtns.forEach((modalBtn,i)=>{
        modalBtn.addEventListener("click",()=>{
            modal(i)
        })
    })

    modalCloses.forEach((modalClose,i)=>{
        modalClose.addEventListener('click',()=>{
            modalViews.forEach((modalView) =>{
                modalView.classList.remove('active-modal')
                x=0
            })
        })
    })

    //closing the modal by clicking the outside of the modal//

    modalViews.forEach((modalView,i)=>{
        modalView.addEventListener('click',(e)=>{
            if(e.target.classList.contains('services__modal')){
                modalView.classList.remove('active-modal');
            }
        })
    })



/*==================== PORTFOLIO SWIPER  ====================*/

    let swiperPortfolio = new Swiper ('.portfolio__container',{
        cssMode:true,
        loop:true,
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev",
        },
        pagination:{
            el:".swiper-pagination",
            clickable:true,
        },
        mousewheel:true,
        keyboard:true,
    })

/*==================== TESTIMONIAL ====================*/

    let swiperTestimonial = new Swiper ('.testimonial__container',{
        loop:true,
        grabCursor:true,
        spaceBetween:48,

        pagination:{
            el:".swiper-pagination",
            clickable:true,
            dynamicBullets:true,
        },
        breakpoints:{
            568:{
                slidesPerView:2,
            }
        },

        // autoplay:true,
    })

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

    const sections = document.querySelectorAll('section[id]')

    function scrollActive() {
        const scrollY = window.pageYOffset

        sections.forEach(current =>{
            const sectionHeight = current.offsetHeight
            const sectionTop = current.offsetTop -50 ;
            sectionId = current.getAttribute('id')

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
            }else {
                document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
            }
        })
    }

    window.addEventListener('scroll',scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 

function scrollHeader() {
    const nav = document.getElementById('header')

    if (this.scrollY >= 80 ){
        nav.classList.add('scroll-header')
    }else {
        nav.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll',scrollHeader)

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up')

    if (this.scrollY >= 560 ){
        scrollUp.classList.add('show-scroll')
    }else {
        scrollUp.classList.remove('show-scroll')
    }
}

window.addEventListener('scroll',scrollUp)

/*==================== DARK LIGHT THEME ====================*/

    const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'
    const iconTheme = 'uil-sun'

    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')

    const getCurrentTheme = ()=> document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

    if (selectedTheme){
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
    }

    themeButton.addEventListener('click',()=>{
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)

        localStorage.setItem('selected-theme',getCurrentTheme())
        localStorage.setItem('selected-icon',getCurrentIcon())
    })

/*==================== TYPE WRITER ====================*/

    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 1.5; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.1em solid var(--text-color)}";
        document.body.appendChild(css);
    };


    // loader
    // let spinnerWrapper = document.querySelector('.spinner-wrapper');

    window.addEventListener('load', function () {
        // spinnerWrapper.style.display = 'none';
        // spinnerWrapper.parentElement.removeChild(spinnerWrapper);

        var load_screen = document.getElementById("spinner-wrapper");
        document.body.removeChild(load_screen);
        document.getElementById('main-content').classList.add('ready');
    });
