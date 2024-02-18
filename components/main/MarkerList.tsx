import React from 'react';
import Image from 'next/image';
import BookmarkButton from '../button/BookmarkButton';
import PageNumber from '../button/PageNumber';

const ListItem: React.FC<ListItemProps> = ({ itemId, title, subtitle, date, writer, isBookmarked, onClick }) => {  

  return (
    <div className="relative w-[340px] h-[98px] shrink-0" onClick={onClick}>
        <div className="absolute left-0 right-[-0%] top-[98px] h-0 border-[1px] border-solid border-[#e6e6e6]"></div>
        <div className="absolute left-0 top-[3px] w-[340px] flex flex-col items-start justify-start gap-[10px]">
            <div className="w-[340px] flex flex-col items-start justify-start gap-[6px]">
            <div className="w-[300x] text-[18px] text-[#222] line-clamp-1">{title}</div>
            <div className="w-[300px] text-[14px] text-[#404040] line-clamp-1">{subtitle}</div>
        </div>
        <div className="w-[300px] text-[12px] text-[#5e5e5e]">
            {date} 작성자: {writer}
        </div>
        </div>
        <div className='absolute top-0 right-0'>
            <BookmarkButton postId={itemId} initialIsBookmarked={isBookmarked} />
        </div>
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
      <div className="absolute left-0 top-[150px] w-[401px] h-[687px] bg-white border-2 border-gray-200 rounded-[50px] z-10 flex flex-col overflow-hidden">
        <div className="absolute left-[18px] top-[10px] w-[366px] h-[44px] flex ">
          <div className="mt-6 w-[366px] h-[44px] bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[30px] flex flex-row">
              <Image src="/images/search.png" alt="search" width={40} height={40} />
              <input type="text" placeholder="검색" className="w-full h-[40px] rounded-[30px] bg-[#fafafa]" />
          </div>
          <div className="absolute top-[90px] text-[22px] text-[#222]">마커 리스트</div>    
        </div>
        <div className="relative top-[152px] left-[18px] w-full max-h-[500px] overflow-auto">
          {items.map((item:any, index:any) => (
            <ListItem key={index} {...item} onClick={() => onListItemClick(item)} />
          ))}
        </div>
        <div className="absolute bottom-[10px] w-full flex justify-center items-center">
          <PageNumber totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </div> 
      </div>
  );
};

export default ListComponent;
