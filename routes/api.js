/**
Backend Part
--------------
Create an API consists of following

RestApi hint

- Start game api
    - Input: username
    - Output: 2 cards
    - PS. After game is started,
    Hit or Stand must be called in 10 seconds
    otherwise player will be forced to lose

- Hit api (Call for a card)
    - Input: username
    - Output: current player’s cards + a new card
    - PS. After call this api player will has another 10 seconds to decide to Hit or Stand

- Stand api (Finish and compare cards with server)
    - Input: username
    - Output: current player’s cards vs server’s cards and define who is a winner
    - PS. If total is 21 with 2 cards the message should be “Blackjack !!”

- Leaderboard api
    - Output: win / loss / draw statistic of each username
 */

const express = require("express");
const api = express.Router();

const gameCtrl = require("../src/gameController");

const STATUS = {
  FAIL: "fail"
};

api.get("/", (req, res) => {
  res.send("Welcome to Blackjack API");
});

// Start game
api.post("/startgame", async (req, res) => {
  const { username } = req.body;

  if (!username)
    return res.status(400).send({
      status: STATUS.FAIL,
      message: "No username given"
    });

  const result = await gameCtrl.createNewGame(username);

  // end game
  const playerScore = gameCtrl.calculateCardValue(result.playerCard);
  if (playerScore == 21) {
    await gameCtrl.addToLeaderBoard(username, "win");
    return res.send({
      message: "blackjack",
      status: "win",
      playerCard: result.playerCard,
      playerScore
    });
  }

  return res.send({
    playerCard: result.playerCard,
    playerScore: gameCtrl.calculateCardValue(result.playerCard),
    playerName: result._id,
    dealerCard: result.dealerCard,
    dealerScore: gameCtrl.calculateCardValue(result.dealerCard),
    updatedAt: result.updatedAt
  });
});

// Hit api (Call for a card)
api.post("/hit", async (req, res) => {
  const { username } = req.body;
  const currentGame = await gameCtrl.getGameByUsername(username);

  const newCard = currentGame.deck.pop();

  if (!newCard)
    return res.status(400).send({
      status: STATUS.FAIL,
      message: "Card running out of deck"
    });

  currentGame.set("playerCard", currentGame.playerCard.concat(newCard));

  // end game
  const playerScore = gameCtrl.calculateCardValue(currentGame.playerCard);
  if (gameCtrl.isTooLate(currentGame.updatedAt)) {
    await gameCtrl.addToLeaderBoard(username, "lose");
    return res.send({
      message: "too late",
      status: "lose",
      playerCard: currentGame.playerCard,
      playerScore
    });
  } else if (playerScore == 21) {
    await gameCtrl.addToLeaderBoard(username, "win");
    return res.send({
      message: "blackjack",
      status: "win",
      playerCard: currentGame.playerCard,
      playerScore
    });
  } else if (playerScore > 21) {
    await gameCtrl.addToLeaderBoard(username, "lose");
    return res.send({
      status: "lose",
      playerCard: currentGame.playerCard,
      playerScore
    });
  }

  await currentGame.save();

  if (!currentGame)
    return res.status(400).send({
      status: STATUS.FAIL,
      message: "No game found with the given username"
    });

  return res.send({
    playerCard: currentGame.playerCard,
    playerScore
  });
});

//  Stand api (Finish and compare cards with server)
//  The dealer must always hit if they have 16 or lower. They will stop hitting if they have 17 or more.
api.post("/stand", async (req, res) => {
  const { username } = req.body;
  const currentGame = await gameCtrl.getGameByUsername(username);

  let dealerScore = gameCtrl.calculateCardValue(currentGame.dealerCard);
  let playerScore = gameCtrl.calculateCardValue(currentGame.playerCard);

  // end game, too late
  if (gameCtrl.isTooLate(currentGame.updatedAt)) {
    await gameCtrl.addToLeaderBoard(username, "lose");
    return res.send({
      message: "too late",
      status: "lose",
      playerCard: currentGame.playerCard,
      playerScore
    });
  }

  let newCard;
  do {
    newCard = currentGame.deck.pop();
    currentGame.set("dealerCard", currentGame.playerCard.concat(newCard));
    dealerScore = gameCtrl.calculateCardValue(currentGame.dealerCard);
  } while (dealerScore <= 16);

  await currentGame.save();

  const gameStatus = gameCtrl.compareScore(playerScore, dealerScore);

  await gameCtrl.addToLeaderBoard(username, gameStatus);

  return res.send({
    playerCard: currentGame.playerCard,
    playerScore,
    dealerCard: currentGame.dealerCard,
    dealerScore,
    status: gameStatus
  });
});

api.get("/leaderboard", async (req, res) => {
  let result = await gameCtrl.getAllLeaderBoard();
  res.send(result);
});

module.exports = api;
