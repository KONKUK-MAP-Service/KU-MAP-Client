import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLoginModal from '@/components/login/mainLoginModal';
import LandingHeader from '@/components/common/LandingHeader';

export default function Home({ projects }: any) {
  const [isLoginMoalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleBack = () => {
    setIsLoginModalOpen(false);
  };

  var mainImage = isLoginMoalOpen ? '/images/mainPageWLogin.png' : '/images/mainPage.png';

  return (
  <> 
    <div className="relative flex justify-center items-center min-h-screen">
      <LandingHeader />
      <div className="flex flex-col md:flex-row items-center justify-around w-full">
        {/* 이미지와 텍스트 컨테이너 */}
        <div className="flex flex-col items-center ml-20">
          <Image src={mainImage} alt="main" width={780} height={780} style={{
              maxWidth: '100vw', // 화면 너비를 넘지 않도록
              maxHeight: '100vh', // 화면 높이를 넘지 않도록
              width: 'auto', // 원본 비율 유지
              height: 'auto' // 원본 비율 유지
          }}/>
        </div>

        {/* 로그인 및 회원가입 버튼 컨테이너 */}
        <div className="flex flex-col items-center mt-10 md:mt-0">
          <Image src="/images/logo.png" alt="logo" width={500} height={200}/>
          <div className="text-4xl font-bold text-[#fc487e] 2xl:text-6xl mt-10">건대의 모든 장소!</div>
          <div className="text-lg text-[#404040] mt-10">
              건대생들이 구석구석 만들어 가는 지도<br/>나만의 장소를 공유해 보세요.
          </div>
          <div className='flex flex-row items-center justify-center mt-20'>
            <button className="px-6 py-2 border-2 border-[#fc487e] text-pink-500 rounded-lg m-3" onClick={handleLoginModal}>로그인하고 이용하기</button>
            <Link href="/main">
              <div className="px-6 py-2 border-2 border-transparent bg-[#fc487e] text-white rounded-lg m-3">로그인없이 이용하기</div>
            </Link>
          </div>  
          <div className='flex flex-row items-center justify-center w-full'>
            <div className="mt-4 text-gray-600">계정이 없나요?</div>
            <Link href="/signup">
              <div className="text-gray-600 mt-4 ml-4 cursor-pointer">회원가입하기</div>
            </Link>
          </div>  
        </div>
      </div>
      {isLoginMoalOpen && <MainLoginModal onBack={handleBack} />}
    </div>
  </>
  );
}
