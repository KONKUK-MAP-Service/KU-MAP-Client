import React, { use, useEffect } from 'react';
import Image from 'next/image';
import HeartButton from '../layout/heartButton';
import BookMarkButton from '../layout/bookMarkButton';
import { useState } from 'react';
import instance from '@/api/instance';
import CommentItem from './CommentItem';

interface LocationInfoProps {
    data: ListItemProps;
    isHide: boolean;
    onBack: () => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ data, onBack, isHide}) => {
  const { spotId, spotName, review, createDate, images, bookmark, like, author } = data;  
  const date = createDate.split('T')[0];
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentRefresh, setCommentRefresh] = useState(false);
  const [buttonStyle, setButtonStyle] = useState('modal-input w-[20%] bg-gray-300 rounded-[30px] ml-1 text-white');

  const handleSubmit = async () => { 
    try {
      const url = process.env.NEXT_PUBLIC_API_URL+'/comment/'+spotId+'/register';
      const data = {
        comment: newComment,
      };
      const response = await instance.post(url, data);
      if(response.status === 200) {
        alert('댓글이 작성되었습니다.');
      }
    } catch (error) {
      alert('댓글 작성에 실패했습니다.');
    }
    setNewComment('');
    commentRefresh ? setCommentRefresh(false) : setCommentRefresh(true);
  }

  function handleRefresh() {
    commentRefresh ? setCommentRefresh(false) : setCommentRefresh(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL+'/spot/'+spotId+'/comments';
        const response = await instance.get(url);
        const data = response.data.results;
        setComments(data);
      } catch (error) {
        console.error('Comment fetch failed');
      }
    };
    fetchData();
  }, [spotId, commentRefresh]);

  useEffect(() => {
    if (sessionStorage.getItem('accessToken') !== null) {
      setButtonStyle('modal-input w-[20%] bg-[#fc487e] rounded-[30px] ml-1 text-white');
    }
  }, []);

  return (
    <div className={`marker-list-item ${isHide? 'left' : ''} flex flex-col h-screen`}>
        <div className='w-full bg-[#FAF5F9] h-[40%] rounded-t-lg flex flex-col items-end md:h-[20%]'>
          <button onClick={onBack} className="mt-3 mx-5">
              <Image src="/images/back.png" alt="Close" width={24} height={24}/>
          </button>
          <div className='w-full flex flex-col items-start justify-start'>
              <div className='px-3 text-sm text-[#222]'>{date} 작성자: {author}</div>
              <div className="px-3 pb-2 text-2xl text-[#222] font-bold">{spotName}</div>
          </div>
        </div> 
        <div className="flex-grow flex-col w-full rounded-b-lg justify-center items-center overflow-y-auto">
          <div className='flex flex-col w-full min-h-[80%] items-center'>
              {images.map((image: string, index: number) => (
                  <div key={index} className="relative w-[90%] h-0 pb-[100%] min-pb-[80%] mt-5">
                      <Image src={image} alt={spotName} fill style={{objectFit : 'contain'}}/>
                  </div>
              ))}
          </div>  
          <p className="p-4 w-full text-[#222]">{review}</p>
          <div className="w-full h-[32px] flex justify-center items-center">
            <HeartButton spotId={spotId} initialState={like}/>
            <div className="w-4"></div>
            <BookMarkButton spotId={spotId} initialState={bookmark}/>
          </div>
          <h2 className="px-4 w-full text-lg text-bold mt-10 text-[#404040]">이 마커의 댓글</h2>
          <div className="px-4 w-full flex flex-row items-center">
            <input
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              placeholder="이 마커의 댓글"
              className="modal-input w-[75%] rounded-[30px]"
            />
            <button onClick={handleSubmit} 
            className={buttonStyle}
            disabled={sessionStorage.getItem('accessToken')===null}>작성</button>
          </div>
          <div className="px-4 w-full flex flex-col">
            {comments.map((comment: commentProps, index: number) => (
              <CommentItem key={index} data={comment} spotId={spotId} commentRefresh={handleRefresh} />
            ))}
          </div>
        </div>
       
    </div>
  );
};

export default LocationInfo;
