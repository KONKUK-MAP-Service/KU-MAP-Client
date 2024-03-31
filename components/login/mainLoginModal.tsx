import React from "react";
import LoginContent from "./loginContent";


interface LoginProps {
    onBack: () => void;
}

const MainLoginModal: React.FC<LoginProps> = ({ onBack }) => {

    return (
        <div className="overlay">
            <div className="loginModal left-[75%]">
                <LoginContent onBack={onBack}/>  
            </div>    
        </div>        
    );
}

export default MainLoginModal;