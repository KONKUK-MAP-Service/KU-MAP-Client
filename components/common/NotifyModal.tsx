import React from "react";
import Link from "next/link";

const NotifyModal = ({ ment }: { ment: string }) => {
    return (
        <div className="overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
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