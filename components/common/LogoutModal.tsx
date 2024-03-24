import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const NotifyModal = ({ onBack }: { onBack: () => void }) => {

    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/');
    }

    return (
        <div className="overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full h-[30px] flex items-center justify-end">
                        <button onClick={onBack} className="m-1">
                            <Image src="/images/back.png" alt="Close" width={24} height={24} />
                        </button>
                    </div>
                    <span className="my-5 text-lg">로그아웃하시겠습니까?</span>
                    <button className="modal-button" onClick={handleLogout}>확인</button>
                </div>
            </div>
        </div>
    )
};

export default NotifyModal;