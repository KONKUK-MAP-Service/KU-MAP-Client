import LandingHeader from "@/components/common/LandingHeader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import PasswordNotifyModal from "@/components/common/passwordNotifyModal";
import axios from "axios";
import Footer from "@/components/common/Footer";

function SignupPage() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPassowrdNotifyModalOpen, setIsPasswordNotifyModalOpen] = useState(false); // 비밀번호 찾기 모달창 열기

  const handleUserIdChange = (event: any) => {
    const id = event.target.value;
    setIsUserIdValid(id.length >= 2 && id.length <= 8);
  };

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    setIsEmailValid(email.includes('@'));
  };

  useEffect(() => {
    function checkValidation() {
      setIsChecked(isEmailValid && isUserIdValid);
    }

    // 상태가 변경될 때마다 검증 함수 호출
    checkValidation();
  }, [isUserIdValid, isEmailValid]); // 의존성 배열에 isUserIdValid와 isEmailValid 추가

  const getButtonClasses = () => {
    const baseClasses = "mt-10 py-2 px-5 border border-transparent rounded-lg text-white";
    if (isChecked) {
      return `${baseClasses} bg-[#fc487e] hover:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring-pink active:bg-pink-700`;
    } else {
      return `${baseClasses} bg-gray-400`;
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // 폼의 기본 제출 동작 방지

    const formData = new FormData(event.target); // 폼 데이터 캡처
    const data = Object.fromEntries(formData.entries()); // FormData를 일반 객체로 변환

    try {
      const url = process.env.NEXT_PUBLIC_API_URL + '/users/find-password';
      const response = await axios.create().post(url, data); // REST API 호출

      if (response.status === 200) {
        // 성공 처리 로직
        setIsPasswordNotifyModalOpen(true); // 비밀번호 찾기 모달창 열기
        return;
      }

    } catch (error) {
      const errorMessage = (error as any).response?.data?.results?.message || 'Unknown error occurred';
      alert(errorMessage); // 오류 메시지를 사용자에게 알림
      
      // 폼 데이터 초기화 로직
      event.target.reset(); // 폼의 모든 입력 필드를 초기화
    }
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <LandingHeader />
      {isPassowrdNotifyModalOpen && <PasswordNotifyModal />}
      <div className="form-landing max-w-2xl">
        <p className="text-center w-full text-2xl mt-4">비밀번호 찾기</p>
        <div className="m-10 flex flex-col items-center justify-center">
          <div className="text-base text-[#404040]">가입시 등록한 아이디와 비밀번호를 입력해주세요.</div>
          <div className="text-base text-[#404040]">등록한 이메일로 임시 비밀번호가 전송됩니다.</div>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <span className="text-lg text-[#404040]">아이디</span>
            <input id="id" name="userId" type="text" autoComplete="username" pattern="[A-Za-z0-9]{2,8}" required
              className="infoSignup mt-1" placeholder="영어 또는 숫자 2자 이상"
              onChange={handleUserIdChange} />
          </div>
          <div>
            <span className="text-lg text-[#404040] mt-10">이메일</span>
            <input id="email-address" name="email" type="email" autoComplete="email" required
              className="infoSignup" placeholder="이메일 주소"
              onChange={handleEmailChange} />
          </div>
          <div className="flex items-center justify-center m-10">
            <button type="submit"
              className={getButtonClasses()}
              disabled={!isChecked}>
              비밀번호 전송
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default SignupPage;
