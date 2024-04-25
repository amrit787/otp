'use client';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen  gap-4 w-screen flex flex-col justify-center items-center">
      <div className=" p-4 rounded-md ring-[1px] ring-gray-300 flex gap-2 flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
