import React from 'react';
import Image from 'next/image';

type ListItemProps = {
    title: string;
    subtitle: string;
    date: string;
    isBookmarked: boolean;
};

const ListItem = (ListItemProps: ListItemProps) => {
  const { title, subtitle, date, isBookmarked } = ListItemProps;  
  var bookmarkImage = "/images/bookmark.png";
  if(isBookmarked) {
    bookmarkImage = "/images/bookmark-selected.png";
  }
  return (
    <div className="relative w-[340px] h-[98px] shrink-0">
        <div className="absolute left-0 right-[-0%] top-[98px] h-0 border-[1px] border-solid border-[#e6e6e6]"></div>
        <div className="absolute left-0 top-[3px] w-[340px] flex flex-col items-start justify-start gap-[10px]">
            <div className="w-[340px] flex flex-col items-start justify-start gap-[6px]">
            <div className="w-[300x] text-[18px] text-[#222] line-clamp-1">{title}</div>
            <div className="w-[300px] text-[14px] text-[#404040] line-clamp-1">{subtitle}</div>
        </div>
        <div className="w-[300px] text-[12px] text-[#5e5e5e]">{date}</div>
        </div>
        <Image src={bookmarkImage} alt="bookmark" width={40} height={40} className="absolute right-0 top-0" />
    </div>
  );
};

const ListComponent = () => {
  const items = [
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: false },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    { title: 'XX 등록완료', subtitle: '관리에서 지원 가능👍', date: '2024.01.21', isBookmarked: true },
    // ... 다른 아이템들
  ];

  return (
    <div className="absolute left-0 top-[150px] w-[401px] h-[687px] bg-white border-2 border-gray-200 rounded-[50px] z-10 flex flex-col overflow-hidden">
      <div className="absolute left-[18px] top-[10px] w-[366px] h-[44px] flex ">
        <div className="mt-6 w-[366px] h-[44px] bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[30px] flex flex-row">
            <Image src="/images/search.png" alt="search" width={40} height={40} />
            <input type="text" placeholder="검색" className="w-full h-[40px] rounded-[30px] bg-[#fafafa]" />
        </div>
        <div className="absolute top-[90px] text-[22px] text-[#222]">마커 리스트</div>    
      </div>
      <div className="relative top-[152px] left-[18px] w-full max-h-[510px] overflow-auto">
        {items.map((item, index) => (
            <ListItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ListComponent;
