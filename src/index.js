//MODELS

class Dementia {
  static buildPage() {

  }
  
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
  //Create page infrastructure. Render landing page.
})

document.addEventListener('click', function(e) {
  console.dir(e.target)
})