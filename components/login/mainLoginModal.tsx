import React from "react";
import Image from "next/image";
import LoginContent from "./loginContent";


interface LoginProps {
    onBack: () => void;
}

const MainLoginModal: React.FC<LoginProps> = ({ onBack }) => {

    return (
        <div className="loginModal left-[75%]">
            <LoginContent onBack={onBack}/>  
        </div>        
    );
}

export default MainLoginModal;