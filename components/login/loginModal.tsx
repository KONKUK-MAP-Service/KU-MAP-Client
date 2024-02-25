import React from "react";
import Image from "next/image";
import exp from "constants";


interface LoginProps {
    onBack: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ onBack }) => {

    return (
        <div className="modal">
            <div className="absolute left-[1090px] top-[144px] z-10">
                <div className="relative w-[590px] h-[740px] bg-[#fff] border-[2px] border-solid border-[#e6e6e6] rounded-[50px] overflow-hidden">
                    <div className="absolute -translate-x-1/2 left-1/2 top-[126px] text-[40px] font-['SB_Aggro'] text-[#fc487e] whitespace-nowrap">쿠석쿠석 로고</div>
                    <Image className="absolute -translate-x-1/2 left-[calc(50%+239px)] top-[36px]" width={40} height={40} src="/images/back.png" alt="ㅇㅅㅇ?" onClick={onBack}/>
                    <div className="absolute left-[156px] top-[635px] h-[21px] flex flex-row items-start justify-start gap-[20px]">
                        <div className="text-[20px] font-['SB_Aggro'] text-[#5e5e5e] whitespace-nowrap">비밀번호 찾기</div>
                        <div className="w-[5px] h-[21px] text-[20px] font-['SB_Aggro'] text-[#e6e6e6]">|</div>
                        <div className="text-[20px] font-['SB_Aggro'] text-[#5e5e5e] whitespace-nowrap">회원가입하기</div>
                    </div>
                    <div className="absolute left-[186px] top-[511px] w-[218px] h-[84px] flex">
                        <div className="absolute -translate-x-1/2 left-1/2 top-0 w-[218px] h-[84px] bg-[#fc487e] rounded-[20px]"></div>
                        <div className="absolute -translate-x-1/2 left-1/2 top-[27px] w-[179px] h-[30px] text-[28px] font-['SB_Aggro'] text-[#fff] text-center">로그인</div>
                    </div>
                    <div className="absolute left-[56px] top-[265px] w-[478px] flex flex-col items-start justify-start gap-[20px]">
                        <div className="relative w-[478px] h-[88px] shrink-0">
                            <div className="absolute left-0 right-0 top-0 bottom-[72.73%] text-[20px] font-['SB_Aggro'] text-[#404040]">아이디</div>
                            <div className="absolute left-0 right-0 top-[38.64%] bottom-0 bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[4px]"></div>
                        </div>
                        <div className="relative w-[478px] h-[88px] shrink-0">
                            <div className="absolute left-0 right-0 top-0 bottom-[72.73%] text-[20px] font-['SB_Aggro'] text-[#404040]">비밀번호</div>
                            <div className="absolute left-0 right-0 top-[38.64%] bottom-0 bg-[#fafafa] border-[2px] border-solid border-[#e6e6e6] rounded-[4px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default LoginModal;