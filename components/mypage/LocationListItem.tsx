import React from 'react';
import Bookmark from '../button/bookmark';
import Heart from '../button/heart';
import Image from 'next/image';

const LocationListItem: React.FC<MyPageListItemProps> = ({ spotId, spotName, createDate, review, author, bookmark, like, spotImageurl }) => {  
  if (createDate === null) createDate = "null T "
  const date = createDate.split('T')[0];

    return (
      <div className='inherit h-[20%] min-h-[101px] min-h-[100px] flex flex-col my-2'>
        <div className="inherit h-[20%] min-h-[100px] flex flex-row overflow-auto">
            <div className="w-[90%] flex flex-col items-start justify-start mt-2">
                  <span className="text-lg text-[#222]">{spotName}</span>
                  <span className="text-sm text-[#404040]">{review}</span>
                  {/* `sm` 이하에서 줄바꿈 */}
                  <span className="text-xs text-[#5e5e5e] mt-1 block sm:hidden">{date}</span>
                  <span className="text-xs text-[#5e5e5e] block sm:hidden">작성자: {author}</span>

                  {/* `sm` 이상에서 동일한 줄 */}
                  <span className="text-xs text-[#5e5e5e] my-2 hidden sm:block">{date} 작성자: {author}</span>


            </div>
            <div className='inherit max-h-[40%]'>
                <Bookmark spotId={spotId} initialState={bookmark}/>
            </div>
            <div className='inherit max-h-[40%] mr-3'>
                <Heart spotId={spotId} initialState={like}/>
            </div>
            <div className='relative max-h-[100px] w-[50%] sm:w-[20%]'>
                <Image src={spotImageurl} alt={spotName} fill style={{objectFit: 'contain'}}/>
            </div>
        </div>
        <div className="border-[1px] border-solid border-[#e6e6e6]"></div>
      </div>
    );
  };

export default LocationListItem;