function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="place" key={card._id}>
      <img className="place__image" src={card.link} alt={card.name} title={card.name} onClick={handleClick} />
      <button className="place__delete-button" type="button"></button>
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__favorites">
          <button className="place__favorite-button" type="button"></button>
          <span className="place__favorite-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;