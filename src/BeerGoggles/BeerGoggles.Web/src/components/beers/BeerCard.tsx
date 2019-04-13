import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./BeerCard.css";

type BeerCard = {
  name: string;
  description: string;
  imageUrl: string;
  id: string;
  onBeerClick: (id: string) => void;
};

const BeerCard: FC<BeerCard> = ({
  name,
  id,
  description = "",
  imageUrl,
  onBeerClick
}) => (
  <div className="col-3 col-md-3">
    <Card>
      <Card.Img variant="top" src={imageUrl} className="beer-card-image" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description.slice(0, 100)}</Card.Text>
        <Button variant="primary" onClick={() => onBeerClick(id)}>
          Check this beer
        </Button>
      </Card.Body>
    </Card>
  </div>
);
export default BeerCard;
