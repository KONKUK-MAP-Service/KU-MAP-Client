import React from "react";
import Image from "next/image";

interface HeartButtonProps {
  isSelected: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ isSelected }) => {
  return (
    <button className="w-[100px] h-[32px] bg-white rounded-30px flex justify-center items-center">
      <div className="w-[72px] h-[24px] flex justify-center items-center">
        <Image src={isSelected ? "/images/heart-selected.png" : "/images/heart.png"} alt="Heart" width={24} height={24} />
        <div className="text-[#222] text-[14px]">좋아요</div>
      </div>
    </button>
  );
};

export default HeartButton;