import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";

function StudyDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, setFront] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();

            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
                setCards(deckResponse.cards);
            } catch(error) {
                console.log("Something went wrong", error);
            }

            return () => {
                abortController.abort();
            }
        }
        fetchData();
    }, [deckId]);

    const nextCard = (index, total) => {
        console.log(index);
        if(index < total) {
            setCardNumber(cardNumber + 1);
            setFront(true);
        } else {
            if(window.confirm(`Restart cards? Click 'cancel' to return to the home page`)) {
                setCardNumber(1);
                setFront(true);
            } else {
                history.push("/");
            }
        }
    }

    const flipCard = () => {
        if(front) {
            setFront(false);
        } else {
            setFront(true);
        }
    }

    const showNextButton = (cards, index) => {
        if(front) {
            return null;
        } else {
            return (
                <button 
                    onClick={() => nextCard(index + 1, cards.length)}
                    className="btn btn-primary mx-1"
                >
                    Next
                </button>
            );
        }
    }

    const enoughCards = () => {
        return (
            <div className="card">
                {cards.map((card, index) => {
                    if(index === cardNumber - 1) {
                        return (
                            <div className="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>
                                <div className="card-text">
                                    {front ? card.front : card.back}
                                </div>
                                <button
                                    onClick={flipCard}
                                    className="btn btn-secondary mx-1"
                                >
                                    Flip
                                </button>
                                {showNextButton(cards, index)}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }

    const notEnoughCards = () => {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-1">
                    <span className="oi oi-plus mr-2" />
                    Add Cards
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <nav>
                    <ul className="breadcrumb p-3 bg-body-tertiary rounded-3">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <span className="oi oi-home mr-2"/>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">Study</li>
                    </ul>
                </nav>

                <div>
                    <h2>{`Study: ${deck.name}`}</h2>
                </div>

                <div>
                    {cards.length > 2 ? enoughCards() : notEnoughCards()}
                </div>
            </div>
        </>
    );
}

export default StudyDeck;