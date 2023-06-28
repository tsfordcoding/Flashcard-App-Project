import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const initalDeckData = {
        id: "",
        name: "",
        description: "",
    }
    
    const [formData, setFormData] = useState(initalDeckData);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();

            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                setFormData(deckResponse);
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
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({...formData}, abortController.signal);
        history.push(`/decks/${response.id}`);
    }

    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
    }

    return (
      <>
        <div className="container">
          <nav>
            <ul className="breadcrumb p-3 bg-body-tertiary rounded-3">
              <li className="breadcrumb-item ">
                <Link to="/">
                  <span className="oi oi-home mr-2" />
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Edit Deck</li>
            </ul>
          </nav>

          <div>
            <h1>Edit Deck</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Deck Name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  id="description"
                  placeholder="Brief description of the deck"
                  rows="4"
                  onChange={handleChange}
                  value={formData.description}
                ></textarea>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button className="btn btn-primary mx-1">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default EditDeck;