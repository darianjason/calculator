const calculator = document.querySelector("#calculator");
const buttons = Array.from(document.querySelectorAll("button"));
const display = document.querySelector("#screen-display");

let previousButtonType = null;
let firstNumber = null;
let secondNumber = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "reset") {
            resetAll();
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
            button.classList.add("pressed");

            previousButtonType = "operator";

            if (firstNumber == null) {
                firstNumber = getIntFromScreen();
            }
            else {
                secondNumber = getIntFromScreen();
            }

            operator = button.value;
        }
        else {
            buttons.forEach(button => {
                button.classList.remove("pressed");
            });
        }

        if (button.id === "equals") {
            if (firstNumber) {
                secondNumber = getIntFromScreen();
            }

            display.textContent = operate(operator, firstNumber, secondNumber);

            firstNumber = getIntFromScreen();
            secondNumber = null;
        }
    });
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
    return Number.parseInt(display.textContent, 10);
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