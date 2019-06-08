'use strict';
  
(function() {
  // зміна стилів при фіксованому хедері
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    const classList = header.classList;
    if (window.scrollY > 100) {
      classList.add('header_white');
    } else {
      classList.remove('header_white');
    }
  });

  // слайдер для main
  if (window.innerWidth > 768) {
    const slidesBg = document.querySelectorAll('.slider-bg__item');
    let currentSlide = 0;
    setTimeout(function moveSlides() {
      slidesBg[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % slidesBg.length;
      slidesBg[currentSlide].style.display = 'block';
      setTimeout(moveSlides, 5000);
    }, 5000);
  }

  // слайдер для recalls
  let slideIndex = 1;
  let startTouch = 0;
  let endTouch = 0;
  let dist = 0;
  const slidesRecalls = document.querySelectorAll('.recalls__block');
  const dotsWrap = document.querySelector('.slider-dots');
  const dots = document.querySelectorAll('.dot');

  function showSlides(n) {
    if (n > slidesRecalls.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slidesRecalls.length;
    }
    slidesRecalls.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot_active'));
    slidesRecalls[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot_active');
  }

  dotsWrap.addEventListener('click', function (e) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (e.target == dots[i - 1] && e.target.classList.contains('dot')) {
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

  for (let i = 0; i < slidesRecalls.length; i++) {
    slidesRecalls[i].addEventListener('touchstart', function (e) {
      const eventTouch = e.changedTouches[0];
      startTouch = parseInt(eventTouch.clientX);
      e.preventDefault();
    }, false);
    slidesRecalls[i].addEventListener('touchmove', function (e) {
      const eventTouch = e.changedTouches[0];
      dist = parseInt(eventTouch.clientX) - startTouch;
      e.preventDefault();
    }, false);
    slidesRecalls[i].addEventListener('touchend', function (e) {
      const eventTouch = e.changedTouches[0];
      endTouch = parseInt(eventTouch.clientX);
      moveSlide();
      e.preventDefault();
    }, false);
  }

  if (window.innerWidth <= 768) {
    showSlides(slideIndex);
  }

}());
