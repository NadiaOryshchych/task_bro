window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // зміна стилів при фіксованому хедері
  let header = document.querySelector('.header');
  window.addEventListener('scroll', function(e) {
    const classList = header.classList;
    if (window.scrollY > 150) {
      classList.add('header-white');
    } else {
      classList.remove('header-white');
    }
  });
  // let elem = document.querySelector('.main');
  // let a = window.getComputedStyle(elem).height; // краще не брати цей метод
  // let b = elem.offsetHeight;
  // let c = elem.getBoundingClientRect().height;
  // let d = elem.getBoundingClientRect();
  // let g = window.pageOffset;

  // слайдер для main
  let slidesMain = document.querySelectorAll('.main__slider__item');
  let currentSlide = 0;
  if (window.innerWidth > 768) {
    let slider = setTimeout(function moveSlides() {
      slidesMain[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % slidesMain.length;
      slidesMain[currentSlide].style.display = 'block';
      slider = setTimeout(moveSlides, 5000);
    }, 5000);
  }
  
  // слайдер для recalls
  let slideIndex = 1,
      slidesRecalls = document.querySelectorAll('.recalls__block'),
      dotsWrap = document.querySelector('.slider-dots'),
      dots = document.querySelectorAll('.dot');
  if (window.innerWidth <= 768) {
    dots.forEach((item) => item.style.display = 'inline-block');
    showSlides(slideIndex);
  }
  function showSlides(n) {
    if (n > slidesRecalls.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slidesRecalls.length;
    }
    slidesRecalls.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));
    slidesRecalls[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }
  dotsWrap.addEventListener('click', function (e) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target.classList.contains('dot') && e.target == dots[i - 1]) {
        activeSlide(i);
      }
    }
  });
  // prev.addEventListener('click', function () {
  //   plussSlides(-1);
  // });
  // next.addEventListener('click', function () {
  //   plussSlides(1);
  // });
  function activeSlide(n) {
    showSlides(slideIndex = n);
  }
  function plussSlides(n) {
    showSlides(slideIndex += n);
  }


});