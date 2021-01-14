//-----------------------------------MODELS-------------------------------------------
class Dementia {
  static w = [];

  static buildPage() {
    //cache reference to main div
    this.w.main = document.getElementById("main");

    //Marquee container is at the top of the page and holds three inner divs
    this.w.marquee = document.createElement("div");
    this.w.marquee.id = "marquee";
    this.w.marquee.classList.add("flex", "flex-row", "items-center", "absolute", "top-0", "w-screen", "h-14", "bg-gray-600", "outline-gray", "shadow-xl", "z-10");
    this.w.main.appendChild(this.w.marquee);

    //Marquee child divs to hold spans for text
    this.w.marqLeft = document.createElement("div");
    this.w.marqLeft.id = "marqLeft";
    this.w.marqLeft.classList.add("flex", "w-1/5", "justify-start");
    this.w.marquee.appendChild(this.w.marqLeft);

    this.w.mlSpan = document.createElement("span");
    this.w.mlSpan.id = "mlSpan";
    this.w.mlSpan.classList.add("text-4xl", "text-gray-300");
    this.w.marqLeft.appendChild(this.w.mlSpan);

    this.w.marqCenter = document.createElement("div");
    this.w.marqCenter.id = "marqCenter";
    this.w.marqCenter.classList.add("flex", "w-3/5", "justify-center");
    this.w.marquee.appendChild(this.w.marqCenter);

    this.w.mcSpan = document.createElement("span");
    this.w.mcSpan.id = "mcSpan";
    this.w.mcSpan.classList.add("text-4xl", "text-gray-300");
    this.w.marqCenter.appendChild(this.w.mcSpan);

    this.w.marqRight = document.createElement("div");
    this.w.marqRight.id = "marqRight";
    this.w.marqRight.classList.add("flex", "w-1/5", "justify-end");
    this.w.marquee.appendChild(this.w.marqRight);

    this.w.mrSpan = document.createElement("span");
    this.w.mrSpan.id = "mrSpan";
    this.w.mrSpan.classList.add("text-4xl", "text-gray-300");
    this.w.marqRight.appendChild(this.w.mrSpan);


    //Field is where the game is played, buttons are pushed, etc.
    this.w.field = document.createElement("div");
    this.w.field.id = "field";
    this.w.field.classList.add("flex", "flex-col", "h-full", "bg-gray-400", "items-center");
    this.w.main.appendChild(this.w.field);

    //Table-container holds the rows and single elements of a tailwind grid
    this.w.tableContainer = document.createElement("div");
    this.w.tableContainer.id = "table-container";
    this.w.tableContainer.classList.add("container", "absolute", "top-16");
    this.w.field.appendChild(this.w.tableContainer);

    //The actual table is constructed here with 4 rows of 5 positions each
    this.w.row = [];
    this.w.pos = [];
    this.w.pSpan = [];
    for (let i = 1; i < 5; i++) {
      this.w.row[i] = document.createElement("div");
      this.w.row[i].id = `row-${i}`;
      this.w.row[i].classList.add("flex", "flex-row", "justify-center");
      this.w.tableContainer.appendChild(this.w.row[i]);
      //Fancy mathin'
      for (let j = 0 + ((i-1) * 5) ; j < 5 + ((i-1) * 5); j++) {
        this.w.pos[j] = document.createElement("div");
        this.w.pos[j].id = `pos-${j}`;
        this.w.pos[j].classList.add("flex", "items-center", "justify-center", "h-28", "w-20", "m-4", "bg-gray-400", "border-gray-500", "border-4", "rounded-lg", "z-10", "shadow-xl");
        this.w.row[i].appendChild(this.w.pos[j]);

        this.w.pSpan[j] = document.createElement("div");
        this.w.pSpan[j].id = `pSpan-${j}`;
        this.w.pSpan[j].classList.add("text-6xl", "pointer-events-none");
        this.w.pSpan[j].textContent = "?";
        this.w.pos[j].appendChild(this.w.pSpan[j]);
      }
    }

    //Popup floats over everything else and displays messages and response buttons
    this.w.popup = document.createElement("div");
    this.w.popup.id = "popup";
    this.w.popup.classList.add("flex", "flex-col", "rounded-lg", "w-96", "bg-gray-500", "absolute", "top-48", "z-20", "shadow-xl");
    this.w.field.appendChild(this.w.popup);

    this.w.popMessage = document.createElement("span");
    this.w.popMessage.id = "popMessage";
    this.w.popMessage.classList.add("text-6xl", "text-gray-800", "m-2", "p-2", "text-center");
    this.w.popup.appendChild(this.w.popMessage);

    this.w.popInput = document.createElement("input");
    this.w.popInput.id = "popInput";
    this.w.popInput.placeholder = "Jane Doe";
    this.w.popInput.classList.add("text-4xl", "text-gray-800", "mx-2", "mt-2", "mb-1", "rounded-lg", "px-2", "py-1", "outline-none");
    this.w.popup.appendChild(this.w.popInput);

    this.w.btnNewGame = document.createElement("button");
    this.w.btnNewGame.id = "btnNewGame";
    this.w.btnNewGame.textContent = "Probably!";
    this.w.btnNewGame.classList.add("text-2xl", "bg-gray-400", "mx-2", "mt-1", "mb-2", "rounded-lg", "px-2");
    this.w.popup.appendChild(this.w.btnNewGame);

    this.w.btnStartGame = document.createElement("button");
    this.w.btnStartGame.id = "btnStartGame";
    this.w.btnStartGame.textContent = "Whizbang!";
    this.w.btnStartGame.classList.add("text-2xl", "bg-gray-400", "mx-2", "mt-1", "mb-2", "rounded-lg", "px-2");
    this.w.popup.appendChild(this.w.btnStartGame);

    this.w.tableContainer.classList.add("hidden");
    this.w.popup.classList.add("hidden");
    this.w.popInput.classList.add("hidden");
    this.w.btnStartGame.classList.add("hidden");

    Dementia.displayLanding();
  }

