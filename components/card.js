function Card(props) {
  let cardValue = props.card.split(":");
  let cardSuite = "";
  let cardColor = "";

  // ["Hearts", "Spades", "Clubs", "Diamonds"]
  switch (cardValue[1]) {
    case "Hearts":
      cardSuite = "♥";
      cardColor = "text-danger";
      break;
    case "Spades":
      cardSuite = "♠";
      break;
    case "Clubs":
      cardSuite = "♣";
      break;
    case "Diamonds":
      cardSuite = "♦";
      cardColor = "text-danger";
      break;
  }

  return (
    <div className="card card-suite">
      {/* <img className="card-img-top" src=".../100px180/" alt="Card image cap" /> */}
      <div className="card-body">
        <h4 className={`card-title ${cardColor}`}>
          {cardValue[0]} {"  "} {cardSuite}
        </h4>
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
