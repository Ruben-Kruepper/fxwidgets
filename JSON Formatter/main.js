const original = require("./original.json");
var newList = [];

original.forEach(currency => {
    newList.push(currency.symbol);
});

console.log(JSON.stringify(newList));