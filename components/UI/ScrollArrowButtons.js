import { useState, useEffect } from 'react';

const ScrollArrowButtons = () => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const scrollButtonText = showScroll ? 'Scroll down' : 'Scroll Down';

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col">
      {showScroll && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={scrollDown}
      >
        {scrollButtonText}
      </button>
    </div>
  );
};

export default ScrollArrowButtons;
