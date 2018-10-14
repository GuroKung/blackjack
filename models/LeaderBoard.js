const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderBoardSchema = new Schema(
  {
    _id: String,
    win: {
      type: Number,
      default: 0
    },
    lose: {
      type: Number,
      default: 0
    },
    draw: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false, timestamps: true }
);

const LeaderBoard = mongoose.model("leaderboard", LeaderBoardSchema);

module.exports = LeaderBoard;
