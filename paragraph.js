const ID_HTML_ROOT = "root-container";
const ID_HTML_SUBMIT_BUTTION = "submit-button";
const ID_HTML_INPUT_DESCRIPTION = "input-description";
const ID_HTML_INPUT_FIELD = "input-field";
const ID_HTML_OUTPUT_DESCRIPTION = "output-description";
const ID_HTML_PARAGRAPH_MAIN = "paragraph-main";
const CLASS_NAME_HTML_FLEX_DIV = "flex-div";

const HTML_G_PARAGRAPH = document.createElement("paragraph");
HTML_G_PARAGRAPH.setAttribute("id", ID_HTML_PARAGRAPH_MAIN);
const HTML_G_BUTTON = document.createElement("button");
HTML_G_BUTTON.setAttribute("id", ID_HTML_SUBMIT_BUTTION);
HTML_G_BUTTON.innerHTML = "Submit";

const HTML_G_INPUT_DESC = document.createElement("div");
HTML_G_INPUT_DESC.setAttribute("id", ID_HTML_INPUT_DESCRIPTION);

const HTML_G_INPUT_FIELD = document.createElement("input");
HTML_G_INPUT_FIELD.setAttribute("id", ID_HTML_INPUT_FIELD);
HTML_G_INPUT_FIELD.setAttribute("type", "text");

const HTML_G_OUTPUT_DESCRIPTION = document.createElement("div");
HTML_G_OUTPUT_DESCRIPTION.setAttribute("id", ID_HTML_OUTPUT_DESCRIPTION);

const GLOBAL_CONTAINER = document.querySelector(`#${ID_HTML_ROOT}`);

GLOBAL_CONTAINER.appendChild(HTML_G_PARAGRAPH);

const appendToParagraph = function (...htmlDoms) {
  console.log("replacing with" + htmlDoms);
  console.log(...htmlDoms);
  HTML_G_PARAGRAPH.replaceChildren(...htmlDoms);
};
