
(function () {
    let buttons = document.querySelectorAll('button');
    let arr = [];
    let num = '';
    let operator = '';
    let acceptOnlyNum = false;
    let acceptOnlyOperator = false;
    let formulaScreen = document.querySelector(".formula.screen"); // element displaying calculations

    let buttonsMap = new Map();

    // Map button value with the object having data-key_type and value
    buttons.forEach(button => {
        buttonsMap.set(button.getAttribute("value"), key(button.dataset.key_type, button.getAttribute("value")));
    })

    // adding click and touch events on buttons
    buttons.forEach(button => {

        button.addEventListener("click", (event) => {
            handleEvent(buttonsMap.get(event.target.value));
        });

        button.addEventListener("touch", (event) => handleEvent(buttonsMap.get(event.target.value)));
    });

    document.addEventListener("keydown", (event) => {
        if (buttonsMap.has(event.key))
            handleEvent(buttonsMap.get(event.key));

    });

    /**
     * 
     * @param {string} type type of the button event
     * @param {string} value value of the button event
     */
    function key(type, value) {
        return { type: type, value: value }
    }

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
     * @param {key} keyObj corresponds to the button or the keydown event 
     */
    function handleEvent(keyObj) {
        // reset everything
        if (keyObj.value === "AC") {
            arr = [];
            num = '';
            operator = '';
            acceptOnlyNum = false;
            acceptOnlyOperator = false;
        }
        // compute the result
        else if (keyObj.value === "=") {
            if (num) {
                arr.push(parseFloat(num));
                arr = [parseFloat(eval(arr.join('')).toFixed(2))];
                num = '';
                acceptOnlyOperator = true;
            } else {
                handleToast("number is expected");
            }
        }
        // handling number, decimal and operators
        else {
            if (num.length >= 12) {
                handleToast('Max digits for a number can be 12');
                return;
            }

            if (acceptOnlyNum && keyObj.type === 'operator') {
                arr[arr.length - 1] = keyObj.value;
            }

            else if (acceptOnlyOperator && (keyObj.type === 'number' || keyObj.type === 'decimal')) {
                handleToast("Operator (+, -, *, /) is expected")
                return;
            }
            // accepting for inial negative numbers
            else if (!num && keyObj.value === '-' && arr.length === 0) {
                num += keyObj.value;
                acceptOnlyNum = true;
            }
            // accepting for no.
            else if (keyObj.type === 'number') {
                // accept decimal place till 3 only
                if (num && parseFloat(num) % 1 !== 0) {
                    if (num.split(".")[1].length >= 3) {
                        handleToast("Number till 3 decimal place accepted");
                        return;
                    }
                }
                num += keyObj.value;
                acceptOnlyNum = false;
            }
            // accept a period and create num if not defined
            else if (keyObj.type === 'decimal') {
                if (num === '') {
                    num = '0.'
                }
                // process if number is not a double
                else if (parseFloat(num) % 1 === 0) {
                    num += '.';
                    acceptOnlyNum = true;
                }

            } else if (keyObj.type === 'operator') {
                // if num is being processed add the number first to the arr then the opreator
                if (num) {
                    arr.push(parseFloat(num));
                    arr.push(keyObj.value);
                    num = '';
                }
                // only push operator if num is not being processed and arr length is 1
                else if (num === '' && arr.length === 1) {
                    arr.push(keyObj.value);
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
        document.querySelector(".screen.input").textContent = num + ' ' + operator;
        // auto scroll to right 
        formulaScreen.scrollTo(formulaScreen.scrollWidth - formulaScreen.scrollLeft, 0);
    }

})();

// export default myModule;