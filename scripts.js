console.log('test')

//this just starts the game off with most buttons disabled, and as the game goes on, it changes

document.getElementById("hitButton").style.display = "none";
document.getElementById("shuffleButton").style.display = "none";
document.getElementById("newCardsButton").style.display = "none";
document.getElementById("doubleDownButton").style.display = "none";
document.getElementById("splitButton").style.display = "none";
document.getElementById("standButton").style.display = "none";


//this is just making each card individually to account for the cards being taken and not replaced

//global funcions here

//for the doubling down function
let doublingDown = 0;

//the variables for the splitting function
let secondCard = [];
let splitClicked = 0
let otherHand = [];
let otherHandSum = 0
let splitBet = 0


//players cards

let userHand = [];
let dealerHand = [];
let userSum = 0;
let dealerSum = 0;

//this is for the betting function
let pointAmount = 0
let betAmount = 0

//will put every card into here
let deckOfCards = []

// S means Spades
// H means Hearts
// C means Clubs
// D means Diamonds

//aces
let aceS = 1
let aceH = 1
let aceC = 1
let aceD = 1
//twos
let twoS = 2
let twoH = 2
let twoC = 2
let twoD = 2
//threes
let threeS = 3
let threeH = 3
let threeC = 3
let threeD = 3
//fours
let fourS = 4
let fourH = 4
let fourC = 4
let fourD = 4
//fives
let fiveS = 5
let fiveH = 5
let fiveC = 5
let fiveD = 5
//sixes
let sixS = 6
let sixH = 6 
let sixC = 6
let sixD = 6
//sevens
let sevenS = 7
let sevenH = 7
let sevenC = 7
let sevenD = 7
//eights
let eightS = 8
let eightH = 8
let eightC = 8
let eightD = 8
//nines
let nineS = 9
let nineH = 9
let nineC = 9
let nineD = 9
//tens
let tenS = 10
let tenH = 10
let tenC = 10
let tenD = 10
//jacks
let jackS = 10
let jackH = 10
let jackC = 10
let jackD = 10
//queens
let queenS = 10
let queenH = 10
let queenC = 10
let queenD = 10
//kings
let kingS = 10
let kingH = 10
let kingC = 10
let kingD = 10


//pushing the cards into the array
deckOfCards.push(aceS, aceH, aceC, aceD, twoS, twoH, twoC, twoD, threeS, threeH, threeC, threeD, fourS, fourH, fourC, fourD, fiveS, fiveH, fiveC, fiveD, sixS, sixH, sixC, sixD, sevenS, sevenH, sevenC, sevenD, eightS, eightH, eightC, eightD, nineS, nineH, nineC, nineD, tenS, tenH, tenC, tenD, jackS, jackH, jackC, jackD, queenS, queenH, queenC, queenD, kingS, kingH, kingC, kingD);

console.log('initial deck of cards: ' + deckOfCards);



//this function shuffles the deck, it uses a shuffle algorithm i learned online
function shuffle(){
  document.getElementById("newCardsButton").style.display = "";
  // this will be like a start game button 
  //i am using fisher-yates shuffle, learn more:https://bost.ocks.org/mike/shuffle/

  let m = deckOfCards.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = deckOfCards[m];
    deckOfCards[m] = deckOfCards[i];
    deckOfCards[i] = t;
  }

  console.log('shuffled deck: '+deckOfCards);
  document.getElementById("shuffleDisplay").innerHTML = 'Cards have been shuffled.';
  document.getElementById("shuffleButton").style.display = "none";
}


//this will take two cards from the deck and give the value to the player then the dealer
function newCards(){ 
  //TODO make the if statements to check if double down or split can be used, and enable them accordingly
  //ALSO TODO, IF THE USERSUM IS GREATER THEN 21 ON A NORMAL RUN, AUTOMATICALLY endgame
  document.getElementById("hitButton").style.display = "";
  document.getElementById("standButton").style.display = "";

  userHand.push(deckOfCards[51]);
  userSum += deckOfCards[51];
  deckOfCards.pop();

  userHand.push(deckOfCards[50]);
  userSum += deckOfCards[50];
  deckOfCards.pop();

  dealerHand.push(deckOfCards[49]);
  dealerSum += deckOfCards[49];
  deckOfCards.pop();

  //im only giving the dealer one card because normally the dealer only starts with one card then the other is revealed
  console.log('dealers hand: '+dealerHand);
  document.getElementById("dealerDisplayHand").innerHTML = 'Dealers Hand: '+dealerHand;
  console.log('users hand: '+userHand);
  document.getElementById("userDisplayHand").innerHTML = 'Your Hand: '+userHand;
  console.log('the deck after intial deal: '+deckOfCards);
  console.log('the dealer sum: '+dealerSum);
  document.getElementById("dealerDisplaySum").innerHTML = 'Sum: '+dealerSum;
  console.log('the user sum: '+userSum);
  document.getElementById("userDisplaySum").innerHTML = 'Sum: '+userSum;


  //this will make the double down option available
  if(userSum==9){
    document.getElementById("doubleDownButton").style.display = "";
  }
  if(userSum==10){
    document.getElementById("doubleDownButton").style.display = "";
  }
  if(userSum==11){
    document.getElementById("doubleDownButton").style.display = "";
  }


  //make it here to check if split can be used
  if(userHand[0]==userHand[1]){
    document.getElementById("splitButton").style.display = "";
  }
  document.getElementById("newCardsButton").style.display = "none";
}

