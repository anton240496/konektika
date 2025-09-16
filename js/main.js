
document.addEventListener('DOMContentLoaded', function () {
    console.log('Current path:', window.location.pathname);
    console.log('Current href:', window.location.href);
    console.log('Current host:', window.location.host);

    const homeLinks = document.querySelectorAll('a[href="./"], a[href="/"]');
    console.log('Found home links:', homeLinks.length);

    for (let link of homeLinks) {
        link.addEventListener('click', function (e) {
            console.log('Home link clicked');
            console.log('Link href:', this.getAttribute('href'));
            console.log('Current pathname:', window.location.pathname);

            // Простая проверка - если мы уже на какой-то странице, не начинающейся с репозитория
            const path = window.location.pathname;
            const isLikelyHomePage = path === '/' ||
                path === '/index.html' ||
                path === '' ||
                path.endsWith('/index.html') ||
                !path.includes('.html'); // если нет .html в пути, возможно главная

            console.log('Is likely home page:', isLikelyHomePage);

            if (isLikelyHomePage) {
                e.preventDefault();
                console.log('Smooth scrolling to top');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});



$(document).ready(function () {
    // Находим наш слайдер
    var $slider = $('.vertical-slider');
    // Считаем количество слайдов
    var slideCount = $slider.find('.slide').length;

    // Выводим в консоль количество найденных слайдов
    console.log('Найдено слайдов: ' + slideCount);

    // Проверяем, если слайдов 7 или больше - включаем слайдер
    if (slideCount > 7) {
        console.log('Запускаем слайдер (7+ слайдов)');
        $slider.slick({
            vertical: true,
            slidesToShow: 7,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            prevArrow: `
             <button class="arrowsw_prev">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>

                            </button>`,
            nextArrow: `  <button class="arrowsw_next">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>

                            </button>`,

        });


        // Управление клавиатурой
        $(document).on('keydown', function (e) {
            switch (e.key) {
                case 'ArrowUp':
                case 'ArrowLeft':
                    $('.vertical-slider').slick('arrowsw_prev');
                    break;
                case 'ArrowDown':
                case 'ArrowRight':
                    $('.vertical-slider').slick('arrowsw_next');
                    break;
            }
        });

        // Прокрутка колесом мыши
        if (window.innerWidth > 1300) {
            $('.vertical-slider').on('wheel', function (e) {
                e.preventDefault();
                if (e.originalEvent.deltaY < 0) {
                    $(this).slick('slickPrev');
                } else {
                    $(this).slick('slickNext');
                }
            });
        }

        // Автоподстройка высоты при изменении контента
        // $(window).on('resize', function () {
        //     $('.vertical-slider').slick('resize');
        // });
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const duration = 3000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));

    let animationIntervals = [];
    let animationStarted = false;

    function calculateYears() {
        const foundedYearElement = document.querySelector('.founded-year');
        const foundedYear = parseInt(foundedYearElement.textContent);
        const currentYear = new Date().getFullYear();
        return currentYear - foundedYear;
    }

    function resetCounters() {
        counters.forEach(counter => {
            counter.innerText = '0';
        });
        document.querySelector('.loading-bar').style.width = '0';
    }

    function startCountersAnimation() {
        if (animationStarted) return;

        stopAnimation();
        resetCounters();

        document.getElementById('years-counter').setAttribute('data-target', calculateYears());

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / totalFrames;
            let frame = 0;

            function updateCounter() {
                if (frame < totalFrames) {
                    current += increment;
                    counter.innerText = Math.round(current);
                    frame++;
                    animationIntervals.push(requestAnimationFrame(updateCounter));
                } else {
                    counter.innerText = target;
                }
            }

            const timeoutId = setTimeout(() => {
                animationIntervals.push(requestAnimationFrame(updateCounter));
            }, 0);

            animationIntervals.push(timeoutId);
        });

        animationStarted = true;
    }

    function stopAnimation() {
        animationIntervals.forEach(interval => {
            if (typeof interval === 'number') {
                cancelAnimationFrame(interval);
            } else {
                clearTimeout(interval);
            }
        });
        animationIntervals = [];
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;

        // Проверяем, что элемент видим хотя бы на 30% (можно настроить)
        const vertInView = rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5;
        const horInView = rect.left <= windowWidth && rect.right >= 0;

        return vertInView && horInView;
    }

    const countersSection = document.querySelector('.aboutinfo');

    function checkVisibility() {
        // Запускаем анимацию ТОЛЬКО если блок виден И анимация еще не запускалась
        if (!animationStarted && isElementInViewport(countersSection)) {
            startCountersAnimation();
        }
    }

    // Проверяем при загрузке - если блок уже виден, запускаем анимацию
    if (isElementInViewport(countersSection)) {
        startCountersAnimation();
    }

    // Проверяем при скролле
    window.addEventListener('scroll', checkVisibility);

    // Дополнительная проверка после полной загрузки страницы
    window.addEventListener('load', checkVisibility);
});

$(function () {
    // меню
    const menubtn = document.querySelector('.menu_btn');
    const menu = document.querySelector('.menu_nav');
    const swiper = document.querySelector('.swiper');
    const logo_top = document.querySelector('.logo_top');
    const menu_links = document.querySelectorAll('.menu_link');

    menubtn.addEventListener('click', () => {
        menu.classList.toggle('open')
        swiper.classList.toggle('swopen')
        if (window.innerWidth > 891) {
            logo_top.classList.toggle('logo_open')
        }
    })

    menu_links.forEach(menu_link => {
        menu_link.addEventListener('click', () => {
            menu.classList.remove('open')
            swiper.classList.remove('swopen')
            if (window.innerWidth > 891) {
                logo_top.classList.remove('logo_open')
            }
        });
    });



});



// Функция для склонения слова "год" в зависимости от числа


// анимация подсчета цифр о компании 


// для телефона

// форма
// Получаем элементы DOM

document.addEventListener('DOMContentLoaded', function () {
    // Переменные для попапа
    const popup = document.querySelector('.popup_content');
    const closeBtn = document.querySelector('.closebtn');
    const topPopupButton = document.querySelector('.top-popup-button');
    const bottomPopupButton = document.querySelector('.bottom-popup-button');
    const FAQbtn = document.querySelector('.FAQ_btn');
    const emailInput = document.getElementById('email-input');

    let popupWasClosed = false;
    let alreadyShownAtBottom = false;
    let cooldown = false;
    let autoShowInterval;

    // Функции для работы с формами
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
        const nameInput = form.querySelector('.name-input');
        const phoneInput = form.querySelector('.phone-input');
        const nameValidationMessage = form.querySelector('.name-validation-message');
        const phoneValidationMessage = form.querySelector('.phone-validation-message');
        const submitBtn = form.querySelector('.submit-btn');

        let isNameValid = false;
        let isPhoneValid = false;

        // Валидация имени
        nameInput.addEventListener('input', function () {
            validateName();
            updateSubmitButton();
        });

        nameInput.addEventListener('blur', function () {
            validateName();
            updateSubmitButton();
        });

        // Валидация телефона
        phoneInput.addEventListener('focus', function () {
            if (this.value === '') {
                this.value = '+7';
                this.setSelectionRange(2, 2);
            }
        });

        phoneInput.addEventListener('blur', function () {
            if (this.value === '+7') {
                this.value = '';
            }
            validatePhone();
            updateSubmitButton();
        });

        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value;
            let digits = value.replace(/\D/g, '');

            let newValue = '+7';

            if (digits.startsWith('7')) {
                digits = digits.substring(1);
            }

            if (digits.length > 0) {
                newValue += ' (' + digits.substring(0, 3);
            }
            if (digits.length > 3) {
                newValue += ') ' + digits.substring(3, 6);
            }
            if (digits.length > 6) {
                newValue += '-' + digits.substring(6, 8);
            }
            if (digits.length > 8) {
                newValue += '-' + digits.substring(8, 10);
            }

            e.target.value = newValue;

            validatePhone();
            updateSubmitButton();
        });

        phoneInput.addEventListener('keydown', function (e) {
            if ([46, 8, 9, 27, 13].includes(e.keyCode) ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }

            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        function validateName() {
            const nameValue = nameInput.value.trim();

            if (nameValue.length === 0) {
                nameValidationMessage.textContent = 'Имя не может быть пустым';
                nameValidationMessage.className = 'validation-message invalid';
                nameInput.className = 'inpvalid';
                isNameValid = false;
            } else if (nameValue.length < 2) {
                nameValidationMessage.textContent = 'Имя должно содержать минимум 2 символа';
                nameValidationMessage.className = 'validation-message invalid';
                nameInput.className = 'inpvalid';
                isNameValid = false;
            } else {
                nameValidationMessage.textContent = '✓ Имя корректно';
                nameValidationMessage.className = 'validation-message valid';
                nameInput.className = 'inpinvalid';

                isNameValid = true;
            }
        }

        function validatePhone() {
            const phoneNumber = phoneInput.value.replace(/\D/g, '');

            if (phoneNumber.length === 0) {
                phoneValidationMessage.textContent = 'Ввод телефона обязателен';
                phoneValidationMessage.className = 'validation-message invalid';
                phoneInput.className = 'inpvalid';
                isPhoneValid = false;
            } else if (phoneNumber.length === 11) {
                phoneValidationMessage.textContent = '✓ Номер телефона корректен';
                phoneValidationMessage.className = 'validation-message valid';
                phoneInput.className = 'inpinvalid';
                isPhoneValid = true;
            } else {
                phoneValidationMessage.textContent = 'Номер телефона должен содержать 11 цифр';
                phoneValidationMessage.className = 'validation-message invalid';
                isPhoneValid = false;
                phoneInput.className = 'inpvalid';
            }
        }

        // function updateSubmitButton() {
        //     submitBtn.disabled = !(isNameValid && isPhoneValid);
        // }

        // Функция для фокусировки на некорректном поле
        function focusOnInvalidField() {
            validateName();
            validatePhone();

            if (!isNameValid) {
                nameInput.focus();
            } else if (!isPhoneValid) {
                phoneInput.focus();
                if (phoneInput.value === '') {
                    phoneInput.value = '+7';
                    phoneInput.setSelectionRange(2, 2);
                }
            } else {
                // Если все поля корректны - фокус на телефон
                phoneInput.focus();
                phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
            }
        }

        // Обработчик отправки формы
        submitBtn.addEventListener('click', function (e) {
            validateName();
            validatePhone();

            if (!isNameValid || !isPhoneValid) {
                e.preventDefault();
                focusOnInvalidField();
                return;
            }

            const nameValue = nameInput.value.trim();
            const phoneValue = phoneInput.value;
            const phoneNumber = '+7' + phoneValue.replace(/\D/g, '');

            alert(`Данные приняты!\nИмя: ${nameValue}\nТелефон: ${phoneNumber}`);

            // Очищаем форму
            nameInput.value = '';
            phoneInput.value = '';
            nameValidationMessage.textContent = '';
            nameValidationMessage.className = 'validation-message';
            phoneValidationMessage.textContent = '';
            phoneValidationMessage.className = 'validation-message';
            isNameValid = false;
            isPhoneValid = false;
        });

        // Сохраняем функцию фокусировки для использования извне
        form.focusOnInvalidField = focusOnInvalidField;
    });

    // Функции для работы с попапом
    function hidePopup() {
        if (popup) {
            popup.classList.add('hidden');
        }
        if (topPopupButton) {
            topPopupButton.classList.remove('hidden');
        }
        if (bottomPopupButton) {
            bottomPopupButton.classList.remove('hidden');
        }

        if (FAQbtn) {
            FAQbtn.classList.remove('hidden');
        }
        popupWasClosed = true;

        cooldown = true;
        setTimeout(() => {
            cooldown = false;
        }, 2000);

        restartAutoShowTimer();
    }

    function showPopup() {
        if (popup) {
            popup.classList.remove('hidden');
        }
        if (topPopupButton) {
            topPopupButton.classList.add('hidden');
        }
        if (bottomPopupButton) {
            bottomPopupButton.classList.add('hidden');
        }

        if (FAQbtn) {
            FAQbtn.classList.remove('hidden');
        }
        alreadyShownAtBottom = true;
        popupWasClosed = false;

        clearInterval(autoShowInterval);
    }

    function scrollToPopup() {
        if (popup) {
            const popupPosition = popup.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: popupPosition,
                behavior: 'smooth'
            });
        }
    }

    // Функция для фокусировки с задержкой
    function focusWithDelay() {
        // Фокусируемся на некорректном поле первой формы или на email
        const firstForm = forms[0];
        if (firstForm && firstForm.focusOnInvalidField) {
            setTimeout(() => {
                firstForm.focusOnInvalidField();
            }, 100); // Задержка 800ms для завершения скролла
        } else if (emailInput) {
            setTimeout(() => {
                emailInput.focus();
            }, 100);
        }
    }

    function startAutoShowTimer() {
        if (!popup) return;

        autoShowInterval = setInterval(() => {
            if (popup.classList.contains('hidden') && !cooldown) {
                showPopup();
                focusWithDelay(); // Фокус с задержкой для автоматического показа
            }
        }, 15000);
    }

    function restartAutoShowTimer() {
        clearInterval(autoShowInterval);
        startAutoShowTimer();
    }

    function checkScroll() {
        if (cooldown) return;

        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;

        if (isAtBottom) {
            if (popupWasClosed && !alreadyShownAtBottom) {
                showPopup();
                focusWithDelay(); // Фокус с задержкой для показа при скролле
            }
        } else {
            alreadyShownAtBottom = false;
        }
    }

    // Обработчики событий для попапа
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }

    if (topPopupButton) {
        topPopupButton.addEventListener('click', function () {
            showPopup();
            scrollToPopup(); // Плавный скролл
            setTimeout(focusWithDelay, 400); // Фокус после завершения скролла
        });
    }

    if (FAQbtn) {
        FAQbtn.addEventListener('click', function () {
            showPopup();
            scrollToPopup(); // Плавный скролл
            setTimeout(focusWithDelay, 100); // Фокус после завершения скролла
        });
    }


    if (bottomPopupButton) {
        bottomPopupButton.addEventListener('click', function () {
            showPopup();
            focusWithDelay(); // Фокус с задержкой
        });
    }

    // Обработчик для формы попапа
    const popupForm = document.querySelector('.popup-form');
    if (popupForm) {
        popupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Спасибо за подписку! На ваш email будут приходить эксклюзивные предложения.');
            if (emailInput) {
                emailInput.value = '';
            }
            hidePopup();
        });
    }

    // Запускаем все таймеры и слушатели
    window.addEventListener('scroll', checkScroll);
    startAutoShowTimer();
    checkScroll();
});

