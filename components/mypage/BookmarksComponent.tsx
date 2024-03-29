import React, { useEffect } from 'react';
import instance from '@/api/instance';
import { useState } from 'react';
import LocationListItem from './LocationListItem';
import Pagination from '../button/PageNumber';

function BookmarksComponent(){
  const[items, setItems] = useState([]);
  const[pageNumber, setPageNumber] = useState(1);
  const[pageSize, setPageSize] = useState(4);
  const[totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getBookmarkedItems();
  }, [pageNumber, pageSize]);

  const getBookmarkedItems = async () => {
    try {
      const pageInfo = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/likes-bookmarks1?${pageInfo}`;
      const response = await instance.get(url); 
      const data = response.data.results;
      setItems(data);
      if (data[0] !== null){
        setTotalPages(data[0].totalPages);
        setPageNumber(data[0].page);
      }
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
    }
  }

  function onPageChange(page: number) {
    setPageNumber(page);
  }

  return (
    <>
      <div className="my-location-list my-2 overflow-auto">
            {items.map((item: MyPageListItemProps, index: number) => (
              <LocationListItem
                key={item.spotId}
                {...item}
              />
            ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={pageNumber} onPageChange={onPageChange}/>
    </>
  );

}

export default BookmarksComponent;