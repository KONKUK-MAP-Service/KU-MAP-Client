import React from 'react';
import Image from 'next/image';
import HeartButton from '../layout/heartButton';
import BookMarkButton from '../layout/bookMarkButton';

interface LocationInfoProps {
    data: any;
    onBack: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ data, onBack }) => {
  const { title, subtitle, date, writer, isBookmarked } = data;  
  const imageSrc = "/images/anton.jpeg"
  return (
    <div className="marker-list-item flex flex-col">
        <div className='w-full bg-[#FAF5F9] h-[20%] rounded-t-lg flex flex-col items-end'>
          <button onClick={onBack} className="my-3 mx-5">
              <Image src="/images/back.png" alt="Close" width={24} height={24}/>
          </button>
          <div className='w-full h-[15%] my-5 flex flex-col items-start justify-start'>
              <div className='px-3 text-sm text-[#222]'>{date} 작성자: {writer}</div>
              <div className="px-3 text-2xl text-[#222] font-bold">{title}</div>
          </div>
        </div> 
        <div className="w-full h-[80%] rounded-b-lg overflow-hidden flex flex-col justify-center items-center">
            <div style={{ position: "relative", width: "100%", maxWidth: "90%", height: "60%"}}>
              <Image src={imageSrc} alt={title} fill style={{objectFit: 'contain'}}/>
            </div>
            {/* subtitle이 아니라 설명으로 변경해야 함 */}
            <span className="m-4 p-4 w-full max-h-[20%] text-[#222] overflow-auto">{subtitle}</span>
            <div className="w-full h-[32px] flex justify-center items-center">
              <HeartButton isSelected={false}/>
              <div className="w-4"></div>
              <BookMarkButton isSelected={isBookmarked}/>
            </div>
        </div>
    </div>
  );
};

export default LocationInfo;
