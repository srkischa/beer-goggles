import React, { FC, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import axios from "../../axios";
import "./Beers.css";
import toQueryStringParams from "./../../utils/http";
import Paginator from "./Paginatior";
import FilterForm, { FilterFormValue } from "./filter-form/FilterForm";
import BeerTable from "./table/Table";
import BeerCards from "./cards/BeerCards";

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
    name: "",
    hasLabels: "Y"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showTableView, setShowTableView] = useState(false);

  function getBeers(beerQuery: BeerQuery) {
    setIsLoading(true);
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
      setIsLoading(false);
    });
  }

  useEffect(() => {
    const { name, styleId, isOrganic, hasLabels } = filterFormValue;
    getBeers({ sort, order, p: nextPage, name, styleId, isOrganic, hasLabels });
  }, [
    sort,
    order,
    nextPage,
    filterFormValue.name,
    filterFormValue.styleId,
    filterFormValue.isOrganic,
    filterFormValue.hasLabels
  ]);

  function beerClickHandler(id: string) {
    history.push({
      pathname: `/beer/${id}`
    });
  }

  function sortClickHandler(columnName: string) {
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
    setFilterFormValue(value);
  }

  function toggleViewHandler() {
    setShowTableView(!showTableView);
  }

  return (
    <div className="beer-cards-container">
      <FilterForm onChange={filterSubmitedHandler} />
      <div>
        <button className="btn" onClick={toggleViewHandler}>
          {showTableView ? "Show cards view" : "Show table view"}
        </button>
        <Paginator
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={paginateNextHandler}
        />
      </div>
      {isLoading && <div>Loading ...</div>}
      {!isLoading && beers.length > 0 ? (
        !showTableView ? (
          <BeerCards beers={beers} onBeerClick={beerClickHandler} />
        ) : (
          <BeerTable
            order={order}
            sortDirection={sort}
            beers={beers}
            onBeerClick={beerClickHandler}
            onSort={sortClickHandler}
          />
        )
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default Beers;
