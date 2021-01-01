//-----------------------------------MODELS-------------------------------------------
class Dementia {
  static marqueeContainer() {
    this.mc ||= document.querySelector("#marquee");
    //console.log(this.mc);
    return this.mc;
  }

  static fieldContainer() {
    this.fc ||= document.querySelector('#field');
    //console.log(this.fc);
    return this.fc;
  }

  static bottomContainer() {
    this.bc ||= document.querySelector('#bottom');
    //console.log(this.bc);
    return this.bc;
  }

  static newGame() {
    this.game = new Game();
    console.log(this.game);
    this.displaySetup();
  }

  static setupGame() {

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

  static find(game_id) {
    let tempGame =  new Game(); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}`)
      .then(result => {
        tempGame.id = result.data.id;
        tempGame.state = result.data.state;
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
  constructor(name, game_id) {
    this.id = null;
    this.name = name;
    this.game_id = game_id;
    this.persisted = false;
  }

  persist() {
    if (this.persisted == false) {
      FetchAdapter.postData(`http://localhost:3000/games/${this.game_id}/players`, {
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
    FetchAdapter.destroyData(`http://localhost:3000/games/${this.id}`)
      .then(result => console.log(result));
    this.id = null;
    this.state = null;
    this.persisted = false;
  }

  static find(id, game_id) {
    let tempPlayer =  new Player(); 
    FetchAdapter.fetchData(`http://localhost:3000/games/${game_id}/players/${id}`)
      .then(result => {
        tempPlayer.id = result.data.id;
        tempPlayer.game_id = result.data.game_id;
        tempPlayer.name = result.data.name;
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

}

class Position {

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
  }
  else if (e.target.id == "btnStartGame") {
    Dementia.displayGame();
  }
});



//-----------------------------------HELPERS---------------------------------------------
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}