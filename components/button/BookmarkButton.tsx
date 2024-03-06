import { useState } from 'react';
import Image from 'next/image';

// 북마크 버튼 컴포넌트
const BookmarkButton = (postId: any, initialIsBookmarked: boolean) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  const bookmarkImage = isBookmarked ? "/images/bookmark-selected.png" : "/images/bookmark.png";

  const toggleBookmark = async () => {
    console.log('toggleBookmark');
    // 낙관적 UI 업데이트
    setIsBookmarked(!isBookmarked);

    try {
      // 여기에서 API 호출을 통해 서버에 상태를 업데이트합니다.
      // await updateBookmarkAPI(postId, !isBookmarked);
    } catch (error) {
      // 오류 발생 시, UI를 이전 상태로 롤백합니다.
      setIsBookmarked(isBookmarked);
      console.error('Bookmark update failed', error);
    }
  };

  return (
    <Image src={bookmarkImage} alt="bookmark" width={40} height={40} onClick={toggleBookmark} />
  );
};

// 서버에 북마크 상태를 업데이트하는 함수
async function updateBookmarkAPI(postId: number, shouldBookmark: boolean) {
    // 이곳에 실제 API 호출 코드를 작성합니다.
    // 예시: axios.post('/api/bookmark', { postId, shouldBookmark });
}

export default BookmarkButton;
