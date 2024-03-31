import React, { use, useEffect } from 'react';
import instance from '@/api/instance';
import { useState } from 'react';
import Router from 'next/router';

function WithdrawComponent(){
  const router = Router;
  const [check, setCheck] = useState(false);
  const [usernames, setUsernames] = useState('');

  useEffect(() => {
    const userInfo = sessionStorage.getItem('login_user');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUsernames(user.nickname);
    }
  }, []);


  const handleCheck = () => {
    setCheck(!check);
  }

  const onWithdrawSuccess = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL+'/users/delete';
      const response = await instance.delete(url)
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다.');
    }
    sessionStorage.clear();
    // 회원 탈퇴 성공 후 처리
    router.push('/');
  }

  const getButtonClasses = () => {
    const baseClasses = "py-2 px-5 border border-transparent rounded-lg text-white";
    if (check) {
      return `${baseClasses} bg-[#fc487e] hover:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring-pink active:bg-pink-700`;
    } else {
      return `${baseClasses} bg-gray-400`;
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center m-5">정말로 쿠석쿠석을 탈퇴하시겠습니까?</h2>
      <p className="mb-5 text-sm text-[#5E5E5E] text-center">탈퇴가 완료되면 {usernames}님이 등록하신 마커 정보가 
      <span className='font-bold text-[#fc487e]'> 모두 사라지며, 복구가 불가능</span>합니다. <br/>
      작성한 댓글은 사라지지 않으니 미리 확인해주세요</p>
      
      <div className="flex justify-center items-center m-10">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-pink" onChange={handleCheck}/>  
        <span className="text-sm text-gray-600 mx-2">안내사항을 모두 확인했습니다.</span>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className={getButtonClasses()}
          onClick={onWithdrawSuccess}
        >
          탈퇴하기
        </button>
      </div>  
    </>
  );

}

export default WithdrawComponent;