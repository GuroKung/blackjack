const { expect } = require("chai");
const gameCtrl = require("../src/gameController");

describe("gameCtrl", () => {
  describe("calculateCardValue", () => {
    it("should calculate correct card value for numbers", () => {
      expect(gameCtrl.calculateCardValue(["6:Spades", "4:Diamonds"])).to.equal(
        10
      );
      expect(gameCtrl.calculateCardValue(["5:Heart", "2:Clubs"])).to.equal(7);
      expect(
        gameCtrl.calculateCardValue(["10:Diamonds", "9:Diamonds"])
      ).to.equal(19);
    });
    it("should calculate correct card value for Jack Queen King", () => {
      expect(
        gameCtrl.calculateCardValue(["Jack:Spades", "4:Diamonds"])
      ).to.equal(14);
      expect(
        gameCtrl.calculateCardValue(["King:Heart", "King:Clubs"])
      ).to.equal(20);
      expect(
        gameCtrl.calculateCardValue(["10:Diamonds", "Queen:Diamonds"])
      ).to.equal(20);
    });
    it("should calculate correct card value for Ace", () => {
      expect(
        gameCtrl.calculateCardValue(["Ace:Spades", "4:Diamonds"])
      ).to.equal(15);
      expect(
        gameCtrl.calculateCardValue(["King:Heart", "King:Clubs", "Ace:Spades"])
      ).to.equal(21);
      expect(
        gameCtrl.calculateCardValue([
          "King:Heart",
          "4:Diamonds",
          "Ace:Diamonds"
        ])
      ).to.equal(15);
    });

    it("should calculate score 21 if ace come first", () => {
      expect(
        gameCtrl.calculateCardValue([
          "Ace:Heart",
          "Jack:Diamonds",
          "King:Diamonds"
        ])
      ).to.equal(21);
    });
    it("should calculate score 21 if ace in the middle", () => {
      expect(
        gameCtrl.calculateCardValue([
          "Jack:Heart",
          "Ace:Diamonds",
          "King:Diamonds"
        ])
      ).to.equal(21);
    });

    it("should calculate score for double ace", () => {
      expect(
        gameCtrl.calculateCardValue([
          "Ace:Heart",
          "Ace:Diamonds"
        ])
      ).to.equal(12);
      expect(
        gameCtrl.calculateCardValue([
          "Ace:Heart",
          "Ace:Diamonds",
          "Ace:Heart",
          "Ace:Diamonds"
        ])
      ).to.equal(14);
    });
  });

  describe("compareScore", () => {
    it("should lose if player exceed 21", () => {
      expect(gameCtrl.compareScore(25, 10)).to.equal("lose");
      expect(gameCtrl.compareScore(22, 5)).to.equal("lose");
    });
    it("should win if dealer exceed 21", () => {
      expect(gameCtrl.compareScore(10, 25)).to.equal("win");
      expect(gameCtrl.compareScore(5, 22)).to.equal("win");
    });
    it("should draw if score is equal", () => {
      expect(gameCtrl.compareScore(10, 10)).to.equal("draw");
      expect(gameCtrl.compareScore(22, 22)).to.equal("draw");
    });
    it("should win if score more close to the 21", () => {
      expect(gameCtrl.compareScore(21, 10)).to.equal("win");
      expect(gameCtrl.compareScore(18, 17)).to.equal("win");
      expect(gameCtrl.compareScore(20, 26)).to.equal("win");
    });
    it("should lose if delar score more close to the 21", () => {
      expect(gameCtrl.compareScore(10, 21)).to.equal("lose");
      expect(gameCtrl.compareScore(17, 18)).to.equal("lose");
    });
  });
});
