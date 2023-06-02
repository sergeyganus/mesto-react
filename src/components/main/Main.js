import React from 'react';
import Card from '../card/Card';

import UserInfo from '../../utils/UserInfo';
import { api } from '../../utils/Api';
import { applicationConfig } from '../../utils/constants';
import defaultProfilePhoto from '../../images/profile-photo.png';

function Main({ onEditUserPhoto, onEditUserProfile, onAddCard, onCardClick, onPopupClose }) {
  // Переменные состояния
  const [userName, setUserName] = React.useState('Имя пользователя не задано');
  const [userDescription, setUserDescription] = React.useState('Описание пользователя не задано');
  const [userAvatar, setUserAvatar] = React.useState('Ссылка на аватар не задана');
  const [cards, setCards] = React.useState([]);

  // Вспомогательные переменные
  let userInfo;

  // Хук, срабатывающий при загрузке компонента
  React.useEffect(() => {
    // Создание промиса для получения данных о пользователе
    const getUserInfoPromise = api.getUserInfo();
    getUserInfoPromise.then(userData => {
      // Актуализация переменных состояния
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);

      userInfo = new UserInfo(
        userData,
        {
          userNameSelector: applicationConfig.userNameSelector,
          userDescriptionSelector: applicationConfig.userDescriptionSelector,
          userProfilePhotoSelector: applicationConfig.userProfilePhotoSelector
        },
        {
          handleUserInfo: api.setUserInfo.bind(api),
          handleUserPhoto: api.updateUserPhoto.bind(api)
        }
      );

      userInfo.setUserInfo(userData);

      // Создание промиса для получения карточек
      const getCardsPromise = api.getCards();
      getCardsPromise.then(currentCards => {
        setCards([...currentCards]);
      });
    });
  }, []);

  return (
    <main className="main">
      {/* Секция профиля пользователя - Profile */}
      <section className="profile">
        <div className="profile__details">
          <div className="profile__photo-container">
            <img className="profile__photo" src={defaultProfilePhoto} alt="Фото профиля" title="Фото профиля" />
            <button className="profile__photo-button" type="button"></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button className="profile__edit-button" type="button"></button>
            <p className="profile__description">Исследователь океана</p>
          </div>
        </div>
        <button className="profile__add-button" type="button"></button>
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