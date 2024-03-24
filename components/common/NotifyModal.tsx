import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotifyModal = ({ ment , onBack }: { ment: string , onBack: () => void }) => {
    return (
        <div className="overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full h-[30px] flex items-center justify-end">
                        <button onClick={onBack} className="m-1">
                            <Image src="/images/back.png" alt="Close" width={24} height={24} />
                        </button>
                    </div>
                    <span className="my-5 text-lg">{ment}</span>
                    <Link href="/main">
                        <button className="modal-button">확인</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default NotifyModal;