// вопрос ответ

document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.qust_text');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {



    document.querySelectorAll('.strage').forEach(el => {
        el.style.overflowX = 'hidden';
    });

    document.querySelectorAll('.wapper').forEach(el => {
        el.style.overflowX = 'hidden';
    });


    document.body.style.overflowX = 'hidden';

    // Добавляем класс wow
    document.querySelectorAll('.container_shablon .main_text').forEach(el => {
        el.classList.add('wow');
        if (!el.closest('.qust_otvet')) {
            el.classList.add('wow');
        }
    });


    document.querySelectorAll('.shablon .spisok_item').forEach(el => {
         if (el) {
            // Проверяем, не находится ли элемент внутри .qust_otvet
            const isInsideQustOtvet = el.closest('.FAQ_spisok');


            if (!isInsideQustOtvet) {
                el.classList.add('wow');
            }
        }
    });

    document.querySelectorAll('.qust_text').forEach(el => {
        el.classList.add('wow');
    });

    document.querySelectorAll('.shablon .opisanie_text').forEach(el => {
        // el.classList.add('wow');
        if (el) {
            // Проверяем, не находится ли элемент внутри .qust_otvet
            const isInsideQustOtvet = el.closest('.qust_otvet');


            if (!isInsideQustOtvet) {
                el.classList.add('wow');
            }
        }
    });

    document.querySelectorAll('.shablon_img').forEach(el => {
        el.classList.add('wow');
    });

    document.querySelectorAll('.main_text').forEach(el => {
        // Проверяем, не находится ли элемент внутри .qust или .otvet

    });



    // Обновляем WOW.js если он уже был инициализирован
    if (typeof WOW !== 'undefined') {
        const wow = new WOW();
        wow.init();
        wow.sync(); // Обновляем для новых элементов
    }
});