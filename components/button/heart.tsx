import { useState, useEffect} from 'react';
import Image from 'next/image';
import instance from '@/api/instance';

const Heart: React.FC<commonProps> = ({ spotId, initialState}) => {
  const [isLiked, setIsLiked] = useState(initialState);
  const [heartImage, setHeartImage] = useState("/images/heart.png");

  useEffect(() => {
    if (initialState === true){
      setIsLiked(true);
      setHeartImage("/images/heart-selected.png");
    } else {
      setIsLiked(false);
      setHeartImage("/images/heart.png");
    }
  }, [initialState, spotId]);


  useEffect(() => {
    const heartImage = isLiked ? "/images/heart-selected.png" : "/images/heart.png";
    setHeartImage(heartImage);
  }, [isLiked]);

  const toggleHeart = async () => {
    setIsLiked(!isLiked);

    if(sessionStorage.getItem('accessToken') === null) {
      alert('로그인이 필요합니다.');
      window.location.reload();
      return;
    }

    try {
      const data = {
        spotId: spotId,
      };

      if(isLiked) {
        const url = process.env.NEXT_PUBLIC_API_URL+'/like/remove';
        const response = await instance.delete(url, {data});
        if(response.status === 200) {
          return;
        }
      }else{
        // console.log(data);
        const url = process.env.NEXT_PUBLIC_API_URL+'/like/add';
        const response = await instance.post(url, data);
        if(response.status === 200) {
          return;
        }
      }
    } catch (error) {
      setIsLiked(isLiked);
    }
  };

  return (
    <Image src={heartImage} alt="heart" width={40} height={40} onClick={toggleHeart} />
  );
};

export default Heart;
