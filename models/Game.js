const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    _id: String,
    dealerCard : [],
    playerCard : [],
    deck : []
  },
  { versionKey: false, timestamps: true }
);

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
