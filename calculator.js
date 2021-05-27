const calculator = document.querySelector("#calculator");
const buttons = Array.from(document.querySelectorAll("button"));
const display = document.querySelector("#screen-display");

let previousButtonType = null;
let firstNumber = null;
let secondNumber = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.className != "operator") {
            removeClassFromButtons("pressed");
        }

        if (button.id === "reset") {
            resetAll();
        }

        if (button.id === "backspace") {
            display.textContent = display.textContent.slice(0, display.textContent.length - 1);

            previousButtonType = "backspace";

            operator = null;
            
            if(display.textContent) {
                firstNumber = getIntFromScreen();
                secondNumber = null;
            }
            else {
                firstNumber = null;
                secondNumber = null;
            }
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
            if (firstNumber === null && display.textContent === '') {
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
    buttons.forEach(button => {
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