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
    <div className="absolute left-[240px] mt-10 max-w-[780px] max-h-[920px] w-full h-full border-solid border-4 flex">
      <Image src="/images/main.png" alt="main" width={780} height={920} />
    </div>
      <div className="absolute left-[1090px] top-[154px] w-[590px] h-[324px] text-[96px] text-[#fc487e]">
        건대의<br/>모든 장소!
      </div>
      <div className="absolute left-[1090px] top-[550px] w-[590px] text-[24px] text-[#404040]">
        건대생들이 구석구석 만들어 가는 지도<br/>나만의 장소를 공유해 보세요.
      </div>
      <div className="absolute left-[1408px] top-[750px] w-[234px] h-[74px] flex">
        <Link href="/main">
        <button className="absolute left-0 top-0 w-[234px] h-[74px] border-[3px] border-solid border-[#fc487e] rounded-[20px]">로그인없이 이용하기</button>
        </Link>
      </div>
      <div className="absolute left-[1144px] top-[750px] w-[234px] h-[74px] flex">
        <button className="absolute left-0 top-0 w-[234px] h-[74px] border-[3px] bg-[#fc487e] text-white rounded-[20px]" onClick={handleLoginModal}>로그인하고 이용하기</button>
      </div>
      {isLoginMoalOpen && <LoginModal onBack={handleBack} />}
      <div className="absolute left-[1272px] top-[859px] w-[226px] h-[22px] flex">
        <div className="absolute -translate-x-1/2 left-[calc(50%+-55px)] top-0 text-[18px] text-[#5e5e5e] whitespace-nowrap">계정이 없나요?</div>
        <button className="absolute left-[calc(50%+55px)] top-0 text-[18px] text-decoration-[underline] text-[#5e5e5e] whitespace-nowrap">회원가입하기</button>
      </div>
  </>
  );
}
