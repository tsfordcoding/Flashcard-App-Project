import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const initialFormState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  }

  const [deck, setDeck] = useState({});
  const [cardData, setCardData] = useState(initialFormState);

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

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchData() {
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        setCardData(cardResponse);
      } catch(error) {
        console.log("Something went wrong", error);
      }

      return () => {
        abortController.abort();
      }
    }
    fetchData();
  }, [cardId]);


  const handleChange = ({ target }) => {
    setCardData({
      ...cardData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(cardData);
    setCardData(initialFormState);
    history.push(`/decks/${deckId}`);
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
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Card</li>
          </ul>
        </nav>

        <div>
          <h2>{`${deck.name}: Edit Card`}</h2>
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

export default EditCard;
