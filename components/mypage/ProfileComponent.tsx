import React, { useEffect } from 'react';
import instance from '@/api/instance';
import { useState } from 'react';
import Image from 'next/image';

function ProfileComponent({onProfileChange}: {onProfileChange: () => void }) {
  // State 초기화
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const [profilePreview, setProfilePreview] = useState('/images/profile.png');

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      try{
        const formData = new FormData();
        formData.append('profileImage', file);
        const url = process.env.NEXT_PUBLIC_API_URL+'/profile-image/update';
        const response = instance.put(url,formData)
      }catch (error) {
        console.error('Profile image upload failed', error);
      }
    }
  };

  const deleteProfileImage = async () => {
    try{
      const url = process.env.NEXT_PUBLIC_API_URL+'/profile-image/delete';
      const response = await instance.delete(url);
      if (response.status !== 200) {
        alert('프로필 사진 삭제에 실패했습니다.');
      }
      setProfilePreview('/images/profile.png');
    }catch (error) {
      alert('프로필 사진 삭제에 실패했습니다.');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL+'/users/profile';
        const response = await instance.get(url)
        const data = response.data.results;
        if (data.profileImage) {
          setProfilePreview(data.profileImage);
        }
        setUserid(data.userId);
        setNickname(data.nickname);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error) {
        console.error('Profile fetch failed', error);
      }
    };
    fetchData();
  }, []);



  const handleSubmit = async (event: any) => {
    event.preventDefault(); // 폼의 기본 제출 동작 방지

    const formData = new FormData(event.target); // 폼 데이터 캡처
    const input = Object.fromEntries(formData.entries()); // FormData를 일반 객체로 변환

    try {
      const url = process.env.NEXT_PUBLIC_API_URL+'/users/update-profile';
      const response = await instance.patch(url,input)

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const data = response.data.results;
      sessionStorage.setItem('login_user', JSON.stringify(data));
      onProfileChange();
    } catch (error) {
      console.error('Submission failed', error);
      // 실패 처리 로직
    }
  };

  return (
    <>
         <div className="flex flex-col items-start my-5">
          <h2 className="text-lg text-[#404040]">프로필 사진</h2>
          <button
            className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1 my-2"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Image src="/images/file.png" width={15} height={15} alt="파일 추가하기" />
            <span className="text-[#404040] text-sm ml-2">파일 추가하기</span>
          </button>
          <div className="my-4 w-full flex justify-center rounded-full">
              <div className="relative w-[100px] h-[100px] rounded-full">
                <Image src={profilePreview} fill alt="프로필 미리보기" style={{objectFit: 'contain'}}/>
                {
                  profilePreview !== '/images/profile.png' && 
                  <button className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 rounded-full z-10"
                  onClick={deleteProfileImage}>&times;</button>
                }
              </div>  
          </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
                <span className="text-lg text-[#404040]">아이디</span>
                <input id="id" name="userid" type="text" autoComplete="username" pattern="[A-Za-z0-9]{2,8}" 
                required className="infoSignup mt-1" value={userid} readOnly/>
            </div>
            <div>
                <span className="text-lg text-[#404040]">비밀번호</span>
                <input id="password" name="password" type="password" pattern="[A-Za-z0-9]{8,20}" 
                autoComplete="current-password" required className="infoSignup mt-1" value={password}/>
            </div>
            <div>    
                <span className="text-lg text-[#404040] mt-10">닉네임</span>
                <input id="nickname" name="nickname" type="text" autoComplete="nickname" 
                maxLength={8} className="infoSignup" value={nickname}/>
            </div>      
            <div>
                <span className="text-lg text-[#404040] mt-10">이메일 주소</span>
                <input id="email-address" name="email" type="email" autoComplete="email" 
                required className="infoSignup" value={email} readOnly/>
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" className='modal-button my-10'>
                정보 수정하기
                </button>
            </div>
        </form>
    </>
  );
 
}

export default ProfileComponent;