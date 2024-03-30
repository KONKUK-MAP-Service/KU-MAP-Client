import React, { useState } from 'react';
import Image from 'next/image';
import instance from '@/api/instance';

interface MapRegisterModalProps {
    longtitue: number;
    latitude: number;
    onBack: () => void;
}

const Modal: React.FC<MapRegisterModalProps> = ({ onBack, longtitue, latitude }) => {
    const [spotName, setTitle] = useState('');
    const [review, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newImages = [...images];
        const newPreviews = [...previews];

        if (newImages.length > 5) {
            alert('사진은 최대 5장까지 업로드 가능합니다.');
            return;
        }
        for (let i = 0; i < e.target.files!.length; i++) {
            const file = e.target.files![i];
            if (newImages.length < 6) {
                newImages.push(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    newPreviews.push(e.target!.result as string);
                    setPreviews(newPreviews);
                };
                reader.readAsDataURL(file);
            }
        }
        setImages(newImages);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
      
        images.forEach((file) => {
          formData.append('multipartFileList', file);
        });
      
        const postingData = JSON.stringify({
          spotName: spotName,
          longitude: String(longtitue),
          latitude: String(latitude),
          review: review,
        });
        formData.append('posting', new Blob([postingData], {type : 'application/json'}));
      
        const url = `${process.env.NEXT_PUBLIC_API_URL}/spot/register`;
      
        try {
          const response = await instance.post(url, formData)
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.data;
          alert('등록되었습니다.');
          onBack();
        } catch (error) {
          console.error('Error during data fetching', error);
        }
      };
      

    return (
            <div className="marker-list-item flex flex-col justify-start mt-5 overflow-y-auto">
                <div className='bg-[#FAF5F9] w-full h-auto rounded-t-lg'>
                    <div className="w-full h-[72px] flex items-center justify-end">
                        <button onClick={onBack} className="m-6">
                            <Image src="/images/back.png" alt="Close" width={24} height={24} />
                        </button>
                    </div>
                </div> 
                <div className="bg-white w-full h-auto">
                    <div className="p-4 flex flex-col justify-center items-center px-7">
                        <div className="relative w-full h-[66px]">
                            <div className="w-full h-[20px] text-[#404040] text-[18px] gap-[12px]">장소명</div>
                            <input
                                type="text"
                                value={spotName}
                                onChange={handleTitleChange}
                                placeholder="장소명"
                                className="modal-input"
                            />
                        </div>    
                        <div className='mt-5 w-full h-[68px]'>
                            <div className="mt-5 flex flex-row items-center gap-[12px]">
                                <span className="text-lg text-[#404040] whitespace-nowrap">사진</span>
                                <span className="text-sm text-[#5e5e5e]">※ 사진은 최대 5장 업로드 할 수 있습니다.</span>
                            </div>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="modal-file-input"
                                multiple
                            />
                        </div>    
                        <div className='flex w-full space-x-2 mt-10 overflow-x-auto'>
                            {previews?.map((preview, index) => (
                                <div key={index}>
                                    <div className="w-[172px] h-[172px] rounded-[10px] overflow-hidden">
                                        <Image
                                            src={preview}
                                            width={172}
                                            height={172}
                                            alt={`그림-${index}`}
                                        />
                                    </div>    
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 w-full h-[29px] text-[#222] text-lg">설명</div>   
                        <textarea
                            value={review}
                            onChange={handleDescriptionChange}
                            placeholder="장소 설명을 입력해주세요."
                            className="modal-textarea h-[160px]"/>             
                    </div>
                </div>
                <button className='modal-button' onClick={handleSubmit}>등록하기</button>  
            </div> 
    );
};

export default Modal;
