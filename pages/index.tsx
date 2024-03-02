import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginModal from '@/components/login/loginModal';

export default function Home({ projects }: any) {
  const [isLoginMoalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleBack = () => {
    setIsLoginModalOpen(false);
  };

  return (
  <> 
    <div className="relative flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-around w-full">
        {/* 이미지와 텍스트 컨테이너 */}
        <div className="flex flex-col items-center">
          <Image src="/images/anton.jpeg" alt="main" width={780} height={920} style={{
              maxWidth: '100vw', // 화면 너비를 넘지 않도록
              maxHeight: '100vh', // 화면 높이를 넘지 않도록
              width: 'auto', // 원본 비율 유지
              height: 'auto' // 원본 비율 유지
          }}/>
        </div>

        {/* 로그인 및 회원가입 버튼 컨테이너 */}
        <div className="flex flex-col items-start mt-10 md:mt-0">
          <div className="text-6xl font-bold text-[#fc487e] 2xl:text-9xl">건대의<br/>모든 장소!</div>
          <div className="text-lg text-[#404040] mt-10">
              건대생들이 구석구석 만들어 가는 지도<br/>나만의 장소를 공유해 보세요.
          </div>
          <div className='flex flex-row items-center justify-center mt-10'>
            <button className="px-6 py-2 border-2 border-[#fc487e] text-pink-500 rounded-lg m-3" onClick={handleLoginModal}>로그인하고 이용하기</button>
            <Link href="/main">
              <div className="px-6 py-2 border-2 border-transparent bg-[#fc487e] text-white rounded-lg m-3">로그인없이 이용하기</div>
            </Link>
          </div>  
          <div className='flex flex-row items-center justify-center w-full'>
            <div className="mt-4 text-gray-600">계정이 없나요? <span className="text-[#fc487e] cursor-pointer">회원가입하기</span></div>
          </div>  
        </div>
      </div>
      {isLoginMoalOpen && <LoginModal onBack={handleBack} />}
    </div>
  </>
  );
}
