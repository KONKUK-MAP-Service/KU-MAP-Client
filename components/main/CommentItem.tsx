import React from 'react';
import instance from '@/api/instance';
import { useState } from 'react';
import CommentDeleteNotify from './CommentDeleteNotify';

interface CommentProps {
  data : commentProps;
  spotId: number;
  commentRefresh: () => void;
}

const CommentItem: React.FC<CommentProps> = ({ data, spotId, commentRefresh }) => {  
  const { author, content, createdDate, deletable } = data;
  const date = createdDate.split('T')[0];
  const [modalOpen, setModalOpen] = useState(false);

  const onDeleteButtonClick = () => {
    setModalOpen(true);
  }

  const onCloseButtonClick = () => {
    setModalOpen(false);
  }

  const onConfirmButtonClick = () => {
    handleDelete();
    setModalOpen(false);
  }


  const handleDelete = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL+'/comment/'+spotId+'/'+data.commentId+'/delete';
      const response = await instance.get(url);
      if(response.status === 200) {
        alert('댓글이 삭제되었습니다.');
      }
    } catch (error) {
      alert('댓글 삭제에 실패했습니다.');
    }
    commentRefresh();
  };

    return (
      <>
        {modalOpen && <CommentDeleteNotify onBack={onCloseButtonClick} onDelete={onConfirmButtonClick}/>}
        <div className='max-h-[100px] flex flex-col'>
          <div className="max-h-[100px] flex flex-row overflow-auto">
              <div className="w-[90%] flex flex-col items-start justify-start mt-2">
                    <span className="text-lg text-[#222]">{author}</span>
                    <span className="text-sm text-[#404040]">{content}</span>
                    <div className='flex flex-row justify-between w-full'>
                      <span className="text-xs text-[#5e5e5e] my-2"> {date}</span>
                      {deletable && <button className="text-xs common-button" onClick={onDeleteButtonClick}>삭제</button>}
                    </div>  
              </div>
          </div>
          <div className="border-[1px] border-solid border-[#e6e6e6] mt-2"></div>
        </div>
      </>
    );
  };

export default CommentItem;