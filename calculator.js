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
            if (previousButtonType === "operator") {
                operator = button.id;

                removeClassFromButtons("pressed");
                button.classList.add("pressed");

                return;
            }

            if (operator && previousButtonType != "equals") {
                if (firstNumber) {
                    secondNumber = getIntFromScreen();
                }

                display.textContent = operate(operator, firstNumber, secondNumber);

                firstNumber = getIntFromScreen();
            }

            if (!firstNumber) {
                firstNumber = getIntFromScreen();
            }
            else {
                secondNumber = getIntFromScreen();
            }

            operator = button.id;

            previousButtonType = "operator";

            button.classList.add("pressed");
        }
        else {
            removeClassFromButtons("pressed");
        }

        if (button.id === "equals") {
            if (firstNumber) {
                secondNumber = getIntFromScreen();
            }
            else {
                return;
            }

            display.textContent = operate(operator, firstNumber, secondNumber);

            firstNumber = getIntFromScreen();

            previousButtonType = "equals";
        }

        // check
        // console.log("=================\n");
        // console.log("previousButtonType: " + previousButtonType);
        // console.log("firstNumber: " + firstNumber);
        // console.log("operator: " + operator);
        // console.log("secondNumber: " + secondNumber);
        // console.log("=================\n");
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