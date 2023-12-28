import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPhoto = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/search/photos/?client_id=cmD1q_IYgLdcCdRJIN_3JT3zygNP1vmP5DRb9Nct87o&query=user"
      )
      .then((response) => {
        const urlsImage = response.data.results.map(
          (result) => result.urls.small
        );
        console.log("test then", urlsImage);

        setPhotos(urlsImage);
      })
      .catch((err) => {
        console.log("Catch Error", err);
      });
  }, []);

  return (
    <>
      {photos.map((img) => {
        console.log("img", img);
        return (
          <>
            <img src={img} />
          </>
        );
      })}
    </>
  );
};

export default UserPhoto;
