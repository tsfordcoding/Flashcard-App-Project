import React from "react";
import { Link, useHistory } from "react-router-dom";

function CardForm({ deckId, cardData, handleChange, handleSubmit }) {
    const history = useHistory();
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="front" className="form-label">
                    Front
                </label>
                <textarea
                    name="front"
                    className="form-control"
                    id="front"
                    placeholder="Front side of card"
                    rows="4"
                    onChange={handleChange}
                    value={cardData.front}
                ></textarea>
            </div> 
            <div className="mb-3">
                <label htmlFor="back" className="form-label">
                    Back
                </label>
                <textarea
                    name="back"
                    className="form-control"
                    id="back"
                    placeholder="Back side of card"
                    rows="4"
                    onChange={handleChange}
                    value={cardData.back}
                ></textarea>
            </div>
            <Link to={`/decks/${deckId}`} className="mr-2">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push(`/decks/${deckId}`)}
                >
                    Done
                </button>
            </Link>
            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </form>
    ); 
}

export default CardForm;