//this is for the points
function win(){
  if(doublingDown==1){
    pointAmount += pointAmount;
    console.log('You now have: '+pointAmount);
    document.getElementById("payout").innerHTML = 'You now have: '+pointAmount;
  }
  else{
  pointAmount += betAmount;
  console.log('You now have: '+pointAmount)
  document.getElementById("payout").innerHTML = 'You now have: '+pointAmount;
  }
}

function lose(){
  if(doublingDown==1){
    pointAmount -= pointAmount
    console.log('You lost your points, you have: '+pointAmount)
    document.getElementById("payout").innerHTML = 'You now have: '+pointAmount;
  }
  else{
  pointAmount -= betAmount;
  console.log('You lost your points, you have: '+pointAmount)
  document.getElementById("payout").innerHTML = 'You now have: '+pointAmount;
  }
}

//this regards the hitting function
let timeClicked = 0;

function hit(){
  if(timeClicked == 0){
    //this is for if you dont click the split or double down option, it dissapears so you cant use it after the first hit
    if(splitClicked==0){
      document.getElementById("splitButton").style.display = "none";
    }
    if(doublingDown==0){
      document.getElementById("doubleDownButton").style.display = "none";
    }
    if(doublingDown == 1){
      document.getElementById("hitButton").style.display = "none";
    }

    dealerHand.push(deckOfCards[0]);
    dealerSum += deckOfCards[0];
    console.log('card drawn: '+deckOfCards[0]);
    deckOfCards.shift();
    console.log(dealerSum)
    console.log('dealers new hand: '+dealerHand);
    document.getElementById("dealerDisplayHand").innerHTML = 'Dealers Hand: '+dealerHand;
    document.getElementById("dealerDisplaySum").innerHTML = 'Sum: '+dealerSum;
  }
    userHand.push(deckOfCards[0]);
    userSum += deckOfCards[0];
    deckOfCards.shift();

  timeClicked += 1;
  console.log('users new hand: '+userHand);
  console.log('users sum: '+userSum);
  document.getElementById("userDisplayHand").innerHTML = 'Your Hand: '+userHand;
  document.getElementById("userDisplaySum").innerHTML = 'Sum: '+userSum;
  if(splitClicked==0){
    if(userSum>21){
      endGame()
      document.getElementById("hitButton").style.display = "none";
      document.getElementById("standButton").style.display = "none";
    }
  }
}

//all this is gonna do is switch the turn to the dealer, it will continue dealing itself cards until it reaches 17
function stand(){
  document.getElementById("standButton").style.display = "none";
  while(dealerSum<17){
    if(doublingDown==1){
      if(dealerSum>userSum){
        lose()
        document.getElementById("hitButton").style.display = "none";
        return;
      }
    }
    dealerHand.push(deckOfCards[0]);
    dealerSum += deckOfCards[0];
    console.log('card drawn: '+deckOfCards[0]);
    deckOfCards.shift();
    console.log(dealerSum)
    document.getElementById("dealerDisplayHand").innerHTML = 'Dealers Hand: '+dealerHand;
    document.getElementById("dealerDisplaySum").innerHTML = 'Sum: '+dealerSum;
    console.log('the user sum: '+userSum);
  }
  console.log('dealers new hand: '+dealerHand);
  document.getElementById("dealerDisplayHand").innerHTML = 'Dealers Hand: '+dealerHand;
  endGame();

  document.getElementById("betButton").style.display = "none";
  document.getElementById("shuffleButton").style.display = "none";
  document.getElementById("newCardsButton").style.display = "none";
  document.getElementById("doubleDownButton").style.display = "none";
  document.getElementById("splitButton").style.display = "none";
  document.getElementById("hitButton").style.display = "none";
  document.getElementById("standButton").style.display = "none";
}

//determines how much the player bets
function bet(){
  document.getElementById("betAmount").style.display = "none";
  document.getElementById("betButton").style.display = "none";
  document.getElementById("shuffleButton").style.display = "";
  document.getElementById("newCardsButton").style.display = "none";
  document.getElementById("doubleDownButton").style.display = "none";
  document.getElementById("splitButton").style.display = "none";
  document.getElementById("hitButton").style.display = "none";
  document.getElementById("standButton").style.display = "none";

  betAmount += parseInt(document.getElementById('betAmount').value)
  console.log('bet amount: '+ betAmount +' points');
  pointAmount += betAmount;
  document.getElementById("betDisplay").innerHTML = 'You have betted '+ betAmount +' points.';
}

