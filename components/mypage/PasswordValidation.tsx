import React from 'react';
import instance from '@/api/instance';
import { useState } from 'react';

function PasswordValidation({onPasswordSuccess}: {onPasswordSuccess: () => void}) {

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event: any) => {
        const password = event.target.value;
        setIsPasswordValid(password.length >= 8 && password.length <= 20);
        if (isPasswordValid) {
            setPassword(password);
        }
    };

    const fetchData = async () => {
        const input = {
            password: password
        };

        try {
          const url = process.env.NEXT_PUBLIC_API_URL+'/users/check-password';
          const response = await instance.post(url,input)
          const data = response.data.results;
          onPasswordSuccess();
        } catch (error) {
          alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const getButtonClasses = () => {
        const baseClasses = "mt-10 py-2 px-5 border border-transparent rounded-lg text-white";
        if (isPasswordValid) {
          return `${baseClasses} bg-[#fc487e] hover:bg-pink-700 focus:outline-none focus:border-pink-700 focus:ring-pink active:bg-pink-700`;
        } else {
          return `${baseClasses} bg-gray-400`;
        }
      };

    
        return (
                <>
                    <h2 className="text-lg font-semibold text-center m-5">비밀번호 확인</h2>
                    <p className="mb-5 text-sm text-[#5E5E5E] text-center">회원님의 안전한 서비스 이용을 위해 비밀번호를 한 번 더 확인해 주세요.</p>
                    <p className="text-sm text-[#5E5E5E]">비밀번호</p>
                    <input
                        type="password"
                        className="infoSignup w-full my-3"
                        pattern="[A-Za-z0-9]{8,20}" 
                        autoComplete="current-password" 
                        required
                        onChange={handlePasswordChange}
                    />
                    <div className="flex justify-center my-5">
                        <button
                            type="submit"
                            className={getButtonClasses()}
                            onClick={fetchData}
                            disabled={!isPasswordValid}
                        >
                            확인
                        </button>
                    </div>  
                </>
        );
}

export default PasswordValidation;
  