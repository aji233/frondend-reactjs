import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DefaultUi = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <section id='nav' className='bg-blue-400 flex justify-between p-4'>
        <div className='text-white'>Test Emkay</div>
        <div className='text-white'>Admin</div>
      </section>

      <main className="flex-1 bg-gray-200">
        {children}
      </main>

      <footer className="bg-white dark:bg-blue-400">
        <div className="w-full p-4 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Test Emkai</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultUi;
