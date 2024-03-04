import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingHeader = () => {
    return (
        <div className="header-landing">
            <Link href="/">
                <Image src="/images/logo.png" alt="logo" width={150} height={100} style={
                    {
                        maxHeight: '100px',
                        maxWidth: '150px',
                        width: 'auto',
                        height: 'auto'
                    }
                }/>
            </Link>    
        </div>
    )
};

export default LandingHeader;