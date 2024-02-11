import React from "react";
import Image from 'next/image';

export default function UserMarker() {
  return (
    <div className="absolute right-0 top-0 w-[180px] h-[48px] bg-white border-2 border-gray-200 rounded-[50px] z-10 flex flex-row items-center justify-center">
      <div className="w-[10px]" />
      <Image src="/images/marker2.png" alt="userMarker" width={34} height={34} />
      <div className="w-[15px]" />
      <div className="w-[120px] h-[19px] text-[18px] text-[#5e5e5e]">내 마커 관리</div>
    </div>
  );
}
