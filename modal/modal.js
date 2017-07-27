$(function() {
  $('.container li > a').click(function(e) {
    e.preventDefault();

    var $e = $(this)
    $e.nextAll().fadeIn(400);

    $('.modal_layer, a.close').click(function() {
      e.preventDefault();

      $e.nextAll().fadeOut(400);      
    })
  })
})

// 重點：
// 1. 用nextAll()選取所有要顯示的element
// 2. 用fadeIn()就能達到顯示的效果，不用調整display，而且這樣也不會有動畫
// 3. css multiple selector。這邊選取多個會關閉modal的element，點擊後觸發使原先fadeIn的element fadeOut()