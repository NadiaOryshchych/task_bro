'use strict';
  
(function() {
  const header = document.querySelector('.header');
  const slidesBg = document.querySelectorAll('.slider-bg__item');
  let currentSlide = 0;
  let slideIndex = 1;
  let startTouch = 0;
  let endTouch = 0;
  const sliderRecalls = document.querySelector('.recalls_inner');
  const slidesRecalls = document.querySelectorAll('.recalls__block');
  const dotsWrap = document.querySelector('.slider-dots');
  const dots = document.querySelectorAll('.dot');

  // зміна стилів при фіксованому хедері
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
    setTimeout(function moveSlides() {
      slidesBg[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % slidesBg.length;
      slidesBg[currentSlide].style.display = 'block';
      setTimeout(moveSlides, 5000);
    }, 5000);
  }

  // слайдер для recalls
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
        showSlides(slideIndex = i);
      }
    }
  });

  sliderRecalls.addEventListener('touchstart', function (e) {
    const eventTouch = e.changedTouches[0];
    startTouch = parseInt(eventTouch.clientX);
    e.preventDefault();
  }, false);
  
  sliderRecalls.addEventListener('touchend', function (e) {
    const eventTouch = e.changedTouches[0];
    endTouch = parseInt(eventTouch.clientX);
    if (startTouch > endTouch && (startTouch - endTouch) > 10 ) {
      showSlides(slideIndex += 1);
    } else if (startTouch < endTouch && (startTouch - endTouch) < -10) {
      showSlides(slideIndex += (-1));
    }
    e.preventDefault();
  }, false);

  if (window.innerWidth <= 768) {
    showSlides(slideIndex);
  }

}());
