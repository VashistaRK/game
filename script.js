// fetching all the elements
const wordText = document.querySelector(".word"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer, score = 0;

// setting up the timer
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

// time set
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

// Create a function to update and display the player's score
const updateScore = () => {
    const scoreElement = document.querySelector(".score");
    scoreElement.innerText = `Score: ${score}`;
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    
    // Increment the score and update the display
    score++;
    updateScore();

    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
}

// for checking words
initGame();

// for both buttons
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);