function endGame(){
  if(splitClicked>0){
    //adjust the bet amount to the split
    //and have each their own payout bc its kinda complex
    if(otherHandSum>21){
      console.log('your first hand busted')
      document.getElementById("firstHand").innerHTML = 'Your first hand busted.';
      lose()
    }
    if(userSum>21){
      console.log('your second hand busted')
      document.getElementById("secondHand").innerHTML = 'Your second hand busted.';
      lose()
    }
    if(dealerSum>userSum){
      console.log('the dealer has won agaisnt the second hand');
      document.getElementById("secondHand").innerHTML = 'The dealer has won agaisnt the second hand.';
      lose()
    }
    if(dealerSum>otherHandSum){
      console.log('the dealer has won agaisnt the first hand');
      document.getElementById("firstHand").innerHTML = 'The dealer has won agaisnt the first hand.';
      lose()
    }
    
    if(userSum<22){
      if(userSum>dealerSum){
        console.log('your second hand won')
        document.getElementById("secondHand").innerHTML = 'Your second hand won.';
        win();
      }
    }
    if(otherHandSum<22){
      if(otherHandSum>dealerSum){
        console.log('your first hand won')
        document.getElementById("firstHand").innerHTML = 'Your first hand won.';
        win();
      }
    }
    if(userSum==dealerSum){
      console.log('your second hand was a draw')
      document.getElementById("secondHand").innerHTML = 'Your second hand was a draw.';
    }
    if(otherHandSum==dealerSum){
      console.log('your first hand was a draw')
      document.getElementById("firstHand").innerHTML = 'Your first hand was a draw.';
    }
    if(dealerSum>21){
      console.log('the dealer has busted')
      document.getElementById("feedback").innerHTML = 'The dealer has busted.';
      win()
      return;
    }
  }
  else{
    if(userSum>21){
      console.log('you busted')
      document.getElementById("feedback").innerHTML = 'You busted!';
      lose()
      return;
    }
    if(dealerSum>userSum){
      if(dealerSum>21){
        console.log('the dealer has busted')
        document.getElementById("feedback").innerHTML = 'The dealer busted.';
        win();
        return;
      }
      console.log('the dealer has won');
      document.getElementById("feedback").innerHTML = 'The dealer won.';
      lose()
    }
    
    if(userSum>dealerSum){
        console.log('the player has won')
        document.getElementById("feedback").innerHTML = 'You won!';
        win();
    }
    if(userSum==dealerSum){
      console.log('it is a draw')
      document.getElementById("feedback").innerHTML = 'It is a draw.';
    }
  }
  document.getElementById("betButton").style.display = "none";
  document.getElementById("standButton").style.display = "none";
  document.getElementById("hitButton").style.display = "none";
}


function split(){
  splitBet += pointAmount;
  //split the users cards into 2 arrays, and play first like normal, then reset everything but the points, and play the second
  //for the first time, it will just show the word split, and it will split the array after it splits, it disables and changed to the next card button until the game in done, for it to be pressed again and play again
  
  if(splitClicked==0){
    document.getElementById("doubleDownButton").style.display = "none";
    document.getElementById("standButton").style.display = "none";
    pointAmount += betAmount;
    console.log('the new bet is: '+pointAmount);
    document.getElementById("betDisplay").style.color="red";
    document.getElementById("betDisplay").innerHTML = 'Your new bet is '+ pointAmount +' points.';
    //here just makes it so the first time you play with just the first card
    secondCard.push(userHand[1]);
    userSum -= userHand[1];
    userHand.pop();
    //TODO: change the button to say next hand/stand
    console.log('cards split, new hand: '+userHand)
    document.getElementById("feedback").innerHTML = 'Cards split, New hand: '+userHand;
    document.getElementById("splitButton").innerHTML = "Next Hand";
  }
  if(splitClicked==1){
    document.getElementById("standButton").style.display = "";
    //do the endgame here and start new hand
    //ill merge everything into a different array, then have a seperate endgame and compare both arrays
    for(let i=0;i<userHand.length;i++){
      otherHand.push(userHand[i]);
      otherHandSum += userHand[i]; 
    }
    //instead of having a split endgame, just do an if statement in the endgame if this route is started
    //here we will reset everything and play again with the second card
    userHand = [secondCard[0]];
    userSum = secondCard[0];
    secondCard.pop();
    console.log('second hand: '+userHand) 
    document.getElementById("feedback").innerHTML = 'Second hand: '+userHand;
    console.log('second sum: '+userSum)
  }
  splitClicked += 1;
}

//this regards the doubling down rule

function doubleDown(){
  document.getElementById("splitButton").style.display = "none";
  pointAmount += betAmount;
  console.log('the new bet is: '+pointAmount);
  document.getElementById("betDisplay").style.color="red";
  document.getElementById("betDisplay").innerHTML = 'Your new bet is '+ pointAmount +' points.';
  doublingDown += 1;
  document.getElementById("doubleDownButton").style.display = "none";
}

//this is a button to restart the game
function restartGame(){
  window.location.reload();
} 

//MADE BY DANIEL KISENKO