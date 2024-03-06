import React from 'react';

type PageNumberProps = {
  number: number;
  isSelected: boolean;
  onClick: (pageNumber: number) => void;
};

const PageNumber: React.FC<PageNumberProps> = ({ number, isSelected, onClick }) => {
  // 선택된 페이지 번호에 따라 스타일을 다르게 적용합니다.
  const buttonStyle = isSelected
    ? "bg-pink-500 text-white text-[14px]" // 선택된 페이지 스타일
    : "bg-white text-pink-500 text-[14px] border-2 border-pink-500"; // 선택되지 않은 페이지 스타일

  return (
    <button
      className={`w-[28px] h-[28px] rounded-full ${buttonStyle} flex items-center justify-center shadow-md`}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );
};

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  let pages = [];
  for (let p = 1; p <= totalPages; p++) {
    pages.push(
      <PageNumber
        key={p}
        number={p}
        isSelected={p === currentPage}
        onClick={onPageChange}
      />
    );
  }

  return <div className="flex justify-center items-center my-4">{pages}</div>;
};

export default Pagination;
