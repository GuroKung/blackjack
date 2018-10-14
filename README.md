# Blackjack Application
[![Build Status](https://travis-ci.org/GuroKung/blackjack.svg?branch=master)](https://travis-ci.org/GuroKung/blackjack)

## Sample Application
https://blackjack-sample-app.herokuapp.com

Screenshot

<img src="https://preview.ibb.co/e9qfQf/Screen-Shot-2561-10-15-at-4-37-13-AM.png" width="100%">
<img src="https://image.ibb.co/fpsS5f/Screen-Shot-2561-10-15-at-4-09-49-AM.png" width="100%">

## Setup Guide
This program is using `Node.js`  
Please make sure you have `Node.js version 8` or higher  
[Click here to see more details](https://nodejs.org/en/)

This project requires Mongo DB setup

## ENV Var
- MONGO_URL : mongo db connection string


## Starting Guide
On first use, run the follwing command
For yarn
```
yarn install
yarn run build
yarn start
```

For npm
```
npm intall
npm run build
npm start
```

Application wil now running on port: 3000

## Development Mode
Will start running application with watch on source file changes
```
npm run dev
```

## Test
For running test
```
yarn test
or
npm test
```

Optional script
- npm test - normal test script
- npm run test:w - test with watch source file changess


Example output
```
  Deck
    ✓ should init 52 cards
    ✓ should be able to deal from deck

  gameCtrl
    calculateCardValue
      ✓ should calculate correct card value for numbers
      ✓ should calculate correct card value for Jack Queen King
      ✓ should calculate correct card value for Ace
    compareScore
      ✓ should lose if player exceed 21
      ✓ should win if dealer exceed 21
      ✓ should draw if score is equal
      ✓ should win if score more close to the 21
      ✓ should lose if delar score more close to the 21


  10 passing (18ms)

✨  Done in 0.71s.
```

# API

### POST /api/startgame
body
```
{
  username: "gurokung"
}
```
Response
```
{
   "playerCard":[
      "6:Diamonds",
      "King:Diamonds"
   ],
   "playerScore":16,
   "playerName":"gurokung",
   "dealerCard":[
      "4:Spades",
      "3:Diamonds"
   ],
   "dealerScore":7
}
```



### POST /api/hit
body
```
{
  username: "gurokung"
}
```
Response
```
{
   "playerCard":[
      "5:Diamonds",
      "3:Hearts",
      "King:Clubs"
   ],
   "playerScore":18
}
```

### POST /api/stand
body
```
{
  username: "gurokung"
}
```
Response
```
{
   "playerCard":[
      "6:Spades",
      "4:Clubs",
      "King:Spades"
   ],
   "playerScore":20,
   "dealerCard":[
      "6:Spades",
      "4:Clubs",
      "King:Spades",
      "9:Clubs"
   ],
   "dealerScore":29,
   "status":"win"
}
```

### GET /api/leaderboard
Response - List of all users stats