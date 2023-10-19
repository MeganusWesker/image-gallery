import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import "./home.css";
import { IImageData, fetchData } from "../utils/utlity";
import PopUp from "../components/PopUp";

enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [total, setTotal] = useState<number>(1000);
  const [imagesData, setImagesData] = useState<IImageData[]>([]);
  const [imageData, setImageData] = useState<IImageData>();
  const [keyword, setKeyword] = useState<string>("office");
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [open, setOpen] = useState<boolean>(false);

  const toggleTheme = () => {

    setTheme((prev)=> prev===Theme.Light ? Theme.Dark :Theme.Light);
     const bodyElement = document.body;
      bodyElement.classList.toggle("dark-mode");
  };

  const dialogBoxToggler = (index: number) => {
    const selectedCard = imagesData[index];
    setImageData(selectedCard);
    setOpen(true);
  };

  const increment=async()=>{
    setPageNo((prev)=> (prev+1) % total)
  }

  const decrement=()=>{
    setPageNo((prev)=> (prev-1) % total)
  }

  // const imageHeightCalculator = (image:string):number => {
  //       const img = new Image();
  //       img.src =image;

  //       let imageHeight:number=0;

  //     img.onload = function() {
  //        imageHeight=img.height;
  //        console.log(img.height);
  //     };

  //     return imageHeight;
  // };

  console.log(imageData);

  useEffect(() => {
    // debouncing
    const timeOut = setTimeout(() => {
      if (keyword !== "") {
        (async () => {
          await fetchData(setLoading, setImagesData, keyword,setTotal,pageNo);
        })();
      }
    }, 2000); // minimum wat time will be 2 sec

    return () => {
      clearTimeout(timeOut); // cleanUp request which no longer needed on commentUnmount
    };
  }, [keyword,pageNo]);
  return (
    <>
      <Navbar
        setKeyword={setKeyword}
        keyword={keyword}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      {/* banner  */}

      <div id="banner">
        <div>
          <h1>Download High Quality Images by Creators</h1>
          <p> over 2.4 million+ stock images by our talented Community</p>
        </div>
      </div>

      {open &&  imageData !==undefined && (

          <PopUp
            image={imageData.urls.regular}
            key={imageData.id}
            instaGramUserName={imageData.user.instagram_username}
            twitterUserName={imageData.user.twitter_username}
            userName={imageData.user.username}
            name={imageData.user.name}
            id={imageData.id}
            likes={imageData.likes}
            likedByUser={imageData.liked_by_user}
            profilePic={imageData.user.profile_image.small}
            tags={imageData.tags}
            height={imageData.height}
            width={imageData.width}
            setOpen={setOpen}
            
          />
      )}

      {/* container to show images */}
      <div className="ImageContainer">
        {imagesData.length > 0 &&
          imagesData.map((item, index) => (
            <Card
              image={item.urls.small}
              key={item.id}
              userName={item.user.instagram_username}
              name={item.user.name}
              id={item.id}
              likes={item.likes}
              likedByUser={item.liked_by_user}
              profilePic={item.user.profile_image.small}
              selectCard={dialogBoxToggler}
              index={index}
              height={item.height}
            />
          ))}
      </div>

      <div className="paginationConatiner">
        <button onClick={decrement} disabled={pageNo <=1 ? true:false}>prev</button>
        <div className="centerItemsVertically" id="paginationInputDiv">
          <p>Current Page No# {pageNo}</p>
          {/* <input type="number" /> */}
        </div>
  
        <button onClick={increment}>next</button>
      </div>
    </>
  );
};

export default Home;
