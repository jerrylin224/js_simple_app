$(function() {
  $("form").on("submit", function(e) {
    function addItem(item, quantity) {
      $("#grocery-list").append('<li>' + quantity + ' ' + item + '</li>')
    }
    var $form = $(this),
        item = $form.find("#item").val(),
        quantity = $form.find("#quantity").val() || 1;

    e.preventDefault();

    addItem(item, quantity);
  })

  $("form").on("click", function(e) {
    console.log(e.target);
  });
});