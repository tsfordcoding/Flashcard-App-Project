import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "./../utils/api";

function ViewDeck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();

      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Something went wrong: ", error);
      }
      
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleEditDeck = async () => {
    history.push(`/decks/${deckId}/edit`);
  };

  const handleStudyDeck = async () => {
    history.push(`/decks/${deckId}/study`);
  };

  const handleAddCard = async () => {
    history.push(`/decks/${deckId}/cards/new`);
  };

  const handleEditCard = async (card) => {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`)
  };

  const handleDeleteDeck = async (deck) => {
    if(window.confirm(`Delete this deck? You will not be able to recover it`)) {
      const abortController = new AbortController();
      try {
        await deleteDeck(deckId, abortController.signal)
        history.push("/");
      } catch(error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      }
    }
  }

  const handleDeleteCard = async (card) => {
    if(window.confirm(`Delete this card? You will not be able to recover it`)) {
      const abortController = new AbortController();
      try {
        await deleteCard(card.id, abortController.signal);
        history.go(0);
      } catch(error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      }
    }
  }

  if (cards.length >= 0) {
    return (
      <div className="container">
        <nav>
          <ul className="breadcrumb p-3 bg-body-tertiary rounded-3">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home mr-2" />
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ul>
        </nav>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{deck.name}</h2>
            <p>{deck.description}</p>
            <button className="btn btn-secondary mx-1" onClick={handleEditDeck}>
              <span className="oi oi-pencil  mr-2" />
              Edit
            </button>
            <button className="btn btn-primary mx-1" onClick={handleStudyDeck}>
              <span className="oi oi-book  mr-2" />
              Study
            </button>
            <button className="btn btn-primary mx-1" onClick={handleAddCard}>
              <span className="oi oi-plus  mr-2" />
              Add Cards
            </button>
            <button className="btn btn-danger float-right mx-1" onClick={handleDeleteDeck}>
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>

        <h1>Cards</h1>
        {cards.length === 0 ? `Decks has no cards. Add a card` : cards.map((card) => {
          return (
            <div className="card-deck" key={card.id}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                  </div>
                  <div className="row float-right">
                    <button className="btn btn-secondary mx-1" onClick={() => handleEditCard(card)}>
                      <span className="oi oi-pencil  mr-2" />
                      Edit
                    </button>
                    <button className="btn btn-danger mx-1" onClick={() => handleDeleteCard(card)}>
                      <span className="oi oi-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default ViewDeck;
