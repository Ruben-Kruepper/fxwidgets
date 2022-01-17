let buy = true;

let buyIndicator = document.getElementById("buy-indicator");
let sellIndicator = document.getElementById("sell-indicator");

let openPriceInput = document.getElementById("open-price-input");
let valuePerPipInput = document.getElementById("value-per-pip-input");
let lotsInput = document.getElementById("lots-input");

let stopInput = document.getElementById("stop-input");
let limitInput = document.getElementById("limit-input");

let calculateButton = document.getElementById("calculate-button");
let resultPopup = document.getElementById("result-popup");

resultPopup.style.display = "none";
resultPopup.getElementsByTagName("hr")[0].style.width = "0%";

buyIndicator.onclick = function (event) {
  sellIndicator.classList.remove("switch-indicator-active");
  buyIndicator.classList.add("switch-indicator-active");
  buy = true;
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
};

sellIndicator.onclick = function (event) {
  buyIndicator.classList.remove("switch-indicator-active");
  sellIndicator.classList.add("switch-indicator-active");
  buy = false;
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
};

openPriceInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

valuePerPipInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

lotsInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

stopInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

limitInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

calculateButton.onclick = function (event) {
  calculateResult();
};

function calculateResult() {
  calculateButton.style.display = "none";
  resultPopup.style.display = "initial";
  resultPopup.getElementsByTagName("hr")[0].style.width = "100%";
  const stop = parseFloat(stopInput.value) * 10000;
  const limit = parseFloat(limitInput.value) * 10000;
  const openPrice = parseFloat(openPriceInput.value) * 10000; //to pips
  const perPip = parseFloat(valuePerPipInput.value);
  const lots = parseFloat(lotsInput.value);

  let risk, reward;
  if (buy) {
    risk = (stop - openPrice) * perPip * lots;
    reward = (limit - openPrice) * perPip * lots;
  } else {
    risk = (openPrice - stop) * perPip * lots;
    reward = (openPrice - limit) * perPip * lots;
  }

  document.getElementById("max-loss").innerHTML = `${risk.toFixed(2)}`;
  document.getElementById("max-profit").innerHTML = `${reward.toFixed(2)}`;
}
