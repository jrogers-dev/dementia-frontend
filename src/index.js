//MODELS

class Dementia {
  static marqueeContainer() {
    //return this.mc ||= document.querySelector('#marquee');
  }

  static fieldContainer() {
    //return this.fc ||= document.querySelector('#field');
  }

  static bottomContainer() {
    //return this.bc ||= document.querySelector('#bottom');
  }

  static displayLanding() {

  }

  static displaySetup() {

  }

  static displayGame() {

  }
}


class Game {
  constructor() {

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