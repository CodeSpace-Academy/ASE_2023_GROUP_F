import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
      <Link href="/">
        <div className="text-blue-500 cursor-pointer hover:underline">Go back to home</div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
