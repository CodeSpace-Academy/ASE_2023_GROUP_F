import { useState } from 'react';
import Link from 'next/link';
import LogoIcon from '../icons/LogoIcon';
import HomeIcon from '../icons/HomeIcon';
import FavoriteIcon from '../icons/FavoriteIcon';
import ContactIcon from '../icons/ContactIcon';

/**
 * NavBar Component
 *
 * The NavBar component represents the navigation bar of the application. It includes
 * a logo, navigation links, and a responsive mobile menu.
 */

function NavBar() {
  const [isClick, setIsClick] = useState(false);

  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  return (
    <nav className="sticky p-4 top-0 z-20 bg-slate-800 rounded-md shadow-xl ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-4xl font-bold ">
              <LogoIcon fill="#cbd5e1" width="70" height="70" />
              <span className="ml-2 text-lg text-slate-300 md:text-4xl hover:text-slate-700">𝔉𝔬𝔬𝔡𝔦𝔢'𝔰 𝔇𝔢𝔩𝔦𝔤𝔥𝔱</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-slate-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleNavbar}
            >
              {isClick ? (
                <svg
                  className="w-6 h-6 black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#cbd5e1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Navigation on the right for larger screens */}
          <div className="items-center hidden space-x-6 md:flex">
            <Link href="/" className="p-2 text-slate-300 rounded-lg hover:bg-slate-700 ">
             <HomeIcon />
              <span className='font-light'>Home</span>
            </Link>
            <Link href="/contact" className="p-2  text-slate-300 rounded-lg hover:bg-slate-700 ">
             <div className='ml-2'>
             <ContactIcon />
             </div>

              <span className='font-light'>Contact</span>
            </Link>
            <Link href="/recipes/favorites" className="p-2 text-slate-300 rounded-lg hover:bg-slate-700 ">
            <div className='ml-3'>
             <FavoriteIcon/>
             </div>
              <span className='font-light'>Favorites</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isClick && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-slate-700 border border-gray-300 rounded-md shadow-lg">
            <div className="py-1">
              <Link
                href="/"
                className="flex items-center p-2 text-black rounded-lg hover:bg-slate-600 "
                onClick={() => setIsClick(false)}
              >
                <HomeIcon/>
                <span>Home</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center p-2 text-black rounded-lg hover:bg-slate-600 "
                onClick={() => setIsClick(false)}
              >
                <ContactIcon/>
                <span>Contact</span>
              </Link>
              <Link
                href="/recipes/favorites"
                className="flex items-center p-2 text-black rounded-lg hover:bg-slate-600 "
                onClick={() => setIsClick(false)}
              >
                <FavoriteIcon/>
                <span>Favorites</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
