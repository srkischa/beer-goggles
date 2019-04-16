import React, { FC } from "react";
import BeerCard from "./BeerCard";
import image from "../../../assets/images/no-image-available.png";
import "./BeerCards.css";

type BeerCardsProps = {
  onBeerClick: (beerId: string) => void;
  beers: any[];
};

const BeerCards: FC<BeerCardsProps> = ({ beers, onBeerClick }) => {
  return (
    <div className="beer-cards">
      {beers.map(beer => (
        <BeerCard
          name={beer.name}
          description={beer.description}
          id={beer.id}
          onBeerClick={onBeerClick}
          imageUrl={beer.labels ? beer.labels.medium : image}
        />
      ))}
    </div>
  );
};

export default BeerCards;
