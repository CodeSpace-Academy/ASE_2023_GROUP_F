import Image from "next/image";
import { Button } from "@mui/material";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import Carousel from "../carousel/carousel";

/**
 * RecipeBanner Component
 * @param {Object} props - Component properties
 * @param {string[]} props.images - An array of image URLs for the recipe.
 * @returns {JSX.Element} RecipeBanner component
 */

function RecipeBanner({ images }) {
  // State variable to track the index of the currently displayed image
  const [currentImage, setCurrentImage] = useState(0);

  function next() {
    const isFirstImage = currentImage === images.length - 1;
    const newImage = isFirstImage ? 0 : currentImage + 1;
    setCurrentImage(newImage);
  }

  function prev() {
    const isFirstImage = currentImage === 0;
    const newImage = isFirstImage ? images.length - 1 : currentImage - 1;
    setCurrentImage(newImage);
  }

  /**
   * Sets the currently displayed image based on the provided parameter.
   * @param {number} param - The index of the image to be displayed.
   */
  function imageHandler(param) {
    setCurrentImage(param);
  }

  const areButtonsVisible = images.length > 1;

  return (
    <div className="relative">
      <div style={{ height: "40vh", overflow: "hidden", position: "relative" }}>
        <Image
          src={images[currentImage]}
          alt="recipe image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {areButtonsVisible && (
        <>
          <div className="absolute left-0 top-1/3 transform-translate-y-1/3 z-1">
            <Button startIcon={<ArrowCircleLeft />} onClick={prev}></Button>
          </div>
          <div className="absolute right-0 top-1/3 transform-translate-y-1/3 z-1">
            <Button endIcon={<ArrowCircleRight />} onClick={next}></Button>
          </div>
        </>
      )}

      <Carousel imageList={images} setFunc={imageHandler} />
    </div>
  );
}

export default RecipeBanner;
