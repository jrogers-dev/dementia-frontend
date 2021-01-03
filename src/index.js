//-----------------------------------MODELS-------------------------------------------
class Dementia {
  static marqueeContainer() {
    this.mc ||= document.querySelector("#marquee");
    return this.mc;
  }

  static fieldContainer() {
    this.fc ||= document.querySelector('#field');
    return this.fc;
  }

  static bottomContainer() {
    this.bc ||= document.querySelector('#bottom');
    return this.bc;
  }

  static newGame() {
    this.game = new Game();
    this.game.persist();
    return this.game;
  }

  static setupGame() {
    let playerName = document.querySelector("#inputPlayerName").value;
    console.log(playerName);
    let playerObj = this.game.addPlayer(playerName);
    let boardObj = playerObj.addBoard();
    for (let i = 0; i < 20; i++) {
      let positionObj = boardObj.addPosition();
    }

    this.playGame();
  }

  static playGame() {
    
  }


  static displayLanding() {
    let spanBanner = document.createElement("span");
    spanBanner.id = "spanBanner";
    spanBanner.textContent = "DEMENTIA!!!";
    spanBanner.classList.add("text-4xl");
    Dementia.marqueeContainer().appendChild(spanBanner);

    let btnNewGame = document.createElement("button");
    btnNewGame.id = "btnNewGame";
    btnNewGame.textContent = "New Game";
    btnNewGame.classList.add("bg-blue-500", "rounded", "px-2");
    Dementia.bottomContainer().appendChild(btnNewGame);
  }

  static displaySetup() {
    removeAllChildNodes(Dementia.marqueeContainer());
    removeAllChildNodes(Dementia.fieldContainer());
    removeAllChildNodes(Dementia.bottomContainer());

    let setupBanner = document.createElement("span");
    setupBanner.id = "setupBanner";
    setupBanner.textContent = "Game Setup";
    setupBanner.classList.add("justify-center", "text-4xl");
    Dementia.marqueeContainer().appendChild(setupBanner);

    let inputPlayerName = document.createElement("input");
    inputPlayerName.id = "inputPlayerName";
    inputPlayerName.type = "text";
    inputPlayerName.placeholder = "Player Name";
    inputPlayerName.classList.add("text-4xl");
    Dementia.fieldContainer().appendChild(inputPlayerName);

    let btnStartGame = document.createElement("button");
    btnStartGame.id = "btnStartGame";
    btnStartGame.textContent = "Let's Go!";
    btnStartGame.classList.add("bg-green-500", "rounded", "px-2");
    Dementia.bottomContainer().appendChild(btnStartGame);
  }

  static displayGame() {
    removeAllChildNodes(Dementia.marqueeContainer());
    removeAllChildNodes(Dementia.fieldContainer());
    removeAllChildNodes(Dementia.bottomContainer());

    let gameBanner = document.createElement("span");
    gameBanner.id = "gameBanner";
    gameBanner.textContent = "Remember Not to Forget!";
    gameBanner.classList.add("flex", "justify-center", "text-4xl");
    Dementia.marqueeContainer().appendChild(gameBanner);
  }
}

class Game {
  players = [];

  constructor() {
    this.id = null;
    this.state = 0;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      FetchAdapter.postData("http://localhost:3000/games", {state: 0})
        .then(result => {
          this.id = result.data.id;
          this.state = result.data.attributes.state;
          this.persisted = true;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Game object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.state = null;
    this.persisted = false;
  }

  addPlayer(name) {
    let newPlayer = new Player(name, this.id);
    newPlayer.persist();
    this.players.push(newPlayer);
    return newPlayer;
  }

  static find(game_id) {
    let tempGame =  new Game(); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}`)
      .then(result => {
        tempGame.id = result.data.id;
        tempGame.state = result.data.attributes.state;
        tempGame.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempGame;
  }

  static all() {
    FetchAdapter.fetchData("http://localhost:3000/games")
      .then(result => console.log(result.data));
  }
}

class Player {
  boards = [];

  constructor(name, game_id) {
    this.id = null;
    this.name = name;
    this.game = Game.find(game_id);
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      FetchAdapter.postData(`http://localhost:3000/games/${this.game_id}/players`, {
        player: {
          name: this.name,
          game_id: this.game.id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Player object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.game_id}/players/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.name = null;
    this.game_id = null;
    this.persisted = false;
  }

  addBoard() {
    let newBoard = new Board(this.id, this.game.id);
    newBoard.persist();
    this.boards.push(newBoard);
    return newBoard;
  }

  static find(id, game_id) {
    let tempPlayer =  new Player("Bob", game_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${id}`)
      .then(result => {
        console.log(result);
        tempPlayer.id = result.id;
        tempPlayer.game_id = result.game_id;
        tempPlayer.name = result.name;
        tempPlayer.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempPlayer;
  }

  static all(game_id) {
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players`)
      .then(result => console.log(result.data));
  }
}

class Board {
  positions = [];

  constructor(player_id) {
    this.clear = false;
    this.rotation = 0;
    this.player = Player.find(player_id, game_id);
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      FetchAdapter.postData(`http://localhost:3000/games/${this.player.game.id}/players/${this.player.id}/boards`, {
        board: {
          player_id: this.player.id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Board object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.game_id}/players/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.name = null;
    this.game_id = null;
    this.persisted = false;
  }

  addPosition() {
    let newPosition = new Position(this.id);
    newPosition.persist();
    this.positions.push(newPosition);
    return newPosition;
  }

  static find(id, game_id) {
    let tempPlayer =  new Player("Bob", game_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${id}`)
      .then(result => {
        console.log(result);
        tempPlayer.id = result.id;
        tempPlayer.game_id = result.game_id;
        tempPlayer.name = result.name;
        tempPlayer.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempPlayer;
  }

  static all(game_id) {
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players`)
      .then(result => console.log(result.data));
  }
}

class Position {
  constructor(board_id) {
    this.card = null;
    this.board = Board.find(board_id, )
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      FetchAdapter.postData(`http://localhost:3000/games/${Dementia.game.id}/players`, {
        player: {
          name: this.name,
          game_id: this.game_id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Player object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.game_id}/players/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.name = null;
    this.game_id = null;
    this.persisted = false;
  }

  addPosition() {
    let newPosition = new Position(this.id);
    newPosition.persist();
    this.positions.push(newPosition);
    return newPosition;
  }

  static find(id, game_id) {
    let tempPlayer =  new Player("Bob", game_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${id}`)
      .then(result => {
        console.log(result);
        tempPlayer.id = result.id;
        tempPlayer.game_id = result.game_id;
        tempPlayer.name = result.name;
        tempPlayer.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempPlayer;
  }

  static all(game_id) {
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players`)
      .then(result => console.log(result.data));
  }
}

class Card {

}


class FetchAdapter {
  static fetchData(url) {
    return fetch(url).then(response => response.json());
  }

  static postData(url, data) {
    return fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      }
    ).then(response => response.json());
  }

  static updateData(url, data) {

  }

  static destroyData(url) {
    return fetch(
      url, 
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );
  }
}



//-----------------------------------LISTENERS------------------------------------------- 
document.addEventListener('DOMContentLoaded', function(e) {
  Dementia.displayLanding();
});

document.addEventListener('click', function(e) {
  console.dir(`Clicked: ${e.target.id}`);

  if (e.target.id == "btnNewGame") {
    Dementia.newGame();
    Dementia.displaySetup();
  }
  else if (e.target.id == "btnStartGame") {
    Dementia.setupGame();
    Dementia.displayGame();
  }
});



//-----------------------------------HELPERS---------------------------------------------
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}