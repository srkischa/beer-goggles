import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";

type TableHeaderProps = {
  name?: string;
  title: string;
  isSorted?: boolean;
  sortDirection?: "ASC" | "DESC";
  isSortable?: boolean;
  onSort?: (id: string) => void;
};

const TableHeader: FC<TableHeaderProps> = ({
  title,
  name,
  isSorted,
  sortDirection,
  isSortable = true,
  onSort
}) => {
  function sortClickHandler() {
    if (isSortable && name && onSort) {
      onSort(name);
    }
  }

  return (
    <th scope="col" onClick={sortClickHandler}>
      <span className="mr-2">{title}</span>
      {isSortable && (
        <FontAwesomeIcon
          icon={
            isSorted
              ? sortDirection === "ASC"
                ? faSortUp
                : faSortDown
              : faSort
          }
        />
      )}
    </th>
  );
};
export default TableHeader;
