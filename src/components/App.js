import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupwithform/PopupWithForm';
import EditProfilePopup from './editprofilepopup/EditProfilePopup';
import EditAvatarPopup from './editavatarpopup/EditAvatarPopup';
import AddPlacePopup from './addplacepopup/AddPlacePopup';
import ImagePopup from './imagepopup/ImagePopup';
import defaultProfilePhoto from '../images/profile-photo.png';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import './App.css';

function App() {
  // Переменные состояния
  const [isEditUserPhotoPopupOpen, setIsEditUserPhotoPopupOpen] = React.useState(false);
  const [isEditProfileUserPopupOpen, setIsEditUserProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isGetConfirmationPopupOpen, setIsGetConfirmationPopupOpen] = React.useState(false);
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак Ив Кусто',
    description: 'Исследователь океанов',
    avatar: defaultProfilePhoto
  });

  // Основные функции
  function handleEditUserPhotoClick() {
    setIsEditUserPhotoPopupOpen(true);
  }

  function handleEditUserProfileClick() {
    setIsEditUserProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleGetConfirmationClick() {
    setIsGetConfirmationPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsGalleryPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditUserPhotoPopupOpen(false);
    setIsEditUserProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsGetConfirmationPopupOpen(false);
    setIsGalleryPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => printError(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(res => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => printError(err));
  }

  function handleUpdateProfile({ userName, userDescription }) {
    api.setUserInfo({ userName, userDescription })
      .then(userData => {
        // Актуализация переменной состояния currentUser
        setCurrentUser({
          _id: userData._id,
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar
        });

        closeAllPopups();
      })
      .catch(err => printError(err));
  }

  function handleUpdateAvatar(avatar) {
    api.updateUserPhoto(avatar)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        });
        closeAllPopups();
      })
      .catch(err => printError(err));
  }

  function handleAddPlace(cardItem) {
    api.addCard(cardItem)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => printError(err));
  }

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
        // Актуализация переменной состояния currentUser
        setCurrentUser({
          _id: userData._id,
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar
        });
      })
      .catch(err => {
        printError(err);
      });
  }, []);

  // Хук, срабатывающий при загрузке компонента
  React.useEffect(() => {
    // Создание промиса для получения карточек
    const getCardsPromise = api.getCards();
    getCardsPromise
      .then(currentCards => {
        setCards([...currentCards]);
      })
      .catch(err => {
        printError(err);
      });
  }, []);

  return (
    // Внедряем данные из currentUser с помощью провайдера контекста
    <CurrentUserContext.Provider value={currentUser}>
      {/* Главная обёртка - Page */}
      <div className="page">
        {/* Шапка сайта - Header */}
        <Header />
        {/* Основной блок - Main */}
        <Main
          cards={cards}
          onEditUserPhoto={handleEditUserPhotoClick}
          onEditUserProfile={handleEditUserProfileClick}
          onAddCard={handleAddCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        {/*  Подвал сайта - Footer */}
        <Footer />
        {/* Модальное окно редактирования аватара - Popup */}
        <EditAvatarPopup
          isOpen={isEditUserPhotoPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        {/* Модальное окно редактирования информации в профиле - Popup */}
        <EditProfilePopup
          isOpen={isEditProfileUserPopupOpen}
          onUpdateProfile={handleUpdateProfile}
          onClose={closeAllPopups}
        />
        {/* Модальное окно добавления нового места - Popup */}
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}
        />
        {/* Модальное окно галереи - Popup */}
        <ImagePopup
          card={selectedCard}
          isOpen={isGalleryPopupOpen}
          onClose={closeAllPopups}
        />
        {/* Модальное окно подтверждения действия - Popup */}
        <PopupWithForm
          name={'get-confirmation'}
          formName={'confirmform'}
          title={'Вы уверены?'}
          isOpen={isGetConfirmationPopupOpen}
          onClose={closeAllPopups}
        >
          <button className="form__button form__button_type_get-confirmation" type="submit">Да</button>
        </PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
