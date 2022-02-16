const displayCurrent = document.querySelector(".current-results");
const displayPast = document.querySelector(".past-results");

let i = 0;
let number = '';
let arrayNumbers = [];
let arrayOperations = [];

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let buttonClicked = (e.target.textContent).toLowerCase();
        if (displayCurrent.textContent === "YOU BROKE ME" || buttonClicked == 'c') {
            number = '';
            displayPast.textContent = '';
            displayCurrent.textContent = 0;
            arrayNumbers = [];
            arrayOperations = [];
            i = 0;
        } else if (Number(buttonClicked) || buttonClicked === "0") {
            number = `${number}${buttonClicked}`
            displayCurrent.textContent = number;
        } else if (buttonClicked == '.') {
            if (!(number.search('.'))) {
                number = `${number}.`;
                displayCurrent.textContent = number;
            }
        } else if (buttonClicked === '+/-') {
            number = `-${number}`;
            displayCurrent.textContent = number;
        } else {
            arrayOperations.push(buttonClicked);
            arrayNumbers.push(displayCurrent.textContent);
            number = '';

            if (buttonClicked == '%') {
                displayPast.textContent = `${arrayNumbers[i]} ${arrayOperations[i]}`
                displayCurrent.textContent = percent(arrayNumbers[i]);
                number = '';
                arrayNumbers = [];
                arrayOperations = [];
                i = 0;
            } else if (buttonClicked == '!') {
                displayPast.textContent = `${arrayNumbers[i]} ${arrayOperations[i]}`
                displayCurrent.textContent = factorial(arrayNumbers[i]);
                number = '';
                arrayNumbers = [];
                arrayOperations = [];
                i = 0;
            } else if (arrayNumbers.length == 1) {
                displayPast.textContent = `${arrayNumbers[0]} ${arrayOperations[0]}`
                displayCurrent.textContent = arrayNumbers[0];
            } else if (buttonClicked == '=') {
                displayCurrent.textContent = operate(arrayNumbers, arrayOperations, i);
                number = '';
                arrayNumbers = [];
                arrayOperations = [];
                i = 0;
            } else if (arrayNumbers.length > 1) {
                displayPast.textContent = `${arrayNumbers[i]} ${arrayOperations[i]} ${arrayNumbers[i + 1]} =`;
                displayCurrent.textContent = operate(arrayNumbers, arrayOperations, i);
                i++;
            }
        }
    });
});

function addition(number1, number2) {
    return parseFloat((+number1 + +number2).toFixed(5));
}

function subtraction(number1, number2) {
    return parseFloat((+number1 - +number2).toFixed(5));
}

function multiplication(number1, number2) {
    return parseFloat((+number1 * +number2).toFixed(5));
}

function division(number1, number2) {
    if (+number2 != 0) return parseFloat((+number1 / +number2).toFixed(5));
    else return "YOU BROKE ME";
}

function percent(args) {
    return parseFloat((args / 100).toFixed(5));
}

function factorial(args) {
    if (args == 0) {
        return 1
    } if (args == 1) {
        return 1;
    } else if (args > 0) {
        return args * factorial(args - 1);
    } else {
        return "Error"
    }
}

function operate(arrayNumbers, arrayOperations, i) {
    if (arrayOperations[i] == '+') arrayNumbers[i + 1] = addition(arrayNumbers[i], arrayNumbers[i + 1]);
    else if (arrayOperations[i] == '-') arrayNumbers[i + 1] = subtraction(arrayNumbers[i], arrayNumbers[i + 1]);
    else if (arrayOperations[i] == 'x') arrayNumbers[i + 1] = multiplication(arrayNumbers[i], arrayNumbers[i + 1]);
    else if (arrayOperations[i] == '÷') arrayNumbers[i + 1] = division(arrayNumbers[i], arrayNumbers[i + 1]);
    else arrayNumbers[i + 1] = arrayNumbers[i + 1];
    return arrayNumbers[i + 1];
}
