import React, { FC } from "react";
import TableHeader from "./TableHeader";

type BeerTableProps = {
  order: string;
  onSort: (id: string) => void;
  sortDirection: "ASC" | "DESC";
  onBeerClick: (beerId: string) => void;
  beers: any[];
};

const BeerTable: FC<BeerTableProps> = ({
  order,
  onSort,
  sortDirection,
  beers,
  onBeerClick
}) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <TableHeader
            title="Name"
            name="name"
            isSorted={order === "name"}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <TableHeader title="Type" isSortable={false} />
          <TableHeader
            title="Description"
            name="description"
            isSorted={order === "description"}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <TableHeader
            title="Is organic"
            name="isOrganic"
            isSorted={order === "isOrganic"}
            sortDirection={sortDirection}
            onSort={onSort}
          />
        </tr>
      </thead>
      <tbody>
        {beers.map(beer => (
          <tr key={beer.id} onClick={() => onBeerClick(beer.id)}>
            <td>{beer.name}</td>
            <td>{beer.style ? beer.style.name : ""}</td>
            <td>{beer.description ? beer.description.slice(0, 80) : ""}</td>
            <td>{beer.isOrganic === "Y" ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BeerTable;
