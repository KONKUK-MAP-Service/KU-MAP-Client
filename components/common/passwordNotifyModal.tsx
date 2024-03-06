import React from "react";
import Link from "next/link";
import LoginContent from "../login/loginContent";

const PasswordNotifyModal = () => {
    return (
        <div className = "overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
                    <span className="mt-10 text-lg">임시 비밀번호가 전송되었습니다.</span>
                    <Link href="/">
                        <button className="modal-button my-10">로그인 화면으로</button>
                    </Link>    
                </div>    
            </div>
        </div>
    )
};   

export default PasswordNotifyModal;