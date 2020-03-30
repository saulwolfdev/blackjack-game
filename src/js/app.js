// const _ = require("underscore");
const firtsModule=(()=>{
  "use strict"
  let deck = [];
  const types = ["C", "D", "H", "S"];
  const typesEspecial = ["A", "J", "Q", "K"];

  // let pointUser = 0;
  // let pointComputer = 0;

  let puntosJugadores = [];

  const buttonNew = document.querySelector(".controls-button-new");
  const buttonRequest = document.querySelector(".controls-button-request");
  const buttonStop = document.querySelector(".controls-button-stop");
  const pointsGame = document.querySelectorAll("small")
  const divMessage = document.querySelector(".message");

  const divCardsGamers = document.querySelectorAll(".user-cards");

  const initialDeckGame = (numeroJugadores = 2) => {
    deck = createDeck();
    puntosJugadores = []
    for (let i = 0; i < numeroJugadores; i++) {
      puntosJugadores.push(0)
    }
    pointsGame.forEach(elem => elem.innerText = 0);
    divCardsGamers.forEach(elem => elem.innerHTML = "");

    buttonRequest.disabled = false;
    buttonStop.disabled = false;
  }
  const acumularPuntos = (card, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valueCard(card);
    pointsGame[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCartasJugadores = (card, turno) => {
    const imgCard = document.createElement("img");
    imgCard.src = `img/cartas/${card}.png`;
    imgCard.classList.add("user-cards-img");
    divCardsGamers[turno].append(imgCard)
  }

  const determinarGanador = () => {

    const [pointMin, pointComputer] = puntosJugadores
    setTimeout(() => {
      const itemText = document.createElement("h4");
      itemText.classList.add("message_text");
      divMessage.append(itemText);
      if (pointComputer === pointMin) {
        itemText.innerText = "NADIE GANA"
      } else if (pointMin > 21) {
        itemText.innerText = "GANA COMPUTADORA"
      } else if (pointComputer > 21) {
        itemText.innerText = "GANA JUGADOR"
      } else {
        itemText.innerText = "GANA COMPUTADORA"
      }
    }, 10);
  }
  //////////////////////////////
  const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (const type of types) {
        deck.push(i + type);
      }
    }
    for (let type of types) {
      for (let especial of typesEspecial) {
        deck.push(especial + type);
      }
    }
    return _.shuffle(deck);
  };


  const requestCard = () => {
    if (deck.length === 0) {
      throw "NO hay carta";
    }
    return deck.pop();
  };

  const valueCard = card => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  const pointComputerGame = pointMin => {
    let pointComputer = 0;
    do {
      const card = requestCard();
      pointComputer = acumularPuntos(card, puntosJugadores.length - 1);
      crearCartasJugadores(card, puntosJugadores.length - 1)
    } while (pointComputer < pointMin && pointMin <= 21);
    determinarGanador();

  };

  /////////EVENTOS
  buttonRequest.addEventListener("click", () => {
    let pointUser=0;
    const card = requestCard();
    pointUser = acumularPuntos(card, 0);
    crearCartasJugadores(card, 0)
    if (pointUser > 21) {
      console.warn("sorry your Lost");
      buttonRequest.disabled = true;
      buttonStop.disabled = true;
      buttonRequest.classList.add("controls-button-lost");
      pointComputerGame(pointUser);
    } else if (pointUser === 21) {
      console.warn("Yeah your Winner");
      buttonRequest.disabled = true;
      buttonStop.disabled = true;
      pointComputerGame(pointUser);
    }
  });
  buttonStop.addEventListener("click", () => {
    buttonRequest.disabled = true;
    buttonStop.disabled = true;
    pointComputerGame(puntosJugadores[0]);
  });

  buttonNew.addEventListener("click", () => {
    initialDeckGame();

  })
  return {
    juego:initialDeckGame
  }
})();