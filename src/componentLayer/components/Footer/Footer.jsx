import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div class="">
    <footer class="footer button_color shadow-md">
      <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 footer_alignment">
        <div class="col-span-1 text-sm footer-text"></div>
        <div class="col-span-1 text-xs text-gray-400">  
        Developed by @Infoz IT V0.1
        
         </div>
      </div>
    </footer>
  </div>
  )
}

export default Footer