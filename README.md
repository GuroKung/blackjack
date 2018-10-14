# Blackjack Application
Screenshoot

![](https://preview.ibb.co/e9qfQf/Screen-Shot-2561-10-15-at-4-37-13-AM.png)  
![](https://image.ibb.co/fpsS5f/Screen-Shot-2561-10-15-at-4-09-49-AM.png)

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


## ENV Var
- MONGO_URL : mongo db connection string