import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./charaters.css"

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export default function Characters() {
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<ApiResponse | null>(null);

  const handleNextPage = () => {
    setCount((prev) => prev + 1);
  };

  const handleBackPage = () => {
    setCount((prev) => prev - 1);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `https://swapi.py4e.com/api/people/?page=${count}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  const lastPage = count === 9;
  const firstPage = count === 1;

  return (
    <div className="container">
      {data && (
        <div>
          <h2 className="title">Star War Characters</h2>
          <ul className="character-list">
            {data.results.map((character: Character, index: number) => (
              <li key={index} className="character-item">
                <h3 className="character-name">{character.name}</h3>
                <p className="character-info">Height: {character.height}</p>
                <p className="character-info">Mass: {character.mass}</p>
                <p className="character-info">Hair Color: {character.hair_color}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="pagination">
        <button
          className="page-button"
          disabled={firstPage}
          onClick={handleBackPage}
        >
          Previous
        </button>
        <button
          className="page-button"
          disabled={lastPage}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      <Link to="/" className="link">
        Go to Homepage
      </Link>
    </div>
  );
}
