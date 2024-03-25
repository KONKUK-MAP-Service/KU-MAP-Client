import { init } from "aos";

export {};

declare global {
  
  type ListItemProps = {
    spotId: number;
    isUsersOwnSpot: boolean;
    spotName: string;
    images: string[];
    longtitude: number;
    latitude: number;
    review: string;
    createDate: string;
    onClick: () => void;
  };
    
}