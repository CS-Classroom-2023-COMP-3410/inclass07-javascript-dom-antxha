function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

let deck = [];
let excludeCards = [127151, 127152, 127167, 127168];
const cardBack = "&#127136;";

for (let i = 127137; i < 127137 + 62; i++) {
    if (!excludeCards.includes(i)) {
        let cardString = `&#${i};`;
        deck.push(cardString);
    }
}

let cardChoice = deck.slice(0, 8);
let gameCards = [];

for (let card of cardChoice) {
    gameCards.push(card);
    gameCards.push(card);
}

shuffle(gameCards);

let firstCard = null;
let secondCard = null;
let lockBoard = false;


const grid = document.getElementById("cardGrid");
grid.innerHTML = "";
for (let cardHTML of gameCards) {
    let card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
        <div class="front">${cardHTML}</div>
        <div class="back">${cardBack}</div>
    `;
    card.addEventListener("click", handleCardClick);
    grid.appendChild(card);
}

function handleCardClick(e) {
    if (lockBoard) return;
    const card = e.currentTarget;
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");

    if (front.style.display === "block") return;

    front.style.display = "block";
    back.style.display = "none";

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;

        const firstVal = firstCard.querySelector(".front").innerHTML;
        const secondVal = secondCard.querySelector(".front").innerHTML;

        if (firstVal === secondVal) {
            matchesFound++;
            [firstCard, secondCard] = [null, null];
            lockBoard = false;

            if (matchesFound === cardChoice.length) {
                clearInterval(timer);
                setTimeout(() => {
                    alert(`You won in ${moveCount} moves and ${seconds} seconds!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.querySelector(".front").style.display = "none";
                firstCard.querySelector(".back").style.display = "block";
                secondCard.querySelector(".front").style.display = "none";
                secondCard.querySelector(".back").style.display = "block";
                [firstCard, secondCard] = [null, null];
                lockBoard = false;
            }, 1000);
        }
    }
}

document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});
