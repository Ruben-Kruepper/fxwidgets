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
var resultPopup = document.getElementById("result-popup")

async function updateCurrencies(){
    fromInput.value = from;
    toInput.value = to;

    if(typeof currentFactor !== "undefined"){
        currentFactor = undefined;
        switchButton.disabled = true;
        document.documentElement.style.setProperty("--result-text-color", "rgb(150, 150, 150)");
        await claculateResult();
        switchButton.disabled = false;
        document.documentElement.style.setProperty("--result-text-color", "black");
    }
}

updateCurrencies();
calculateButtonLoader.style.display = "none";
resultPopup.style.display = "none";

switchButton.onclick = async function(event) {
    var tempTo = to;
    to = from;
    from = tempTo;
    updateCurrencies();
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