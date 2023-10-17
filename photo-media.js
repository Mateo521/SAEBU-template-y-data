
var monkeyList = new List('test-list', {
  valueNames: ['name'],
  page: 2,
  pagination: true
});






$(document).ready(function() {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 4; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: true,
    autoplay: true,
    dots: true,
    loop: true,
    responsiveRefreshRate : 200,
    navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : slidesPerPage,
    dots: true,
    nav: true,
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;

    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);

    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }

    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});









const sectionsContainer = document.querySelector('.page-sections');
const sections = document.querySelectorAll('.page-section');
const nav = document.querySelector('.nav-sections');

const menu = nav.querySelector('.menu');

const links = nav.querySelectorAll('.menu-item-link');

const activeLine = nav.querySelector('.active-line');

const sectionOffset = nav.offsetHeight + 24;
const activeClass = 'active';
let activeIndex = 0;
let isScrolling = true;
let userScroll = true;

const setActiveClass = () => {
  links[activeIndex].classList.add(activeClass);
};

const removeActiveClass = () => {
  links[activeIndex].classList.remove(activeClass);
};

const moveActiveLine = () => {
  const link = links[activeIndex];
  const linkX = link.getBoundingClientRect().x;
  const menuX = menu.getBoundingClientRect().x;

  activeLine.style.transform = `translateX(${(menu.scrollLeft - menuX) + linkX}px)`;
  activeLine.style.width = `${link.offsetWidth}px`;
}

const setMenuLeftPosition = position => {
  menu.scrollTo({
    left: position,
    behavior: 'smooth',
  });
};

const checkMenuOverflow = () => {
  const activeLink = links[activeIndex].getBoundingClientRect();
  const offset = 30;

  if (Math.floor(activeLink.right) > window.innerWidth) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.right - window.innerWidth + offset);
  } else if (activeLink.left < 0) {
    setMenuLeftPosition(menu.scrollLeft + activeLink.left - offset)
  }
}

const handleActiveLinkUpdate = current => {
  removeActiveClass();
  activeIndex = current;
  checkMenuOverflow();
  setActiveClass();
  moveActiveLine();
};

const init = () => {
  moveActiveLine(links[0]);
  document.documentElement.style.setProperty('--section-offset', sectionOffset);
}

links.forEach((link, index) => link.addEventListener('click', () => {
  userScroll = false;
  handleActiveLinkUpdate(index);
}))

window.addEventListener("scroll", () => {
  const currentIndex = sectionsContainer.getBoundingClientRect().top < 0
    ? (sections.length - 1) - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - sectionOffset * 2)
    : 0;

  if (userScroll && activeIndex !== currentIndex) {
    handleActiveLinkUpdate(currentIndex);
  } else {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => userScroll = true, 100);
  }
});

$(".standard").click(function(){
  $(".version").removeClass("micro floating bordered shadows rounded highlight-bar");
  $(".btn").removeClass("on");
  moveActiveLine(links[0]);
});
$(".micro").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("micro");
});
$(".floating").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("floating");
});
$(".bordered").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("bordered");
});
$(".shadows").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("shadows");
});
$(".rounded").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("rounded");
});
$(".highlight-bar").click(function(){
  $(this).toggleClass("on");
  $(".standard").removeClass("on");
  $(".version").toggleClass("highlight-bar");
  moveActiveLine(links[0]);
});

init();








