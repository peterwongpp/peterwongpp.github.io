function setupFakeLink() {
  $("a.fake-link").on("click", function(e) {
    if (e.preventDefault) { e.preventDefault(); }
    return false;
  });
}
function setupTooltip() {
  $("a[rel='tooltip']").tooltip();
}

jQuery(function($) {
  setupFakeLink();
  setupTooltip();
});
