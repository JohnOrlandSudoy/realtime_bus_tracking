import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-400 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} BusTracker Admin Dashboard</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-busPink transition-colors duration-200">Help</a>
            <a href="#" className="text-sm hover:text-busYellow transition-colors duration-200">Documentation</a>
            <a href="#" className="text-sm hover:text-busPink transition-colors duration-200">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;