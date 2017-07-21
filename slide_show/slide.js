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
  $(".slideshow-container").on('click', '.slide', function(e) {
    console.log(e.target.classList.contains("next"));
  })
});