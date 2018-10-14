const { Game, LeaderBoard } = require("../models");
const Deck = require("./deck");

const db = require("./db");

async function createNewGame(username) {
  const cardDeck = new Deck();
  const playerCard = cardDeck.deal(2);
  const dealerCard = cardDeck.deal(2);

  const gameId = { _id: username };
  const gameObj = {
    playerCard,
    dealerCard,
    deck: cardDeck.getAllCards()
  };

  await Game.updateOne(gameId, gameObj, {
    upsert: true,
    setDefaultsOnInsert: true
  });

  return { ...gameId, ...gameObj };
}
exports.createNewGame = createNewGame;

function getGameByUsername(username) {
  return Game.findOne({ _id: username });
}
exports.getGameByUsername = getGameByUsername;

// ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
function calculateCardValue(cardArray) {
  let value,
    totalScore = 0;
  for (let card of cardArray) {
    value = card.split(":")[0];

    if (value == "Jack" || value == "Queen" || value == "King") {
      totalScore += 10;
    } else if (value == "Ace") {
      if (totalScore + 11 <= 21) {
        totalScore += 11;
      } else {
        totalScore += 1;
      }
    } else {
      totalScore += parseInt(value);
    }
  }
  return totalScore;
}
exports.calculateCardValue = calculateCardValue;

function compareScore(playerScore, dealerScore) {
  if (playerScore == dealerScore) return "draw";
  else if (playerScore > 21) {
    return "lose";
  } else if (dealerScore > 21) {
    return "win";
  } else if (playerScore > dealerScore) {
    return "win";
  } else {
    return "lose";
  }
}

exports.compareScore = compareScore;

function addToLeaderBoard(username, status) {
  let leaderBoardObj = { $inc: {} };
  leaderBoardObj.$inc[status] = 1;

  console.log("leaderBoardObj", leaderBoardObj);

  return LeaderBoard.updateOne({ _id: username }, leaderBoardObj, {
    upsert: true,
    setDefaultsOnInsert: true
  });
}

exports.addToLeaderBoard = addToLeaderBoard;

function getAllLeaderBoard() {
  return LeaderBoard.find({});
}

exports.getAllLeaderBoard = getAllLeaderBoard;

function isTooLate(datetime) {
  // should response within 10 secs
  return Math.abs((new Date().getTime() - new Date(datetime)) / 1000) > 10;
}

exports.isTooLate = isTooLate;
