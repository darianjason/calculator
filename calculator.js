const calculator = document.querySelector("#calculator");
const buttonArray = Array.from(document.querySelectorAll("button"));
const display = document.querySelector("#screen-display");

let previousButtonType = null;
let firstNumber = null;
let secondNumber = null;
let operator = null;

buttonArray.forEach(button => {
    button.addEventListener("click", () => {
        if (button.className != "operator") {
            if (button.id != "backspace") {
                removeClassFromButtons("pressed");
            }
        }

        if (button.id === "reset") {
            resetAll();
        }

        if (button.id === "decimal-point") {
            if (previousButtonType === "number" && !display.textContent.includes(".")) {
                display.textContent += button.value;
                
                previousButtonType = "decimalPoint";
            }
        }

        if (button.id === "backspace") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);

            if (previousButtonType === "operator") {
                return;
            }

            previousButtonType = "backspace";
        }

        if (button.className === "number") {
            if (previousButtonType === "operator") {
                display.textContent = button.value;
            }
            else {
                display.textContent += button.value;
            }

            previousButtonType = "number";
        }

        if (button.className === "operator") {
            if (display.textContent === '') {
                return;
            }

            if (previousButtonType === "operator") {
                if (button.id === operator) {
                    button.classList.add("pressed");
                }
                else {
                    operator = button.id;

                    removeClassFromButtons("pressed");
                    button.classList.add("pressed");
                }

                return;
            }

            if (operator != null && previousButtonType != "equals") {
                if (firstNumber != null) {
                    secondNumber = getIntFromScreen();
                }

                display.textContent = operate(operator, firstNumber, secondNumber);

                firstNumber = getIntFromScreen();
            }

            if (firstNumber === null) {
                firstNumber = getIntFromScreen();
            }
            else {
                secondNumber = getIntFromScreen();
            }

            operator = button.id;

            previousButtonType = "operator";

            button.classList.add("pressed");
        }

        if (button.id === "equals") {
            if (previousButtonType === "operator" || previousButtonType === "equals") {
                return;
            }

            if (firstNumber != null) {
                secondNumber = getIntFromScreen();
            }
            else {
                return;
            }

            display.textContent = operate(operator, firstNumber, secondNumber);

            firstNumber = getIntFromScreen();

            previousButtonType = "equals";
        }
    });
});

document.addEventListener("keyup", e => {
    let key = e.key;
    console.log(key);

    if (key >= 0 && key <= 9) {
        document.getElementById(key).click();
    }

    switch (key) {
        case "Escape":
            document.getElementById("reset").click();
            break;
        case "Backspace":
            document.getElementById("backspace").click();
            break;
        case "/":
            document.getElementById("divide").click();
            break;
        case "*":
            document.getElementById("multiply").click();
            break;
        case "-":
            document.getElementById("subtract").click();
            break;
        case "+":
            document.getElementById("add").click();
            break;
        case ".":
            document.getElementById("decimal-point").click();
            break;
        case "=":
            document.getElementById("equals").click();
            break;
        case "Enter":
            document.getElementById("equals").click();
            break;
    }
});

function resetScreen() {
    display.textContent = null;
}

function resetAll() {
    previousButtonType = null;
    firstNumber = null;
    secondNumber = null;
    operator = null;

    resetScreen();
}

function getIntFromScreen() {
    return Number.parseFloat(display.textContent);
}

function removeClassFromButtons(className) {
    buttonArray.forEach(button => {
        button.classList.remove(className);
    });
}

function operate(operator, a, b) {
    switch (operator) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return a / b;
    }
}