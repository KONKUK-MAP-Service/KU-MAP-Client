import React, { use } from "react";
import { useState, useEffect } from "react";

type HideButtonProps = {
  onClick: () => void;
  active: boolean;
};

const HideButton: React.FC<HideButtonProps> = ({ onClick, active }) => {

    const [isActive, setIsActive] = useState(false);

    const toggleButtonPosition = () => {
        setIsActive(!isActive);
        onClick();
      };
    

    return (
        <button
            className={`hide-button ${isActive ? 'active' : ''}`}
            onClick={toggleButtonPosition}
        >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
            stroke="currentColor" 
            className="w-5 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>

        </button>
    );
}

export default HideButton;