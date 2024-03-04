import LandingHeader from "@/components/common/LandingHeader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

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
      const url = process.env.NEXT_PUBLIC_API_URL+'/users/join'; //TODO: REST API 엔드포인트 URL 변경
      const response = await fetch(url, { // REST API 엔드포인트로 POST 요청 보내기
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // JavaScript 객체를 JSON 문자열로 변환
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json(); // 서버 응답을 JSON으로 파싱
      router.push('/');
    } catch (error) {
      console.error('Submission failed', error);
      // 실패 처리 로직
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <LandingHeader />
      <h2 className="title-landing">
          비밀번호 찾기
      </h2>
      <div className="form-landing max-w-2xl">
          <div className="m-10 flex flex-col items-center justify-center">
            <div className="text-base text-[#404040]">가입시 등록한 아이디와 비밀번호를 입력해주세요.</div>
            <div className="text-base text-[#404040]">등록한 이메일로 임시 비밀번호가 전송됩니다.</div>
          </div>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                  <span className="text-lg text-[#404040]">아이디</span>
                  <input id="id" name="userId" type="text" autoComplete="username" pattern="[A-Za-z0-9]{2,8}" required 
                  className="infoSignup mt-1" placeholder="영어 또는 숫자 2자 이상"
                  onChange={handleUserIdChange}/>
              </div>
              <div>
                  <span className="text-lg text-[#404040] mt-10">이메일</span>
                  <input id="email-address" name="email" type="email" autoComplete="email" required 
                  className="infoSignup" placeholder="이메일 주소"
                  onChange={handleEmailChange}/>
              </div>
          </form>
          <div className="flex items-center justify-center m-10">
                <button type="submit" 
                className={getButtonClasses()}
                disabled={!isChecked}>
                비밀번호 전송
                </button>
          </div>
        </div> 
    </div>
  );
}

export default SignupPage;
