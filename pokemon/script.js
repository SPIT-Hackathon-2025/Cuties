// At the start of the game
fetch("http://127.0.0.1:5000/start_game")
    .then(response => response.json())
    .then(data => {
        // Populate initial dropdown
        const select = document.getElementById("pokemon-select");
        select.innerHTML = data.available_pokemon
            .map(pokemon => `<option value="${pokemon.name}">${pokemon.name}</option>`)
            .join('');
    });



const client = new MongoClient('mongodb+srv://maazmalik2004:abenzene1234@dspace.odk45.mongodb.net/');    
// In your playRound function
function playRound() {
    fetch("http://127.0.0.1:5000/play_round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_pokemon: document.getElementById("pokemon-select").value })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        document.getElementById("user-card").innerHTML = `<img src="${data.user_card.image}"><p>${data.user_card.name}</p>`;
        document.getElementById("computer-card").innerHTML = `<img src="${data.computer_card.image}"><p>${data.computer_card.name}</p>`;
        document.getElementById("result").innerText = `Round Winner: ${data.winner}`;
        document.getElementById("user-score").innerText = data.user_score;
        document.getElementById("computer-score").innerText = data.computer_score;

        // Update dropdown with remaining available Pokémon
        const select = document.getElementById("pokemon-select");
        select.innerHTML = data.available_pokemon
            .map(pokemon => `<option value="${pokemon.name}">${pokemon.name}</option>`)
            .join('');

        if (data.game_over) {
            alert(`Game Over! ${data.final_winner} wins!`);
            // You might want to disable the battle button or restart the game here
        }
    });
}