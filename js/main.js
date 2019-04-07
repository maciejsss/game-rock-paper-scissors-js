const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
};

const game = {
    playerHand: "",
    aiHand: ""
}


const hands = [...document.querySelectorAll(".select-option i")];


function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.color = "#607D8B")
    this.style.color = "#FF5722";
}


function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;

}


function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if ((player === "paper" && ai === "rock") ||
        (player === "rock" && ai === "scissors") ||
        (player === "scissors" && ai === "paper")) {
        return "win";
    } else {
        return "loss";
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player.charAt(0).toUpperCase() + player.slice(1) + "!";
    document.querySelector('[data-summary="ai-choice"]').textContent = ai.charAt(0).toUpperCase() + ai.slice(1) + "!";


    document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;


    if (result === "win") {
        document.querySelector("p.wins span").textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').style.color = "#FF5722";
        document.querySelector('[data-summary="who-win"]').textContent = "Player";


    } else if (result === "loss") {
        document.querySelector("p.losses span").textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').style.color = "#CFD8DC";
        document.querySelector('[data-summary="who-win"]').textContent = "Computer";
    } else {
        document.querySelector("p.draws span").textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').style.color = "#FFF";
        document.querySelector('[data-summary="who-win"]').textContent = "Draw";
    }
}


function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.color = "#607D8B";
    game.playerHand = "";
}


function startGame() {
    if (!game.playerHand) {
        return alert("Choose your hand!")
    };
    game.aiHand = aiChoice();


    const gameResult = checkResult(game.playerHand, game.aiHand);

    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame();

}


hands.forEach(hand => hand.addEventListener("click", handSelection));


document.querySelector(".start").addEventListener("click", startGame);