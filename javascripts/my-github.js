var mainContent = "#repos";

function getApiLimit(container) {
  $.getJSON("https://api.github.com/rate_limit?callback=?", function(response) {
    $(container + " span").html(response["data"]["rate"]["remaining"] + " / " + response["data"]["rate"]["limit"]);
  });
}

function getRepos(username) {
  $.getJSON("https://api.github.com/users/" + username + "/repos?sort=updated&callback=?", function(response) {
    parseForMainContent(response["data"]);
    postProcesses();
  });
}

function parseForMainContent(repos) {
  var result = "";
  var repo;
  var len = repos.length;
  for (var i=0; i<len; i++) {
    repo = repos[i];
    result += "<div class='well'>";
    result += "<article id='" + repo["id"] + "' class='repo'>";
    result += "<header><h1>";
    result += "<img src='" + repo["owner"]["avatar_url"] + "'>";
    result += " <a href='" + repo["html_url"] + "'>" + repo["name"] + "</a>";
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
  }
  $(mainContent).append(result);
}
