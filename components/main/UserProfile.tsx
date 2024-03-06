import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from "next/link";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("로그인");
  const [profileImageUrl, setProfileImageUrl] = useState("/images/profile.png");

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      setUserName("홍길동"); 
      setProfileImageUrl("/images/anton.jpeg");
      setIsLogin(true);
    }
  }, []);

  return (
    <header className="profile-header min-h-[50px] min-w-[170px] flex flex-row">
      <Link href="/mypage" className="flex flex-row">
        <div className="rounded-full overflow-hidden w-[40px] h-[40px] border-2 border-gray-400">
          <Image 
            src={profileImageUrl}
            alt="profile"
            width={40}
            height={40}

          />
        </div>
        <span className="m-2">{userName} 님</span>
      </Link>  
    </header>
  );
}
