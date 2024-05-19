const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');
        handleInput(key);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === 'Enter' || key === '=' || key === 'Escape' || key === 'Backspace' || ['+', '-', '*', '/'].includes(key)) {
        handleInput(key);
    }
});

function handleInput(key) {
    if (key === 'Escape') {
        resetCalculator();
        return;
    }

    if (key === 'Enter' || key === '=') {
        if (operator !== null) {
            performCalculation();
            operator = null;
            shouldResetDisplay = true;
        }
        return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
        if (operator !== null) {
            performCalculation();
        }
        firstOperand = parseFloat(currentInput);
        operator = key === '*' ? '*' : key;
        shouldResetDisplay = true;
        return;
    }

    if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
        return;
    }

    if ((key >= '0' && key <= '9') || key === '.') {
        appendNumber(key);
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number === '.' ? '0.' : number;
        shouldResetDisplay = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function performCalculation() {
    if (operator === null || shouldResetDisplay) return;

    const secondOperand = parseFloat(currentInput);
    switch (operator) {
        case '+':
            currentInput = (firstOperand + secondOperand).toString();
            break;
        case '-':
            currentInput = (firstOperand - secondOperand).toString();
            break;
        case '*':
            currentInput = (firstOperand * secondOperand).toString();
            break;
        case '/':
            currentInput = (firstOperand / secondOperand).toString();
            break;
    }
    updateDisplay();
}
