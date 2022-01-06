var calculateButton = document.getElementById("calculate-button");
var resultPopup = document.getElementById("result-popup")

resultPopup.style.display = "none";

calculateButton.onclick = function(event) {
    calculateButton.style.display = "none";
    resultPopup.style.display = "initial";
}

/* UI */
var InputBoxes = document.getElementsByClassName("input-box");
var InputFields = document.getElementsByTagName("input");

for (var i = 0; i < InputFields.length; i++) {
    const pass = i;
    InputFields[pass].addEventListener("focus", (event) => {
        InputBoxes[pass].style.border = "1px solid var(--primary-color)";
        InputBoxes[pass].style.boxShadow = "rgba(0, 0, 0, 0) 0px 0px 0px";
    });
    InputFields[pass].addEventListener("focusout", (event) => {
        InputBoxes[pass].style.border = "";
        InputBoxes[pass].style.boxShadow = "";
    });
}