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
      lastIdx = $mySlides.length - 1;


  $(".slideshow-container").on('click', '.slide', function(e) {
    var currentIdx = +$('.active').attr('id') - 1;

    if (e.target.classList.contains("next"))  {
        $mySlides.stop().filter(":visible").fadeOut(300);
        $('.active').removeClass('active');
      if (currentIdx != lastIdx) {
        $('.mySlides').eq(currentIdx + 1).addClass('active').delay(300).fadeIn(300);
      } else {
        $('.mySlides').eq(0).addClass('active').delay(300).fadeIn(300);
      }
    } else if (e.target.classList.contains("prev")) {
        $mySlides.stop().filter(":visible").fadeOut(300);
        $('.active').removeClass('active');
        if (currentIdx != 0) {
          $('.mySlides').eq(currentIdx - 1).addClass('active').delay(300).fadeIn(300);
        } else {
          $('.mySlides').eq(lastIdx).addClass('active').delay(300).fadeIn(300);
        }
    }

  })
});

// 確認一下contain的用法
// 我這樣用不會太麻煩嗎？

// 參考w3c slide


      // $(function() {
      //   var $slideshow = $("#slideshow"),
      //       $nav = $slideshow.find("ul");


      //   $("main ul").on('click', 'a', function(e) {
      //     e.preventDefault();
      //     var $li = $(e.currentTarget).closest('li');
      //     var idx = $li.index();

      //     $mySlides.find("figure").stop().filter(":visible").fadeOut(300);
      //     $mySlides.find("figure").eq(idx).delay(300).fadeIn(300);
      //     $nav.find(".active").removeClass("active");
      //     $li.addClass("active");
      //   });
      // });

// 7.24問題：無法有效的產生fade-in/fade-out的效果
