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
    spanBanner.classList.add("flex", "justify-center", "text-4xl");
    console.log(spanBanner);
    Dementia.marqueeContainer().appendChild(spanBanner);

    let btnNewGame = document.createElement("button");
    btnNewGame.id = "btnNewGame";
    btnNewGame.textContent = "New Game";
    btnNewGame.classList.add("flex", "bg-blue-500", "rounded", "px-2");
    console.log(btnNewGame);
    Dementia.fieldContainer().appendChild(btnNewGame);
  }

  static displaySetup() {
    let setupBanner = document.createElement("span");
    setupBanner.id = "setupBanner";
    setupBanner.textContent = "Game Setup";
    setupBanner.classList.add("flex", "justify-center", "text-4xl");
    console.log(setupBanner);
    Dementia.marqueeContainer().appendChild(setupBanner);

    let btnStartGame = document.createElement("button");
    btnStartGame.id = "btnNewGame";
    btnStartGame.textContent = "New Game";
    btnStartGame.classList.add("flex", "bg-green-500", "rounded", "px-2");
    console.log(btnStartGame);
    Dementia.fieldContainer().appendChild(btnStartGame);
  }

  static displayGame() {

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
})