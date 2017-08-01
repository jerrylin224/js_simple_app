$(function() {
  $("input[type='checkbox']").change(function(e) {
    var $this = $(this);
    var changedItemContent = $this.val();
    $("main li:contains(" + changedItemContent + ")").toggle();
  });
});