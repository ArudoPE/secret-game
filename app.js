let secretNumber = 0;
let userTries = 0;
let winningNumbersList = [];
let maxNumber = 10;

function assignElementText(identifier, text, type){
    let HTMLelement;
    if(type === 'element'){
        HTMLelement = document.querySelector(identifier);
    } else if(type === 'id'){
        HTMLelement = document.getElementById(identifier);
    }
    HTMLelement.innerHTML = text;
    //Doesn't return something, but you could use it always on any function
    return;
}

function attemptCheck(){
    let userNumber = parseInt(document.getElementById('userValue').value);
    //triple equal === means it must be the same value and type
    console.log(`Intento ${userTries}.`);
    if(userNumber === secretNumber){
        //assignElementText('p', 'Acertaste el número');
        assignElementText('resultText', `Acertaste el número en ${userTries}
            ${(userTries === 1) ? 'intento' : 'intentos'}`, 'id');
            document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //User is not right
        if(userNumber > secretNumber){
            assignElementText('resultText', 'El número secreto es menor', 'id');
        } else{
            assignElementText('resultText', 'El número secreto es mayor', 'id');
        }
        userTries++;
        cleanInput();
    }
    return;
}

function cleanInput(){
    document.querySelector('#userValue').value = '';
}

function generateRandomNumber() {
    let generatedNumber = Math.floor(Math.random() * maxNumber) + 1;
    console.log(generatedNumber);
    console.log(winningNumbersList);
    //Check if all the numbers were generated and get out of the loop
    if (winningNumbersList.length == maxNumber) {
        assignElementText('p', `Ya se sortearon todos los números posibles.`, 'element');
    } else {
    //If the genererated number is on the list:
    if (winningNumbersList.includes(generatedNumber)) {
        return generateRandomNumber();
    } else {
        //We must save the new number
        winningNumbersList.push(generatedNumber);
        return generatedNumber;
    }
}
}

function initialConditions(){
    assignElementText('h1', 'Juego del número secreto', 'element');
    assignElementText('p', `Indica un número del 1 al ${maxNumber}:`, 'element');
    assignElementText('resultText', 'Sin intentos previos', 'id');
    secretNumber = generateRandomNumber();
    userTries = 1;
}

function resetGame(){
    //Clean the input
    cleanInput();
    //Set initial conditions, and reset tries count
    initialConditions();
    //Disable reset button again
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

initialConditions();