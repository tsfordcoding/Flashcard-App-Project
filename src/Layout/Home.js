import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch(error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);
  
  async function handleDelete(deck) {
    if(
        window.confirm(
            `Delete this deck? You will not be able to recover it.`
        )
    ) {
        history.go(0);
        return await deleteDeck(deck.id)
    }
  }
  
  return (
    <>
      <div className="container">
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create Deck</button>
        </Link>
        <br />
        <br />
        <div className="card-deck">
          {decks.map((deck) => {
            return (
              <div className="card" key={deck.id}>
                <div className="card-header mb-2">
                  <p className="float-right ml-3">{`${deck.cards.length} cards`}</p>
                  <h2 className="card-title pb-2 my-0">{`${deck.name}`}</h2>
                </div>
                <div className="card-text p-2">{`${deck.description}`}</div>
                <div className="col pb-2">
                  <Link
                    className="btn btn-secondary mx-1"
                    to={`/decks/${deck.id}`}
                  >
                    <span className="oi oi-eye  mr-2" />
                    View
                  </Link>
                  <Link
                    className="btn btn-primary mx-1"
                    to={`/decks/${deck.id}/study`}
                  >
                    <span className="oi oi-book  mr-2" />
                    Study
                  </Link>
                  <button
                    type="button"
                    className="float-right btn btn-danger mx-1"
                    onClick={() => handleDelete(deck)}
                  >
                    <span className="oi oi-trash  mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
