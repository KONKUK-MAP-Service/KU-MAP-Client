import React from "react";
import Image from "next/image";
import instance from "@/api/instance";


const MarkerDeleteNotify = ({ spotId, onBack}: { spotId: number, onBack: () => void}) => {
    const deleteMarker = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/spot/${spotId}`;
        
        try{
            const response = await instance.delete(url);
            if(response.status === 200){
                alert('삭제되었습니다.');
                window.location.reload();
            }
            else{
                alert('삭제에 실패했습니다.');
            }
        }catch(error){
            alert('서버 오류가 발생했습니다.');
        }
    }


    return (
        <div className="overlay">
            <div className="notifyModal">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex justify-end px-1">
                        <Image src="/images/back.png" alt="Close" width={24} height={24} onClick= {onBack}/>
                    </div>
                    <h2 className="my-5 text-lg text-center">정말로 삭제하시겠습니까?<br/><span className="text-[#9E67F7] text-sm">※ 다시 복구할 수 없습니다.</span></h2>
                    <button className="modal-button" onClick={deleteMarker}>삭제하기</button>
                </div>
            </div>
        </div>
    )
};

export default MarkerDeleteNotify;