  static newGame() {
    this.game = new Game();
    this.game.persist();
  }

  static async setupGame() {
    this.game.state = 1;

    let playerName = document.querySelector("#popInput").value;

    let playerObj = this.game.addPlayer(playerName);
    this.player = playerObj;
    await playerObj.persist();

    let boardObj = playerObj.addBoard();
    this.board = boardObj;
    await boardObj.persist();

    for (let i = 0; i < 20; i++) {
      let positionObj = boardObj.addPosition();
      await positionObj.persist();
      positionObj.element = document.querySelector(`#pos-${i}`);
      
      let cardObj = positionObj.addCard(0);
      await cardObj.persist();
    }
    Dementia.board.shuffleCards();
  }

  static playGame() {
    this.game.state = 2;
    this.game.time = 121;

    this.interval = setInterval( 
      () => {
        if (this.game.state == 2) {
          this.game.time--;
          this.w.mlSpan.textContent = this.game.time;
          if (this.game.time == 10) {
            this.w.mlSpan.classList.add("animate-ping");
          }
          if (this.game.time == 0) {
            this.w.mlSpan.classList.remove("animate-ping");
            Dementia.endGame();
            Dementia.displayEnd();
          }
        }
      },
      1000);
  }

  static endGame() {
    clearInterval(this.interval);
    this.game.state = 3;
    this.game.players[0].boards[0].lock();
    this.game.players[0].boards[0].positions.forEach(
      position => {
        position.element.classList.remove("animate-bounce")
        position.element.classList.add("animate-spin");
      }
    );
  }

  static displayLanding() {
    this.w.mcSpan.textContent = "DEMENTIA!!!";
    this.w.popMessage.textContent = "New Game?";
    this.w.popup.classList.remove("hidden");
    this.w.btnNewGame.classList.remove("hidden");
  }

  static displaySetup() {
    this.w.mcSpan.textContent = "Game Setup";
    this.w.popMessage.textContent = "Got a name?";
    this.w.btnNewGame.classList.add("hidden");
    this.w.popInput.classList.remove("hidden");
    this.w.btnStartGame.classList.remove("hidden");
  }

  static displayGame() {
    this.w.mcSpan.textContent = "Remember Not to Forget!";
    this.w.mlSpan.textContent = Dementia.game.time;
    this.w.mrSpan.textContent = Dementia.game.players[0].score;
    this.w.popup.classList.add("hidden", "pointer-events-none");
    this.w.tableContainer.classList.remove("hidden");
  }

