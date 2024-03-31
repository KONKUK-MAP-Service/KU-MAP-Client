import React from "react";
import Image from 'next/image';

interface FloatingButtonProps {
  onButtonClick: () => void;
}

const MainPageFloatingButton: React.FC<FloatingButtonProps> = ({ onButtonClick: onMainPageFloatingButtonClick }) => {
  return (
    <div className="my-marker min-h-[50px] min-w-[150px] flex flex-row">
      <button className="flex flex-row" onClick={onMainPageFloatingButtonClick}>
        <div className="w-[10px]" />
        <Image src="/images/mainPageFloating.png" alt="userMarker" width={34} height={34} />
        <div className="mt-2 ml-1 text-[#5e5e5e]">메인 페이지로 이동</div>
        <div className="w-[10px]" />
      </button> 
    </div>
  );
}

export default MainPageFloatingButton;
