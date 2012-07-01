jQuery(function($) {
  $("a[rel='tooltip']").tooltip();
  $("a.fake-link").on("click", function(e) {
    if (e.preventDefault) { e.preventDefault(); }
    return false;
  });
});
