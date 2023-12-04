import { Button } from "@mui/material"
import Image from "next/image"

/**
 * Carousel Component
 *
 * This component represents a simple image carousel with navigation buttons.
 * It takes an array of image URLs and a function to update the selected image index.
 * Clicking on a button in the carousel triggers the setFunc function to update the selected image.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} props.imageList - An array of URLs representing the images in the carousel.
 * @param {Function} props.setFunc - A function to update the selected image index.
 * @returns {JSX.Element} - The rendered Carousel component.
 *
 * */

function Carousel({ imageList, setFunc }) {
  return (
    <div className="hidden md:flex md:flex-col md:justify-between md:overflow-y-auto md:max-h-96 md:transition-opacity md:ease-in-out md:duration-300">
      {imageList.map((image, index) => (
        <Button onClick={() => setFunc(index)} key={image}>
          <Image src={image} alt="recipe image" width={200} height={200} className="mb-4" />
        </Button>
      ))}
    </div>
  );
}

export default Carousel;