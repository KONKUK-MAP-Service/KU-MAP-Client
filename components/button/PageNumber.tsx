import React from 'react';

type PageNumberProps = {
  number: number;
  isSelected: boolean;
  onClick: (pageNumber: number) => void;
};

const PageNumber: React.FC<PageNumberProps> = ({ number, isSelected, onClick }) => {
  const buttonStyle = isSelected
    ? "bg-pink-500 text-white text" 
    : "bg-white text-pink-500 text border-2 border-pink-500";

  return (
    <button
      className={`w-[28px] h-[28px] rounded-full ${buttonStyle} mx-1 flex items-center justify-center shadow-md`}
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
  
   // 시작 페이지 계산
   let startPage = currentPage - 2 <= 0 ? 1 : currentPage - 2;
   // 시작 페이지가 마지막에서 5개 이전 페이지보다 클 경우 조정
   if (startPage > totalPages - 4) {
     startPage = totalPages - 4 > 0 ? totalPages - 4 : 1;
   }
   
   // 종료 페이지 계산
   let endPage = startPage + 4;
   if (endPage > totalPages) {
     endPage = totalPages;
   }

  // 페이지 버튼 생성
  for (let p = startPage; p <= endPage; p++) {
    pages.push(
      <PageNumber
        key={p}
        number={p}
        isSelected={p === currentPage}
        onClick={() => onPageChange(p)}
      />
    );
  }

  return (
    <div className="flex justify-center items-center my-4">
      <button className = "text-[#404040] mx-2" onClick={() => onPageChange(startPage - 1)} disabled = {startPage <= 1}>{'<'}</button>
      {pages}
      <button className = "text-[#404040] mx-2" onClick={() => onPageChange(endPage + 1)} disabled = {endPage >= totalPages}>{'>'}</button>
    </div>
  );
};

export default Pagination;