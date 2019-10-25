$(document).ready(function(){
	$(".about-info__description").typed({
        strings: ["Web-разработчик / html-верстальщик\n разработчик cms wordpress / opencart, \nпрограммист php", "Занимаюсь веб разработкой более 4 лет и за это время выполнил более 30 успешных проектов"],
        typeSpeed: 10,
        backSpeed: 0,
        showCursor: false,
    });
    $('.about__icon-link--scroll').click(function() {
	    $('html, body').animate({
            scrollTop: $(".portfolio").offset().top-155
        }, 500);
	});
    $(window).load(function(){
        $ (".header").sticky({ topSpacing: 0, className: 'sticky' });
    });
    $('.nav__link').click( function(){ // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top-155 }, 500); // анимируем скроолинг к элементу scroll_el
              $(".nav__link").removeClass('nav__link--active');
              $(this).addClass('nav__link--active');
        }
        return false; // выключаем стандартное действие
    });
	$('.footer-menu__link').click( function(){ // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top-155 }, 500); // анимируем скроолинг к элементу scroll_el
        }
        return false; // выключаем стандартное действие
    });
    $('.tabs').each(function(i) {
        var storage = localStorage.getItem('tab' + i);
        if (storage) {
            $(this).find('li').removeClass('tabs__item--active').eq(storage).addClass('tabs__item--active')
                .closest('.portfolio__wrap').find('.portfolio__items').removeClass('portfolio__items--active').eq(storage).addClass('portfolio__items--active');
        }
    });

    $('.tabs').on('click', 'li:not(.tabs__item--active)', function() {
        $(this)
            .addClass('tabs__item--active').siblings().removeClass('tabs__item--active')
            .closest('.portfolio__wrap').find('.portfolio__items').removeClass('portfolio__items--active').eq($(this).index()).addClass('portfolio__items--active');
        var ulIndex = $('.tabs').index($(this).parents('.tabs'));
        localStorage.removeItem('tab' + ulIndex);
        localStorage.setItem('tab' + ulIndex, $(this).index());
    });
})
