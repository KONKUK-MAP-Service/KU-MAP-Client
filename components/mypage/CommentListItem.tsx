import React from 'react';
import Bookmark from '../button/bookmark';
import Heart from '../button/heart';
import Image from 'next/image';

const LocationListItem: React.FC<MyPageCommentProps> = ({ spotId, spotName, usersComment, CommentcreateDate, spotImageurl }) => {  
  if (CommentcreateDate === null) CommentcreateDate = "null T "
  const date = CommentcreateDate.split('T')[0];

    return (
      <div className='inherit h-[20%] min-h-[101px] min-h-[100px] flex flex-col my-2'>
        <div className="inherit h-[20%] min-h-[100px] flex flex-row overflow-auto">
            <div className="w-[90%] flex flex-col items-start justify-start mt-2">
                  <span className="text-lg text-[#222] text-bold">{usersComment}</span>
                  <span className="text-xs text-[#404040]">{date}</span>
                  <span className="text-[#fc487e] my-2 hidden sm:block">{spotName}</span>
            </div>
            <div className='relative max-h-[100px] w-[50%] sm:w-[20%]'>
                <Image src={spotImageurl} alt={spotName} fill style={{objectFit: 'contain'}}/>
            </div>
        </div>
        <div className="border-[1px] border-solid border-[#e6e6e6] w-full"></div>
      </div>
    );
  };

export default LocationListItem;