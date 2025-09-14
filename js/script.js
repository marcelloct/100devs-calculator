// Default Variables
let currentInput = "";
let previousInput = "";
let operator = null;

const display = document.querySelector("#display");

function updateDisplay(value) {
  if (value !== undefined) {
    display.textContent = value;
  } else if (currentInput !== "") {
    display.textContent = currentInput;
  } else if (previousInput !== "") {
    display.textContent = previousInput;
  } else {
    display.textContent = "0";
  }
}

function handleNumber(num) {
  currentInput += num;
  updateDisplay();
}

function handleOperator(op) {
  if (currentInput === "" && previousInput === "") return;

  if (previousInput && operator && currentInput) {
    calculate(); // calculate() leaves result in currentInput (or "Error")
    if (currentInput === "Error") {
      // abort chaining on error
      previousInput = "";
      operator = null;
      return;
    }
    previousInput = currentInput;
  } else if (currentInput) {
    previousInput = currentInput;
  }
  currentInput = "";
  operator = op;
}

function calculate() {
  if (!previousInput || !operator || !currentInput) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
  }

  currentInput = String(result);
  previousInput = "";
  operator = null;
  updateDisplay();
}

function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

function backspace() {
  if (currentInput.length > 0) {
    currentInput = currentInput.toString().slice(0, -1);
  }
  updateDisplay();
}

function addDecimal() {
  if (!currentInput.includes(".")) {
    currentInput = currentInput === "" ? "0." : currentInput + ".";
  }
  updateDisplay();
}

function percentage() {
  if (!currentInput) return;

  currentInput = String(currentInput / 100);
  updateDisplay();
}

function fraction() {
  if (!currentInput) return;

  currentInput = String(1 / currentInput);
  updateDisplay();
}

function exponent() {
  if (!currentInput) return;

  currentInput = String(Math.pow(currentInput, 2));
  updateDisplay();
}

function square() {
  if (!currentInput) return;

  currentInput = String(Math.sqrt(currentInput));
  updateDisplay();
}

function convertToNegative() {
  if (currentInput !== 0 && currentInput === currentInput) {
    currentInput = String(-currentInput);
    updateDisplay();
  }
}

// Events
document.querySelectorAll("[data-num]").forEach((btn) => {
  btn.addEventListener("click", () => handleNumber(btn.dataset.num));
});

document.querySelectorAll("[data-op]").forEach((btn) => {
  btn.addEventListener("click", () => handleOperator(btn.dataset.op));
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearAll);
document.getElementById("CE").addEventListener("click", clearAll);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("decimal").addEventListener("click", addDecimal);
document.getElementById("percentage").addEventListener("click", percentage);
document.getElementById("fraction").addEventListener("click", percentage);
document.getElementById("square").addEventListener("click", square);
document.getElementById("exponent").addEventListener("click", exponent);
document.getElementById("pos-neg").addEventListener("click", convertToNegative);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    handleNumber(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clearAll();
  } else if (e.key === ".") {
    addDecimal();
  }
});

// Initialize
updateDisplay("0");
