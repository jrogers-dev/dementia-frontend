//MODELS

class Dementia {
  static marqueeContainer() {
    this.mc ||= document.querySelector("#marquee");
    console.log(this.mc);
    return this.mc;
  }

  static fieldContainer() {
    this.fc ||= document.querySelector('#field');
    console.log(this.fc);
    return this.fc;
  }

  static bottomContainer() {
    this.bc ||= document.querySelector('#bottom');
    console.log(this.bc);
    return this.bc;
  }

  static displayLanding() {
    let spanBanner = document.createElement("span");
    spanBanner.id = "spanBanner";
    spanBanner.textContent = "DEMENTIA!!!";
    spanBanner.classList.add("text-4xl");
    Dementia.marqueeContainer().appendChild(spanBanner);

    let btnNewGame = document.createElement("button");
    btnNewGame.id = "btnNewGame";
    btnNewGame.textContent = "Start Game";
    btnNewGame.classList.add("bg-blue-500", "rounded", "px-2");
    console.log(btnNewGame);
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
    console.log(setupBanner);
    Dementia.marqueeContainer().appendChild(setupBanner);

    let btnStartGame = document.createElement("button");
    btnStartGame.id = "btnStartGame";
    btnStartGame.textContent = "Let's Go!";
    btnStartGame.classList.add("bg-green-500", "rounded", "px-2");
    console.log(btnStartGame);
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
    console.log(gameBanner);
    Dementia.marqueeContainer().appendChild(gameBanner);
  }
}


class Game {
  constructor() {
    FetchAdapter.postData("http://localhost:3000/games", {})
      .then(result => { this.id = result.id });
    this.state = 0;
  }

  static all() {
    FetchAdapter.fetchData("http://localhost:3000/games")
      .then(result => console.log(result));
  }
}

class Player {

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

  static deleteData(url) {

  }
}

//LISTENERS
 
document.addEventListener('DOMContentLoaded', function(e) {
  Dementia.displayLanding();
})

document.addEventListener('click', function(e) {
  console.dir(e.target)

  if (e.target.id == "btnNewGame") {
    Dementia.displaySetup();
  }
  else if (e.target.id == "btnStartGame") {
    Dementia.displayGame();
  }
})

//HELPERS

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}