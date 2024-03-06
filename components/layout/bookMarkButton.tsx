import React from "react";
import BookmarkButton from "../button/BookmarkButton";

interface BookMarkButtonProps {
  isSelected: boolean;
}

const BookMarkButton: React.FC<BookMarkButtonProps> = ({ isSelected }) => {
  return (
    <button className="w-[100px] h-[32px] bg-white rounded-30px flex justify-center items-center" onClick={() => {
      console.log('bookmark button clicked');
    }}>
      <div className="w-[100px] h-[24px] flex justify-center items-center">
        <div className="w-[24px] h-[24px] flex justify-center items-center">
          <BookmarkButton postId={1} initialIsBookmarked={isSelected} />
        </div>  
        <div className="w-[80px] text-[#222] text-[14px]">즐겨찾기</div>
      </div>
    </button>
  );
};

export default BookMarkButton;