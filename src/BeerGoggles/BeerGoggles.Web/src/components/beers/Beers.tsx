import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";

const Beers: FC<RouteComponentProps> = ({ history }) => {
  const [beers, setBeers] = useState<any[]>([]);
  const [selectedBeer, setSelectedBeer] = useState("");

  useEffect(() => {
    axios.get("beers").then(result => {
      setBeers(result.data.data);
    });
  }, []);

  function checkBeerDetails() {
    history.push({
      pathname: `/beer/${selectedBeer}`
    });
  }

  return (
    <div>
      <div>Beers</div>
      {beers.map(beer => (
        <div>{beer.name}</div>
      ))}
    </div>
  );
};

export default Beers;
