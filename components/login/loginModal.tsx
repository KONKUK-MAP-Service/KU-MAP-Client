import React from "react";
import Image from "next/image";


interface LoginProps {
    onBack: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ onBack }) => {

    return (
        <div className="loginModal">
            <div className="w-full h-[40px]">
                <Image className="absolute -translate-x-1/2 left-[90%] top-[36px]" width={40} height={40} src="/images/back.png" alt="뒤로 가기" onClick={onBack}/>
            </div>
            <div className="flex flex-col justify-start w-full">
                <div className="h-[30%] w-full flex flex-row items-center justify-center"/>
                <div className="text-lg text-[#404040] mt-10">아이디</div>
                <input type="text" placeholder="아이디를 입력해주세요" className="py-3 w-full bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[4px]"/>
                <div className="text-lg text-[#404040] mt-2">비밀번호</div>
                <input type="text" placeholder="비밀번호를 입력해주세요" className="py-3 w-full bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[4px]"/>
                <div className="flex flex-row items-center justify-center w-full">
                    <button className="mt-10 px-10 py-3 border-2 border-transparent bg-[#fc487e] text-white rounded-lg m-3">로그인</button>
                </div>
                <div className="flex flex-row items-center justify-center w-full">
                    <div className="mt-10 text-lg text-gray-600">비밀번호 찾기</div>    
                    <div className="mt-10 mx-2 text-lg text-gray-600">|</div>
                    <div className="mt-10 text-lg text-gray-600">회원가입하기</div>
                </div>    
            </div>    
        </div>        
    );
}

export default LoginModal;