  static displayEnd() {
    this.w.mcSpan.textContent ="It's Over!";
    this.w.popInput.classList.add("hidden");
    this.w.btnStartGame.classList.add("hidden");
    this.w.popup.classList.remove("hidden", "pointer-events-none");
    this.w.popMessage.textContent = "Too Bad, sir!\nBetter Luck Next Time";
  }
}

class Game {
  players = [];

  constructor() {
    this.id = null;
    this.state = 0;
    this.turn = 0;
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
    this.score = 0;
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
    this.locked = false;
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

  async shuffleCards() {
    this.lock();
    let cardArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    let cardsLeft = cardArray.length - 1;
    let randoCalrissian = 0;
    let valueMover = 0;
  
    // While there remain elements to shuffle…
    while (cardsLeft) {
  
      // Pick a remaining element…
      randoCalrissian = Math.floor(Math.random() * cardsLeft);
  
      // And swap it with the current element.
      valueMover = cardArray[cardsLeft];
      cardArray[cardsLeft] = cardArray[randoCalrissian];
      cardArray[randoCalrissian] = valueMover;
      cardsLeft--;
    }

    console.log(cardArray);
    for (let i = 0; i < 20; i++) {
      let position = this.positions[i];
      position.card.value = cardArray[i];
      await position.card.update();
    }
    this.unlock();
  }

  lock() {
    if (!this.locked) {
      let tc = document.getElementById("table-container");
      tc.classList.toggle("pointer-events-none");
      this.locked = true;
    }
  }

  unlock() {
    if (this.locked) {
      let tc = document.getElementById("table-container");
      tc.classList.toggle("pointer-events-none");
      this.locked = false;
    }
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

  update() {
    return FetchAdapter.updateData(
      `http://localhost:3000/games/${this.position.board.player.game.id}/players/${this.position.board.player.id}/boards/${this.position.board.id}/positions/${this.position.id}/cards/${this.id}`, 
      {
        card: {
          value: this.value,
          position_id: this.position.id
        }
      }
    );
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
    return fetch(
      url,
      {
        method: "PUT",
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
  Dementia.buildPage();
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
  else if (e.target.id.includes("pos")) {
    Dementia.game.turn++;
    position = Dementia.game.players[0].boards[0].positions[e.target.id.split("-")[1]];
    e.target.firstChild.textContent = position.card.value;
    if (Dementia.game.turn % 2 == 1) {
      Dementia.game.players[0].chosenPosition = position;
      e.target.classList.add("animate-bounce");
      e.target.classList.add("pointer-events-none");
    }
    else {
      if (Dementia.game.players[0].chosenPosition.card.value == position.card.value) {
        Dementia.game.players[0].boards[0].lock();
        setTimeout( () => {
          Dementia.game.players[0].chosenPosition.element.classList.remove("animate-bounce");
          Dementia.game.players[0].chosenPosition.element.classList.add("opacity-0");
          position.element.classList.add("opacity-0");
          position.element.classList.add("pointer-events-none");
          Dementia.game.players[0].score++;
          Dementia.w.mrSpan.textContent = Dementia.game.players[0].score;
          if (Dementia.game.players[0].score % 10 == 0) {
            Dementia.game.players[0].boards[0].shuffleCards();
            Dementia.game.players[0].boards[0].positions.forEach( position => position.element.firstChild.textContent = "?");
            Dementia.game.players[0].boards[0].positions.forEach( position => position.element.classList.remove("opacity-0"));
            Dementia.game.players[0].boards[0].positions.forEach( position => position.element.classList.remove("pointer-events-none"));
          }
          Dementia.game.players[0].boards[0].unlock();
        }, 1000); 
      }
      else {
        Dementia.game.players[0].boards[0].lock();
        setTimeout( () => {
          Dementia.game.players[0].chosenPosition.element.classList.remove("pointer-events-none");
          Dementia.game.players[0].chosenPosition.element.classList.remove("animate-bounce");
          Dementia.game.players[0].chosenPosition.element.firstChild.textContent = "?";
          position.element.firstChild.textContent = "?";
          Dementia.game.players[0].boards[0].unlock();
        }, 1000);
      }
    }
  }
});
