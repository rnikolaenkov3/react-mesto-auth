import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = (card) => {
    props.onCardClick(card);
  }

  const onCardLike = (card) => {
    props.onCardLike(card);
  }

  const onCardDelete = (card) => {
    props.onCardDelete(card);
  }

  const handleEditProfile = () => {
    props.onEditProfile(true);
  }

  return (
    <main className="container">
      <Switch>
        <Route path="/" exact>
          {/* profile */}
          <section className="profile root__section">
            <a href="#" className="profile__avatar-upload" target="_self" onClick={props.onEditAvatar}>
              <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
            </a>
            <div className="profile__info">
              <div className="profile__info-wrap">
                <h1 className="profile__name">
                  {currentUser.name}
                </h1>
                <button
                  type="button"
                  className="profile__btn-change root__link"
                  aria-label="редактирование профиля"
                  onClick={handleEditProfile}
                >
                </button>
              </div>
              <p className="profile__role">
                {currentUser.about}
              </p>
            </div>
            <button type="button" className="profile__btn-add-img root__link" aria-label="добавление места"
                    onClick={props.onAddPlace}></button>
          </section>
        {/* end profile */}

        {/* cards */}
        <section className="cards root__section root__cards">
          <ul className="places">
            {
              props.cards.map((card) => (
                <Card
                  card={card}
                  key={card._id}
                  onClick={handleCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />)
              )
            }
          </ul>
        </section>
        {/* end cards */}
        </Route>
        <Route path="/sign-in">
          <Login />
        </Route>
        <Route path="/sign-up">
          <Register />
        </Route>
      </Switch>
    </main>
  )
}

export default Main;