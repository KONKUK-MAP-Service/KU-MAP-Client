import { useState } from 'react';
import Image from 'next/image';

const Heart = (postId: any, initialsLiked: boolean) => {
  const [isLiked, setIsLiked] = useState(initialsLiked);

  const heartImage = isLiked? "/images/heart-selected.png" : "/images/heart.png";

  const toggleHeart = async () => {
    console.log('toggleHeart');
    setIsLiked(!isLiked);

    try {
      // 여기에서 API 호출을 통해 서버에 상태를 업데이트합니다.
      // await updateBookmarkAPI(postId, !isBookmarked);
    } catch (error) {
      // 오류 발생 시, UI를 이전 상태로 롤백합니다.
      setIsLiked(isLiked);
      console.error('Like update failed', error);
    }
  };

  return (
    <Image src={heartImage} alt="heart" width={40} height={40} onClick={toggleHeart} />
  );
};

// 서버에 북마크 상태를 업데이트하는 함수
async function updateBookmarkAPI(postId: number, shouldBookmark: boolean) {
    // 이곳에 실제 API 호출 코드를 작성합니다.
    // 예시: axios.post('/api/bookmark', { postId, shouldBookmark });
}

export default Heart;
