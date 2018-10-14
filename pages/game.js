import React, { Component } from "react";
import axios from "axios";
import Card from "../components/card";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  handleUserInput(e, index) {
    // const value = e.currentTarget.value;
    // const key = e.currentTarget.name;
    // let bannerList = this.state.bannerLists;
    // bannerList[index][key] = value
    // this.setState({ bannerList });
  }

  render() {
    return (
      <div className="container mt-10">
      <div className="row">
      <h1 className="display-2">GAME</h1> <img src="https://cdn3.iconfinder.com/data/icons/casino-and-gambling-icons/508/Blackjack-2-512.png" width="100px" height="100px"/>
      </div>
        <h2>Player {this.state.playerName}</h2>
        {JSON.stringify(this.state)}
        <div className="row">
          <h3>Dealer Card - Score {this.state.dealerScore}</h3>
        </div>
        <div className="row">
          {this.state.dealerCard.map((card, cardIndex) => <Card key={cardIndex} card={card}/>)}
        </div>
        <div className="row">
          <h3>Player Card - Score {this.state.playerScore}</h3>
        </div>
        <div className="row">
          {this.state.playerCard.map((card, cardIndex) => <Card key={cardIndex} card={card}/>)}
        </div>
        <button>Hit</button>
        <button>Stand</button>
      </div>
    );
  }
}
