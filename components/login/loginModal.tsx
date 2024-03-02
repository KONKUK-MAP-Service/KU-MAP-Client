import React from "react";
import LoginContent from "./loginContent";


interface LoginProps {
    onBack: () => void;
}

const LoginModal: React.FC<LoginProps> = ({ onBack }) => {

    return (
        <div className="overlay">
            <div className="loginModal left-[50%]">
                <LoginContent onBack={onBack}/>  
            </div>    
        </div>    
    );
}

export default LoginModal;