import React, { FC } from "react";
import Pagination from "react-bootstrap/Pagination";

type Paginator = {
  currentPage: number;
  numberOfPages: number;
  onClick: (nextPage: number) => void;
};

const Paginator: FC<Paginator> = ({ currentPage, numberOfPages, onClick }) => {
  if (numberOfPages === 0) {
    return null;
  }

  const numberedPagesCount = 5;
  const startPage = Math.min(
    currentPage,
    numberOfPages - numberedPagesCount + 1
  );

  let numberRange: number[] = [];

  if (numberOfPages < numberedPagesCount) {
    numberRange = [...Array(numberOfPages)].map((_, i) => i + 1);
  } else {
    numberRange = [...Array(numberedPagesCount)].map((_, i) => i + startPage);
  }

  return (
    <Pagination>
      <Pagination.First
        onClick={() => onClick(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {numberRange.map(number => (
        <Pagination.Item
          key={number}
          onClick={() => onClick(number)}
          active={number === currentPage}
        >
          {number}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={currentPage === numberOfPages}
        onClick={() => onClick(currentPage + 1)}
      />
      <Pagination.Last
        disabled={currentPage === numberOfPages}
        onClick={() => onClick(numberOfPages)}
      />
    </Pagination>
  );
};

export default Paginator;
