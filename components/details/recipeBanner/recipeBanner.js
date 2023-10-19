import Image from "next/image";
import { Button } from "@mui/material";
import {ArrowCircleLeft, ArrowCircleRight} from '@mui/icons-material';
import Link from "next/link";
import { useState } from "react";
import Carousel from "../carousel/carousel";

function RecipeBanner({images, prepTime, cookTime, servingAmount}){
  const [currentImage, setCurrentImage] = useState(0);

  function next(){
    const isFirstImage = currentImage === images.length - 1
    const newImage = isFirstImage ? 0 : currentImage + 1
    setCurrentImage(newImage)
  }

  function prev(){
    const isFirstImage = currentImage === 0
    const newImage = isFirstImage ? images.length - 1 : currentImage - 1
    setCurrentImage(newImage)
  }

  function imageHandler(param){
    setCurrentImage(param)
  }

  return(
    <div className="relative flex flex-row">
      <Carousel imageList={images} setFunc={imageHandler}/>
      <div>  
        <Image src={images[currentImage]} alt="recipe image" width={650} height={650}/>
        <div className="absolute top-0 right-0">
          <Link href='recipes/cookingMode'>
            <Button variant='contained' color="secondary" size='small'>
              Start Cooking
            </Button>
          </Link>
        </div>
        <div className="absolute top-32">
          <Button startIcon={<ArrowCircleLeft/>} onClick={prev}>
          </Button>
        </div>
        <div className="absolute top-32 right-0">
          <Button endIcon={<ArrowCircleRight/>} onClick={next}>
          </Button>
        </div>
        <div className="flex flex-row bottom-0 absolute">
          <div className="bg-white p-9 text-center ">
            Cook time <br/>{cookTime} mins
          </div>
          <div className="left-32 bg-white p-9 text-center border-l border-dashed">
            Preparation time <br/>{prepTime} mins
          </div>
          <div className="left-64 bg-white p-9 text-center border-l border-dashed">
            Serves <br/>{servingAmount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeBanner;