import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";

export default class LeaderBaord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentWillMount() {
    this.fetchLeaderBoard();
  }

  async fetchLeaderBoard() {
    try {
      let { data } = await axios.get("/api/leaderboard");
      data = data.sort((a, b) => b.win - a.win);
      this.setState({ list: data });
    } catch (error) {
      console.error(error);
    }
  }

  generateLeaderboardList() {
    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Win</th>
            <th scope="col">Lose</th>
            <th scope="col">Draw</th>
          </tr>
        </thead>
        <tbody>
          {this.state.list.map((context, contextIndex) => (
            <tr>
              <th scope="row">{contextIndex + 1}</th>
              <td>{context._id}</td>
              <td>{context.win || 0}</td>
              <td>{context.lose || 0}</td>
              <td>{context.draw || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <h1 className="display-2">LeaderBoard</h1>
          {this.generateLeaderboardList()}
          <Link href="/">
            <button className="btn btn-lg btn-primary m-2">Play Again</button>
          </Link>
        </div>
      </div>
    );
  }
}
