var uptrend = true;

var highInput = document.getElementById("high-input");
var lowInput = document.getElementById("low-input");
var customInput = document.getElementById("custom-input");

var uptrendIndicator = document.getElementById("uptrend-indicator");
var downtrendIndicator = document.getElementById("downtrend-indicator");

var calculateButton = document.getElementById("calculate-button");

var resultPopup = document.getElementById("result-popup");

resultPopup.style.display = "none";

highInput.addEventListener("input", async function (event) {
  updatedInputs();
});
lowInput.addEventListener("input", async function (event) {
  updatedInputs();
});
customInput.addEventListener("input", async function (event) {
  updatedInputs();
});

function updatedInputs() {
  if (parseFloat(highInput.value) <= parseFloat(lowInput.value)) {
    highInput.classList.add(["input-error"]);
    lowInput.classList.add(["input-error"]);
  } else {
    highInput.classList.remove(["input-error"]);
    lowInput.classList.remove(["input-error"]);
    if (calculateButton.style.display === "none") {
      calculateResults();
    }
  }
}

uptrendIndicator.onclick = function (event) {
  downtrendIndicator.classList.remove("switch-indicator-active");
  uptrendIndicator.classList.add("switch-indicator-active");
  uptrend = true;
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};

downtrendIndicator.onclick = function (event) {
  uptrendIndicator.classList.remove("switch-indicator-active");
  downtrendIndicator.classList.add("switch-indicator-active");
  uptrend = false;
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};

calculateButton.onclick = function (event) {
  calculateButton.getElementsByTagName("span")[0].style.display = "none";
  calculateResults();
};

function calculateResults() {
  if (NotANumber(highInput.value)) {
    highInput.value = 1;
  }
  if (NotANumber(lowInput.value)) {
    lowInput.value = 0;
  }
  const tables = resultPopup.getElementsByTagName("table");
  const retracementsTableItems = tables[0].getElementsByTagName("tr");
  const extensionsTableItems = tables[1].getElementsByTagName("tr");
  const high = parseFloat(highInput.value);
  const low = parseFloat(lowInput.value);
  for (var i = 0; i < retracementsTableItems.length; i++) {
    if (i !== 0) {
      var percentage =
        parseFloat(
          retracementsTableItems[i].getElementsByTagName("td")[0].innerHTML
        ) / 100;
      if (uptrend) {
        var value = high - (high - low) * percentage;
        retracementsTableItems[i].getElementsByTagName(
          "td"
        )[1].innerHTML = `<b>${value.toFixed(3)}</b>`;
      } else {
        var value = low + (high - low) * percentage;
        retracementsTableItems[i].getElementsByTagName(
          "td"
        )[1].innerHTML = `<b>${value.toFixed(3)}</b>`;
      }
    }
  }
  for (var i = 0; i < extensionsTableItems.length; i++) {
    if (i !== 0) {
      var percentage =
        parseFloat(
          extensionsTableItems[i].getElementsByTagName("td")[0].innerHTML
        ) / 100;
      if (uptrend) {
        var value = high + (high - low) * percentage;
        extensionsTableItems[i].getElementsByTagName(
          "td"
        )[1].innerHTML = `<b>${value.toFixed(3)}</b>`;
      } else {
        var value = low - (high - low) * percentage;
        extensionsTableItems[i].getElementsByTagName(
          "td"
        )[1].innerHTML = `<b>${value.toFixed(3)}</b>`;
      }
    }
  }
  if (calculateButton.style.display !== "none") {
    calculateButton.style.display = "none";
  }
  resultPopup.style.display = "flex";
}

function NotANumber(check) {
  return isNaN(parseFloat(check)) && isFinite(check);
}
