import React from 'react';
import Image from 'next/image';
import HeartButton from '../layout/heartButton';
import BookMarkButton from '../layout/bookMarkButton';

interface LocationInfoProps {
    data: any;
    onBack: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ data, onBack }) => {
  const { spotId, spotName, review, createDate, images, bookmark, like } = data;  
  const date = createDate.split('T')[0];

  return (
    <div className="marker-list-item flex flex-col">
        <div className='w-full bg-[#FAF5F9] h-[20%] rounded-t-lg flex flex-col items-end'>
          <button onClick={onBack} className="my-3 mx-5">
              <Image src="/images/back.png" alt="Close" width={24} height={24}/>
          </button>
          <div className='w-full my-5 flex flex-col items-start justify-start'>
              <div className='px-3 text-sm text-[#222]'>{date} 작성자: test</div>
              <div className="px-3 text-2xl text-[#222] font-bold">{spotName}</div>
          </div>
        </div> 
        <div className="w-full my-10 h-[80%] rounded-b-lg flex flex-col justify-center items-center">
          <div className='overflow-y-auto w-full max-w-[90%] h-[60%] gap-4'>
            {images.map((image: string, index: number) => (
              <div key={index} style={{ position: "relative", width: "100%", maxWidth: "90%", height: "100%"}}>
                <Image src={image} alt={spotName} fill style={{objectFit: 'contain'}}/>
              </div>
            ))}
          </div>  
          <span className="m-4 p-4 w-full max-h-[20%] text-[#222] overflow-auto">{review}</span>
          <div className="w-full h-[32px] flex justify-center items-center">
            <HeartButton spotId={spotId} initialState={like}/>
            <div className="w-4"></div>
            <BookMarkButton spotId={spotId} initialState={bookmark}/>
          </div>
        </div>
        
    </div>
  );
};

export default LocationInfo;
