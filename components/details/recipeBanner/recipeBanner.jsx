import Image from "next/image";
import { Button } from "@mui/material";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
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

  const areButtonsVisible = images?.length > 1;

  return (
    <div className="relative flex flex-row space-x-0 ">
      <Carousel 
      imageList={images} setFunc={imageHandler} />
      <div className="relative flex flex-row container max-h-3xl max-w-lg m-auto bg-gray-200">
        <div >
        <div className="container p-10">
        <Image
          layout="responsive"
          src={images?.[currentImage]}
          alt={`Recipe image ${currentImage + 1}`}
          width={500}
          height={500}
        />
        </div>
        {areButtonsVisible && (
          <>
            <div className="absolute top-32">
              <Button startIcon={<ArrowCircleLeft />} onClick={prev}/>
            </div>
            <div className="absolute top-32 right-0">
              <Button endIcon={<ArrowCircleRight />} onClick={next}/>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}

export default RecipeBanner;
