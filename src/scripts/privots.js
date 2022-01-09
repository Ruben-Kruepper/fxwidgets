var method = "classic";

var highInput = document.getElementById("high-input");
var lowInput = document.getElementById("low-input");
var openInput = document.getElementById("open-input");
var closeInput = document.getElementById("close-input");

var classicIndicator = document.getElementById("classic-indicator");
var woodieIndicator = document.getElementById("woodie-indicator");
var camarillaIndicator = document.getElementById("camarilla-indicator");
var demarkIndicator = document.getElementById("demark-indicator");

var calculateButton = document.getElementById("calculate-button");

var resultPopup = document.getElementById("result-popup")

resultPopup.style.display = "none";

highInput.addEventListener("input", async function(event) {
    updatedInputs();
});
lowInput.addEventListener("input", async function(event) {
    updatedInputs();
});
openInput.addEventListener("input", async function(event) {
    updatedInputs();
});
closeInput.addEventListener("input", async function(event) {
    updatedInputs();
});

function updatedInputs(){
    if(calculateButton.style.display === "none"){
        calculateResults();
    }
}

classicIndicator.onclick = function(event) {
    classicIndicator.classList.add("switch-indicator-active");
    woodieIndicator.classList.remove("switch-indicator-active");
    camarillaIndicator.classList.remove("switch-indicator-active");
    demarkIndicator.classList.remove("switch-indicator-active");
    method = "classic";
    if(calculateButton.style.display === "none"){
        calculateResults();
    }
}
woodieIndicator.onclick = function(event) {
    classicIndicator.classList.remove("switch-indicator-active");
    woodieIndicator.classList.add("switch-indicator-active");
    camarillaIndicator.classList.remove("switch-indicator-active");
    demarkIndicator.classList.remove("switch-indicator-active");
    method = "woodie";
    if(calculateButton.style.display === "none"){
        calculateResults();
    }
}
camarillaIndicator.onclick = function(event) {
    classicIndicator.classList.remove("switch-indicator-active");
    woodieIndicator.classList.remove("switch-indicator-active");
    camarillaIndicator.classList.add("switch-indicator-active");
    demarkIndicator.classList.remove("switch-indicator-active");
    method = "camarilla";
    if(calculateButton.style.display === "none"){
        calculateResults();
    }
}
demarkIndicator.onclick = function(event) {
    classicIndicator.classList.remove("switch-indicator-active");
    woodieIndicator.classList.remove("switch-indicator-active");
    camarillaIndicator.classList.remove("switch-indicator-active");
    demarkIndicator.classList.add("switch-indicator-active");
    method = "demark";
    if(calculateButton.style.display === "none"){
        calculateResults();
    }
}

calculateButton.onclick = function(event) {
    calculateButton.style.display = "none";
    calculateResults();
}

function calculateResults(){
    if(NotANumber(highInput.value)){ highInput.value = 1; }
    if(NotANumber(lowInput.value)){ lowInput.value = 0; }
    if(NotANumber(openInput.value)){ openInput.value = 1; }
    if(NotANumber(closeInput.value)){ closeInput.value = 0; }
    const tableItems = resultPopup.getElementsByTagName("table")[0].getElementsByTagName("tr");
    const high = parseFloat(highInput.value);
    const low = parseFloat(lowInput.value);
    const open = parseFloat(openInput.value);
    const close = parseFloat(closeInput.value);
    const cp = (high + low + close) / 3;
    for(var i = 0; i < tableItems.length; i++) {
        var value = "-";
        // R4
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){

            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // R3
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // R2
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // R1
        if(i == 0){
            if(method === "classic"){
                
            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // PP
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // S1
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // S2
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // S3
        if(i == 0){
            if(method === "classic"){

            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        // S4
        if(i == 0){
            if(method === "classic"){
                
            }
            if(method === "woodie"){
    
            }
            if(method === "camarilla"){
    
            }
            if(method === "demark"){
    
            }
        }
        tableItems[i].getElementsByTagName("td")[0].innerHTML = `<b>${value}</b>`;
    }
    if(calculateButton.style.display !== "none"){
        calculateButton.style.display = "none";
    }
    resultPopup.style.display = "flex";
}

function NotANumber(check){
    return isNaN(parseFloat(check)) && isFinite(check);
}