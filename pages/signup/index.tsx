import Footer from "@/components/common/Footer";
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
    <>
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
                <span className="text-sm text-gray-500">✔️ 2024년 3월 27일에 마지막으로 업데이트 됨. </span>
                <div className="w-full max-h-[100px] border-[1px] text-sm overflow-auto text-gray-600">
                제 1 조 (목적)<br/>

                본 약관은 쿠석쿠석팀(이하 “제공자”, “팀”)이 제공하는 쿠석쿠석에 대해 제공자와 서비스를 이용하는 개인 위치 정보 주체(이하 “사용자”) 간의 권리·의무 및 책임사항, 기타 필요한 사항의 규정을 목적으로 합니다.<br/>

                제 2 조 (이용약관의 효력 및 변경)<br/>

                1. 본 약관은 사용자가 본 약관에 동의하고 팀이 정한 절차에 따라 앱 서비스의 사용자로 등록됨으로써 효력이 발생합니다.<br/>
                2. 팀은 법률이나 쿠석쿠석 서비스의 변경사항을 반영하기 위한 목적 등으로 약관을 수정할 수 있습니다.<br/>

                제 3 조 (약관 외 준칙)<br/>

                이 약관에 명시되지 않은 사항에 대해서는 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 팀이 정한 지침 등의 규정에 따릅니다.<br/>

                제 4 조 (서비스의 내용)<br/>

                팀은 사용자가 선택한 위치에 사진과 함께 게시글을 업로드하고 댓글을 달며 사용자끼리 특정 장소 정보를 공유하는 서비스를 제공합니다.<br/>

                제 5 조 (운영기준)<br/>

                운영 기준은 사용자가 서비스 이용시 주의해야 할 행위와 정보의 세부적인 사항이 규정되어 있으며, 해당 행위 등을 할 경우 서비스 이용에 어떠한 제한이 적용될 수 있는지 안내합니다.<br/>

                쿠석쿠석 서비스 사용자 모두가 안전하고 쾌적한 서비스를 이용할 수 있도록 운영 기준을 주의 깊게 읽고 서비스를 이용해 주시기를 부탁드리며, 정책을 위반하는 행위나 정보를 확인하시거나 다른 사용자로 인해 피해를 입으신 경우 팀 메일을 통해 제보하여 주시기 바랍니다.<br/>

                운영기준 조항의 내용에 열거되지 않은 행위일지라도 사용자의 안전을 위협하거나, 불쾌하거나 민감한 콘텐츠로 판단되는 등 서비스 이용약관 및 운영정책에 위반된다고 판단되는 행위가 있을 경우 제공자는 제재 조치를 취할 수 있습니다.<br/>

                [사용자 안전]<br/>
                <ul typeof="I">
                    <li>- 아동 청소년 대상 성범죄</li>
                    <li>- 성인 대상 성범죄</li>
                    <li>- 따돌림, 괴롭힘 등 사이버 폭력</li>
                    <li>- 범죄 행위 및 범죄 모의 행위 등</li>
                    <li>- 자살 및 자해</li>
                    <li>- 개인정보보호 위반</li>
                </ul>
                [불쾌하거나 민감한 컨텐츠]<br/>
                <ul>
                    <li>- 과도한 신체노출 및 성적행위 정보</li>
                    <li>- 폭력적이거나 혐오감 등을 유발하는 정보</li>
                    <li>- 증오 발언</li>
                </ul>    
                [불법 또는 규제 상품 및 서비스 관련 컨텐츠]<br/>
                <ul>
                    <li>- 불법 또는 규제 상품 및 서비스 등</li>
                    <li>- 청소년 유해 상품 및 서비스 등</li>
                </ul>    
                [안정성 및 신뢰성 확보]<br/>
                <ul>
                    <li>- 영리 목적의 광고성 정보 전송</li>
                    <li>- 제공자가 허용하지 않는 방법에 의한 서비스 이용</li>
                    <li>- 다량의 신고 누적</li>
                </ul>    
                [권리보호]<br/>
                <ol>
                  <li>- 사생활침해, 명예훼손, 저작권침해 등 권리침해</li>
                </ol>
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
    <Footer />
    </>
  );
}

export default SignupPage;
