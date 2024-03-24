import React from "react";
import Image from 'next/image';

interface UserMarkerProps {
  onUserMarkerClick: () => void;
}

const UserMarker: React.FC<UserMarkerProps> = ({ onUserMarkerClick }) => {
  return (
    <div className="my-marker min-h-[50px] min-w-[150px] flex flex-row">
      <button className="flex flex-row" onClick={onUserMarkerClick}>
        <div className="w-[10px]" />
        <Image src="/images/map-marker.png" alt="userMarker" width={34} height={34} />
        <div className="mt-2 ml-1 text-[#5e5e5e]">내 마커 관리</div>
        <div className="w-[10px]" />
      </button>  
    </div>
  );
}

export default UserMarker;
