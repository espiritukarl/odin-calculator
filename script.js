const displayCurrent = document.querySelector(".current-results");
const displayPast = document.querySelector(".past-results");

let total = 0;
let operand = '';
let number = '';
let numbers = [];
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let buttonClicked = (e.target.textContent).toLowerCase();
        if (Number(buttonClicked) || buttonClicked === "0") {
            number = `${number}${buttonClicked}`
            displayCurrent.textContent = number;
        }

        else if (total == "TO INFINITY AND BEYOND") {
            displayPast.textContent = '';
            displayCurrent.textContent = "TO INFINITY AND BEYOND";
            number = '';
            numbers = [];
            total = 0;
            operand = '';
        }

        else {
            if (buttonClicked === 'c') {
                displayPast.textContent = '';
                displayCurrent.textContent = 0;
                number = '';
                numbers = [];
                total = 0;
                operand = '';
            }

            else if (buttonClicked === '+') {
                numbers.push(Number(number));
                if (operand == '') {
                    numbers.push(0);
                } else if (operand == '~') {
                    number = `${number}${buttonClicked}`
                    operand = '+';
                }
                total = operator(operand, numbers, number);
                displayPast.textContent = number;
                displayCurrent.textContent = total;
                number = '';
                numbers[0] = Number(total);
                numbers.pop()
                operand = '+';

            }

            else if (buttonClicked === '-') {
                numbers.push(Number(number));
                if (operand == '') {
                    numbers.push(0);
                } else if (operand == '~') {
                    number = `${number}${buttonClicked}`
                    operand = '-';
                }
                total = operator(operand, numbers, number);
                displayPast.textContent = number;
                displayCurrent.textContent = total;
                number = '';
                numbers[0] = Number(total);
                numbers.pop()
                operand = '-';
            }

            else if (buttonClicked === 'x') {
                numbers.push(Number(number));
                if (operand == '') {
                    numbers.push(1);
                } else if (operand == '~') {
                    number = `${number}${buttonClicked}`
                    operand = 'x';
                }
                total = operator(operand, numbers, number);
                displayPast.textContent = number;
                displayCurrent.textContent = total;
                number = '';
                numbers[0] = Number(total);
                numbers.pop()
                operand = 'x';
            }

            else if (buttonClicked === '÷') {
                numbers.push(Number(number));
                if (operand == '') {
                    numbers.push(1);
                } else if (operand == '~') {
                    number = `${number}${buttonClicked}`
                    operand = '÷';
                }
                total = operator(operand, numbers, number);
                displayPast.textContent = number;
                displayCurrent.textContent = total;
                if (total == "TO INFINITY AND BEYOND") {
                    displayPast.textContent = '';
                    displayCurrent.textContent = "TO INFINITY AND BEYOND";
                    number = '';
                    numbers = [];
                    total = 0;
                    operand = '';
                }
                number = '';
                numbers[0] = Number(total);
                numbers.pop()
                operand = '÷';
            }

            else if (buttonClicked === '%') {
                numbers.push(Number(number));
                total = percent(numbers[0]);
                displayPast.textContent = `${number}%`
                displayCurrent.textContent = total;
                numbers.pop();
                operand = '%'
            }

            else if (buttonClicked === '!') {
                numbers.push(Number(number));
                total = factorial(numbers[0]);
                displayPast.textContent = `${number}!`
                displayCurrent.textContent = total;
                numbers.pop();
                operand = '!'
            }

            else if (buttonClicked === '=') {
                if (operand == '~') number = total;
                numbers.push(Number(number));
                total = operator(operand, numbers, number);
                console.log(total);
                if (total == "TO INFINITY AND BEYOND") {
                    displayPast.textContent = '';
                    displayCurrent.textContent = "TO INFINITY AND BEYOND";
                    number = '';
                    numbers = [];
                    total = 0;
                    operand = '';
                }
                displayPast.textContent = number;
                displayCurrent.textContent = total;
                operand = '~';
                if (numbers.length != 1) number = '';
                else numbers.push(number);
                numbers[0] = Number(total);
                numbers.pop();

            }

            else if (buttonClicked === '+/-') {
                number = `-${number}`;
                displayCurrent.textContent = number;
            }

            else if (buttonClicked === '.') {
                if (number.search('.')) {
                    number = "ERROR";
                    number = '';
                    numbers = [];
                    operand = '';
                }
                else number = `${number}.`;
                displayCurrent.textContent = number;
            }
        }
    });
});

function addition(args) {
    return parseFloat((args[0] + args[1]).toFixed(5));
}

function subtraction(args) {
    return parseFloat((args[0] - args[1]).toFixed(5));
}

function multiplication(args) {
    return parseFloat((args[0] * args[1]).toFixed(5));
}

function division(args) {
    console.log(args[1]);
    if (args[1] != 0) return parseFloat((args[0] / args[1]).toFixed(5));
    else return "TO INFINITY AND BEYOND";
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

function operator(operand, args, number) {
    if (operand == '+') return addition(args);
    else if (operand == '-') return subtraction(args);
    else if (operand == 'x') return multiplication(args);
    else if (operand == '÷') return division(args);
    else return number;
}