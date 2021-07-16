let BlackjackGame = {
    "you": { 'Scorespan': "#Your-black-jack-result", 'div': '#your-box', 'score': 0 },
    "dealer": { 'Scorespan': "#dealer-black-jack-result", 'div': '#dealer-box', 'score': 0 },
    "cards": ['2', '3', '4', '5', '6', '10', '11'],
    "cardsmap": { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '10': 10, '11': 11 },
    "wins": 0,
    "losses": 0,
    "draw": 0,
    'isStand': false,
    'turnsover': false,
};

const you = BlackjackGame['you'];
const dealers = BlackjackGame['dealer'];
let Hitsound = new Audio('./blackjack audio.mp3');
let Hittsound = new Audio('./blackjack audio1.mp3');

document.querySelector("#Blackjack-hit-button").addEventListener('click', myfunction);
document.querySelector("#blackjack-stand-button").addEventListener('click', dealerlogic);

function myfunction() {
    if (BlackjackGame['isStand'] === false) {
        let card = RandomCard();
        ShowCard(card, you);
        updateScore(card, you)
        showscore(you);
    }

}

function RandomCard() {
    let Randomindex = Math.floor(Math.random() * 6);
    return BlackjackGame['cards'][Randomindex];

}

function ShowCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let Image = document.createElement('img');
        Image.src = `/Blackjack/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(Image);
        Hitsound.play();
    }

}

document.querySelector("#black-jack-deal-button").addEventListener('click', blackjackdeal);

function blackjackdeal() {
    if (BlackjackGame['turnsover']=== true) {
        BlackjackGame['isStand'] = false;
        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let DealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
            Hittsound.play();
    
        };
    
        for (let i = 0; i < DealerImages.length; i++) {
            DealerImages[i].remove();
        }
        you['score'] = 0;
        dealers['score'] = 0;
    
        document.querySelector('#Your-black-jack-result').textContent = 0;
        document.querySelector('#dealer-black-jack-result').textContent = 0;
        document.querySelector('#Your-black-jack-result').style.color = "white"
        document.querySelector('#dealer-black-jack-result').style.color = "white"
        document.querySelector('#black-jack-result').textContent = "Let's Play";
        document.querySelector('#black-jack-result').style.color = 'red';

        BlackjackGame['turnsover'] = true;
    }
 }
 

function updateScore(card, activePlayer) {
    if (activePlayer['score'] + BlackjackGame["cardsmap"][card][1] <= 21) {
        activePlayer['score'] + BlackjackGame["cardsmap"][card][1];
    } else {
        activePlayer['score'] + BlackjackGame["cardsmap"][card][0];
    }
    activePlayer['score'] += BlackjackGame["cardsmap"][card];
}

function showscore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['Scorespan']).textContent = 'FAILED';
        document.querySelector(activePlayer['Scorespan']).style.color = "blue";
    } else {
        document.querySelector(activePlayer['Scorespan']).textContent = activePlayer['score'];
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerlogic() {
    BlackjackGame['isStand'] = true;
    while (dealers['score'] < 16 && BlackjackGame['isStand'] === true) {
        let card = RandomCard();
        ShowCard(card, dealers);
        updateScore(card, dealers)
        showscore(dealers);
        await sleep(1000);
    
    }
   

        BlackjackGame['turnsover'] = true;
        let winner = ComputeWinner();
        ShowResult(winner);

}

function ComputeWinner() {
    var winner;
    if (you['score'] <= 21) {
        if (you['score'] > dealers['score'] || (dealers['score'] > 21)) {
            BlackjackGame['wins']++;
            winner = you;
        } else if (you['score'] < dealers['score']) {
            BlackjackGame['losses']++;
            winner = dealers;

        } else if (you['score'] === dealers['score']) {
            BlackjackGame['draw']++;


        } else if (you['score'] > 21 && dealers['score'] <= 21) {
            BlackjackGame['losses']++;

            winner = dealers;
        } else if (you['score'] > 21 && dealers['score'] > 21) {
            BlackjackGame['draw']++;
        }
        console.log(BlackjackGame);
        return winner;
    }
}

function ShowResult(winner) {
    let message, messagecolor;
    if (BlackjackGame['turnsover'] === true) {
        if (winner === you) {
            document.querySelector('#wins').textContent = BlackjackGame['wins'];
            message = 'You won';
            messagecolor = 'brown';
            Hitsound.play();
        } else if (winner === dealers) {
            document.querySelector('#losses').textContent = BlackjackGame['losses'];
            message = 'You Lost';
            messagecolor = 'blue';
            Hittsound.play();
        } else {
            document.querySelector('#draw').textContent = BlackjackGame['draw'];
            message = 'You drew';
            messagecolor = 'red';
            Hittsound.play()
    
        }
    
        document.querySelector('#black-jack-result').textContent = message;
        document.querySelector('#black-jack-result').style.color = messagecolor;
    
    }
   

}