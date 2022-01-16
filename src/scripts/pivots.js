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

var resultPopup = document.getElementById("result-popup");

resultPopup.style.display = "none";

highInput.addEventListener("input", async function (event) {
  updatedInputs();
});
lowInput.addEventListener("input", async function (event) {
  updatedInputs();
});
openInput.addEventListener("input", async function (event) {
  updatedInputs();
});
closeInput.addEventListener("input", async function (event) {
  updatedInputs();
});

function updatedInputs() {
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
}

classicIndicator.onclick = function (event) {
  classicIndicator.classList.add("switch-indicator-active");
  woodieIndicator.classList.remove("switch-indicator-active");
  camarillaIndicator.classList.remove("switch-indicator-active");
  demarkIndicator.classList.remove("switch-indicator-active");
  method = "classic";
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};
woodieIndicator.onclick = function (event) {
  classicIndicator.classList.remove("switch-indicator-active");
  woodieIndicator.classList.add("switch-indicator-active");
  camarillaIndicator.classList.remove("switch-indicator-active");
  demarkIndicator.classList.remove("switch-indicator-active");
  method = "woodie";
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};
camarillaIndicator.onclick = function (event) {
  classicIndicator.classList.remove("switch-indicator-active");
  woodieIndicator.classList.remove("switch-indicator-active");
  camarillaIndicator.classList.add("switch-indicator-active");
  demarkIndicator.classList.remove("switch-indicator-active");
  method = "camarilla";
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};
demarkIndicator.onclick = function (event) {
  classicIndicator.classList.remove("switch-indicator-active");
  woodieIndicator.classList.remove("switch-indicator-active");
  camarillaIndicator.classList.remove("switch-indicator-active");
  demarkIndicator.classList.add("switch-indicator-active");
  method = "demark";
  if (calculateButton.style.display === "none") {
    calculateResults();
  }
};

calculateButton.onclick = function (event) {
  calculateButton.style.display = "none";
  calculateResults();
};

function makeFormulas(h, l, o, c) {
  let result = {
    classic: {
      pp: function () {
        return (h + l + c) / 3;
      },
      r1: function () {
        return 2 * result.classic.pp() - l;
      },
      s1: function () {
        return 2 * result.classic.pp() - h;
      },
      r2: function () {
        return result.classic.pp() + h - l;
      },
      s2: function () {
        return result.classic.pp() - h + l;
      },
      r3: function () {
        return h + 2 * (result.classic.pp() - l);
      },
      s3: function () {
        return l - 2 * (h - result.classic.pp());
      },
    },
    woodie: {
      pp: function () {
        return (h + l + 2 * c) / 4;
      },
      r1: function () {
        return 2 * result.woodie.pp() - l;
      },
      r2: function () {
        return result.woodie.pp() + h - l;
      },
      s1: function () {
        return 2 * result.woodie.pp() - h;
      },
      s2: function () {
        return result.woodie.pp() - h + l;
      },
    },
    camarilla: {
      r4: function () {
        return c + (h - l) * (1.1 / 2);
      },
      r3: function () {
        return c + (h - l) * (1.1 / 4);
      },
      r2: function () {
        return c + (h - l) * (1.1 / 6);
      },
      r1: function () {
        return c + (h - l) * (1.1 / 12);
      },
      s1: function () {
        return c - (h - l) * (1.1 / 12);
      },
      s2: function () {
        return c - (h - l) * (1.1 / 6);
      },
      s3: function () {
        return c - (h - l) * (1.1 / 4);
      },
      s4: function () {
        return c - (h - l) * (1.1 / 2);
      },
    },
    demark: {
      x: function () {
        if (c < o) {
          return h + 2 * l + c;
        } else if (c > o) {
          return 2 * h + l + c;
        } else {
          return h + l + 2 * c;
        }
      },
      r1: function () {
        return result.demark.x() / 2 - l;
      },
      pp: function () {
        return result.demark.x() / 4;
      },
      s1: function () {
        return result.demark.x() / 2 - h;
      },
    },
  };
  return result;
}

const getFormula = (formulas, index, type) => {
  const map = {
    0: "r4",
    1: "r3",
    2: "r2",
    3: "r1",
    4: "pp",
    5: "s1",
    6: "s2",
    7: "s3",
    8: "s4",
  };
  const base = () => "-";
  return formulas[type][map[index]] || base;
};

function calculateResults() {
  if (NotANumber(highInput.value)) {
    highInput.value = 1;
  }
  if (NotANumber(lowInput.value)) {
    lowInput.value = 0;
  }
  if (NotANumber(openInput.value)) {
    openInput.value = 1;
  }
  if (NotANumber(closeInput.value)) {
    closeInput.value = 0;
  }
  const tableItems = resultPopup
    .getElementsByTagName("table")[0]
    .getElementsByTagName("tr");
  const high = parseFloat(highInput.value);
  const low = parseFloat(lowInput.value);
  const open = parseFloat(openInput.value);
  const close = parseFloat(closeInput.value);
  const formulas = makeFormulas(high, low, open, close);
  for (var i = 0; i < tableItems.length; i++) {
    const formula = getFormula(formulas, i, method);
    let value = formula();
    try {
      value = value.toFixed(4);
    } catch {}
    tableItems[i].getElementsByTagName("td")[0].innerHTML = `<b>${value}</b>`;
  }
  if (calculateButton.style.display !== "none") {
    calculateButton.style.display = "none";
  }
  resultPopup.style.display = "flex";
}

function NotANumber(check) {
  return isNaN(parseFloat(check)) && isFinite(check);
}
