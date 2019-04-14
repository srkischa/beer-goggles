import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";

type TableHeader = {
  name: string;
  title: string;
  isSorted: boolean;
  sortDirection: "ASC" | "DESC";
  onSort: (id: string) => void;
};

const TableHeader: FC<TableHeader> = ({
  title,
  name,
  isSorted,
  sortDirection,
  onSort
}) => (
  <th scope="col" onClick={() => onSort(name)}>
    {title}
    <FontAwesomeIcon
      icon={
        isSorted ? (sortDirection === "ASC" ? faSortUp : faSortDown) : faSort
      }
    />
  </th>
);
export default TableHeader;
