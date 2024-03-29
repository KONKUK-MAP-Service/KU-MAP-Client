import LandingHeader from "@/components/common/LandingHeader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PasswordValidation from "@/components/mypage/PasswordValidation";
import ProfileComponent from "@/components/mypage/ProfileComponent";
import NotifyModal from "@/components/common/NotifyModal";
import WithdrawComponent from "@/components/mypage/WithdrawComponent";
import LogoutModal from "@/components/common/LogoutModal";
import BookmarksComponent from "@/components/mypage/BookmarksComponent";

// 세션에 유저 정보가 있으면 마이페이지를 보여줍니다.

function MyPage() {
  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState('password');
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [ment, setMent] = useState('');
  const router = useRouter();

  // 탭 클릭 핸들러
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const onPasswordSuccess = () => {
    handleTabClick('profile'); // 비밀번호 확인 후 프로필 컴포넌트로 변경
  };

  const onWithdrawSuccess = () => {
    handleTabClick("withdraw");
  }

  const onProfileChange = () => {
    setIsNotifyModalOpen(true);
    setMent('회원정보가 수정되었습니다.');
  }

  const onBack = () => {
    window.location.reload();
  }

  useEffect(() => {
    if (!sessionStorage.getItem('accessToken')){
      alert('로그인이 필요한 서비스입니다.');
      router.push('/main');
    }
  },[]);

  return (
    <>
    <LandingHeader />
    <h1 className="header-title-landing text-3xl font-bold">마이페이지</h1>
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="mypage-container bg-white p-4 mx-10 mb-10 md:ml-10 md:mt-[120px]">
          <nav className="flex flex-col">
            <button onClick={() => handleTabClick('password')} className={`p-2 text-start ${selectedTab === 'password' || selectedTab === 'profile' ? 'text-[#fc487e] text-bold' : ''}`}>
              회원정보 수정
            </button>
            <button onClick={() => handleTabClick('comments')} className={`p-2 text-start ${selectedTab === 'comments' ? 'text-[#fc487e] text-bold' : ''}`}>
              내가 단 댓글
            </button>
            <button onClick={() => handleTabClick('bookmarks')} className={`p-2 text-start ${selectedTab === 'bookmarks' ? 'text-[#fc487e] text-bold' : ''}`}>
              좋아요/즐겨찾기한 마커
            </button>
            <button onClick={() => handleTabClick('withdraw')} className={`p-2 text-start ${selectedTab === 'withdraw' || selectedTab === 'withdrawPassword' ? 'text-[#fc487e] text-bold' : ''}`}>
              회원 탈퇴하기
            </button>
            <button onClick={() => handleTabClick('logout')} className={`p-2 text-start ${selectedTab === 'logout' ? 'text-[#fc487e] text-bold' : ''}`}>
              로그아웃하기
            </button>
          </nav>
      </div>

        <main className="mypage-container flex-1 mx-10 md:mt-[120px]">
          {isNotifyModalOpen && <NotifyModal ment={ment} onBack = {onBack} />}
          {selectedTab === 'password' && <PasswordValidation onPasswordSuccess={onPasswordSuccess} />}
          {selectedTab === 'profile' && <ProfileComponent onProfileChange = {onProfileChange}/>}
          {selectedTab === 'comments' && <CommentsComponent />}
          {selectedTab === 'bookmarks' && <BookmarksComponent />}
          {selectedTab === 'withdrawPassword' && <PasswordValidation onPasswordSuccess={onWithdrawSuccess}/>}
          {selectedTab === 'withdraw' && <WithdrawComponent />}
          {selectedTab === 'logout' && <LogoutModal onBack = {onBack}/>}
        </main>
    </div>
    </>
  );
}

function CommentsComponent() {
  // 내가 단 댓글 컴포넌트 내용
  return <div>내가 단 댓글 내용</div>;
}

export default MyPage;
