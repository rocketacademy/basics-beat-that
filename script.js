var button = document.querySelector("#submit-button");
button.addEventListener("click", function () {
  var input = document.querySelector("#input-field");
  var result = main(input.value);
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  input.value = "";
});

var main = function (input) {
  var myOutputValue = 'hello world';
  return myOutputValue;
};
