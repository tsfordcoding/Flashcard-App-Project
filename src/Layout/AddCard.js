import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  }
  const [deck, setDeck] = useState({});
  const [cardData, setCardData] = useState(initialFormState);
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
      } catch(error) {
        console.log("Something went wrong", error);
      }

      return () => {
        abortController.abort();
      }
    }
    fetchData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, cardData);
    setCardData(initialFormState);
    history.go(0);
  }

  return (
    <>
      <div className="container">
        <nav>
          <ul className="breadcrumb p-3 bg-body-tertiary rounded-3">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home mr-2" />
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>
                {deck.name}
              </Link>
            </li>
            <li className="breadcrumb-item active">
              Add Card
            </li>
          </ul>
        </nav>

        <div>
          <h2>{`${deck.name}: Add Card`}</h2>
        </div>

        <CardForm 
          deckId={deckId} 
          cardData={cardData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default AddCard;
