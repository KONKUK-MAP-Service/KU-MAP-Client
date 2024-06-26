import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import UserProfile from '@/components/main/UserProfile';
import MarkerList from '@/components/main/MarkerList';
import MyMarkerFloatingButton from '@/components/main/MyMarkerFloatingButton';
import LocationInfo from '@/components/main/LocationInfo';
import LoginModal from '@/components/login/loginModal';
import instance from '@/api/instance';
import HideButton from '@/components/common/hideButton';


declare global {
  interface Window {
    kakao: any;
  }
}

export default function Main({ projects }: any) {
  const mapRef = useRef<any>(null);
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<ListItemProps>();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [items, setItems] = useState([]); 
  const [hide, setHide] = useState(false);

  const fetchData = async () => {
    try {
      const endpoint = sessionStorage.getItem('accessToken') ? '/spot/login-all' : '/spot/all';
      const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
      const response = await instance.get(url); 
      const data = response.data.results;
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
        const markerColor = spot.isUsersOwnSpot ? '/images/map-own.png' : '/images/map-other.png';

        const markerPosition = new window.kakao.maps.LatLng(spot.latitude, spot.longtitude);
        const markerImage = new window.kakao.maps.MarkerImage(
          markerColor, 
          new window.kakao.maps.Size(35, 35), // 마커 이미지의 크기
          {offset: new window.kakao.maps.Point(11, 34)} // 마커 이미지의 옵션
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });
  
        // 생성된 마커를 지도에 표시합니다.
        marker.setMap(mapInstance);
  
        // 마커에 클릭 이벤트 등록 (선택 사항)
        window.kakao.maps.event.addListener(marker, 'click', () => {
          setSelectedItem(spot);
        });
      });
    } else{
      alert('지도가 로드되지 않았습니다.');
    }
  };

  //지도 설정
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    setIsLogin(!!accessToken);
    setIsLoginModalOpen(!accessToken);

    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_API_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {

      window.kakao.maps.load(async () => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.543536094587516, 127.07741635877292),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        mapRef.current = mapInstance;

        fetchData();

        // 지도 클릭 이벤트 리스너 등록
        window.kakao.maps.event.addListener(mapInstance, 'click', function(mouseEvent: any) {
          const latLng = mouseEvent.latLng;
          mapInstance.setCenter(latLng);
        });
      });

    }  

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

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

  function handleSelectedItem(item: ListItemProps) {
    setSelectedItem(item);
    if (!mapRef.current) return;
    const mapInstance = mapRef.current;
    const markerPosition = new window.kakao.maps.LatLng(item.latitude, item.longtitude);
    mapInstance.setCenter(markerPosition);
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
        {isLoginModalOpen && <LoginModal onBack={() => setIsLoginModalOpen(false)} />}
        {
          !hide &&
          <MarkerList
            onListItemClick={(item) => handleSelectedItem(item)}
            items={items}
          />
        } 
        <HideButton onClick={() => setHide(!hide)} active={hide}/>
        {selectedItem && <LocationInfo 
        isHide={hide}
        data={selectedItem} 
        onBack={() => setSelectedItem(undefined)} />}
        <UserProfile onUserProfileClick={() => {
          if (!isLogin) {
            setIsLoginModalOpen(true);
          } else {
            router.push('/mypage');
          }
        }} />
        <MyMarkerFloatingButton onButtonClick={() => {
          if (!isLogin) {
            setIsLoginModalOpen(true);
          } else {
            router.push('/mymarker');
          }
        }} />
        <div id="map" className="w-full h-screen">
          <div className="zoom-controls">
            <button className="zoom-button" onClick={zoomIn}>
              <Image src="/images/plus.png" alt="Zoom In" width={24} height={24} />
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
