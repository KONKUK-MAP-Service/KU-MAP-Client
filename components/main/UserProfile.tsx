import React, { useEffect, useState } from "react";
import Image from 'next/image';

interface UserProfileProps {
  onUserProfileClick: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onUserProfileClick }) => {
  const [userName, setUserName] = useState("로그인");
  const [profileImageUrl, setProfileImageUrl] = useState("/images/profile.png");

  useEffect(() => {
    const loginUser = sessionStorage.getItem("login_user");
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUserName(user.nickname);
      setProfileImageUrl(user.profileImage);
    }
  }, []);

  return (
    <header className="profile-header min-h-[50px] min-w-[170px] flex flex-row">
      <button onClick={onUserProfileClick} className="flex flex-row">
        <div className="rounded-full overflow-hidden w-[40px] h-[40px] border-2 border-gray-400">
          <Image 
            src={profileImageUrl}
            alt="profile"
            width={40}
            height={40}

          />
        </div>
        <span className="m-2">{userName} 님</span>
      </button>  
    </header>
  );
}

export default UserProfile;
