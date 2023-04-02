$(document).ready(function () {
  [].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = function () {
      img.removeAttribute("data-src");
    };
  });
  $(".main-logo-description span").typed({
    strings: [
      "Разработка сайтов",
      "Графический дизайн",
      "Обслуживание сайтов",
      "Сайты под ключ",
      "Интернет магазины",
      "Доработка сайтов",
    ],
    typeSpeed: 0,
    backSpeed: 0,
    cursorChar: "|",
    loop: true,
  });

  let trigger = $("#hamburger"),
    isClosed = false;
  trigger.click(function () {
    if (isClosed == true) {
      trigger.removeClass("is-open");
      trigger.addClass("is-closed");
      isClosed = false;
    } else {
      trigger.removeClass("is-closed");
      trigger.addClass("is-open");
      isClosed = true;
    }
  });

  $(".banner-images-slider").slick({
    autoplay: false,
    slidesToShow: 1,
    arrows: true,
    fade: true,
    cssEase: "linear",
    focusOnSelect: true,
    pauseOnHover: true,
    draggable: true,
    speed: 300,
    asNavFor: ".banner-info-slider",
    appendArrows: ".slide-arrows",
    prevArrow: '<span class="slide-prev"></span>',
    nextArrow: '<span class="slide-next"></span>',
  });

  $(".banner-info-slider").slick({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    autoplay: false,
    asNavFor: ".banner-images-slider",
    adaptiveHeight: true,
    draggable: true,
    swipeToSlide: true,
    focusOnSelect: true,
    pauseOnHover: true,
  });

  $(function () {
    let percentTime;
    let tick;
    let time = 1;
    let progressBarIndex = 0;

    $(".progress-bar-container .progressBar").each(function (index) {
      let progress = "<div class='inProgress inProgress" + index + "'></div>";
      $(this).html(progress);
    });

    function startProgressbar() {
      resetProgressbar();
      percentTime = 0;
      tick = setInterval(interval, 5);
    }

    function interval() {
      if (
        $(
          '.banner-images-slider .slick-track div[data-slick-index="' +
            progressBarIndex +
            '"]'
        ).attr("aria-hidden") === "true"
      ) {
        progressBarIndex = $(
          '.banner-images-slider .slick-track div[aria-hidden="false"]'
        ).data("slickIndex");
        startProgressbar();
      } else {
        percentTime += 1 / (time + 10);
        $(".inProgress").parent().parent().removeClass("progress-bar-active");
        $(".inProgress" + progressBarIndex)
          .parent()
          .parent()
          .addClass("progress-bar-active");
        $(".inProgress" + progressBarIndex).css({
          width: percentTime + "%",
        });
        if (percentTime >= 100) {
          $(".banner-images-slider").slick("slickNext");
          progressBarIndex++;
          if (progressBarIndex > 2) {
            progressBarIndex = 0;
          }
          startProgressbar();
        }
      }
    }

    function resetProgressbar() {
      $(".inProgress").css({
        width: 0 + "%",
      });
      clearInterval(tick);
    }
    startProgressbar();

    $(".progress-bar-container .progress-bar-item").click(function () {
      clearInterval(tick);
      let goToThisIndex = $(this).find("span").data("slickIndex");
      $(".banner-images-slider").slick("slickGoTo", goToThisIndex, false);
      startProgressbar();
    });
  });

  $("#hamburger").on("click", function () {
    $("body").toggleClass("body-active");
    $(".panel-nav").toggleClass("active");
  });

  $(".nav-menu-list li a").on("click", function () {
    $(".panel-nav").removeClass("active");
    $("#hamburger").removeClass("is-open");
    $("#hamburger").addClass("is-closed");
    isClosed = false;
  });

  (function ($) {
    $(function () {
      $("ul.tabs__caption").each(function (i) {
        var storage = localStorage.getItem("tab" + i);
        if (storage) {
          $(this)
            .find("li")
            .removeClass("active")
            .eq(storage)
            .addClass("active")
            .closest("div.tabs")
            .find("div.tabs__content")
            .removeClass("active")
            .eq(storage)
            .addClass("active");
        }
      });

      $("ul.tabs__caption").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("div.tabs")
          .find("div.tabs__content")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active");
        var ulIndex = $("ul.tabs__caption").index(
          $(this).parents("ul.tabs__caption")
        );
        localStorage.removeItem("tab" + ulIndex);
        localStorage.setItem("tab" + ulIndex, $(this).index());
      });
    });
  })(jQuery);

  $(".tabs").each(function (i) {
    var storage = localStorage.getItem("tab" + i);
    if (storage) {
      $(this)
        .find("li")
        .removeClass("tabs-item--active")
        .eq(storage)
        .addClass("tabs-item--active")
        .closest(".portfolio-wrap")
        .find(".portfolio-items")
        .removeClass("portfolio-items--active")
        .eq(storage)
        .addClass("portfolio-items--active");
    }
  });

  $(".tabs").on("click", "li:not(.tabs-item--active)", function () {
    $(this)
      .addClass("tabs-item--active")
      .siblings()
      .removeClass("tabs-item--active")
      .closest(".portfolio-wrap")
      .find(".portfolio-items")
      .removeClass("portfolio-items--active")
      .eq($(this).index())
      .addClass("portfolio-items--active");
    var ulIndex = $(".tabs").index($(this).parents(".tabs"));
    localStorage.removeItem("tab" + ulIndex);
    localStorage.setItem("tab" + ulIndex, $(this).index());
  });

  $(".services-item-flip .services-item-button").on("click", function () {
    $(this).parents(".services-item-flip").addClass("active");
  });
  $(".services-item-back-link").on("click", function () {
    $(this).parents(".services-item-flip").removeClass("active");
  });

  $(function () {
    $("body").css("display", "none");
    $("body").fadeIn(1000);
    $('[data-type="page-tranisition"]').click(function (event) {
      event.preventDefault();
      linkLocation = this.href;
      $("body").fadeOut(1000, redirectPage);
    });
  });
  function redirectPage() {
    window.location = linkLocation;
  }

  $(function () {
    $(".button-modal").on("click", function () {
      let productTitle = $(this).parents(".services-item").data("name");
      console.log(productTitle);
      $("#order-modal").arcticmodal();
      $(".modal-title").text(productTitle);
    });
  });

  function showTooltip(targetItems, name) {
    $(targetItems).each(function (i) {
      let badgeDescription = $(this).attr("title");
      $("body").append(
        "<div class='" +
          name +
          "' id='" +
          name +
          i +
          "'>" +
          badgeDescription +
          "</div>"
      );

      var tooltip = $("#" + name + i);
      $(this)
        .removeAttr("title")
        .mouseenter(function () {
          tooltip.css({ opacity: 0.9, display: "none" }).fadeIn();
        })
        .mousemove(function (kmouse) {
          tooltip.css({ left: kmouse.pageX + 15, top: kmouse.pageY + 15 });
        })
        .mouseleave(function () {
          tooltip.fadeOut();
        });
    });
  }

  showTooltip(".services-item--tooltip", "tooltip");
});
