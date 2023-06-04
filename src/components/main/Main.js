import React from 'react';
import Card from '../card/Card';

import { api } from '../../utils/Api';
import { applicationConfig } from '../../utils/constants';
import defaultProfilePhoto from '../../images/profile-photo.png';

function Main({ onEditUserPhoto, onEditUserProfile, onAddCard, onCardClick }) {
  // Переменные состояния
  const [userName, setUserName] = React.useState('Жак Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(defaultProfilePhoto);
  const [cards, setCards] = React.useState([]);

  // Впомогательная функция фиксации ошибок
  function printError(err) {
    console.log(err);
  }

  // Хук, срабатывающий при загрузке компонента
  React.useEffect(() => {
    // Создание промиса для получения данных о пользователе
    const getUserInfoPromise = api.getUserInfo();
    getUserInfoPromise
      .then(userData => {
        // Актуализация переменных состояния
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        // Создание промиса для получения карточек
        const getCardsPromise = api.getCards();
        getCardsPromise
          .then(currentCards => {
            setCards([...currentCards]);
          })
          .catch(err => {
            printError(err);
          });
      })
      .catch(err => {
        printError(err);
      });
  }, []);

  return (
    <main className="main">
      {/* Секция профиля пользователя - Profile */}
      <section className="profile">
        <div className="profile__details">
          <div className="profile__photo-container">
            <img className="profile__photo" src={userAvatar} alt="Фото профиля" title="Фото профиля" />
            <button className="profile__photo-button" type="button" onClick={onEditUserPhoto}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditUserProfile}></button>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddCard}></button>
      </section>
      {/* Секция с элементами галереи красивых мест - Places */}
      <section className="places" aria-label="Галерея красивых мест">
        <ul className="places__list">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick.bind(card)} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;