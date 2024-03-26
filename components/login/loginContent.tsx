import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import instance from "@/api/instance";


interface LoginProps {
    onBack: () => void;
}

const LoginContent: React.FC<LoginProps> = ({ onBack }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const data = {
            username: userName,
            password: password
        };

        try {
            const url = process.env.NEXT_PUBLIC_API_URL+'/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                router.push('/');
            }

            const result = await response.json();

            var refreshToken = result.refreshToken;
            var accessToken = result.accessToken;

            
            if (refreshToken && accessToken) {
                sessionStorage.setItem('refreshToken', refreshToken);
                sessionStorage.setItem('accessToken', accessToken);
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다.');
            router.push('/');
            return;
        }

        try {
            const url = process.env.NEXT_PUBLIC_API_URL+'/users/profile/current';
            const response = await instance.get(url);
            if (response.status === 200) {
                const user = response.data.results;
                sessionStorage.setItem('login_user', JSON.stringify(user));
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            router.push('/');
            return;
        }

    };

    return (
        <>
            <div className="w-full h-[40px]">
                <Image className="absolute -translate-x-1/2 left-[90%] top-[36px]" width={40} height={40} src="/images/back.png" alt="뒤로 가기" onClick={onBack}/>
            </div>
            <div className="flex flex-col justify-start w-full">
                <Image src="/images/logo.png" alt="logo" width={200} height={200} className="m-auto"/>
                <div className="h-[30%] w-full flex flex-row items-center justify-center"/>
                <div className="text-lg text-[#404040] mt-10">아이디</div>
                <input id="id" name="userId" type="text" autoComplete="username" pattern="[A-Za-z0-9]{2,8}"
                 required className="infoSignup mt-1" placeholder="아이디를 입력해주세요"
                 onChange={(e) => {
                  setUserName(e.target.value);
                }}/>
                <div className="text-lg text-[#404040] mt-2">비밀번호</div>
                <input id="password" name="password" type="password" pattern="[A-Za-z0-9]{8,20}" autoComplete="current-password"
                 required className="infoSignup mt-1" placeholder="비밀번호를 입력해주세요" 
                 onChange={(e) => {
                    setPassword(e.target.value);
                 }}/>
                <div className="flex flex-row items-center justify-center w-full">
                    <button className="mt-10 px-10 py-3 border-2 border-transparent bg-[#fc487e] text-white rounded-lg m-3" onClick={handleSubmit}>로그인</button>
                </div>
                <div className="flex flex-row items-center justify-center w-full">
                    <Link href="/findPassword">
                        <div className="mt-10 text-lg text-gray-600 cursor-pointer">비밀번호 찾기</div>
                    </Link>    
                    <div className="mt-10 mx-2 text-lg text-gray-600">|</div>
                    <Link href="/signup">
                        <div className="mt-10 text-lg text-gray-600 cursor-pointer">회원가입하기</div>
                    </Link>
                </div>    
            </div>    
        </>
    );
}

export default LoginContent;