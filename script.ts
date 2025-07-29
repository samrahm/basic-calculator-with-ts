const display = document.getElementById('display') as HTMLInputElement;
let currentInput: string = '';
let justCalculated: boolean = false;

function appendNumber(num: string): void {
    if (justCalculated) {
        currentInput = '';
        justCalculated = false;
    }
    currentInput += num;
    updateDisplay();
}

function appendOperator(op: string): void {
    if(currentInput === '')
        return;
    const lastChar:string = currentInput.slice(-1);
    if('+-*/'.indexOf(lastChar) !== -1){
        // currentInput = currentInput.slice(0, -1);
    }
    currentInput += op;
    justCalculated = false;
    updateDisplay();
}

function updateDisplay(): void {
    display.value = currentInput;
}

function clearDisplay(): void {
    currentInput = '';
    updateDisplay();
}

function calculate():void {
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

document.addEventListener('keydown', (e: KeyboardEvent): void => {
    if((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } 
    else if ('+-*/'.indexOf(e.key) !== -1) {
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