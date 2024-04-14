import LandingHeader from "@/components/common/LandingHeader";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const SignupPage = () => {
  // 체크박스 상태를 위한 상태 훅
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  // 체크박스 변경을 처리하는 함수
  const handleCheckboxChange = (event: any) => {
    // console.log(event.target.checked);
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

      if (!response.ok && response.status !== 409) {
        alert('회원가입에 실패했습니다.');
        event.target.reset();
        return;
      }

      const result = await response.json(); // 서버 응답을 JSON으로 파싱

      if (response.status === 409) {
        alert(result.message);
        event.target.reset();
        return;
      }
      router.push('/');
    } catch (error) {
      console.error('Submission failed', error);
      // 실패 처리 로직
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <LandingHeader />
      <div className="w-full max-w-4xl p-8 bg-white shadow-md overflow-hidden rounded-xl sm:rounded-lg">
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
                <span className="text-sm text-gray-500">✔️ 2024년 1월 27일에 마지막으로 업데이트 됨. </span>
                <div className="w-full max-h-[100px] border-[1px] text-sm overflow-auto text-gray-600">

                  <span className="text-bold">1. 개인정보 수집 및 이용목적<br/></span><br/>

                  쿠석쿠석팀은 서비스 제공을 위한 최소한의 개인정보를 수집합니다. 회원 가입 시 또는 서비스 이용 과정에서 서비스 제공을 위해 최소한의 개인정보를 수집하고 있습니다. <br/>

                  회원가입 시 : 아이디, 비밀번호, 이메일, 이름(닉네임)<br/>

                  계정 설정 시 : 프로필 사진(선택)<br/>

                  <span className="text-bold"><br/>2. 개인정보의 파기 절차 및 파기 방법<br/></span><br/>

                  개인정보는 이용자가 회원 탈퇴를 하면 그 즉시 파기됩니다. 전자적 파일 형태로 데이터베이스에 보관되는 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 제거합니다. <br/>
                  만약 개인정보가 종이에 출력되어 있는 경우, 분쇄 혹은 소각의 방법을 통해 파기합니다. <br/>

                  <span className="text-bold"><br/>3. 개인정보 보호책임자의 연락처<br/></span><br/>

                  개인정보 보호책임자의 연락처는 <a href="mailto:ompangman1@gmail.com" className="text-blue-800">ompangman1@gmail.com</a>으로, 처리방침에 질의가 있을 경우 해당 이메일 주소를 통해 문의 부탁드립니다.<br/>

                </div>
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
