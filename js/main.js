$(document).ready(function(){
  $(window).load(function() {
    if ($(window).width() > 1170) {
    var background = {}
  
    background.initializr = function (){
      
      var $this = this;
      //option
      $this.id = "about";
      $this.style = {bubbles_color:"#fedb37",stroke_width:0, stroke_color :"black"};
      $this.bubbles_number = 10;
      $this.speed = [1500,8000]; //milliseconds
      $this.max_bubbles_height = $this.height;
      $this.shape = false // 1 : circle | 2 : triangle | 3 : rect | false :random
      
      if($("#"+$this.id).lenght > 0){
        $("#"+$this.id).remove();
      }
      $this.object = $("<div style='z-inde:-1;margin:0;padding:0; overflow:hidden;position:absolute;bottom:0' id='"+$this.id+"'> </div>'").appendTo("body");
      
      $this.ww = $(window).width()
      $this.wh = $(window).height()
      $this.width = $this.object.width($this.ww);
      $this.height = $this.object.height($this.wh);
      
      $("body").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; background: "+$this.style.bubbles_color+"; position: absolute}</style>");
      
      for (i = 0; i < $this.bubbles_number; i++) {
          $this.generate_bubbles()
      }
    }
    background.generate_bubbles = function() {
      var $this = this;
      var base = $("<div class='shape_background'></div>");
      var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1,1.2));
      if(shape_type == 1) {
        var bolla = base.css({borderRadius: "10%"})
      }else if (shape_type == 2){
        var bolla = base.css({width:0, height:0, borderRadius: "10%", "border-style":"solid","border-width":"0 20px 39.3px 20px","border-color":"transparent transparent "+$this.style.bubbles_color+" transparent", background:"transparent"}); 
      }else{
        var bolla = base; 
      }    
      var rn_size = $this.rn(.8,1.2);
      bolla.css({"transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", top:$this.wh+100, left:$this.rn(-60, $this.ww+60)});        
      bolla.appendTo($this.object);
      bolla.transit({top: $this.rn($this.wh/2,$this.wh/2-60), "transform":"scale("+rn_size+") rotate("+$this.rn(-360,360)+"deg)", opacity: 0},$this.rn($this.speed[0],$this.speed[1]), function(){
        $(this).remove();
        $this.generate_bubbles();
      })
      }

      background.rn = function(from, to, arr) {
        if(arr){
                return Math.random() * (to - from + 1) + from;
        }else{
          return Math.floor(Math.random() * (to - from + 1) + from);
        }
          }
      background.initializr();
    }
});

$('.btn-toggle').click(function(){
  $('.header__panel').removeClass('header__panel--disable');
  $('.header__panel').toggleClass('header__panel--active');
  $('body').toggleClass('body-overflow');
});
$(document).on('click', function (e) {
  if (!$(e.target).closest(".header__wrap").length) {
    $('.header__panel').removeClass('header__panel--active');
    $('.header__panel').addClass('header__panel--disable');
    $('.btn-toggle').removeClass('btn-toggle--active');
    $('.btn-toggle').removeClass('is-active');
    $('body').removeClass('body-overflow');
  }
  e.stopPropagation();
});

(function() {
  "use strict";
  var toggles = document.querySelectorAll(".btn-toggle");
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };
  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }
})();

	$(".about-info__description").typed({
        strings: ["Web-разработчик / html-верстальщик\n разработчик cms wordpress / opencart, \nпрограммист php", "Занимаюсь веб разработкой более 6 лет и за это время выполнил более 60 успешных проектов"],
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
    $('.scroll-link').click( function(){ // ловим клик по ссылке с классом go_to
        var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top-155 }, 500); // анимируем скроолинг к элементу scroll_el
              $(".nav__link, .header-nav__link").removeClass('nav__link--active');
              $(this).addClass('nav__link--active');
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