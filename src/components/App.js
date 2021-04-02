import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";

import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import {CurrentUserContext} from '../contexts/CurrentUserContext';

import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // TODO: нужно сделать подтверждение удаление карточки
  //const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    api.getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((res) => {
        console.log(res);
      });
    api.getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = (isVisible) => {
    setIsEditProfilePopupOpen(isVisible);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleUpdateUser = (name, description) => {
    api.editProfile(name, description).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    });
  }

  const handleUpdateAvatar = (avatar) => {
    api.editAvatar(avatar).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    })
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch((res) => {
        console.log(res);
      });
    } else {
      api.addLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  const handleDeleteCard = (card) => {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => {
        if (c._id !== card._id) {
          return c;
        }
      })
      setCards(newCards);
    }).catch((res) => {
      console.log(res);
    });
  }

  const handleAddCard = (name, link) => {
    api.addCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((res) => {
      console.log(res);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        {/*<div className="root">*/}

          <Header/>

              <Main
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCard}
                cards={cards}
              />

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar = {handleUpdateAvatar}
          />


          {/* TODO: как будет время сделать подтверждение удаление карточки*/}
          {/*<PopupWithForm*/}
          {/*  name='delete-card'*/}
          {/*  title='Вы уверены?'*/}
          {/*  isOpen={isDeletePlacePopupOpen}*/}
          {/*  onClose={closeAllPopups}*/}
          {/*  buttonText='Сохранить'*/}
          {/*>*/}
          {/*  <input type="hidden" className="popup__input popup__input_card-id" defaultValue="" name="card-id"/>*/}
          {/*</PopupWithForm>*/}

          <ImagePopup
            name='theme_photo'
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        {/*</div>*/}
    </CurrentUserContext.Provider>
  );
}

export default App;
