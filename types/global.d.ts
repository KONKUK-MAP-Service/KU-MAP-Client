import { init } from "aos";
import { StringLiteral } from "typescript";

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

  type MyPageListItemProps = {
    spotId: number;
    spotName: string;
    spotImageurl: string;
    review: string;
    createDate: string;
    author: string;
    bookmark: boolean;
    like: boolean;
    totalElements: number;
    page: number;
    size: number;
    totalPages: number;
  };

  type MyPageCommentProps = {
    commentId: number;
    spotId: number;
    spotName: string;
    spotImageurl: string;
    usersComment: string;
    CommentcreateDate: string;
    totalElements: number;
    page: number;
    size: number;
    totalPages: number;
  };

  type commonProps = {
    spotId: number;
    initialState: boolean;
  };

  type commentProps = {
    commentId: number;
    profileImage: string;
    content: string;
    author: string;
    deletable: boolean;
    createdDate: string;
  };
    
}