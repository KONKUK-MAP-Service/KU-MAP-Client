import React from 'react';
import Bookmark from '../button/bookmark';

const ListItem: React.FC<ListItemProps> = ({ spotId, spotName, createDate, review, onClick }) => {  
  const date = createDate.split('T')[0];

    return (
      <div className='max-h-[100px] flex flex-col'>
        <div className="max-h-[100px] flex flex-row overflow-auto" onClick={onClick}>
            <div className="w-[90%] flex flex-col items-start justify-start mt-2">
                  <span className="text-lg text-[#222]">{spotName}</span>
                  <span className="text-sm text-[#404040]">{review}</span>
                  <span className="text-xs text-[#5e5e5e] my-2"> {date} 작성자:  </span>
            </div>
            <div className='inherit max-h-[40%]'>
                <Bookmark postId={spotId} initialState={false} onItemClick={onClick}/>
            </div>
        </div>
        <div className="border-[1px] border-solid border-[#e6e6e6] mt-2"></div>
      </div>
    );
  };

export default ListItem;