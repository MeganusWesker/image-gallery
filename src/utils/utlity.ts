import axios from "axios";
export const server = "https://api.unsplash.com/search/photos";

export const fetchData = async (
 // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setImagesData:React.Dispatch<React.SetStateAction<IImageData[]>>,
  keyword:string,
  setTotal:React.Dispatch<React.SetStateAction<number>>,
  pageNo:number
): Promise<void> => {
  try {
   // setLoading(true);
    const { data } = await axios.get(`${server}?client_id=KpXlpuS3_uH98U4lxG6GuKaAr7jIRs_5-DwX7KHY_1Y&query=${keyword}&page=${pageNo}`);
 
     console.log(data)
     setImagesData(data.results);
     setTotal(data.total)
   // setLoading(false);
  
  } catch (error) {
    console.log(error);
  }
};

export interface ICardProps{
    image:string;
    id:string;
    userName:string;
    name:string;
    likedByUser:boolean;
    likes:number;
    profilePic:string;
    selectCard:Function;
    index:number;
    height:number;
}

export interface IpopUpProps{
  image:string;
  id:string;
  userName:string;
  name:string;
  likedByUser:boolean;
  likes:number;
  profilePic:string;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  instaGramUserName:string;
  twitterUserName:string;
  tags:Tag[];
  height:number;
  width:number;
}

export interface Tag {
  title: string;
  type: string;
}

export interface IImageData {
  id: string;
  urls: {
    regular: string;
    small: string;
    // Add other URL properties as needed
  };
  user: {
    instagram_username: string;
    twitter_username: string;
    username: string;
    name: string;
    profile_image: {
      small: string;
      // Add other profile image properties as needed
    };
  };
  likes: number;
  liked_by_user: boolean;
  tags: Tag[];
  height: number;
  width: number;
  // Add other properties as needed
}



