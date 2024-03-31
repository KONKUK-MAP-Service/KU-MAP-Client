import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import instance from "@/api/instance";

const NotifyModal = ({ onBack }: { onBack: () => void }) => {

    const router = useRouter();

    const handleLogout = async () => {
        try{
            const refreshToken = sessionStorage.getItem('refreshToken');
            const input = {
                refreshtoken: refreshToken
            }
            const url = process.env.NEXT_PUBLIC_API_URL + '/users/logout';
            const response = await instance.patch(url, input);
            if (response.status !== 200) {
                alert('로그아웃에 실패했습니다.');
                return;
            }
            sessionStorage.clear();
            router.push('/');
        } catch (error) {
            alert('서버 오류가 발생했습니다.');
            return;
        }
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