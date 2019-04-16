import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import Button from "react-bootstrap/Button";
import "./Beer.css";
import image from "../../assets/images/no-image-available.png";

type Identifiable = {
  id: string;
};

const Beer: FC<RouteComponentProps<Identifiable>> = ({ history, match }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("beer/" + match.params["id"]).then(result => {
      const { name, description, labels } = result.data.data;
      setDescription(description);
      setImageUrl(labels ? labels.medium : image);
      setName(name);
      setIsLoading(false);
    });
  }, []);

  function onBackClickHandler() {
    history.push({
      pathname: `/`
    });
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="row">
      <div className="col-8 col-md-6" style={{ margin: "0 auto" }}>
        <div className="item-container">
          <div className="image-wrapper">
            <img src={imageUrl} className="item-image" />
          </div>
          <div className="desc-container">
            <span className="item-name">{name}</span>
            <span className="item-type">Beer type should be here</span>
            <hr />
            <span className="item-description">
              {description || "No description provided"}
            </span>
            <Button
              variant="primary"
              className="back-button"
              onClick={onBackClickHandler}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Beer;
