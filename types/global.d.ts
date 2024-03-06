export {};

declare global {
    type GlobalListItemProps = {
      title: string;
      subtitle: string;
      date: string;
      isBookmarked: boolean;
    };
  
    // 필요한 경우 추가 타입 선언
    type LocationInfoProps = {
        GlobalListItemProps: GlobalListItemProps;
        onBack: () => void;
    };    
    
    type ListItemProps = {
        itemId: number;
        title: string;
        subtitle: string;
        date: string;
        writer: String;
        isBookmarked: boolean;
        onClick: () => void; // Add the onClick property to the ListItemProps type
      };
}