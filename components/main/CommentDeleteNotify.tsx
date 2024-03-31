import React from "react";
import Image from "next/image";


interface MarkerDeleteNotifyProps {
    onBack: () => void;
    onDelete: () => void;
}


const MarkerDeleteNotify:React.FC<MarkerDeleteNotifyProps> = ({onBack, onDelete}) => {
    return (
        <div className="overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex justify-end px-1">
                        <Image src="/images/back.png" alt="Close" width={24} height={24} onClick= {onBack}/>
                    </div>
                    <h2 className="my-5 text-lg text-center">정말로 삭제하시겠습니까?<br/><span className="text-[#9E67F7] text-sm">※ 다시 복구할 수 없습니다.</span></h2>
                    <button className="modal-button" onClick={onDelete}>삭제하기</button>
                </div>
            </div>
        </div>
    )
};

export default MarkerDeleteNotify;