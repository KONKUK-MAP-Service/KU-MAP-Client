import LandingHeader from "@/components/common/LandingHeader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import instance from "@/api/instance";

function MyPage() {
  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState('profile');
  const router = useRouter();

  // 탭 클릭 핸들러
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row">
        <LandingHeader />
        <h1 className="header-title-landing text-3xl w-full">마이페이지</h1>
      </div>  
      <div className="flex flex-grow my-10 justify-center">
        <aside className="mypage-container w-1/6 bg-white p-4">
          <nav className="flex flex-col">
            <button onClick={() => handleTabClick('profile')} className={`p-2 text-start ${selectedTab === 'profile' ? 'text-[#fc487e] text-bold' : ''}`}>
              회원정보 수정
            </button>
            <button onClick={() => handleTabClick('comments')} className={`p-2 text-start ${selectedTab === 'comments' ? 'text-[#fc487e] text-bold' : ''}`}>
              내가 단 댓글
            </button>
            <button onClick={() => handleTabClick('bookmarks')} className={`p-2 text-start ${selectedTab === 'bookmarks' ? 'text-[#fc487e] text-bold' : ''}`}>
              좋아요/즐겨찾기한 마커
            </button>
            <button onClick={() => handleTabClick('withdraw')} className={`p-2 text-start ${selectedTab === 'withdraw' ? 'text-[#fc487e] text-bold' : ''}`}>
              회원 탈퇴하기
            </button>
            <button onClick={() => handleTabClick('logout')} className={`p-2 text-start ${selectedTab === 'logout' ? 'text-[#fc487e] text-bold' : ''}`}>
              로그아웃하기
            </button>
          </nav>
        </aside>

        <main className="mypage-container w-2/5 p-4 mx-10">
          {selectedTab === 'profile' && <ProfileComponent />}
          {selectedTab === 'comments' && <CommentsComponent />}
          {selectedTab === 'bookmarks' && <BookmarksComponent />}
          {selectedTab === 'withdraw' && <WithdrawComponent />}
          {selectedTab === 'logout' && <LogoutComponent />}
        </main>
      </div>
    </div>
  );
}

// 이곳에 각 탭의 컴포넌트를 정의합니다. 예를 들어:
function ProfileComponent() {
  // 프로필 수정 컴포넌트 내용
  return <div>회원정보 수정 내용</div>;
}

function CommentsComponent() {
  // 내가 단 댓글 컴포넌트 내용
  return <div>내가 단 댓글 내용</div>;
}

function BookmarksComponent() {
  // 즐겨찾기한 마커 컴포넌트 내용
  return <div>즐겨찾기한 마커 내용</div>;
}

function WithdrawComponent() {
  // 회원 탈퇴 컴포넌트 내용
  return <div>회원 탈퇴 내용</div>;
}

function LogoutComponent() {
  // 로그아웃 컴포넌트 내용
  return <div>로그아웃 처리</div>;
}

export default MyPage;
