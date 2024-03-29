import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import instance from '@/api/instance';

// 북마크 버튼 컴포넌트
const Bookmark: React.FC<commonProps> = ({ spotId, initialState}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialState);
  const [bookmarkImage, setBookmarkImage] = useState('/images/bookmark.png');

  useEffect(() => {
    const bookmarkImage = isBookmarked ? "/images/bookmark-selected.png" : "/images/bookmark.png";
    setBookmarkImage(bookmarkImage);
  }, [isBookmarked]);

  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);

    if(sessionStorage.getItem('accessToken') === null) {
      alert('로그인이 필요합니다.');
      window.location.reload();
      return;
    }

    try {
      const data = {
        spotId: spotId,
      };

      if(isBookmarked) {
        const url = process.env.NEXT_PUBLIC_API_URL+'/bookmark/delete';
        const response = await instance.delete(url, {data});
        if(response.status === 200) {
          return;
        }
      }else{
        console.log(data);
        const url = process.env.NEXT_PUBLIC_API_URL+'/bookmark/add';
        const response = await instance.post(url, data);
        if(response.status === 200) {
          return;
        }
      }

    } catch (error) {
      setIsBookmarked(isBookmarked);
    }
  };

  return (
    <Image src={bookmarkImage} alt="bookmark" width={40} height={40} onClick={toggleBookmark} />
  );
};

export default Bookmark;
