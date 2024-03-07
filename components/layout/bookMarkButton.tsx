import React from "react";
import BookmarkButton from "../button/bookmark";

interface BookMarkButtonProps {
  isSelected: boolean;
}

const BookMarkButton: React.FC<BookMarkButtonProps> = ({ isSelected }) => {
  return (
    <button className="common-button flex flex-row" onClick={() => {
      console.log('bookmark button clicked');
    }}>
        <div className="relative w-[24px] h-[24px] flex justify-center items-center">
          <BookmarkButton postId={1} initialIsBookmarked={isSelected} />
        </div>  
        <span className="text-sm text-[#222] 2xl: text-base mx-1"> 즐겨찾기</span>
    </button>
  );
};

export default BookMarkButton;