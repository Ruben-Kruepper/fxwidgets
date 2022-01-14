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

var buy = true;

var buyIndicator = document.getElementById("buy-indicator");
var sellIndicator = document.getElementById("sell-indicator");

var currencypairInput = document.getElementById("currency-pair-input");
var currencyInput = document.getElementById("currency-input");
var positionsizeInput = document.getElementById("position-size-input");

var openpriceInput = document.getElementById("open-price-input");
var stolotaInput = document.getElementById("stolota-input");
var taprotaInput = document.getElementById("taprota-input");

var calculateButton = document.getElementById("calculate-button");
var switchButton = document.getElementById("switch-button");
var resultPopup = document.getElementById("result-popup");
var selectionInputDropdown = document.getElementsByClassName("selection-input-dropdown")[0];
var dropdownLoader = document.getElementById("dropdown-loader");

resultPopup.style.display = "none";
resultPopup.getElementsByTagName("hr")[0].style.width = "0%";

buyIndicator.onclick = function(event) {
    sellIndicator.classList.remove("switch-indicator-active")
    buyIndicator.classList.add("switch-indicator-active")
    buy = true;
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
}

sellIndicator.onclick = function(event) {
    buyIndicator.classList.remove("switch-indicator-active")
    sellIndicator.classList.add("switch-indicator-active")
    buy = false;
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
}

currencypairInput.onclick = function(event) {
    setDropdown("pair");
}

currencyInput.onclick = function(event) {
    setDropdown("single");
}

openpriceInput.addEventListener("input", async function(event) {
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
});

positionsizeInput.addEventListener("input", async function(event) {
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
});

stolotaInput.addEventListener("input", async function(event) {
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
});

taprotaInput.addEventListener("input", async function(event) {
    if(calculateButton.style.display === "none"){
        calculateResult();
    }
});

calculateButton.onclick = function(event) {
    calculateResult();
}

function calculateResult(){
    calculateButton.style.display = "none";
    resultPopup.style.display = "initial";
    resultPopup.getElementsByTagName("hr")[0].style.width = "100%";
}

function setDropdown(input){
    while (SelectionInputDropdown.childNodes.length > 1) {
        SelectionInputDropdown.removeChild(SelectionInputDropdown.lastChild);
    }
    if(input == "pair"){
        for(var i = 0; i < conversions.length; i++) {
            const conversion = conversions[i];
            var dropdownItem = document.createElement("button");
            dropdownItem.innerHTML = conversion;
            dropdownItem.onclick = function(event) {
                if(selectionInputDropdown.getBoundingClientRect().x == currencypairInput.getBoundingClientRect().x){
                    currencypairInput.value = conversion;
                } else if(selectionInputDropdown.getBoundingClientRect().x == currencyInput.getBoundingClientRect().x){
                    currencyInput.value = conversion;
                }
                SelectionInputDropdown.style.display = "none";
                if(calculateButton.style.display === "none"){
                    calculateResult();
                }
            }
            selectionInputDropdown.append(dropdownItem);
        }
    } else if(input == "single"){
        var currentCurrencies = [];
        for(var i = 0; i < conversions.length; i++) {
            const currency = String(conversions[i]).split("/")[0];
            if(!currentCurrencies.includes(currency)){
                currentCurrencies.push(currency);
                var dropdownItem = document.createElement("button");
                dropdownItem.innerHTML = currency;
                dropdownItem.onclick = function(event) {
                    if(selectionInputDropdown.getBoundingClientRect().x == currencypairInput.getBoundingClientRect().x){
                        currencypairInput.value = currency;
                    } else if(selectionInputDropdown.getBoundingClientRect().x == currencyInput.getBoundingClientRect().x){
                        currencyInput.value = currency;
                    }
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