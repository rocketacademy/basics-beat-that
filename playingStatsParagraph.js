const ID_HTML_PARAGRAPH_STATS = "paragraph-stats-round";

const HTML_G_PARAGRAPH_STATS_ROUND = document.createElement("paragraph");
HTML_G_PARAGRAPH_STATS_ROUND.setAttribute("id", ID_HTML_PARAGRAPH_STATS);

const HTML_G_PARAGRAPH_STATS_DIV = (document.createElement("div").innerHTML =
  "Round Stats");

GLOBAL_CONTAINER.appendChild(HTML_G_PARAGRAPH_STATS_ROUND);

const appendToParagraphStatisticsRound = function (htmlDomTable) {
  HTML_G_PARAGRAPH_STATS_ROUND.replaceChildren(
    wrapInDiv(HTML_G_PARAGRAPH_STATS_DIV, htmlDomTable)
  );
};
