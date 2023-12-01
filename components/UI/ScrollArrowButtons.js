import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'react-feather';

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
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    window.scrollTo({
      top: documentHeight - windowHeight,
      behavior: 'smooth',
    });
  };


  const scrollButtonText = showScroll ? 'Scroll to up' : 'Scroll Down';

  return (
<div className="relative">
  <div className="fixed right-4 bottom-4 z-50 flex flex-col">
    {showScroll && (
      <button
        className="bg-black bg-opacity-25 hover:bg-opacity-50 text-gray-700 font-bold py-2 px-4 mb-4 flex items-center rounded transition duration-300"
        onClick={scrollToTop}
      >
        <ArrowUp size={20} className="mr-2" style={{ color: 'black', opacity: 0.7 }} /> 
      </button>
    )}
    <button
      className="bg-black bg-opacity-25 hover:bg-opacity-50 text-gray-700 font-bold py-2 px-4 rounded flex items-center transition duration-300"
      onClick={scrollDown}
    >
      <ArrowDown size={20} className="mr-2" style={{ color: 'black', opacity: 0.7 }} /> 
    </button>
  </div>

</div>

  );
};

export default ScrollArrowButtons; 