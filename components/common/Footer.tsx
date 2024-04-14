import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full bg-gray-100">
            <div className="flex flex-row my-10">
                <a href="https://github.com/KONKUK-MAP-Service" className="mx-5 text-gray-800">쿠석쿠석 팀</a> 
                <Link href="/policy/service" className="mx-5 text-gray-800">서비스이용약관</Link>
                <Link href="/policy/privacy" className="mx-5 text-gray-800">개인정보처리방침</Link>
            </div>  
            <a href="mailto:ompangman1@gmail.com" className="text-gray-500">ompangman1@gmail.com</a>
            <p className="text-gray-500 my-5">© 2024 쿠석쿠석팀 All rights reserved</p>
        </div>
    )
};

export default Footer;