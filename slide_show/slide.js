// when click prev or next, trigger the click event
// capture the active figure, and get it's id
// when click the next button
// use switching active class to controll the slide
// - if it's id not equals to last index, slide to next
// - else if id equals to last index, slide to first
// when click the prev button
// - if it's id not equals to first index, slide to previous
// - else if id equals to first index, slide to last

$(function() {
  var $mySlides = $('.mySlides'),
      lastIdx = $mySlides.length - 1,
      currentIdx;

  $('#nextSlide').click(function() {
    next();
  });

  $('#prevSlide').click(function() {
    prev();
  })

  function fadeOutAndRemoveActiveClass() {
    $mySlides.stop().filter(":visible").fadeOut(300);
    $('.active').removeClass('active');
  }

  function next() {
    currentIdx = +$('.active').attr('id') - 1;

    fadeOutAndRemoveActiveClass()

    if (currentIdx != lastIdx) {
      $('.mySlides').eq(currentIdx + 1).addClass('active').delay(300).fadeIn(300);
    } else {
      $('.mySlides').eq(0).addClass('active').delay(300).fadeIn(300);
    }
  }

  function prev() {
    currentIdx = +$('.active').attr('id') - 1;

    fadeOutAndRemoveActiveClass()

    if (currentIdx != 0) {
        $('.mySlides').eq(currentIdx - 1).addClass('active').delay(300).fadeIn(300);
    } else {
      $('.mySlides').eq(lastIdx).addClass('active').delay(300).fadeIn(300);
    }
  }
});

// 重點是不要用active來控制display or none，單純用active來得到該element的id值
// 可以利用attr() 這個method得到id值 $('.active').attr('id')