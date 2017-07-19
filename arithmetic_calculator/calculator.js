$(function() {
  var $submit = $("input[type=submit]");

  $("form").on('submit', function(e) {
    var firstNumber = $('#first-number').val(),
        secondNumber = $('#second-number').val(),
        operator = $('#operator').val();

    e.preventDefault();
    $("#result").text(eval(firstNumber + operator + secondNumber));
  });
});