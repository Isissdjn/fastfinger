const textToCopy = "Le développement web est fascinant et plein de défis. Chaque jour, les développeurs créent des applications innovantes qui changent la façon dont nous interagissons avec la technologie. La maîtrise des outils et des langages de programmation est essentielle pour réussir dans ce domaine en constante évolution.";
let startTime; 
let interval; 


const startButton = document.getElementById("startTest");
const stopButton = document.getElementById("stopTest");
const typingArea = document.getElementById("typingArea");
const resultDisplay = document.getElementById("result");


startButton.addEventListener("click", () => {
    document.getElementById("textToCopy").textContent = textToCopy; 
    typingArea.disabled = false;
    typingArea.value = ""; 
    resultDisplay.textContent = ""; 
    typingArea.focus(); 

    startTime = new Date(); 
    interval = setInterval(updateSpeed, 1000); 

    startButton.disabled = true; 
    stopButton.disabled = false; 
});


stopButton.addEventListener("click", () => {
    clearInterval(interval); 
    displayResults();
    stopTest(); 
});


function updateSpeed() {
    const elapsedTime = (new Date() - startTime) / 1000 / 60; 
    const textTyped = typingArea.value.trim(); 
    const wordCount = textTyped.split(/\s+/).length; 
    const wpm = Math.round(wordCount / elapsedTime); 
    resultDisplay.textContent = `Vitesse actuelle : ${wpm} mots par minute.`;
}


function displayResults() {
    const elapsedTime = (new Date() - startTime) / 1000; 
    const textTyped = typingArea.value.trim(); 
    const wordCount = textTyped.split(/\s+/).length; 
    const wpm = Math.round((wordCount / elapsedTime) * 60); 

    const errors = calculateErrors(textToCopy, textTyped); 
    const accuracy = Math.round(((textToCopy.length - errors) / textToCopy.length) * 100);

    resultDisplay.textContent = `Test terminé ! Vous avez tapé ${wordCount} mots en ${elapsedTime.toFixed(2)} secondes (${wpm} mots par minute) avec ${accuracy}% de précision.`;
}

function calculateErrors(original, typed) {
    let errors = 0;
    for (let i = 0; i < original.length; i++) {
        if (original[i] !== typed[i]) {
            errors++;
        }
    }
    return errors;
}

function stopTest() {
    typingArea.disabled = true; 
    startButton.disabled = false; 
    stopButton.disabled = true; 
}
