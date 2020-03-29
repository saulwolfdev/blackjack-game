// const _ = require("underscore");

let deck = [];
const types = ["C", "D", "H", "S"];
const typesEspecial = ["A", "J", "Q", "K"];

let pointUser = 0;
let pointComputer = 0;

const buttonNew = document.querySelector(".controls-button-new");
const buttonRequest = document.querySelector(".controls-button-request");
const buttonStop = document.querySelector(".controls-button-stop");

const pointsGame = document.querySelectorAll("small");

const divUserCard = document.querySelector(".user-cards");
const divComputerCard = document.querySelector(".computer-cards");
const divMessage=document.querySelector(".message");
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
  deck = _.shuffle(deck);
  return deck;
};
createDeck();

const requestCard = () => {
  if (deck.length === 0) {
    throw "NO hay carta";
  }
  const card = deck.pop();
  return card;
};
requestCard();

const valueCard = card => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const value = valueCard(requestCard());

const pointComputerGame = pointMin => {
  do {
    const card = requestCard();
    pointComputer = pointComputer + valueCard(card);
    pointsGame[1].innerText = pointComputer;

    const imgCard = document.createElement("img");
    imgCard.src = `img/cartas/${card}.png`;
    imgCard.classList.add("user-cards-img");
    divComputerCard.append(imgCard);

    if (pointMin > 21) {
      break;
    }
  } while (pointComputer < pointMin && pointMin <= 21);
  setTimeout(() => {
        const itemText = document.createElement("h4");
                itemText.classList.add("message_text");
                divMessage.append(itemText);
        if (pointComputer === pointMin) {
            itemText.innerText="NADIE GANA"
        } else if (pointMin > 21) {
              itemText.innerText = "GANA COMPUTADORA"
        } else if (pointComputer > 21) {
             itemText.innerText = "GANA JUGADOR"
        }else{
              itemText.innerText = "GANA COMPUTADORA"
        }
  },10);
   
};

/////////EVENTOS
buttonRequest.addEventListener("click", () => {
  const card = requestCard();
  pointUser = pointUser + valueCard(card);
  pointsGame[0].innerText = pointUser;

  const imgCard = document.createElement("img");
  imgCard.src = `img/cartas/${card}.png`;
  imgCard.classList.add("user-cards-img");
  divUserCard.append(imgCard);

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
  pointComputerGame(pointUser);
});

buttonNew.addEventListener("click",()=>{
    deck=createDeck();
    deck=[];
    pointUser=0;
    pointComputer=0;
    pointsGame[0].innerText=0;
    pointsGame[1].innerText=0;
    divComputerCard.innerHTML="";
    divUserCard.innerHTML="";
    buttonRequest.disabled=false;
    buttonStop.disabled=false;
    console.clear()
})