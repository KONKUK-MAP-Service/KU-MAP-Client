import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import instance from '@/api/instance';

interface MapChangeProps {
    item: ListItemProps;
    isHide: boolean;
    onBack: () => void;
}

const Modal: React.FC<MapChangeProps> = ({ item, onBack, isHide }) => {
    const [spotName, setTitle] = useState('');
    const [review, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [deleteImageUrls, setDeleteImageUrls] = useState<string[]>([]);
    const spotId = item.spotId;

    useEffect(() => {
        setTitle(item.spotName);
        setDescription(item.review);
        setPreviews(item.images);
        setImages([]);
    }, [item]);

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

    // 기존 이미지 삭제 핸들러
    const handleRemoveExistingImage = (index: number) => {
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setDeleteImageUrls((prevDeleteImageUrls) => [...prevDeleteImageUrls, item.images[index]]);
    };

    // 새 이미지 추가 핸들러
    const handleRemoveNewImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const formData = new FormData();

        if (spotName === '') {
          alert('장소명을 입력해주세요.');
          return;
        }

        if (review === '') {
          alert('설명을 입력해주세요.');
          return;
        }
      
        images.forEach((file) => {
          formData.append('multipartFileList', file);
        });

        if (images.length === 0) {
            formData.append('multipartFileList', new Blob());
        }
      
        const update = JSON.stringify({
          spotName: spotName,
          review: review,
          deleteImageUrls: deleteImageUrls,
        });
        formData.append('update', new Blob([update], {type : 'application/json'}));
      
        const url = `${process.env.NEXT_PUBLIC_API_URL}/spot/${spotId}`;
      
        try {
          const response = await instance.put(url, formData)
          if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.data;
          alert('등록되었습니다.');
          window.location.reload();
        } catch (error) {
          console.error('Error during data fetching', error);
        }
      };
      

    return (
            <div className={`marker-list-item ${isHide? 'left' : ''} flex flex-col justify-start`}>
                <div className='bg-[#FAF5F9] w-full h-auto rounded-t-lg'>
                    <div className="w-full h-[72px] flex items-center justify-end">
                        <button onClick={onBack} className="m-6">
                            <Image src="/images/back.png" alt="Close" width={24} height={24} />
                        </button>
                    </div>
                </div> 
                <div className="bg-white w-full h-auto overflow-y-auto">
                    <div className="p-4 flex flex-col justify-center items-center px-7">
                        <div className="relative w-full h-[66px]">
                            <div className="w-full h-[20px] text-[#404040] text-[18px] gap-[12px]">장소명</div>
                            <input
                                type="text"
                                value={spotName}
                                onChange={handleTitleChange}
                                placeholder="장소명"
                                className="modal-input w-full"
                            />
                        </div>    
                        <div className='mt-5 w-full h-[68px]'>
                            <div className="mt-5 w-full flex flex-row items-center gap-[12px]">
                                <span className="text-lg text-[#404040] whitespace-nowrap">사진</span>
                                <span className="text-sm text-[#5e5e5e] px-2">※ 사진은 최대 5장 업로드 할 수 있습니다.</span>
                            </div>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="modal-file-input w-full"
                                multiple
                            />
                        </div>    
                        <div className='relative w-full space-x-2 mt-10'>
                            {previews?.map((preview, index) => (
                                <div key={index}  className='relative w-full w-[100%] max-w-[95%] h-[200px] xl:h-[300px]'>
                                    <Image src={preview} alt={`그림-${index}`} fill style={{objectFit: 'contain'}}/>
                                    <button 
                                    className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 rounded-full"
                                    onClick={() => item.images.includes(preview) ? handleRemoveExistingImage(index) : handleRemoveNewImage(index)}
                                    >
                                    &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 w-full h-[29px] text-[#222] text-lg">설명</div>   
                        <textarea
                            value={review}
                            onChange={handleDescriptionChange}
                            placeholder="장소 설명을 입력해주세요."
                            className="modal-textarea h-[160px]"/>       
                         <button className='modal-button' onClick={handleSubmit}>수정하기</button>        
                    </div>
                </div>
            </div> 
    );
};

export default Modal;
