import React from "react";
import Image from "next/image";

const LandingHeader = () => {
    return (
        <div className="header-landing">
            <Image src="/images/logo.png" alt="logo" width={150} height={100} style={
                {
                    maxHeight: '100px',
                    maxWidth: '150px',
                    width: 'auto',
                    height: 'auto'
                }
            
            }/>
        </div>
    )
};

export default LandingHeader;