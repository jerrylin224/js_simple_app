(function ($) {
// 這邊的$代表什麼？
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
  
  function listFilter(header, list) {
    var form = $("<form>").attr({"class":"filterform","action":"#"}),
        input = $("<input>").attr({"class":"filterinput","type":"text"});
    $(form).append(input).appendTo(header);
 // jQuery chain起來的時候代表什麼？
    $(input)
      .change( function () {
        var filter = $(this).val();
        if(filter) {
          $(list).find(".movieTitle:not(:Contains(" + filter + "))").parent().slideUp();
          $(list).find(".movieTitle:Contains(" + filter + ")").parent().slideDown();
        } else {
          $(list).find(".entry").slideDown();
        }
        return false;
      })
    .keyup( function () {
        $(this).change();
    });
  }
 
  $(function () {
    listFilter($("#header"), $("#list"));
  });
}(jQuery));
// 這邊的jQuery代表什麼？

// https://kilianvalkhof.com/2010/javascript/how-to-build-a-fast-simple-list-filter-with-jquery/
// http://blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/