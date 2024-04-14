import React from "react";
import Bookmark from "../button/bookmark";

const BookMarkButton: React.FC<commonProps> = ({spotId, initialState}) => {
  return (
    <button className="common-button flex flex-row">
        <div className="relative w-[24px] h-[24px] flex justify-center items-center">
          <Bookmark spotId={spotId} initialState={initialState} />
        </div>  
        <span className="text-sm text-[#222] 2xl: text-base mx-1"> 즐겨찾기</span>
    </button>
  );
};

export default BookMarkButton;