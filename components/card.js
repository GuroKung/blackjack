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
        <h5 className="card-title">{cardValue[0]} {"  "} {cardSuite}</h5>
      </div>

      <style jsx>{`
        .card-suite {
            width: 10rem;
            margin: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Card;
