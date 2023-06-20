import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function CreateDeck() {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);

  const handleCancel = () => {
    history.push("/");
  };

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
            <li className="breadcrumb-item active">Create Deck</li>
          </ul>
        </nav>

        <div>
          <h1>Create Deck</h1>

          <form>
            <div className="mb-3">
              <label for="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Deck Name"
              />
            </div>

            <div className="mb-3">
              <label for="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Brief description of the deck"
                rows="4"
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
