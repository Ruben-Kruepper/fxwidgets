let buy = true;

let buyIndicator = document.getElementById("buy-indicator");
let sellIndicator = document.getElementById("sell-indicator");

let openPriceInput = document.getElementById("open-price-input");
let valuePerPipInput = document.getElementById("value-per-pip-input");
let lotsInput = document.getElementById("lots-input");

let toRiskInput = document.getElementById("to-risk-input");
let toGainInput = document.getElementById("to-gain-input");

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

toRiskInput.addEventListener("input", async function (event) {
  if (calculateButton.style.display === "none") {
    calculateResult();
  }
});

toGainInput.addEventListener("input", async function (event) {
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
  const toRisk = parseFloat(toRiskInput.value);
  const toGain = parseFloat(toGainInput.value);
  const openPrice = parseFloat(openPriceInput.value) * 10000; //to pips
  const perPip = parseFloat(valuePerPipInput.value);
  const lots = parseFloat(lotsInput.value);
  const pipsToRisk = toRisk / (perPip * lots);
  const stopLossAt = buy ? openPrice - pipsToRisk : openPrice + pipsToRisk;
  document.getElementById("stop-loss-at").innerHTML = (
    stopLossAt / 10000
  ).toFixed(4);
  const pipsToProfit = toGain / (perPip * lots);
  const takeProfitAt = buy
    ? openPrice + pipsToProfit
    : openPrice - pipsToProfit;
  document.getElementById("take-profit-at").innerHTML = (
    takeProfitAt / 10000
  ).toFixed(4);
  document.getElementById("stop-loss-pips").innerHTML = Math.round(pipsToRisk);
  document.getElementById("take-profit-pips").innerHTML =
    Math.round(pipsToProfit);
}
