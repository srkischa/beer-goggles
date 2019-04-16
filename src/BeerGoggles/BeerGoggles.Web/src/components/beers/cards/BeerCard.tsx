import React, { FC } from "react";
import "./BeerCard.css";

type BeerCardProps = {
  name: string;
  description: string;
  imageUrl: string;
  id: string;
  onBeerClick: (id: string) => void;
};

const BeerCard: FC<BeerCardProps> = ({
  name,
  id,
  description = "",
  imageUrl,
  onBeerClick
}) => (
  <div onClick={() => onBeerClick(id)} className="card-container">
    <div>
      <img src={imageUrl} className="beer-card-image" />
    </div>
    <div>
      <span className="beer-name">{name}</span>
      <hr />
      <span className="beer-description">{description.slice(0, 125)}</span>
    </div>
  </div>
);
export default BeerCard;
