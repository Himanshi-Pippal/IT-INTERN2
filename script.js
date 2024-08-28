let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');

let calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    waitingForSecondOperand: false,
};

function updateDisplay() {
    display.value = calculator.displayValue;
}

function handleNumberButton(button) {
    let number = button.id;
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        if (calculator.displayValue === '0') {
            calculator.displayValue = number;
        } else {
            calculator.displayValue += number;
        }
    }
    updateDisplay();
}

function handleOperatorButton(button) {
    let operator = button.id;
    calculator.firstOperand = parseFloat(calculator.displayValue);
    calculator.operator = operator;
    calculator.waitingForSecondOperand = true;
    calculator.displayValue = '0';
    updateDisplay();
}

function handleEqualsButton() {
    calculator.secondOperand = parseFloat(calculator.displayValue);
    let result = calculateResult();
    calculator.displayValue = result.toString();
    updateDisplay();
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

function calculateResult() {
    let result;
    switch (calculator.operator) {
        case 'add':
            result = calculator.firstOperand + calculator.secondOperand;
            break;
        case 'subtract':
            result = calculator.firstOperand - calculator.secondOperand;
            break;
        case 'multiply':
            result = calculator.firstOperand * calculator.secondOperand;
            break;
        case 'divide':
            if (calculator.secondOperand !== 0) {
                result = calculator.firstOperand / calculator.secondOperand;
            } else {
                result = 'Error';
            }
            break;
        default:
            result = 0;
    }
    return result;
}

function handleClearButton() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
    updateDisplay();
}

function handleBackspaceButton() {
    let currentValue = calculator.displayValue;
    calculator.displayValue = currentValue.substring(0, currentValue.length - 1);
    if (calculator.displayValue === '') {
        calculator.displayValue = '0';
    }
    updateDisplay();
}

function handleDecimalButton() {
    if (!calculator.displayValue.includes('.')) {
        calculator.displayValue += '.';
        updateDisplay();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                handleNumberButton(button);
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperatorButton(button);
                break;
            case 'equals':
                handleEqualsButton();
                break;
            case 'clear':
                handleClearButton();
                break;
            case 'backspace':
                handleBackspaceButton();
                break;
            case 'decimal':
                handleDecimalButton();
                break;
        }
    });
});