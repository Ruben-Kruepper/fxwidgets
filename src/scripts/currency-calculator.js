var conversions;
fetch("http://localhost:3000/conversions.json")
  .then(response => response.json())
  .then(data => setConversions(data));

var currencyDetails;
fetch("http://localhost:3000/currency_details.json")
  .then(response => response.json())
  .then(data => setCurrencyDetails(data));

function setConversions(data){
    conversions = data;
}

function setCurrencyDetails(data){
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
var selectionInputDropdown = document.getElementsByClassName("selection-input-dropdown")[0];
var prefix = document.getElementsByClassName("prefix")[0];
var dropdownLoader = document.getElementById("dropdown-loader");

calculateButtonLoader.style.display = "none";
resultPopup.style.display = "none";
updateCurrencies()

async function updateCurrencies(){
    fromInput.value = from;
    toInput.value = to;
    // prefix.innerHTML = currencyDataPack.find(currency => currency.cc === from).symbol;

    if(typeof currentFactor !== "undefined"){
        currentFactor = undefined;
        switchButton.disabled = true;
        document.documentElement.style.setProperty("--result-text-color", "rgb(150, 150, 150)");
        await claculateResult();
        switchButton.disabled = false;
        document.documentElement.style.setProperty("--result-text-color", "black");
    }
}

switchButton.onclick = async function(event) {
    if(to !== ""){
        var tempTo = to;
        to = from;
        from = tempTo;
        await updateCurrencies();
    }
}

calculateButton.onclick = async function(event) {
    calculateButton.getElementsByTagName("span")[0].style.display = "none";
    calculateButtonLoader.style.display = "initial";
    await claculateResult();
}

amountInput.addEventListener("input", async function(event) {
    if(typeof currentFactor !== "undefined"){
        await claculateResult();
    }
});

async function claculateResult(){
    if(!amountInput.value || isNaN(amountInput.value)){
        amountInput.value = 1;
    }
    if(typeof currentFactor === "undefined"){
        await fetchAPI();
    }
    showResult();
}

async function fetchAPI() {
    const response = await fetch(`https://fxwidgets-data-proxy.azurewebsites.net/api/convert?symbol_from=${from}&symbol_to=${to}&amount=${amountInput.value}`);
    if(response.status === 200){
        const json = await response.json();
        singleFromValue = json[`price_1x_${from}`];
        singleToValue = json[`price_1x_${to}`]
        currentFactor = singleToValue;
    }
}

function showCalculateButton(){
    calculateButton.style.display = "initial";
    resultPopup.style.display = "none";
}

function showResult(){
    calculateButton.style.display = "none";
    resultPopup.style.display = "initial";

    document.getElementById("fromAmountIndicator").textContent = `${amountInput.value} ${from} =`;
    document.getElementById("resultAmountIndicator").textContent = `${parseFloat(amountInput.value * currentFactor).toFixed(5)} ${to}`;
    document.getElementById("singleFromIndicator").textContent = `1 ${from} = ${singleFromValue} ${to}`;
    document.getElementById("singleToIndicator").textContent = `1 ${to} = ${singleToValue} ${from}`;
}

fromInput.onclick = function(event) {
    setDropdown("from");
}

toInput.onclick = function(event) {
    setDropdown("to");
}

function setDropdown(input){
    while (SelectionInputDropdown.childNodes.length > 1) {
        SelectionInputDropdown.removeChild(SelectionInputDropdown.lastChild);
    }
    if(input == "from"){
        var currentCurrencies = [];
        for(var i = 0; i < conversions.length; i++) {
            const currency = String(conversions[i]).split("/")[0];
            if(!currentCurrencies.includes(currency)){
                currentCurrencies.push(currency);
                var dropdownItem = document.createElement("button");
                dropdownItem.innerHTML = currency;
                dropdownItem.onclick = function(event) {
                    from = currency;
                    to = "";
                    toInput.placeholder = "Select...";
                    updateCurrencies();
                    SelectionInputDropdown.style.display = "none";
                    if(calculateButton.style.display === "none"){
                        calculateResult();
                    }
                }
                selectionInputDropdown.append(dropdownItem);
            }
        }
    } else if(input == "to"){
        for(var i = 0; i < conversions.length; i++) {
            const currencyFrom = String(conversions[i]).split("/")[0];
            var currencyTo = String(conversions[i]).split("/")[1];
            if(currencyFrom === from){
                var dropdownItem = document.createElement("button");
                dropdownItem.innerHTML = currencyTo;
                dropdownItem.onclick = function(event) {
                    to = currencyTo;
                    updateCurrencies();
                    SelectionInputDropdown.style.display = "none";
                    if(calculateButton.style.display === "none"){
                        calculateResult();
                    }
                }
                selectionInputDropdown.append(dropdownItem);
            }
        }
    }
    dropdownLoader.style.display = "none";
}