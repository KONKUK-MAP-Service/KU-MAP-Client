import React from "react";
import Image from 'next/image';

type HeaderProps = {
  user: String;
  profileImage: string;
};

export default function Header({user, profileImage}: HeaderProps) {
  const userName = user;
  let profileImageUrl = profileImage;
  if (profileImageUrl == null) {
    profileImageUrl = "/images/profile.png";
  }

  return (
    <header className="absolute left-0 top-0 w-[204px] h-[57px] bg-white border-2 border-gray-200 rounded-bl-[50px] rounded-br-[50px] z-10 flex items-center justify-start">
      <div className="ml-[30px] rounded-full overflow-hidden w-[40px] h-[40px] border-2 border-gray-400">
        <Image 
          src={profileImageUrl}
          alt="logo"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <span className="ml-[20px]">{userName}</span>
      <span className="ml-[10px]">님</span>
    </header>
  );
}
