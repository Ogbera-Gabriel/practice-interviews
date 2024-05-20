import { useEffect, useState } from "react";
import "./planets.css";
import { Link } from "react-router-dom";

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HomeWorld[];
};

type HomeWorld = {
  name: string;
  population: string;
  residents: string[];
};

export default function Planets() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [count, setCount] = useState<number>(1);

  const handleNextPage = () => {
    setCount((prev) => prev + 1);
  };

  const handleBackPage = () => {
    setCount((prev) => prev - 1);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/planets?page=${count}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const planetData: ApiResponse = await response.json();
      setData(planetData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const lastPage = count === 7;
  const firstPage = count === 1;

  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <div className="container">
      <h2 className="title">Star Wars Planets</h2>
      {data && (
        <ul className="planet-list">
          {data.results.map((planet: HomeWorld, index: number) => (
            <li key={index} className="planet-item">
              <h3 className="planet-name">{planet.name}</h3>
              <p className="planet-info">Population: {planet.population}</p>
              <p className="planet-info">
                Charaters: {planet.residents.length}
              </p>{" "}
            </li>
          ))}
        </ul>
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
