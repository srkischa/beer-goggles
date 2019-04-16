import React, { FC, useState, useEffect, MouseEvent, ChangeEvent } from "react";
import axios from "../../../axios";
import "./FilterForm.css";

export type FilterFormValue = {
  name?: string;
  styleId?: string;
  isOrganic?: string;
};

type FilterFormProps = {
  onChange: (value: FilterFormValue) => void;
};

type BeerStyle = { id: number; name: string };

const FilterForm: FC<FilterFormProps> = ({ onChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [styles, setStyles] = useState<BeerStyle[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [filterOnlyOrganic, setFilterOnlyOrganic] = useState(false);

  useEffect(() => {
    axios.get("styles").then(result => {
      const { data } = result.data;
      setStyles(
        data.map((style: BeerStyle) => {
          return { id: style.id, name: style.name };
        })
      );
    });
  }, []);

  const styleChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStyle(event.target.value);
  };

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const toggleOrganicHandler = () => {
    setFilterOnlyOrganic(!filterOnlyOrganic);
  };

  const submitFilterHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onChange({
      name: name.length > 0 ? `*${name}*` : "",
      styleId: selectedStyle === "-1" ? undefined : selectedStyle,
      isOrganic: filterOnlyOrganic ? "Y" : undefined
    });
  };

  const clearFilterHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setName("");
    setSelectedStyle("-1");
    onChange({ name: "" });
  };

  const collapseToggleClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowFilter(!showFilter);
  };

  const filterClass = "collapse" + (showFilter ? " show" : "");

  return (
    <>
      <p>
        <a className="btn btn-primary" onClick={collapseToggleClickHandler}>
          {showFilter ? "Hide Filter" : "Show Filter"}
        </a>
      </p>
      <div className={filterClass}>
        <form className="form-container border rounded">
          <div className="form-row mb-4">
            <div className="col-auto">
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                value={name}
                onChange={nameChangeHandler}
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="style">
                Style
              </label>
              <select
                id="style"
                className="form-control mb-2"
                value={selectedStyle}
                onChange={styleChangeHandler}
              >
                <option value="-1">All Beer Styles</option>
                {styles.map(style => (
                  <option value={style.id} key={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <div className="form-check mt-1 ml-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filterOnlyOrganic}
                  onChange={toggleOrganicHandler}
                  id="isOrganic"
                />
                <label className="form-check-label" htmlFor="isOrganic">
                  Show Only Organic
                </label>
              </div>
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
      </div>
    </>
  );
};

export default FilterForm;
