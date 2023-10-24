import Link from 'next/link';

function NavBar() {

  return (
    <div className="font-serif grid md:grid-cols-3 bg-gray-200 shadow-xl rounded-md">
      <div className="md:col-span-1 md:flex md:justify-end">
        <nav className="text-right">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-4xl uppercase p-4 border-b border-gray-100">
              <Link href="/" className="hover:text-red-700 text-black-500 sm:text-black-500 lg:text-black-500">
                Recipe App
              </Link>
            </h1>
            <div className="px-4 cursor-pointer md:hidden" id="burger">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </div>
          </div>

          <div>
          <ul className="text-sm mt-6 hidden md:block" id="menu">
                        <li className="py-1 text-gray-700 font-bold">
                            <Link href="/" className="px-4 flex justify-end border-r-4 border-primary">
                                <span>Home</span>
                                <svg className="w-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                            </Link>
                        </li>
                        <li className="py-1">
                            <Link href="#" className="px-4 flex justify-end border-r-4 border-white">
                                <span>Blog</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </Link>
                        </li>
                        <li className="py-1">
                            <Link href="#" className="px-4 flex justify-end border-r-4 border-white">
                                <span>Contact</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                            </Link>
                        </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
