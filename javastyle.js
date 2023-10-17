 

 
 const loader = document.querySelector(".content3");
    window.onload = function(){
      setTimeout(function(){
        loader.style.opacity = "0";
        setTimeout(function(){
          loader.style.display = "none";
        }, 500);
      },1500);
    }

    $(function(){
      $(document).on('touchstart', '.test', function(){
          alert("Clicked");
      });
  });

$('.services').click(function(e) {
    e.preventDefault();
});




var swiper = new Swiper('.blog-slider', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      }
    });




$("#search-icon").click(function() {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});









$(document).ready(function () {
  var getProductHeight = $(".product.active").height();

  $(".products").css({
    height: getProductHeight
  });

  function calcProductHeight() {
    getProductHeight = $(".product.active").height();

    $(".products").css({
      height: getProductHeight
    });
  }

  function animateContentColor() {
    var getProductColor = $(".product.active").attr("product-color");

    $("body").css({
      background: getProductColor
    });

    $(".title").css({
      color: getProductColor
    });

    $(".btn").css({
      color: getProductColor
    });
  }

  var productItem = $(".product"),
    productCurrentItem = productItem.filter(".active");

  $("#next").on("click", function (e) {
    e.preventDefault();

    var nextItem = productCurrentItem.next();

    productCurrentItem.removeClass("active");

    if (nextItem.length) {
      productCurrentItem = nextItem.addClass("active");
    } else {
      productCurrentItem = productItem.first().addClass("active");
    }

    calcProductHeight();
    animateContentColor();
  });

  $("#prev").on("click", function (e) {
    e.preventDefault();

    var prevItem = productCurrentItem.prev();

    productCurrentItem.removeClass("active");

    if (prevItem.length) {
      productCurrentItem = prevItem.addClass("active");
    } else {
      productCurrentItem = productItem.last().addClass("active");
    }

    calcProductHeight();
    animateContentColor();
  });

  // Ripple
  $("[ripple]").on("click", function (e) {
    var rippleDiv = $('<div class="ripple" />'),
      rippleSize = 60,
      rippleOffset = $(this).offset(),
      rippleY = e.pageY - rippleOffset.top,
      rippleX = e.pageX - rippleOffset.left,
      ripple = $(".ripple");

    rippleDiv
      .css({
        top: rippleY - rippleSize / 2,
        left: rippleX - rippleSize / 2,
        background: $(this).attr("ripple-color")
      })
      .appendTo($(this));

    window.setTimeout(function () {
      rippleDiv.remove();
    }, 1900);
  });
});

