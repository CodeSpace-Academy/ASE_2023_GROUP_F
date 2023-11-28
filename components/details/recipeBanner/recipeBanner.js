import Image from 'next/image'
import { Button } from '@mui/material'
import { ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'
import Carousel from '../carousel/carousel'

/**
 * RecipeBanner Component
 * @param {Object} props - Component properties
 * @param {string[]} props.images - An array of image URLs for the recipe.
 * @returns {JSX.Element} RecipeBanner component
 */

function RecipeBanner({ images }) {

  // State variable to track the index of the currently displayed image
  const [currentImage, setCurrentImage] = useState(0)

  function next() {
    const isFirstImage = currentImage === images.length - 1
    const newImage = isFirstImage ? 0 : currentImage + 1
    setCurrentImage(newImage)
  }

  function prev() {
    const isFirstImage = currentImage === 0
    const newImage = isFirstImage ? images.length - 1 : currentImage - 1
    setCurrentImage(newImage)
  }

  /**
   * Sets the currently displayed image based on the provided parameter.
   * @param {number} param - The index of the image to be displayed.
   */
  function imageHandler(param) {
    setCurrentImage(param)
  }

  const areButtonsVisible = images.length > 1

  return (
    <div className="relative flex flex-row">
      <Carousel imageList={images} setFunc={imageHandler} />
      <div>
        <Image
          src={images[currentImage]}
          alt="recipe image"
          width={650}
          height={650}
        />
        <div className="absolute top-0 right-0">
          <Link href="/recipes/instructions">
            <Button variant="contained" color="secondary" size="small">
              Start Cooking
            </Button>
          </Link>
        </div>
        {areButtonsVisible && (
          <>
            <div className="absolute top-32">
              <Button startIcon={<ArrowCircleLeft />} onClick={prev}></Button>
            </div>
            <div className="absolute top-32 right-0">
              <Button endIcon={<ArrowCircleRight />} onClick={next}></Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RecipeBanner
