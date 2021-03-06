var conversions;
fetch("../static/conversions.json")
  .then((response) => response.json())
  .then((data) => setConversions(data));

var currencyDetails;
fetch("../static/currency_details.json")
  .then((response) => response.json())
  .then((data) => setCurrencyDetails(data));

function setConversions(data) {
  conversions = data;
}

function setCurrencyDetails(data) {
  currencyDetails = data;
}

var from = "USD";
var to = "EUR";

var currentFactor = undefined;
var singleFromValue = undefined;
var singleToValue = undefined;

var amountInput = document.getElementById("amount-input");
var fromInput = document.getElementById("from-input");
var toInput = document.getElementById("to-input");
var calculateButton = document.getElementById("calculate-button");
var calculateButtonLoader = document.getElementById("calculate-button-loader");
var switchButton = document.getElementById("switch-button");
var resultPopup = document.getElementById("result-popup");
var selectionInputDropdown = document.getElementsByClassName(
  "selection-input-dropdown"
)[0];
var prefix = document.getElementsByClassName("prefix")[0];
var dropdownLoader = document.getElementById("dropdown-loader");

calculateButtonLoader.style.display = "none";
resultPopup.style.display = "none";
updateCurrencies();

async function updateCurrencies() {
  fromInput.value = from;
  toInput.value = to;
  try {
    prefix.innerHTML = currencyDetails[from].symbol.split(",")[0];
  } catch {
    prefix.innerHTML = "$";
  }

  if (typeof currentFactor !== "undefined") {
    currentFactor = undefined;
    switchButton.disabled = true;
    document.documentElement.style.setProperty(
      "--result-text-color",
      "rgb(150, 150, 150)"
    );
    await calculateResult();
    switchButton.disabled = false;
    document.documentElement.style.setProperty("--result-text-color", "black");
  }
}

switchButton.onclick = async function (event) {
  if (to !== "") {
    var tempTo = to;
    to = from;
    from = tempTo;
    await updateCurrencies();
  }
};

calculateButton.onclick = async function (event) {
  calculateButton.getElementsByTagName("span")[0].style.display = "none";
  calculateButtonLoader.style.display = "initial";
  await calculateResult();
};

amountInput.addEventListener("input", async function (event) {
  if (typeof currentFactor !== "undefined") {
    await calculateResult();
  }
});

async function calculateResult() {
  if (!amountInput.value || isNaN(amountInput.value)) {
    amountInput.value = 1;
  }
  if (typeof currentFactor === "undefined") {
    await fetchAPI();
  }
  showResult();
}

async function fetchAPI() {
  const response = await fetch(
    `https://fxwidgets-data-proxy.azurewebsites.net/api/convert?symbol_from=${from}&symbol_to=${to}&amount=${amountInput.value}`
  );
  if (response.status === 200) {
    const json = await response.json();
    singleFromValue = json[`price_1x_${from}`];
    singleToValue = json[`price_1x_${to}`];
    currentFactor = singleToValue;
  }
}

function showCalculateButton() {
  calculateButton.style.display = "initial";
  resultPopup.style.display = "none";
}

function showResult() {
  calculateButton.style.display = "none";
  resultPopup.style.display = "initial";

  document.getElementById(
    "fromAmountIndicator"
  ).textContent = `${amountInput.value} ${from} =`;
  document.getElementById("resultAmountIndicator").textContent = `${parseFloat(
    amountInput.value * currentFactor
  ).toFixed(4)} ${to}`;
  document.getElementById(
    "singleFromIndicator"
  ).textContent = `1 ${from} = ${singleFromValue} ${to}`;
  document.getElementById(
    "singleToIndicator"
  ).textContent = `1 ${to} = ${singleToValue} ${from}`;
}

fromInput.onclick = function (event) {
  setDropdown("from");
};

toInput.onclick = function (event) {
  setDropdown("to");
};

function setDropdown(input) {
  while (SelectionInputDropdown.childNodes.length > 1) {
    SelectionInputDropdown.removeChild(SelectionInputDropdown.lastChild);
  }
  if (input == "from") {
    var currentCurrencies = [];
    for (var i = 0; i < conversions.length; i++) {
      const currencies = String(conversions[i]).split("/");
      if (!currentCurrencies.includes(currencies[0])) {
        currentCurrencies.push(currencies[0]);
        var dropdownItem = document.createElement("button");
        dropdownItem.innerHTML = currencies[0];
        dropdownItem.onclick = function (event) {
          from = currencies[0];
          to = currencies[1];
          updateCurrencies();
          SelectionInputDropdown.style.display = "none";
        };
        selectionInputDropdown.append(dropdownItem);
      }
    }
  } else if (input == "to") {
    var currentCurrencies = [];
    for (var i = 0; i < conversions.length; i++) {
      const currencies = String(conversions[i]).split("/");
      if (currencies[0] === from) {
        currentCurrencies.push(currencies[1]);
        var dropdownItem = document.createElement("button");
        dropdownItem.innerHTML = currencies[1];
        dropdownItem.onclick = function (event) {
          to = currencies[1];
          updateCurrencies();
          SelectionInputDropdown.style.display = "none";
        };
        selectionInputDropdown.append(dropdownItem);
      }
    }
  }
  dropdownLoader.style.display = "none";
}
