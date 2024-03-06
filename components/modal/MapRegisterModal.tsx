import React, { useState } from 'react';
import Image from 'next/image';
import { on } from 'events';

interface MapRegisterModalProps {
    onBack: () => void;
}

const Modal: React.FC<LocationInfoProps> = ({ onBack }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      // 이미지 파일 3개로 제한
      if (newImages.length < 5) {
        // 이벤트객체의 파일을 newImages에 담기
        newImages.push(file);
        // 파일리더 객체 생성
        const reader = new FileReader();
        // 파일 읽어온 후 실행되는 콜백함수
        reader.onload = (e) => {
          // 읽어온 값을 갱신하기
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        // 파일 객체를 읽어 base64 형태의 문자열로 변환
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

  const handleSubmit = () => {
    alert('등록되었습니다.');
    onBack();
  };

  return (
    <div className='modal'>
        <div className="absolute left-[410px] top-[150px] w-[400px] h-[764px] bg-white border-2 border-gray-200 rounded-[50px] z-10 flex flex-col overflow-hidden">
            <div className='bg-[#FAF5F9] w-full h-[78px] rounded-t-lg'>
                <div className="w-full h-[72px] flex items-center justify-end">
                    <button onClick={onBack} className="m-6">
                        <Image src="/images/back.png" alt="Close" width={24} height={24} />
                    </button>
                </div>
            </div> 
            <div className="bg-white w-[400px] h-[534px]">
                <div className="p-4 flex flex-col justify-center items-center">
                    <div className="relative w-[352px] h-[66px] shrink-0">
                        <div className="w-[352px] h-[20px] text-[#404040] text-[18px] gap-[12px]">장소명</div>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="장소명"
                            className="modal-input"
                        />
                    </div>    
                    <div className='mt-5 w-[352px] h-[68px]'>
                        <div className="mt-5 w-[352px] flex flex-row items-center gap-[12px]">
                            <div className="text-[18px] text-[#404040] whitespace-nowrap">사진</div>
                            <div className="w-[300px] h-[14px] text-[12px]text-[#5e5e5e]">※ 사진은 최대 5장 업로드 할 수 있습니다.</div>
                        </div>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="modal-file-input"
                            multiple
                        />
                    </div>    
                    <div className='flex space-x-2 mt-4'>
                        {previews?.map((preview, index) => (
                            <div key={index}>
                                <div className="w-[172px] h-[172px] rounded-[10px] overflow-hidden">
                                    <Image
                                        src={preview}
                                        width={172}
                                        height={172}
                                        alt={`${preview}-${index}`}
                                    />
                                </div>    
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 w-[352px] h-[29px] text-[#222] text-[18px] font-bold">설명</div>   
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="장소 설명을 입력해주세요."
                        className="modal-textarea h-[160px]"/>             
                </div>
            </div>
            <div className='absolute top-[668px] left-[128px] flex flex-col justify-center items-center'>
                <button onClick={handleSubmit} className="w-[144px] h-[56px] bg-[#FC487E] rounded-[20px] mt-4 flex justify-center items-center">등록하기</button>
            </div>   
         </div>
    </div>    
  );
};

export default Modal;
