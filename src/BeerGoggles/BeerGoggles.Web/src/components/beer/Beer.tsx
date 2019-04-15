import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Beer.css";

type Identifiable = {
  id: string;
};

const Beer: FC<RouteComponentProps<Identifiable>> = ({ history, match }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("beer/" + match.params["id"]).then(result => {
      const { name, description, labels } = result.data.data;
      setDescription(description);
      setImageUrl(labels.medium);
      setName(name);
    });
  }, []);

  function onBackClickHandler() {
    history.push({
      pathname: `/`
    });
  }

  return (
    <div className="row">
      <div className="col-8 col-md-6" style={{ margin: "0 auto" }}>
        <Card>
          <Card.Img variant="top" src={imageUrl} className="beer-card-image" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary" onClick={onBackClickHandler}>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default Beer;
