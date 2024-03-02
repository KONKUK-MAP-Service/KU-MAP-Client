import React from "react";
import { useState } from "react";

const SignupPage = () => {
  // 체크박스 상태를 위한 상태 훅
  const [isChecked, setIsChecked] = useState(false);

  // 체크박스 변경을 처리하는 함수
  const handleCheckboxChange = (event: any) => {
    console.log(event.target.checked);
    setIsChecked(event.target.checked);
  };

  // 버튼 클래스 이름을 결정하는 함수
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
      const url = process.env.NEXT_PUBLIC_API_URL+'/users/join';
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
      // 성공 처리 로직(예: 알림 표시, 페이지 리디렉션 등)
    } catch (error) {
      console.error('Submission failed', error);
      // 실패 처리 로직
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
          회원가입
        </h2>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
                <span className="text-lg text-[#404040]">아이디</span>
                <input id="id" name="userId" type="text" autoComplete="username" pattern="[A-Za-z0-9]{2,8}" required className="infoSignup mt-1" placeholder="영어 또는 숫자 2자 이상"/>
            </div>
            <div>
                <span className="text-lg text-[#404040]">비밀번호</span>
                <input id="password" name="password" type="password" pattern="[A-Za-z0-9]{8,20}" autoComplete="current-password" required className="infoSignup mt-1" placeholder="영어, 숫자를 포함해서 8자 이상"/>
            </div>
            <div>
                <span className="text-lg text-[#404040] mt-10">이메일 주소</span>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="infoSignup" placeholder="이메일 주소"/>
            </div>
            <div>    
                <span className="text-lg text-[#404040] mt-10">닉네임</span>
                <input id="nickname" name="nickname" type="text" autoComplete="nickname" maxLength={8} required className="infoSignup" placeholder="한글, 영어, 숫자를 포함해서 8자 이하"/>
            </div>  
            <div className="flex flex-col justify-start">
                <span className="text-lg text-[#404040]">개인정보 이용 동의</span>
                <div className="w-full h-[40px] border-[1px] text-sm">임의의 내용입니다. 개인정보 이용 동의란에 대한 내용을 입력해주세요.</div>
            </div>  
            <div className="flex items-center justify-end">
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 mx-2">동의합니다</span>
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 focus:ring-pink" onChange={handleCheckboxChange}/>
                </div>    
            </div>
            <div className="flex items-center justify-center">
                <button type="submit" 
                className={getButtonClasses()}
                disabled={!isChecked}>
                회원가입하기
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
