import React from "react";
import Image from "next/image";
import Heart from "../button/heart";

interface HeartButtonProps {
  isSelected: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ isSelected }) => {
  return (
    <button className="common-button flex flex-row">
      <div className="relative w-[24px] h-[24px] flex justify-center items-center">
          <Heart postId={1} initialsLiked={isSelected}  />
      </div>  
      <span className="text-sm text-[#222] 2xl: text-base mx-2">좋아요</span>
    </button>
  );
};

export default HeartButton;