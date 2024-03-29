import React from "react";
import Heart from "../button/heart";


const HeartButton: React.FC<commonProps> = ({ spotId, initialState}) => {
  return (
    <button className="common-button flex flex-row">
      <div className="relative w-[24px] h-[24px] flex justify-center items-center">
          <Heart spotId={spotId} initialState = {initialState}  />
      </div>  
      <span className="text-sm text-[#222] 2xl: text-base mx-2">좋아요</span>
    </button>
  );
};

export default HeartButton;