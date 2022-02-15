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
        } else {
            if (buttonClicked === 'c') {
                displayPast.textContent = '';
                displayCurrent.textContent = 0;
                number = '';
                numbers = [];
                total = 0;
                operand = '';
            } else if (buttonClicked === '+') {
                numbers.push(Number(number));
                console.log(numbers);
                if (operand == '') {
                    numbers.push(0);
                } else if (operand == '~') {
                    number = `${number}${buttonClicked}`
                    operand = '+';
                }
                total = operator(operand, numbers, number);
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
                displayCurrent.textContent = total;
                number = '';
                numbers[0] = Number(total);
                numbers.pop()
                operand = '÷';
            }

            else if (buttonClicked === '%') {
                if (operand == "%") numbers.push(Number(number));
                else numbers.push(Number(total));
                total = percent(numbers[0]);
                displayPast.textContent = `${number}%`
                displayCurrent.textContent = total;
                numbers.pop();
                operand = '%'
            }

            else if (buttonClicked === '!') {
                if (operand == "!") numbers.push(Number(number));
                else numbers.push(Number(total));
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
                displayCurrent.textContent = total;
                operand = '~';
                if (numbers.length != 1) number = '';
                else numbers.push(number);
                numbers[0] = Number(total);
                numbers.pop();
            } else {

            }
        }
    });
});

function addition(args) {
    return args[0] + args[1];
}

function subtraction(args) {
    return args[0] - args[1];
}

function multiplication(args) {
    return args[0] * args[1];
}

function division(args) {
    return args[0] / args[1];
}

function percent(args) {
    return args / 100;
}

function factorial(args) {
    if (args == 0) {
        return 1
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