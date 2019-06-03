window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // зміна стилів при фіксованому хедері
  let header = document.querySelector('.header');
  window.addEventListener('scroll', function(e) {
    const classList = header.classList;
    if (window.scrollY > 100) {
      classList.add('header-white');
    } else {
      classList.remove('header-white');
    }
  });

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
      recallsBlock = document.querySelector('.recalls__blocks'),
      startTouch = 0,
      endTouch = 0,
      dist = 0,
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
  function activeSlide(n) {
    showSlides(slideIndex = n);
  }
  function plussSlides(n) {
    showSlides(slideIndex += n);
  }
  function moveSlide() {
    if (startTouch > endTouch || dist < 0) {
      plussSlides(1);
    } else if (startTouch < endTouch || dist > 0) {
      plussSlides(-1);
    }
  }
  if (window.innerWidth <= 768) {
    recallsBlock.addEventListener('touchstart', function (e) {
      let eventTouch = e.changedTouches[0];
      startTouch = parseInt(eventTouch.clientX);
      e.preventDefault();
    }, false)
    recallsBlock.addEventListener('touchmove', function (e) {
      let eventTouch = e.changedTouches[0];
      dist = parseInt(eventTouch.clientX) - startTouch;
      e.preventDefault()
    }, false)
    recallsBlock.addEventListener('touchend', function (e) {
      let eventTouch = e.changedTouches[0];
      endTouch = parseInt(eventTouch.clientX);
      moveSlide();
      e.preventDefault();
    }, false)

  };


});