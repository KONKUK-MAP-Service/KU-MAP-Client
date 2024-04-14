import React from "react";
import Image from "next/image";

const PrivacyPolicy = () => {
    return (
        <>
                <button className="my-5" onClick={() => window.history.back()}>
                    <Image src="/images/logo.png" alt="logo" width={100} height={100} />
                </button>   
            
                <h1 className="text-lg text-[#404040]">개인정보 이용 동의</h1>
                <br/>
                <h6 className="text-sm text-gray-500">-2024년 1월 27일에 마지막으로 업데이트 됨. </h6>
                <br/>
                <div className="w-full">

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
        </>
    );
};

export default PrivacyPolicy;