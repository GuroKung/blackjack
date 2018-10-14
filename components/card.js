function Card(props) {
  let cardValue = props.card.split(":");
  let cardSuite = "";

  // ["Hearts", "Spades", "Clubs", "Diamonds"]
  switch (cardValue[1]) {
    case "Hearts":
      cardSuite = "♥";
      break;
    case "Spades":
      cardSuite = "♠";
      break;
    case "Clubs":
      cardSuite = "♣";
      break;
    case "Diamonds":
      cardSuite = "♦";
      break;
  }

  return (
    <div className="card card-suite">
      {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap" /> */}
      <div className="card-body">
        <h5 className="card-title">{cardSuite}</h5>
        <p className="card-text">{cardValue[0]}</p>
      </div>

      <style jsx>{`
        .card-suite {
          width: 18rem;
        }
      `}</style>
    </div>
  );
}

export default Card;
