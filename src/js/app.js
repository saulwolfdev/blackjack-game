// const _ = require("underscore");

let deck = [];
const types = ["C", "D", "H", "S"];
const typesEspecial = ["A", "J", "Q", "K"];

let pointUser=0;
let pointComputer=0;

const buttonNew = document.querySelector(".controls-button-new");
const buttonRequest = document.querySelector(".controls-button-request");
const buttonStop = document.querySelector(".controls-button-stop");

const pointsGame=document.querySelectorAll("small")


const divUserCard = document.querySelector(".user-cards")

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
//   console.log(deck);
//console.log(card);
  return card;
};
requestCard();

const valueCard = card => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const value = valueCard(requestCard());

/////////EVENTOS
 buttonNew.addEventListener("click",()=>{
     const card=requestCard()
     pointUser=pointUser+valueCard(card);
     pointsGame[0].innerText=pointUser;
     
     
     const imgCard=document.createElement("img");
     imgCard.src=`img/cartas/${card}.png`;
     imgCard.classList.add("user-cards-img");
     divUserCard.append(imgCard)
     
     if(pointUser>21){
         console.warn("sorry your Lost")
         buttonNew.disabled=true;
     }else if(pointUser===21){
          console.warn("Yeah your Winner")
     }
     
 })
