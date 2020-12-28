
(function () {
    let buttons = document.querySelectorAll('button');
    let arr = [];
    let num = '';
    let operator = '';
    let acceptOnlyNum = false;
    let acceptOnlyOperator = false;
    let formulaScreen = document.querySelector(".formula.screen"); // element displaying calculations
    let keydownEvents = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "=", "Enter"];
    let toast = document.querySelector("#toast");
    
    buttons.forEach(element => {
        element.addEventListener("click", (event) => handleEvent(event.target.value));
        element.addEventListener("touch", (event) => handleEvent(event.target.value))
    });


    document.addEventListener("keydown", (event) => {
        if(keydownEvents.includes(event.key)) {
            if(event.key === 'Enter') {
                handleEvent("=");
            } else {
                handleEvent(event.key);
            }
        }
    } );

    /**
     * 
     * @param {string} msg message to be displayed in the toast notification 
     */
    function handleToast(msg) {
        toast.textContent = msg;
        toast.setAttribute('class', 'show');
        setTimeout(() => {
            toast.setAttribute('class', '');
        }, 2800);
    }
    
    /**
     * 
     * @param {string} input corresponds to the button or the keydown event 
     */
    function handleEvent(input) {
        // reset everything
        if (input === 'AC') {
            arr = [];
            num = '';
            operator = '';
            acceptOnlyNum = false;
            acceptOnlyOperator = false;         
        } 
        // compute the result
        else if (input === '=') {
            if(num) {
                arr.push(parseFloat(num));
                arr = [parseFloat(eval(arr.join('')).toFixed(2))];
                num = '';
                acceptOnlyOperator = true;
            } else {
                handleToast("number is expected");
            }

        } else {
            if(num.length >= 12) {
                handleToast('Max digits for a number can be 12');
                return;
            }

            if(acceptOnlyNum && input !== '.' && isNaN(input)) {
                arr[arr.length - 1] = input;
            } 

            else if(acceptOnlyOperator && (!isNaN(input) || input === '.')) {
                handleToast("Operator (+, -, *, /) is expected")
                return;
            } 
            // accepting for inial negative numbers
            else if(!num && input === '-' && arr.length === 0) {
                num += input;
                acceptOnlyNum = true;
            } 
            // accepting for no.
            else if(!isNaN(input)) {
                // accept decimal place till 3 only
                if(num && parseFloat(num) % 1 !== 0) {
                    if(num.split(".")[1].length >= 3) {
                         alert("Number till 3 decimal place accepted");
                         return;
                    }
                }
                num += input;
                acceptOnlyNum = false;
            } 
            // accept a period and create num if not defined
            else if(input === '.') {
                if(num === '') {
                    num = '0.'
                } 
                // process if number is not a double
                else if(parseFloat(num) % 1 === 0) {
                    num += '.';
                    acceptOnlyNum = true;
                }
            } else if(isNaN(input)) {
                // if num is being processed add the number first to the arr then the opreator
                if(num) {
                    arr.push(parseFloat(num));
                    arr.push(input);
                    num = '';
                } 
                // only push operator if num is not being processed and arr length is 1
                else if(num === '' && arr.length === 1) {
                    arr.push(input);    
                }
                acceptOnlyNum = true;
                acceptOnlyOperator = false;
            }

        }
        showScreen();
    }

    /**
     * displays calculated value and current operand
     */
    function showScreen() {
        let formula = arr.join(' ');
        formulaScreen.innerHTML = formula;
        document.querySelector(".screen.input").innerHTML = num + ' ' + operator;
        // auto scroll to right 
        formulaScreen.scrollTo(formulaScreen.scrollWidth - formulaScreen.scrollLeft, 0);
    }

})();

// export default myModule;