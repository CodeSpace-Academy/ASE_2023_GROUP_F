import { Button } from '@mui/material';
import Image from 'next/image';

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
    <div className="flex flex-row justify-between pt-2 overflow-y-auto max-48 md:border-current md:border-solid md:border-2">
    {imageList.map((image, index) => (
      <Button onClick={() => setFunc(index)} key={image}>
        <div className="w-40 h-20 p-2 m-6" style={{ paddingRight: '6px' }}>
          <Image src={image} alt="recipe image" layout="fill" objectFit="cover" />
        </div>
      </Button>
    ))}
  </div>

  );
}

export default Carousel;
