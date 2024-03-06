import React from "react";
import Image from 'next/image';
import Link from "next/link";

export default function UserMarker() {
  return (
    <div className="my-marker min-h-[50px] min-w-[150px] flex flex-row">
      <Link href="/mypage/marker" className="flex flex-row">
        <div className="w-[10px]" />
        <Image src="/images/marker2.png" alt="userMarker" width={34} height={34} />
        <div className="mt-2 ml-1 text-[#5e5e5e]">내 마커 관리</div>
        <div className="w-[10px]" />
      </Link>  
    </div>
  );
}
