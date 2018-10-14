class Deck {
  constructor(deck = []) {
    this.deck = deck;
    this.reset();
    this.shuffle();
  }

  reset() {
    this.deck = [];

    const symbols = ["Hearts", "Spades", "Clubs", "Diamonds"];
    const values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

    for (let symbol in symbols) {
      for (let value in values) {
        this.deck.push(`${values[value]}:${symbols[symbol]}`);
      }
    }
  }

  shuffle() {
    const { deck } = this;
    let deckSize = deck.length,
      deckIndex;

    while (deckSize) {
      deckIndex = Math.floor(Math.random() * deckSize--);

      [deck[deckSize], deck[deckIndex]] = [deck[deckIndex], deck[deckSize]];
    }

    return this;
  }

  deal(numberOfCard) {
    return this.deck.splice(0, numberOfCard);
  }

  getAllCards() {
    return this.deck;
  }
}

module.exports = Deck;
