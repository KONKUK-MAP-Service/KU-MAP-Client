import React from 'react';
import Image from 'next/image';
import BookmarkButton from '../button/BookmarkButton';
import PageNumber from '../button/PageNumber';

const ListItem: React.FC<ListItemProps> = ({ itemId, title, subtitle, date, writer, isBookmarked, onClick }) => {  

  return (
    <div className='max-h-[100px] flex flex-col'>
      <div className="max-h-[100px] flex flex-row" onClick={onClick}>
          <div className="w-[90%] flex flex-col items-start justify-start mt-2">
                <span className="text-lg text-[#222]">{title}</span>
                <span className="text-sm text-[#404040]">{subtitle}</span>
                <span className="text-xs text-[#5e5e5e] my-2"> {date} 작성자: {writer} </span>
          </div>
          <div className='inherit max-h-[40%]'>
              <BookmarkButton postId={itemId} initialIsBookmarked={isBookmarked} />
          </div>
      </div>
      <div className="border-[1px] border-solid border-[#e6e6e6] mt-2"></div>
    </div>
  );
};

type ListComponentProps = {
  items: ListItemProps[]; // ListItemProps는 ListItem 컴포넌트에서 사용하는 타입입니다.
  onListItemClick: (item: ListItemProps) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const ListComponent: React.FC<ListComponentProps> = ({ items, onListItemClick, totalPages, currentPage, onPageChange }) => {

  return (
      <div className="marker-list flex flex-col">
        <div className='main-modal-content'>
          <div className="search-bar flex flex-row my-5">
              <Image src="/images/search.png" alt="search" width={35} height={35} />
              <input type="text" placeholder="검색" className="w-full rounded-br-[30px] rounded-tr-[30px] max-h-[40px]bg-[#fafafa]" />
          </div>
          <div className="text-xl text-bold">마커 리스트</div>    
          <div className="location-list my-2 overflow-auto">
            {items.map((item:any, index:any) => (
              <ListItem key={index} {...item} onClick={() => onListItemClick(item)} />
            ))}
          </div>
          <div className="inherit max-h-[10%] flex justify-center items-center">
            <PageNumber totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
          </div> 
        </div>
        
      </div>
  );
};

export default ListComponent;
