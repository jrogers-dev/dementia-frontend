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
  }

  static async setupGame() {
    this.game.state = 1;

    let playerName = document.querySelector("#inputPlayerName").value;

    let playerObj = this.game.addPlayer(playerName);
    await playerObj.persist();

    let boardObj = playerObj.addBoard();
    await boardObj.persist();

    for (let i = 0; i < 20; i++) {
       let positionObj = boardObj.addPosition();
       await positionObj.persist();
       let cardObj = positionObj.addCard(i);
       await cardObj.persist();
    }

    this.game.state = 2;
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
      return FetchAdapter.postData("http://localhost:3000/games", {state: 0})
        .then(result => {
          this.id = result.data.id;
          this.state = result.data.attributes.state;
          this.persisted = true;
          return result;
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
    let newPlayer = new Player(name, this);
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
        return tempGame;
      })
      .catch(err => console.log(err));
    ;
  }

  static all() {
    FetchAdapter.fetchData("http://localhost:3000/games")
      .then(result => console.log(result.data));
  }
}

class Player {
  boards = [];

  constructor(name, game) {
    this.id = null;
    this.name = name;
    this.game = game;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      return FetchAdapter.postData(`http://localhost:3000/games/${this.game.id}/players`, {
        player: {
          name: this.name,
          game_id: this.game.id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
          return result;
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
    let newBoard = new Board(this);
    this.boards.push(newBoard);
    return newBoard;
  }

  static find(id, game_id) {
    let tempPlayer =  new Player("???", game_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${id}`)
      .then(result => {
        console.log(result);
        tempPlayer.id = result.data.id;
        tempPlayer.name = result.data.name;
        tempPlayer.game = Game.find(game_id);
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

  constructor(player) {
    this.clear = false;
    this.rotation = 0;
    this.player = player;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      return FetchAdapter.postData(`http://localhost:3000/games/${this.player.game.id}/players/${this.player.id}/boards`, {
        board: {
          clear: this.clear,
          rotation: this.rotation,
          player_id: this.player.id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
          return result;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Board object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.player.game.id}/players/${this.player.id}/boards/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.name = null;
    this.game_id = null;
    this.persisted = false;
  }

  addPosition() {
    let newPosition = new Position(this);
    this.positions.push(newPosition);
    return newPosition;
  }

  static find(id, player_id, game_id) {
    let tempBoard =  new Board(player_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${player_id}/boards/${id}`)
      .then(result => {
        console.log(result);
        tempBoard.id = result.data.id;
        tempBoard.player = Player.find(player_id, game_id);
        tempBoard.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempBoard;
  }

  static all(player_id, game_id) {
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${player_id}/boards`)
      .then(result => console.log(result.data));
  }
}

class Position {
  constructor(board) {
    this.card = null;
    this.board = board;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      return FetchAdapter.postData(`http://localhost:3000/games/${this.board.player.game.id}/players/${this.board.player.id}/boards/${this.board.id}/positions`, {
        position: { board_id: this.board.id}
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
          return result;
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

  addCard(value) {
    let newCard = new Card(value, this);
    this.card = newCard;
    return newCard;
  }

  static find(id, board_id, player_id, game_id) {
    let tempPosition =  new Position(board_id, player_id, game_id); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${player_id}/boards/${board_id}/positions/${id}`)
      .then(result => {
        console.log(result);
        tempPosition.id = result.data.id;
        tempPosition.board = Board.find(board_id, player_id, game_id);
        tempPosition.persisted = true;
      })
      .catch(err => console.log(err));
    ;
    return tempPosition;
  }

  static all(game_id) {
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players`)
      .then(result => console.log(result.data));
  }
}

class Card {
  constructor(value, position) {
    this.value = value;
    this.position = position;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      return FetchAdapter.postData(`http://localhost:3000/games/${this.position.board.player.game.id}/players/${this.position.board.player.id}/boards/${this.position.board.id}/positions/${this.position.id}/cards`, {
        card: {
          value: this.value,
          position_id: this.position.id
        }
      })
        .then(result => {
          this.id = result.data.id;
          this.persisted = true;
          return result;
        })
        .catch(err => console.log(err))
      ;
    }
    else {
      console.log("Card object already exists in database");
    }
  }

  destroy() {
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.game_id}/players/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.position = null;
    this.persisted = false;
  }
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
    ).then(response => {
        if(!response.ok) {
          response.text().then(text => { throw Error(text) });
        }
       else {
        return response.json();
       }
    });
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
    Dementia.playGame();
  }
});



//-----------------------------------HELPERS---------------------------------------------
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}