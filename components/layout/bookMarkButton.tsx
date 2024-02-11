import React from "react";
import Image from "next/image";

interface BookMarkButtonProps {
  isSelected: boolean;
}

const BookMarkButton: React.FC<BookMarkButtonProps> = ({ isSelected }) => {
  return (
    <button className="w-[100px] h-[32px] bg-white rounded-30px flex justify-center items-center">
      <div className="w-[100px] h-[24px] flex justify-center items-center">
        <Image src={isSelected ? "/images/bookmark-selected.png" : "/images/bookmark.png"} alt="Heart" width={24} height={24} />
        <div className="w-[80px] text-[#222] text-[14px]">즐겨찾기</div>
      </div>
    </button>
  );
};

export default BookMarkButton;