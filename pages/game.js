import React, { Component } from "react";
import axios from "axios";
import Card from "../components/card";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      dealerCard: [],
      dealerScore: 0,
      playerCard: [],
      playerName: "",
      playerScore: 0
    };
  }

  componentWillMount() {
    this.fetchGame();
  }

  componentDidUpdate() {
    this.isTheGameEnd();
  }

  async fetchGame() {
    try {
      let { data } = await axios.post("/api/startgame", {
        username: this.props.url.query.username
      });
      this.setState(data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleHit() {
    try {
      let { data } = await axios.post("/api/hit", {
        username: this.props.url.query.username
      });
      console.log(data);
      this.setState(data);
    } catch (error) {
      console.error(error);
    }
  }

  async handleStand() {
    try {
      let { data } = await axios.post("/api/stand", {
        username: this.props.url.query.username
      });
      console.log(data);
      this.setState(data);
    } catch (error) {
      console.error(error);
    }
  }

  isTheGameEnd() {
    if (this.state.status) {
      alert(`You are ${this.state.status.toUpperCase()}`);
    }
  }

  showPlayButton() {
    if (!this.state.status)
      return (
        <div>
          <button
            className="btn btn-lg btn-success m-2"
            onClick={() => this.handleHit()}
          >
            Hit
          </button>
          <button
            className="btn btn-lg btn-primary m-2"
            onClick={() => this.handleStand()}
          >
            Stand
          </button>
        </div>
      );
  }

  showGameStatus() {
    let textColor = "";
    let gameStatus = this.state.status;

    if (gameStatus) {
      switch (gameStatus) {
        case "win":
          textColor = "display-2 text-success";
          break;
        case "lose":
          textColor = "display-2 text-danger";
          break;
      }

      if (gameStatus === "win" && this.state.message === "blackjack")
        gameStatus = "BLACKJACK";

      return (
        <h1 className={textColor}>{`You are ${gameStatus.toUpperCase()}`}</h1>
      );
    }
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <h1 className="display-2">GAME</h1>{" "}
          <img
            src="https://cdn3.iconfinder.com/data/icons/casino-and-gambling-icons/508/Blackjack-2-512.png"
            width="100px"
            height="100px"
          />
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png"
            alt=""
            width="35px"
            height="35px"
          />
          <h2>Player {this.state.playerName}</h2>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          {this.showGameStatus()}
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <h3>Dealer Card - Score {this.state.dealerScore}</h3>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          {this.state.dealerCard.map((card, cardIndex) => (
            <Card key={cardIndex} card={card} />
          ))}
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <h3>Player Card - Score {this.state.playerScore}</h3>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          {this.state.playerCard.map((card, cardIndex) => (
            <Card key={cardIndex} card={card} />
          ))}
        </div>

        <div className="row h-100 justify-content-center align-items-center">
          {this.showPlayButton()}
        </div>
      </div>
    );
  }
}
