const { expect } = require("chai");
const Deck = require("../src/deck");

describe("Deck", () => {
  it("should init 52 cards", () => {
    let testDeck = new Deck();
    expect(testDeck.deck.length).to.equal(52);
  });

  it("should be able to deal from deck", () => {
    let testDeck = new Deck();
    expect(testDeck.deck.length).to.equal(52);
    testDeck.deal(2);
    expect(testDeck.deck.length).to.equal(50);
  });

});
