let body = document.querySelector('body')
const numBtn = document.querySelectorAll('[data-number]')
const opsBtn = document.querySelectorAll('[data-operator]')
const eqlBtn = document.getElementById('eql')
const clearBtn = document.getElementById('clear')
const delBtn = document.getElementById('del')
const dotBtn = document.getElementById('dot')
const opsDisplay = document.getElementById('operate')
const result = document.getElementById('res')

const modeInner = document.querySelector('.mode .bx')

// Switch to light theme
function toggleMode() {
    setTimeout( () => {
        modeInner.className = (modeInner.className == 'bx bx-sun') ? 'bx bx-moon' : 'bx bx-sun';
        modeInner.classList.contains('bx-sun') ? body.setAttribute('data-theme', 'dark') : body.setAttribute('data-theme', 'light'); 
    },500)
}

// Let's go!!
let firstOperand = ''
let secondOperand = ''
let currentOps = null // shows if there is an operation in progress
let shouldResetScreen = false // reset everything

window.addEventListener('keydown', handleKeyboardInput)
eqlBtn.addEventListener('click', calc)
clearBtn.addEventListener('click', clear)
delBtn.addEventListener('click', del)
dotBtn.addEventListener('click', showDot)
numBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        showNum(e.target.textContent)
    })
})
opsBtn.forEach( (btn) => {
    btn.addEventListener('click', (e) => {
        setOps(e.target.textContent)
    })
})


function showNum(number) {
    if (result.textContent === '0' || shouldResetScreen) resetScreen()
    if (result.textContent.length > 9) return
    result.textContent += number
}

function resetScreen() {
    result.textContent = ''
    shouldResetScreen = false
}

function clear() {
    result.textContent = '0'
    opsDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function showDot() {
    if (shouldResetScreen) resetScreen()
    if (result.textContent === '') {
        result.textContent = '0'
    }
    if (result.textContent.includes('.')) return
    result.textContent += '.'
}

function del() {
    if (result.textContent.length === 1) {
        result.textContent = '0'
    }
    else {
        result.textContent = result.textContent
                                    .toString()
                                    .slice(0, -1)
    }
}


function setOps(operator) {
    if (currentOps !== null) calc()
    firstOperand = result.textContent
    currentOps = operator
    opsDisplay.textContent = `${firstOperand} ${currentOps}`    
    shouldResetScreen = true
}

function calc() {
    if (currentOps === null || shouldResetScreen) return
    secondOperand = result.textContent
    result.textContent = arrondi(
        ops(currentOps, firstOperand, secondOperand)
    )
    opsDisplay.textContent = `${firstOperand} ${currentOps} ${secondOperand}`
    currentOps = null
}

function arrondi(number) {
    return Math.floor(number * 1000) / 1000
}

function ops(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
          return a + b
        case '−':
            return a - b
            case '×':
                return a * b
                case '÷':
        //   if (b === 0) return null
        return a / b
        case '%':
            return a % b
            default:
                return null
            }
        }
        
// Handle keyboard input
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) showNum(e.key)
    if (e.key === '.') showDot()
    if (e.key === '=' || e.key === 'Enter') calc()
    if (e.key === 'Escape') clear()
    if (e.key === 'Backspace') del()    
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOps(convertOperator(e.key))
}

function convertOperator(keyboardOps) {
    if (keyboardOps === '/') return '÷'
    if (keyboardOps === '*') return '×'
    if (keyboardOps === '-') return '−'
    if (keyboardOps === '+') return '+'
}