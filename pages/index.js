import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  <div className="landing text-center">
    <Head title="Blackjack" />
    
    <div className="card card-cover">
      <h1 className="title">Welcome to Blackjack Game</h1>
      <p className="description">
        To get started, enter username below and click <code>Start game</code>
      </p>

      <div className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please Enter Username</h1>
          <div className="mb-3">
            <label for="inputUsername" className="sr-only">username</label>
            <input type="text" id="inputUsername" className="form-control" placeholder="Enter Username" required="" autofocus=""></input>
          </div>

          <button className="btn btn-lg btn-success btn-block" type="submit">Start Game</button>
          <p className="mt-5 mb-3 text-muted">© Gurokung</p>
        </form>
      </div>

    </div>

    <style jsx>{`
    .landing {
      background: url(https://images.thebetwaygroup.com/umbraco/umbracobetway/media/6345757/blackjackhistory_image3.jpg) no-repeat center center fixed; 
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      height: -webkit-fill-available;
      text-align: center
    }
      .card-cover {
        width: 50%;
        display: inline-block;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }
    `}</style>
  </div>
)

export default Home
