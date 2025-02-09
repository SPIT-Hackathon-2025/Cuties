from flask import Flask, jsonify, request
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

pokemon_cards = [
    {"name": "Charizard", "type": "fire", "rating": random.randint(50, 100), "image": ".\images\Charizard.png"},
    {"name": "Blastoise", "type": "water", "rating": random.randint(50, 100), "image": ".\images\Blastoise.png"},
    {"name": "Zapdos", "type": "thunder", "rating": random.randint(50, 100), "image": ".\images\Zapdos.png"},
    {"name": "Flareon", "type": "fire", "rating": random.randint(50, 100), "image": ".\images\Flareon.png"},
    {"name": "Gyarados", "type": "water", "rating": random.randint(50, 100), "image": ".\images\Gyarados.png"},
    {"name": "Raikou", "type": "thunder", "rating": random.randint(50, 100), "image": ".\images\Raikou.png"}
]

game_state = {
    "user_score": 0,
    "computer_score": 0,
    "round": 0,
    "user_used_cards": [],    # Separate array for user's used cards
    "computer_used_cards": [] # Separate array for computer's used cards
}

def battle(player_card, computer_card):
    if player_card["type"] == "fire" and player_card["rating"] > 85 and computer_card["type"] == "water":
        return "user"
    elif computer_card["type"] == "fire" and computer_card["rating"] > 85 and player_card["type"] == "water":
        return "computer"
    elif player_card["type"] == "water" and player_card["rating"] > 85 and computer_card["type"] == "thunder":
        return "user"
    elif computer_card["type"] == "water" and computer_card["rating"] > 85 and player_card["type"] == "thunder":
        return "computer"
    elif player_card["type"] == "thunder" and player_card["rating"] > 85 and computer_card["type"] == "fire":
        return "user"
    elif computer_card["type"] == "thunder" and computer_card["rating"] > 85 and player_card["type"] == "fire":
        return "computer"
    
    if player_card["rating"] > computer_card["rating"]:
        return "user"
    elif player_card["rating"] < computer_card["rating"]:
        return "computer"
    else:
        return "tie"

@app.route('/start_game', methods=['GET'])
def start_game():
    game_state["user_score"] = 0
    game_state["computer_score"] = 0
    game_state["round"] = 0
    game_state["user_used_cards"] = []     # Reset user's used cards
    game_state["computer_used_cards"] = [] # Reset computer's used cards
    return jsonify({
        "message": "Game started!",
        "available_pokemon": pokemon_cards
    })

@app.route('/play_round', methods=['POST'])
def play_round():
    data = request.json
    user_card = next((p for p in pokemon_cards if p["name"] == data["selected_pokemon"]), None)
    
    if not user_card:
        return jsonify({"error": "Invalid Pokémon!"}), 400

    # Check if user has already used this card
    if user_card["name"] in game_state["user_used_cards"]:
        return jsonify({"error": "You have already used this Pokémon!"}), 400

    # Get available Pokémon for computer (not used by computer)
    available_computer_pokemon = [p for p in pokemon_cards 
                                if p["name"] not in game_state["computer_used_cards"]]

    if not available_computer_pokemon:
        return jsonify({"error": "Computer has no more available Pokémon!"}), 400

    computer_card = random.choice(available_computer_pokemon)
    
    # Add cards to respective used arrays
    game_state["user_used_cards"].append(user_card["name"])
    game_state["computer_used_cards"].append(computer_card["name"])
    game_state["round"] += 1

    winner = battle(user_card, computer_card)
    if winner == "user":
        game_state["user_score"] += 1
    elif winner == "computer":
        game_state["computer_score"] += 1

    game_over = game_state["user_score"] == 3 or game_state["computer_score"] == 3 or game_state["round"] == 5
    final_winner = "User" if game_state["user_score"] > game_state["computer_score"] else "Computer" if game_state["computer_score"] > game_state["user_score"] else "Tie"

    # Get remaining available Pokémon for user (not used by user)
    remaining_pokemon = [p for p in pokemon_cards if p["name"] not in game_state["user_used_cards"]]

    return jsonify({
        "user_card": user_card,
        "computer_card": computer_card,
        "winner": winner,
        "user_score": game_state["user_score"],
        "computer_score": game_state["computer_score"],
        "round": game_state["round"],
        "game_over": game_over,
        "final_winner": final_winner if game_over else None,
        "available_pokemon": remaining_pokemon,
        "user_used_cards": game_state["user_used_cards"],
        "computer_used_cards": game_state["computer_used_cards"]
    })

if __name__ == '__main__':
    app.run(debug=True)