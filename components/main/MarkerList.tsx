import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ListItem from './ListItem';

type ListComponentProps = {
  onListItemClick: (item: ListItemProps) => void;
  items: ListItemProps[];
};

const ListComponent: React.FC<ListComponentProps> = ({onListItemClick, items}) => {

  return (
      <div className="marker-list flex flex-col">
        <div className='main-modal-content'>
          <div className="search-bar flex flex-row my-5">
              <Image src="/images/search.png" alt="search" width={35} height={35} />
              <input type="text" placeholder="검색" className="w-full rounded-br-[30px] rounded-tr-[30px] max-h-[40px]bg-[#fafafa]" />
          </div>
          <div className="text-xl text-bold">마커 리스트</div>    
          <div className="location-list my-2 overflow-auto">
            {items.map((item: ListItemProps, index) => (
            <ListItem
              key={item.spotId}
              {...item}
              onClick={() => onListItemClick(item)}
            />
            ))}
          </div>
        </div>
        
      </div>
  );
};

export default ListComponent;
