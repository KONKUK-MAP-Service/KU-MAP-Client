import React from "react";
import Image from "next/image";

interface MarkerRegisterButtonProps {
  onClick: () => void;
}

const MarkerRegisterButton: React.FC<MarkerRegisterButtonProps> = ({ onClick }) => {
  return (
    <div className="overlay z-10" style={{ transform: 'translateY(-70px)' }}>
        <div className="w-[160px] h-[48px] bg-[#FC487E] rounded-[50px] flex items-center justify-center cursor-pointer z-20" onClick={onClick}>
            <div className="flex flex-row items-center justify-center gap-[12px]">
                <Image src="/images/register.png" alt="등록하기" width={34} height={34} layout="fixed" />
                <div className="text-white text-[18px] font-semibold">마커 만들기</div>
            </div>
        </div>
    </div>    
  );
};

export default MarkerRegisterButton;
