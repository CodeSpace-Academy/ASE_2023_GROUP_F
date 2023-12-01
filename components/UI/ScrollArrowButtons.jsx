import React, { useState, useEffect } from 'react';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
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
        <Fab
          color="primary"
          aria-label="Scroll to Top"
          onClick={scrollToTop}
          sx={{
            marginBottom: showScroll ? '1rem' : '0',
            backgroundColor: '#1976D2',
            '&:hover': {
              backgroundColor: '#1565C0',
              color: 'white',
            },
            border: '2px solid #1565C0',
            color: '#1565C0',
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>

      <Fab
        color="primary"
        aria-label="Scroll Down"
        onClick={scrollDown}
        sx={{
          backgroundColor: '#1976D2',
          '&:hover': {
            backgroundColor: '#1565C0',
            color: 'white',
          },
          border: '2px solid #1565C0',
          color: '#1565C0',
        }}
      >
        <KeyboardArrowDown />
      </Fab>
    </div>
  );
}

export default ScrollArrowButtons;
