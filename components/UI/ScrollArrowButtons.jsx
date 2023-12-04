import React, { useState, useEffect } from 'react';
import { useScrollTrigger, Zoom } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

/**
 * ScrollArrowButtons component provides buttons to scroll to top and bottom of the page.
 * It uses Material-UI icons for better user experience.
 * @component
 */
function ScrollArrowButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  /**
   * Scrolls to the top of the page smoothly.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Scrolls down to the bottom of the page smoothly.
   */
  const scrollDown = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    window.scrollTo({
      top: documentHeight - windowHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col">
      <Zoom in={useScrollTrigger({ threshold: 400 })}>
        <button
        type='button'
          className={`bg-gray-400 text-white hover:bg-gray-600  p-2 rounded-md transition duration-300 ${
            showScroll ? 'mb-4' : 'mb-0'
          } bg-opacity-80 text-opacity-80`}
          onClick={scrollToTop}
          aria-label='scroll-up'
        >
          <KeyboardArrowUp />
        </button>
      </Zoom>
  
      <button
      type='button'
        className="bg-gray-400 text-white hover:bg-gray-600 p-2 rounded-md transition duration-300 mt-2 bg-opacity-80 text-opacity-80"
        onClick={scrollDown}
        aria-label='scroll-down'
      >
        <KeyboardArrowDown />
      </button>
    </div>
  );
  
}

export default ScrollArrowButtons;
