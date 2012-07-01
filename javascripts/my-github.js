function getRepos(username, container) {
  $.getJSON("https://api.github.com/users/" + username + "/repos?sort=updated&callback=?", function(response) {
    var result = "";
    var len = response["data"].length;
    for (var i=0; i < len; i++) {
      var repo = response["data"][i];
      result += formatRepo(repo);
    }
    $(container).html(result);
    setupFakeLink();
    setupTooltip();
  });
}

function formatRepo(repo) {
  var result = "";

  result += "<div class='well'>";
  result += "<article id='" + repo["id"] + "' class='repo'>";
  result += "<header><h1>";
  result += "<img src='" + repo["owner"]["avatar_url"] + "'>";
  result += " <a href='" + repo["html_url"] + "'>" + repo["full_name"] + "</a>";
  result += "<small> - " + repo["language"] + "</small>";
  // handle forks from
  result += "</h1></header>";
  result += "<section class='body'>";
  result += "<dl class='meta'>";
  result += "<dt>Homepage</dt>";
  result += "<dd>" + repo["homepage"] + "</dd>";
  result += "<dt>Description</dt>";
  result += "<dd>" + repo["description"] + "</dd>";
  result += "</dl>";
  result += "</section>";
  result += "<footer>";
  result += "<span class='icon-eye-open'> <a href='#' class='fake-link' rel='tooltip' title='Watching'>" + repo["watchers"] + "</a></span>";
  result += "<span class='icon-paper-clip'> <a href='#' class='fake-link' rel='tooltip' title='Open Issues'>" + repo["open_issues"] + "</a></span>";
  result += "<span class='icon-sitemap'> <a href='#' class='fake-link' rel='tooltip' title='Forks'>" + repo["forks"] + '</a></span>';
  result += "</footer>";
  result += "</article>";
  result += "</div>";

  return result;
}

function getApiLimit(container) {
  $.getJSON("https://api.github.com/rate_limit?callback=?", function(response) {
    $(container + " span").html(response["data"]["rate"]["remaining"] + " / " + response["data"]["rate"]["limit"]);
  });
}
