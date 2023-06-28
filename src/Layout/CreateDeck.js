import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck({...formData}, abortController.signal);
    history.push(`/decks/${response.id}`);
  };

  const handleCancel = () => {
    history.push("/");
  };

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
            <li className="breadcrumb-item active">Create Deck</li>
          </ul>
        </nav>

        <div>
          <h1>Create Deck</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-group">
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
              <button className="btn btn-secondary mx-1" onClick={() => handleCancel()}>
                Cancel
              </button>
              <button
                className="btn btn-primary mx-1"
              >
              Submit 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateDeck;
