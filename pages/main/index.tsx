import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/main/UserProfile';
import MarkerList from '@/components/main/MarkerList';
import UserMarker from '@/components/main/UserMarker';
import LocationInfo from '@/components/main/LocationInfo';
import MapRegisterModal from '@/components/main/MapRegisterModal';
import MarkerRegisterButton from '@/components/button/MarkerRegisterButton';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Main({ projects }: any) {
  const mapRef = useRef<any>(null);

  const [selectedItem, setSelectedItem] = useState<ListItemProps | null>(null);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMarkerOpen, setIsMarkerOpen] = useState(false);
  
  const handleListItemClick = (item: ListItemProps) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null); // 선택된 아이템 상태를 null로 설정하여 LocationInfo를 숨깁니다.
  };

  const handleModalBack = () => {
    setIsModalOpen(false);
  };

  const handleMarkerRegister = () => {
    setIsModalOpen(true);
    setIsMarkerOpen(false);
  }

  const items: ListItemProps[] = [
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가 만약에 설명이 진짜 길다면 어떻게 할래\n서울특별시 성동구 성수동1가 만약에 설명이 진짜 길다면 어떻게 할래 서울특별시 성동구 성수동1가 만약에 설명이 진짜 길다면 어떻게 할래', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
    {itemId: 1, title: '서울숲', subtitle: '서울특별시 성동구 성수동1가', date: '2021.10.10', writer: '홍길동', isBookmarked: false, onClick: () => {}},
  ];



  useEffect(() => {
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=`+process.env.NEXT_PUBLIC_API_KEY+`&autoload=false&libraries=services`
    document.head.appendChild(kakaoMapScript)
  

    const onLoadKakaoAPI = () => {
      window.window.kakao.maps.load(() => {
        var container = document.getElementById('map');
        var options = {
          center: new window.window.kakao.maps.LatLng(37.543536094587516, 127.07741635877292),
          level: 3
        }
  
        var mapInstance = new window.kakao.maps.Map(container, options);

        var imageSrc = '/images/marker1.png',    
            imageSize = new window.kakao.maps.Size(24, 35);

        var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize),
            markerPosition = mapInstance.getCenter(); // 마커가 표시될 위치입니다

        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커 이미지 설정
          clickable: true // 마커를 클릭했을 때 지도의 중심좌표를 클릭된 마커의 위치로 이동
        });

        marker.setMap(mapInstance);

        // 클릭한 위치로, 마커를 이동
        window.kakao.maps.event.addListener(mapInstance, 'click', function(mouseEvent: any) {        
          var latlng = mouseEvent.latLng; 

          marker.setMap(null); //마커 해제
          
          marker.setPosition(latlng); // 마커 위치 변경

          mapInstance.setCenter(latlng); // 지도 중심 변경 (클릭한 위치로)

          marker.setMap(mapInstance); // 마커 생성

          setIsMarkerOpen(true);
        });

        mapRef.current = mapInstance; // 지도 인스턴스를 참조할 수 있도록 변수에 할당
      })
    }
  
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

  },[]);

  function zoomIn(): void {    
    if (!mapRef.current)
      return;
    
    var level = mapRef.current.getLevel();

    console.log(level);
    
    mapRef.current.setLevel(level - 1);
  }    

  function zoomOut(): void {      
    if (!mapRef.current)
      return;
    
    var level = mapRef.current.getLevel();

    console.log(level);
    
    mapRef.current.setLevel(level + 1);

  } 

  const handleOverlayClick = (event: React.MouseEvent) => {
    // 클릭한 요소가 모달이 아니면 모달을 닫습니다.
    // 여기서 'modal-content'는 모달의 내용을 감싸는 div의 클래스명입니다.
    if ((event.target as HTMLElement).className.includes('overlay')) {
      console.log('overlay clicked');
      setIsMarkerOpen(false);
      setIsModalOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
  };
  

  return (
    <>
      <Head>
        <title>쿠석쿠석</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MarkerList 
          items={items} 
          onListItemClick={handleListItemClick} 
          totalPages={5}
          currentPage={selectedPage}
          onPageChange={handlePageChange}/>
        {selectedItem && <LocationInfo data={selectedItem} onBack={handleBack} />}
        {isModalOpen && <MapRegisterModal onBack={handleModalBack} GlobalListItemProps={{
          title: '',
          subtitle: '',
          date: '',
          isBookmarked: false
        }}/>}
        <Header />
        {isMarkerOpen && <MarkerRegisterButton onClick={handleMarkerRegister} />}
        <UserMarker />
        <div id="map" className="w-full h-screen">
            <p className="absolute top-1/2 right-0 z-20 flex flex-col rounded-lg border-2 border-black">
              <button className="w-11 h-10 bg-white rounded-t-lg flex justify-center items-center border-b-2 border-black" onClick={zoomIn}>
                <Image src="/images/zoomInBtn.png" alt="Zoom Out" width={80} height={80}/>
              </button>
              <button className="w-11 h-10 bg-white rounded-b-lg flex justify-center items-center" onClick={zoomOut}>
                <Image src="/images/zoomOutBtn.png" alt="Zoom Out" width={80} height={80} style={{transform: 'rotate(90deg)'}}/>
              </button>  
            </p>
        </div>
          </div>
        </>
  );
}