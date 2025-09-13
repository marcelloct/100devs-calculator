const display = document.querySelector("#display");
const typing = document.querySelector("#typing");
display.value = 0;

let currentInput = ""; // number being typed
let previousInput = ""; // number stored before operator
let operator = null; // which operator is active (+, -, *, /)

// Get an array with the buttons inside div#button
const buttons = document.querySelector("#buttons").children;

// appends digits to currentInput.
function handleNumber(num) {
  return Number((currentInput += num));
  console.log(currentInput);
}

// stores currentInput into previousInput, saves op, clears currentInput.
function handleOperator(op) {
  // Chaining Operations
  if (previousInput != "" && operator != null) {
    previousInput = calculate();
    console.log(previousInput);
    currentInput = previousInput;
    updateDisplays();
  }
  typing.value = currentInput + op;
  previousInput = currentInput;
  operator = op;
  currentInput = "";

  console.log(previousInput, operator, currentInput);
}

function calculate() {
  let result;
  switch (operator) {
    case "x":
      return (result = previousInput * currentInput);
      console.log(currentInput);
      break;
    case "÷":
      return (result =
        currentInput !== 0 ? previousInput / currentInput : "Error"); // prevent division by zero
      console.log(result);
      break;
    case "-":
      return (result = previousInput - currentInput);
      console.log(result);
      break;
    case "+":
      return (result = previousInput + currentInput);
      console.log(result);
      break;
    default:
      return (display.value = currentInput);
      console.log("error");
  }
  // console.log(+(previousInput + operator + currentInput));
}

function updateDisplays() {
  display.value = currentInput;
  typing.value = previousInput;
}

function clear() {
  currentInput = 0;
  previousInput = "";
  operator = null;
}

// Get the id of each button
for (const child of buttons) {
  let buttonID = child.id;
  let buttonValue = child.innerText;
  // console.log(child.tagName.id);
  child.addEventListener("click", function () {
    // if (buttonValue >= 0 || buttonValue <= 9) {
    //   display.value += buttonValue;
    // }
    ////////////////////////////////////////////////////
    if (!isNaN(buttonValue)) {
      currentInput = handleNumber(buttonValue);
      updateDisplays();
    }

    // Handling with non numeric buttons
    if (
      buttonValue === "-" ||
      buttonValue === "+" ||
      buttonValue === "x" ||
      buttonValue === "÷"
    ) {
      typing.value = currentInput;
      handleOperator(buttonValue);
    } else if (buttonValue === "%") {
      currentInput = currentInput / 100;
      updateDisplays();
    } else if (buttonValue === "²√x") {
      currentInput = Math.sqrt(currentInput);
      updateDisplays();
    } else if (buttonValue === "x²") {
      currentInput = Math.pow(currentInput, 2);
      updateDisplays();
    } else if (buttonValue === "1/x") {
      currentInput = 1 / currentInput;
      updateDisplays();
    } else if (buttonValue === "C") {
      clear();
      updateDisplays();
    } else if (buttonValue === "=") {
      currentInput = calculate();
      updateDisplays();
      operator = null;
      previousInput = "";

      // display.typing += previousInput;
      // display.value = currentInput;
    } else if (buttonID === "erase" && currentInput != 0) {
      currentInput = currentInput.toString().slice(0, -1);
      updateDisplays();
      console.log(display.value);
      if (currentInput == "") {
        display.value = 0;
      }
    } else if (buttonID === "pos-neg") {
      if (display.value != 0 && display.value == display.value) {
        currentInput = -currentInput;
        updateDisplays();
      }
    } else if (buttonValue === ".") {
      currentInput += ".";
      updateDisplays();
    }
  });
}

///////////////////////////////////////////////////////
// //A+B, A*B, A-B, A/B
// let A = 0;
// let operator = null;
// let B = null;

// function clearAll() {
//   A = 0;
//   operator = null;
//   B = null;
// }

// for (let i = 0; i < buttonValues.length; i++) {

//   // process button clicks
//   button.addEventListener("click", function () {
//     if (rightSymbols.includes(value)) {
//       if (value === "=") {
//         if (A != null) {
//           B = display.value;
//           let numA = Number(A);
//           let numB = Number(B);

//           if (operator === "/") {
//             display.value = numA / numB;
//             if (display.value === "Infinity") {
//               display.value = "Not possible divide by zero";
//             }
//           } else if (operator === "*") {
//             display.value = numA * numB;
//           } else if (operator === "+") {
//             display.value = numA + numB;
//           } else if (operator === "-") {
//             display.value = numA - numB;
//           }
//           clearAll();
//         }
//       } else {
//         operator = value;
//         A = display.value;
//         display.value = "";
//       }
//     }  else {
//       // numbers or .
//       if (value === ".") {
//         if (display.value != "" && !display.value.includes(value)) {
//           display.value += value;
//         }
//       } else if (display.value === "0") {
//         display.value = value;
//       } else {
//         display.value += value;
//       }
//     }
//   });

// }

// Pseudo-Code
// display 0 by default
// display number clicked by the User
// make the operation when other operation occurs number is

// BONUS: when operator is added display in typing

// function handleOperator(op) {
//   // Chaining Operations
//   if (previousInput == "") {
//     previousInput = currentInput;
//     console.log(previousInput);
//     updateDisplays();
//   }
//   previousInput = calculate();
//   operator = op;
//   currentInput = "";

//   console.log(previousInput, operator, currentInput);
// }
