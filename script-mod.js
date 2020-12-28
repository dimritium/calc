
(function() {
    let buttons = document.querySelectorAll('button');
    let arr = [];
    let num = '';
    let operator = '';
    let acceptOnlyNum = false;
    let acceptOnlyOperator = false;
    let elem = document.querySelector("#formula-screen"); // element displaying calculations

    buttons.forEach(button => {
            button.addEventListener("click", (event) => {
            let keyObj = key(button.dataset.key_type, event.target.value, event.target.id);
            handleEvent(keyObj);
        });
    });

    function handleEvent(key) {
        console.log(key.id);
    }

    function showScreen() {
        // let element = document.querySelector("#formula-screen");
        let formula = arr.join(' ');
        elem.innerHTML = formula;
        document.querySelector("#input").innerHTML = num + ' ' + operator;
        // auto scroll to right 
        elem.scrollTo(elem.scrollWidth - elem.scrollLeft, 0);
    }

    function key(type, value, id) {
        return {type: type, value: value, id: id};
    }

})();

// export default myModule;