import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import "./Beers.css";
import TableHeader from "./TableHeader";
import toQueryStringParams from "./../../utils/http";
import Paginator from "./Paginatior";
import FilterForm, { FilterFormValue } from "./FilterForm";

type BeerQuery = {
  order?: string;
  sort?: string;
  p?: number;
} & FilterFormValue;

const Beers: FC<RouteComponentProps> = ({ history }) => {
  const [beers, setBeers] = useState<any[]>([]);
  const [order, setOrder] = useState("name");
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filterFormValue, setFilterFormValue] = useState<FilterFormValue>({
    name: ""
  });

  function getBeers(beerQuery: BeerQuery) {
    let queryParams = "";
    if (beerQuery) {
      queryParams = toQueryStringParams(beerQuery);
    }
    const url = queryParams ? "beers?" + queryParams : "beers";
    axios.get(url).then(result => {
      const { data, currentPage, numberOfPages } = result.data;
      setBeers(data || []);
      setCurrentPage(currentPage);
      setNumberOfPages(numberOfPages || 0);
    });
  }

  useEffect(() => {
    const { name, styleId, isOrganic } = filterFormValue;
    getBeers({ sort, order, p: nextPage, name, styleId, isOrganic });
  }, [
    sort,
    order,
    nextPage,
    filterFormValue.name,
    filterFormValue.styleId,
    filterFormValue.isOrganic
  ]);

  function onBeerClickHandler(id: string) {
    history.push({
      pathname: `/beer/${id}`
    });
  }

  function onSortHandler(columnName: string) {
    console.log(sort, columnName);
    if (order !== columnName) {
      setOrder(columnName);
      setSort("ASC");
    } else {
      setSort(sort === "ASC" ? "DESC" : "ASC");
    }
  }

  function paginateNextHandler(nextPage: number) {
    setNextPage(nextPage);
  }

  function filterSubmitedHandler(value: FilterFormValue) {
    console.log(value);
    setFilterFormValue(value);
  }

  return (
    <div className="beer-cards-container">
      <FilterForm onChange={filterSubmitedHandler} />
      <div className="float-right">
        <Paginator
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={paginateNextHandler}
        />
      </div>

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
                <td>{beer.description ? beer.description.slice(0, 80) : ""}</td>
                <td>{beer.isOrganic === "Y" ? "Yes" : "No"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Beers;
