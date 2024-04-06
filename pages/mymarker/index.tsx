import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import UserProfile from '@/components/main/UserProfile';
import MarkerList from '@/components/main/MarkerList';
import MapRegisterModal from '@/components/mymarker/MapRegisterModal';
import instance from '@/api/instance';
import MainPageFloatingButton from '@/components/main/MainPageFloationgButton';
import MarkerDeleteNotify from '@/components/mymarker/MarkerDeleteNotify';
import MapChangeModal from '@/components/mymarker/MapChangeModal';

declare global {
  interface Window {
    kakao: any;
    onMarkerRegisterClick: () => void;
    onMarkerChangeClick: () => void;
    onMarkerDeleteClick: () => void;
  }
}

export default function Main({ projects }: any) {
  const mapRef = useRef<any>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ListItemProps>();
  const [items, setItems] = useState([]); 
  const [longtitue, setLongtitue] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);


  const fetchData = async () => {
    try {
      const endpoint = '/spot/login-all';
      const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
      const response = await instance.get(url); 
      const data = response.data.results;
      for (let i = 0; i < data.length; i++) {
        if (data[i].isUsersOwnSpot === false) {
          data.splice(i, 1);
          i--;
        }
      }
      setItems(data);
      createMarkers(data);
    } catch (error) {
      alert('서버 오류가 발생했습니다.');
    }
  };

  const createMarkers = (spots: any) => {
    const mapInstance = mapRef.current; // 현재 지도 인스턴스 참조

    if (mapInstance) {
  
      // 새로운 데이터를 기반으로 마커를 생성합니다.
      spots.forEach((spot: ListItemProps) => {
        const markerPosition = new window.kakao.maps.LatLng(spot.latitude, spot.longtitude);
        const markerImage = new window.kakao.maps.MarkerImage(
          '/images/map-own.png', // 마커 이미지의 주소
          new window.kakao.maps.Size(35, 35), // 마커 이미지의 크기
          {offset: new window.kakao.maps.Point(11, 34)} // 마커 이미지의 옵션
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });
  
        // 생성된 마커를 지도에 표시합니다.
        marker.setMap(mapInstance);
        
        var content = document.createElement('div');
        content.className = 'flex flex-row';

        var changeButton = document.createElement('div');
        changeButton.className = 'modal-button';
        changeButton.innerHTML = '수정';
        changeButton.addEventListener('click', () => {
          setSelectedItem(spot);
          customOverlay.setMap(null);
          setIsChangeModalOpen(true);
        });

        var deleteButton = document.createElement('div');
        deleteButton.className = 'modal-button ml-5';
        deleteButton.innerHTML = '삭제';
        deleteButton.addEventListener('click', () => {
          setSelectedItem(spot);
          customOverlay.setMap(null);
          setIsDeleteModalOpen(true);
        });

        content.appendChild(changeButton);
        content.appendChild(deleteButton);

        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          content: content,
          yAnchor: 2,
          clickable: true
        });
        
        window.onMarkerChangeClick = () => {
          customOverlay.setMap(null);
          setIsChangeModalOpen(true);
        };

        window.onMarkerDeleteClick = () => {
          customOverlay.setMap(null);
          setIsDeleteModalOpen(true);
        };
  
        // 마커에 클릭 이벤트 등록 (선택 사항)
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedItem(spot);
          customOverlay.setMap(mapInstance);
        });

        window.kakao.maps.event.addListener(mapInstance, 'click', () => {
          customOverlay.setMap(null);
        });

      });
    } else{
      alert('지도가 로드되지 않았습니다.');
    }
  };

  //지도 설정
  useEffect(() => {
    if (sessionStorage.getItem('accessToken') === null) {
      router.push("/main");
    }

    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {

      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.543536094587516, 127.07741635877292),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        mapRef.current = mapInstance;

        fetchData();

        // 마커 이미지 설정
        const imageSrc = '/images/map-marker.png', // 마커 이미지의 주소
              imageSize = new window.kakao.maps.Size(35, 35), // 마커 이미지의 크기
              imageOption = {offset: new window.kakao.maps.Point(11, 34)}; // 마커 이미지의 옵션
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
          
        let marker = new window.kakao.maps.Marker({
          map: mapInstance, // 마커를 표시할 지도
          position: mapInstance.getCenter(), // 초기 마커 위치를 지도 중심으로 설정
          image: markerImage, // 마커 이미지,
          clickable: true
        });

        window.onMarkerRegisterClick = () => {
          setIsModalOpen(true);
          customOverlay.setMap(null);
        };

        // 커스텀 오버레이의 content를 설정합니다.
        var content = 
          '<div class="register-floating-button" onclick="window.onMarkerRegisterClick()">\n'+
              '<div class="flex flex-row items-center justify-center">\n'+
                '<img src="/images/register.png" alt="등록하기" width="34" height="34" />\n'+
                '<div class="text-white font-semibold">마커 만들기</div>\n'+
              '</div>\n'+
          '</div> ';

        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          content: content,
          yAnchor: 1.5,
          xAnchor: -0.3,
          clickable: true
        });

        // 지도 클릭 이벤트 리스너 등록
        window.kakao.maps.event.addListener(mapInstance, 'click', function(mouseEvent: any) {
          const latLng = mouseEvent.latLng;
          
          // 기존 마커 위치 업데이트
          marker.setPosition(latLng);
          mapInstance.setCenter(latLng);

          customOverlay.setMap(null);
        }); 
        
        window.kakao.maps.event.addListener(marker, 'click', function(mouseEvent: any) {
          mapInstance.setCenter(marker.getPosition());

          customOverlay.setPosition(marker.getPosition());
          customOverlay.setMap(mapInstance);

          setLatitude(marker.getPosition().getLat());
          setLongtitue(marker.getPosition().getLng());
        }); 

      });


    }  

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);

    return () => {
      document.head.removeChild(kakaoMapScript);
      
    };
  }, []);

   // 지도 확대
   const zoomIn = () => {
    if (!mapRef.current) return;
    let level = mapRef.current.getLevel();
    mapRef.current.setLevel(level - 1); // 지도를 확대
  };

  // 지도 축소
  const zoomOut = () => {
    if (!mapRef.current) return;
    let level = mapRef.current.getLevel();
    mapRef.current.setLevel(level + 1); // 지도를 축소
  };

  function onBack() {
    setSelectedItem(undefined);
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsChangeModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>쿠석쿠석</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        { items &&
          <MarkerList
            onListItemClick={(item: ListItemProps) => {setIsChangeModalOpen(true); setSelectedItem(item);}}
            items = {items}
          />
        }
        {isDeleteModalOpen && selectedItem && <MarkerDeleteNotify spotId={selectedItem.spotId} onBack={onBack}/>}
        {isModalOpen && <MapRegisterModal onBack={() => {window.location.reload()}} longtitue={longtitue} latitude={latitude}/>}
        <UserProfile onUserProfileClick={() => {
          router.push('/mypage');
        }} />
        <MainPageFloatingButton onButtonClick={() => {
          router.push('/main');
        }} />
        {isChangeModalOpen && selectedItem && <MapChangeModal item={selectedItem} onBack={onBack} />}
        <div id="map" className="w-full h-screen">
          <div className="zoom-controls">
            <button className="zoom-button" onClick={zoomIn}>
              <Image src="/images/plus.png" alt="Zoom In" width={24} height={24} style={{width: 'auto'}} />
            </button>
            <button className="zoom-button" onClick={zoomOut}>
              <Image src="/images/minus.png" alt="Zoom Out" width={24} height={24} />
            </button>
          </div>  
        </div>  
      </div>
    </>
  );
}
