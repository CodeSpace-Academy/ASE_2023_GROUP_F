import { Button } from "@mui/material";
import Image from "next/image";

function Carousel({ imageList, setFunc }) {
  return (
    <div className="mr-5 bg-gray-200 p-5 flex flex-col justify-between overflow-y-auto max-h-96">
      {imageList.map((image, index) => (
        <Button onClick={() => setFunc(index)} key={image}>
          <Image
            src={image}
            alt="recipe image"
            width={200}
            height={200}
            className="mb-4"
          />
        </Button>
      ))}
    </div>
  );
}

export default Carousel;
