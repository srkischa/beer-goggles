import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import "./Beers.css";
import TableHeader from "./TableHeader";
import toQueryStringParams from "./../../utils/http";

type BeerQuery = { order?: string; sort?: string } | null;

const Beers: FC<RouteComponentProps> = ({ history }) => {
  const [beers, setBeers] = useState<any[]>([]);
  const [selectedBeer, setSelectedBeer] = useState("");
  const [order, setOrder] = useState("name");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

  function getBeers(beerQuery: BeerQuery) {
    let queryParams = "";
    if (beerQuery) {
      queryParams = toQueryStringParams(beerQuery);
    }
    let url = queryParams ? "beers?" + queryParams : "beers";
    axios.get(url).then(result => {
      setBeers(result.data.data);
    });
  }

  useEffect(() => {
    getBeers(null);
  }, []);

  function onBeerClickHandler(id: string) {
    history.push({
      pathname: `/beer/${id}`
    });
  }

  function onSortHandler(name: string) {
    if (order !== name) {
      setOrder(name);
      setSort("ASC");
    } else {
      setSort(sort === "ASC" ? "DESC" : "ASC");
    }
    getBeers({ sort, order });
  }

  return (
    <div className="beer-cards-container">
      <div className="card-deck">
        <table className="table table-bordered">
          <thead>
            <tr>
              <TableHeader
                title="Name"
                name="name"
                isSorted={order === "name"}
                sortDirection={sort}
                onSort={onSortHandler}
              />
              <TableHeader
                title="Type"
                name="type"
                isSorted={order === "x"}
                sortDirection={sort}
                onSort={onSortHandler}
              />
              <TableHeader
                title="Description"
                name="description"
                isSorted={order === "description"}
                sortDirection={sort}
                onSort={onSortHandler}
              />
              <TableHeader
                title="Is organic"
                name="isOrganic"
                isSorted={order === "isOrganic"}
                sortDirection={sort}
                onSort={onSortHandler}
              />
            </tr>
          </thead>
          <tbody>
            {beers
              .filter(b => b.labels)
              .map(beer => (
                <tr key={beer.id} onClick={() => onBeerClickHandler(beer.id)}>
                  <td>{beer.name}</td>
                  <td>{beer.style ? beer.style.name : ""}</td>
                  <td>
                    {beer.description ? beer.description.slice(0, 80) : ""}
                  </td>
                  <td>{beer.isOrganic === "Y" ? "Yes" : "No"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Beers;
