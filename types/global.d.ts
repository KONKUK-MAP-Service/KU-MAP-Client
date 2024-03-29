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
    author: string;
    bookmark: boolean;
    like: boolean;
    onClick: () => void;
  };

  type commonProps = {
    spotId: number;
    initialState: boolean;
  };
    
}