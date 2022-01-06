var calculateButton = document.getElementById("calculate-button");
var resultPopup = document.getElementById("result-popup")

resultPopup.style.display = "none";

calculateButton.onclick = function(event) {
    calculateButton.style.display = "none";
    resultPopup.style.display = "initial";
}