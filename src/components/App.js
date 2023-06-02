import React from 'react';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
import PopupWithForm from './popupwithform/PopupWithForm';
import ImagePopup from './imagepopup/ImagePopup';

import './App.css';

function App() {
  // Переменные состояния
  const [isEditUserPhotoPopupOpen, setIsEditUserPhotoPopupOpen] = React.useState(false);
  const [isEditProfileUserPopupOpen, setIsEditUserProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isGetConfirmationPopupOpen, setIsGetConfirmationPopupOpen] = React.useState(false);
  const [isGalleryPopupOpen, setIsGalleryPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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

  // Хук окрытия попапа редактирования аватара
  React.useEffect(() => {
    const editUserPhotoButtonElement = document.querySelector('.profile__photo-button');
    editUserPhotoButtonElement.addEventListener('click', handleEditUserPhotoClick);

    return () => {
      editUserPhotoButtonElement.removeEventListener('click', handleEditUserPhotoClick);
    };
  });

  // Хук окрытия попапа редактирования профиля
  React.useEffect(() => {
    const editUserButtonElement = document.querySelector('.profile__edit-button');
    editUserButtonElement.addEventListener('click', handleEditUserProfileClick);

    return () => {
      editUserButtonElement.removeEventListener('click', handleEditUserProfileClick);
    };
  });

  // Хук окрытия попапа добавления нового места
  React.useEffect(() => {
    const addCardButtonElement = document.querySelector('.profile__add-button');
    addCardButtonElement.addEventListener('click', handleAddCardClick);

    return () => {
      addCardButtonElement.removeEventListener('click', handleAddCardClick);
    };
  });

  return (
    <>
      {/* Главная обёртка - Page */}
      <div className="page">
        {/* Шапка сайта - Header */}
        <Header />
        {/* Основной блок - Main */}
        <Main
          onEditUserPhoto={handleEditUserPhotoClick}
          onEditUserProfile={handleEditUserProfileClick}
          onAddCard={handleAddCardClick}
          onCardClick={handleCardClick}
        />
        {/*  Подвал сайта - Footer */}
        <Footer />
        {/* Модальное окно редактирования аватара - Popup */}
        <PopupWithForm
          name={'edit-profile-photo'}
          formName={'editphotoform'}
          title={'Обновить аватар'}
          isOpen={isEditUserPhotoPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field form__field_type_profile-photo">
            <input id="profile-photo-input" className="form__input form__input_type_profile-photo" name="profile-photo" type="url" placeholder="Ссылка на картинку" required />
            <span className="profile-photo-input-error form__input-error"></span>
          </label>
          <button className="form__button form__button_type_save-profile-photo" type="submit">Сохранить</button>
        </PopupWithForm>
        {/* Модальное окно редактирования информации в профиле - Popup */}
        <PopupWithForm
          name={'edit-profile'}
          formName={'editform'}
          title={'Редактировать профиль'}
          isOpen={isEditProfileUserPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field form__field_type_profile-name">
            <input id="profile-name-input" className="form__input form__input_type_profile-name" name="profile-name" type="text" minLength="2" maxLength="40" required />
            <span className="profile-name-input-error form__input-error"></span>
          </label>
          <label className="form__field form__field_type_profile-description">
            <input id="profile-description-input" className="form__input form__input_type_profile-description" name="profile-description" type="text" minLength="2" maxLength="200" required />
            <span className="profile-description-input-error form__input-error"></span>
          </label>
          <button className="form__button form__button_type_save-profile" type="submit">Сохранить</button>
        </PopupWithForm>
        {/* Модальное окно добавления нового места - Popup */}
        <PopupWithForm
          name={'add-place'}
          formName={'addform'}
          title={'Новое место'}
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        >
          <label className="form__field form__field_type_place-name">
            <input id="place-name-input" className="form__input form__input_type_place-name" name="place-name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="place-name-input-error form__input-error"></span>
          </label>
          <label className="form__field form__field_type_place-link">
            <input id="place-link-input" className="form__input form__input_type_place-link" name="place-link" type="url" placeholder="Ссылка на картинку" required />
            <span className="place-link-input-error form__input-error"></span>
          </label>
          <button className="form__button form__button_type_add-place" type="submit">Создать</button>
        </PopupWithForm>
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
    </>
  );
}

export default App;
