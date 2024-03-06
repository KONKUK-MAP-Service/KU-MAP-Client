import React from 'react';
import Image from 'next/image';
import HeartButton from '../layout/heartButton';
import BookMarkButton from '../layout/bookMarkButton';

interface LocationInfoProps {
    data: any;
    onBack: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ data, onBack }) => {
  const { title, subtitle, date, isBookmarked } = data;  
  const imageSrc = "/images/anton.jpeg"
  return (
    <div className="absolute left-[410px] top-[150px] w-[400px] h-[694px] bg-white border-2 border-gray-200 rounded-[50px] z-10 flex flex-col overflow-hidden">
      <div className='bg-[#FAF5F9] w-full h-[140px] rounded-t-lg'>
        <div className="w-full h-[72px] flex items-center justify-end">
          <button onClick={onBack} className="m-6">
            <Image src="/images/back.png" alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className='w-full h-[68px] flex flex-col items-center justify-center'>
            <div className='w-[352px] h-[18px] text-[#222] text-[14px]'>{date}</div>
            <div className="w-[352px] h-[29px] text-[#222] text-[24px] font-bold">{title}</div>
        </div>
      </div> 
      <div className="bg-white w-[400px] h-[550px] rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 flex flex-col justify-center items-center">
          <div className="mt-4 rounded-[10px] w-[262px] h-[394px]">
            <Image src={imageSrc} alt="Location" width={262} height={394} />
          </div>
          <div className="mt-4 w-[352px] h-[46px] text-[#222] text-[18px]">{subtitle}</div>
          <div className="mt-4 w-[220px] h-[32px] flex justify-center items-center rounded-[10px]">
            <HeartButton isSelected={false}/>
            <div className='w-[10px]'/>
            <BookMarkButton isSelected={isBookmarked}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
