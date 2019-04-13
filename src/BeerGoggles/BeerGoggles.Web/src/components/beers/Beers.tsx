import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import BeerCard from "./BeerCard";
import "./Beers.css";

const Beers: FC<RouteComponentProps> = ({ history }) => {
  const [beers, setBeers] = useState<any[]>([]);
  const [selectedBeer, setSelectedBeer] = useState("");

  useEffect(() => {
    axios.get("beers").then(result => {
      setBeers(result.data.data);
    });
  }, []);

  function onBeerClickHandler(id: string) {
    history.push({
      pathname: `/beer/${id}`
    });
  }

  return (
    <div className="beer-cards-container">
      <div className="card-deck">
        {beers
          .filter(b => b.labels)
          .map(beer => (
            <BeerCard
              key={beer.id}
              id={beer.id}
              name={beer.name}
              description={beer.description}
              imageUrl={beer.labels.medium}
              onBeerClick={onBeerClickHandler}
            />
          ))}
      </div>
    </div>
  );
};

export default Beers;
