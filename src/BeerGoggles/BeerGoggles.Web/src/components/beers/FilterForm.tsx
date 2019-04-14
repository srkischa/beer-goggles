import React, { FC, useState, useEffect } from "react";
import axios from "../../axios";
import "./FilterForm.css";

export type FilterFormValue = {
  name?: string;
  styleId?: string;
};

type FilterForm = {
  onChange: (value: FilterFormValue) => void;
};

type Style = { id: number; name: string };

const FilterForm: FC<FilterForm> = ({ onChange }) => {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>();
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get("styles").then(result => {
      const { data } = result.data;
      setStyles(
        data.map((style: Style) => {
          return { id: style.id, name: style.name };
        })
      );
    });
  }, []);

  const styleChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStyle(event.target.value);
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitFilterHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onChange({
      name,
      styleId: selectedStyle === "-1" ? undefined : selectedStyle
    });
  };

  const clearFilterHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("clearFilterHandler");
    event.preventDefault();
    setName("");
    setSelectedStyle("-1");
    onChange({ name: "", styleId: undefined });
  };

  return (
    <form className="form-container border rounded">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={nameChangeHandler}
            placeholder="Name"
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="style">Style</label>
          <select
            id="style"
            className="form-control"
            value={selectedStyle}
            onChange={styleChangeHandler}
          >
            <option value="-1">Choose...</option>
            {styles.map(style => (
              <option value={style.id} key={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">City</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="form-group col-md-4" />
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">Zip</label>
          <input type="text" className="form-control" id="inputZip /" />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-warning m-2"
        onClick={clearFilterHandler}
      >
        Clear Filter
      </button>
      <button
        type="submit"
        className="btn btn-primary m-2"
        onClick={submitFilterHandler}
      >
        Filter
      </button>
    </form>
  );
};

export default FilterForm;
