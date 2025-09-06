var $page = $('html, body');
$('a[href*="#"]').click(function () {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
    return false;
});

$(function () {
    // меню
    const menubtn = document.querySelector('.menu_btn');
    const menu = document.querySelector('.menu_nav');
    const logo_top = document.querySelector('.logo_top');
    const menu_links = document.querySelectorAll('.menu_link');
    // menu_item

    menubtn.addEventListener('click', () => {
        menu.classList.toggle('open')
        if (window.innerWidth > 891) {
            logo_top.classList.toggle('logo_open')
        }
    })

    menu_links.forEach(menu_link => {
        menu_link.addEventListener('click', () => {
            menu.classList.remove('open')
            if (window.innerWidth > 891) {
                logo_top.classList.remove('logo_open')
            }
        });
    });


 
});


document.addEventListener('DOMContentLoaded', function () {
    // Год основания компании
    const foundationYear = 2017;

    // Получаем текущую дату
    const currentDate = new Date();

    // Вычисляем возраст компании
    let companyAge = currentDate.getFullYear() - foundationYear;

    // Корректируем возраст, если день рождения компании еще не наступил в текущем году
    // Для простоты считаем, что компания основана 1 января
    // Если нужна точность до дня, можно добавить проверку месяца и дня

    // Обновляем элемент с возрастом компании
    const ageElement = document.getElementById('companyAge');
    ageElement.textContent = companyAge;

    // Формируем правильное окончание для слова "год"
    const yearsTextElement = document.getElementById('yearsText');
    yearsTextElement.textContent = getYearsText(companyAge);
});

// Функция для склонения слова "год" в зависимости от числа


// анимация подсчета цифр о компании 
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const duration = 3000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));

    // Переменные для хранения состояния анимации
    let animationStarted = false;
    let animationIntervals = [];

    // Вычисляем количество лет компании
    function calculateYears() {
        const foundedYearElement = document.querySelector('.founded-year');
        const foundedYear = parseInt(foundedYearElement.textContent);
        const currentYear = new Date().getFullYear();
        return currentYear - foundedYear;
    }

    // Функция сброса счетчиков
    function resetCounters() {
        counters.forEach(counter => {
            counter.innerText = '0';
        });
        document.querySelector('.loading-bar').style.width = '0';
    }

    // Функция для запуска анимации счетчиков
    function startCountersAnimation() {
        // Останавливаем предыдущие анимации, если они есть
        stopAnimation();

        // Сбрасываем счетчики
        resetCounters();

        // Устанавливаем вычисленное значение как data-target для первого счетчика
        document.getElementById('years-counter').setAttribute('data-target', calculateYears());

        // Запускаем анимацию полосы загрузки


        // Запускаем анимацию каждого счетчика
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

            // Задержка перед началом анимации для лучшего визуального эффекта
            const timeoutId = setTimeout(() => {
                animationIntervals.push(requestAnimationFrame(updateCounter));
            }, 0);

            animationIntervals.push(timeoutId);
        });

        animationStarted = true;
    }

    // Функция остановки анимации
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

    // Улучшенная функция проверки видимости элемента
    function isElementPartiallyInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
        const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView);
    }

    // Запуск анимации при загрузке, если блок виден
    const countersSection = document.getElementById('about');

    if (isElementPartiallyInViewport(countersSection)) {
        startCountersAnimation();
    }

    // Запуск анимации при скролле
    window.addEventListener('scroll', function () {
        if (isElementPartiallyInViewport(countersSection) && !animationStarted) {
            startCountersAnimation();
        }
    });

    // Плавная прокрутка для кнопки и запуск анимации
    document.getElementById('main-button').addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 20,
            behavior: 'smooth'
        });

        // Запускаем анимацию после прокрутки
        setTimeout(() => {
            startCountersAnimation();
        }, 1000);
    });

    // Кнопка для повторного запуска анимации
    document.getElementById('reset-button').addEventListener('click', function () {
        startCountersAnimation();
    });

    // Дополнительная проверка через секунду после загрузки на всякий случай
    setTimeout(() => {
        if (!animationStarted && isElementPartiallyInViewport(countersSection)) {
            startCountersAnimation();
        }
    }, 1000);
});