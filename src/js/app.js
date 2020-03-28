
let deck=[]
const types=["C","D","H","S"];
const typesEspecial = ["A", "J", "Q", "K"];
const createDeck=()=>{
    for (let i = 2; i <=10; i++) {
        // deck.push(i+"C")
        for (const type of types) {
            deck.push(i+type)
        }
    }
    for (let type of types) {
        for(let especial of typesEspecial){
            deck.push(especial+type)
        }
    }
    
console.log(deck)
deck=_.shuffle(deck)
console.log(deck)
return deck;
}
createDeck()