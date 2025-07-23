const display = document.getElementById('display');
let currentInput = '';
let justCalculated = false;

function appendNumber(num) {
    if (justCalculated) {
        currentInput = '';
        justCalculated = false;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if(currentInput === '')
        return;
    const lastChar = currentInput.slice(-1);
    if('+-*/'.includes(lastChar)){
        currentInput = currentInput.slice(0, -1);
    }
    currentInput += op;
    justCalculated = false;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function calculate() {
    try {
        const result = eval(currentInput);
        currentInput = result.toString();
        justCalculated = true;
    } 
    catch {
        currentInput = 'Error';
        justCalculated = true;
    } 
    updateDisplay();
}

document.addEventListener('keydown', (e)=> {
    if((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } 
    else if ('+-*/'.includes(e.key)) {
        appendOperator(e.key);
    }
    else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    }
    else if (e.key === 'Backspace'){
        if(justCalculated) {
            currentInput = '';
            justCalculated = false;
        }
        else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }
    else if(e.key ==='Escape'){
        clearDisplay();
    }
})