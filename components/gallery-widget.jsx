'use client';

import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from 'lucide-react';

function GalleryWidget() {
  const fileInputRef = useRef(null);
    const [galleryImages, setGalleryImages] = useState([
      "/gallery-img.jpg",
      "/gallery-img.jpg",
      "/gallery-img.jpg",
      "/gallery-img.jpg",
    ]);
  
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageURL = URL.createObjectURL(file);
      newImages.push(imageURL);
    }

    // Update gallery
    setGalleryImages((prev) => [...prev, ...newImages]);
  };
  return (
      <div className="bg-[#2F343B] rounded-3xl shadow-2xl p-6 border border-[#3C4147] overflow-hidden">
               {/* Header */}
               <div className="flex items-center justify-between mb-6 gap-4">
                 <div className="flex items-center gap-4">
                   <HelpCircle className="w-6 h-6 text-gray-400" />
                   <button className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium shadow-[inset_2px_2px_6px_#1A1D22,inset_-2px_-2px_6px_#3A3F46]">
                     Gallery
                   </button>
                 </div>
   
                 <div className="flex items-center gap-4 ">
                   {/* Hidden Input */}
                   <input
                     type="file"
                     accept="image/*"
                     multiple
                     ref={fileInputRef}
                     onChange={handleImageUpload}
                     className="hidden"
                   />
   
                   {/* ADD IMAGE BUTTON */}
                   <button
                     onClick={() => fileInputRef.current?.click()}
                     className="px-6 py-3 rounded-full bg-[#2E3339] text-gray-200 flex items-center gap-2 shadow-[inset_2px_2px_6px_#262A2F,inset_-2px_-2px_6px_#3A3F46] hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-105 cursor-pointer"
                   >
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-4 w-4"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                       strokeWidth="3"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         d="M12 4v16m-8-8h16"
                       />
                     </svg>
                     Add Image
                   </button>
   
                   {/* Navigation Buttons */}
                   <div className="flex gap-2">
                     <button className="swiper-button-prev-custom w-10 h-10 bg-gray-900 cursor-pointer hover:bg-[#3A3F46] rounded-full flex items-center justify-center shadow-[inset_2px_2px_6px_#262A2F,inset_-2px_-2px_6px_#3A3F46] hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all">
                       <ChevronLeft className="w-5 h-5 text-gray-200" />
                     </button>
                     <button className="swiper-button-next-custom w-10 h-10 bg-gray-900 cursor-pointer hover:bg-[#3A3F46] rounded-full flex items-center justify-center shadow-[inset_2px_2px_6px_#262A2F,inset_-2px_-2px_6px_#3A3F46] hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all">
                       <ChevronRight className="w-5 h-5 text-gray-200" />
                     </button>
                   </div>
                 </div>
               </div>
   
               {/* Swiper Wrapper */}
               <div className="overflow-visible">
                 <div className="px-5 py-4">
                   {/* Swiper Carousel */}
                   <Swiper
                     modules={[Navigation]}
                     navigation={{
                       nextEl: ".swiper-button-next-custom",
                       prevEl: ".swiper-button-prev-custom",
                     }}
                     spaceBetween={25}
                     slidesPerView={3}
                     loop={true}
                     className="overflow-visible!"
                     breakpoints={{
                       320: { slidesPerView: 1 },
                       640: { slidesPerView: 2 },
                       1024: { slidesPerView: 3 },
                     }}
                   >
                     {galleryImages.map((img, idx) => (
                       <SwiperSlide key={idx} className="overflow-visible!">
                         <div
                           className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer
                   transform-gpu transition-all duration-1000
                   ease-in-out hover:scale-[1.15] hover:z-50
                   hover:shadow-[0_8px_25px_rgba(0,0,0,0.45)]
                 "
                         >
                           <Image
                             src={img}
                             alt={`Gallery ${idx + 1}`}
                             height={400}
                             width={400}
                             loading='eager'
                             className={`
                     w-full h-full object-cover transition-all duration-1000
                     ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu
                     grayscale brightness-75
                     group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.12]
                   `}
                           />
   
                           {/* subtle overlay fade on hover */}
                           <div
                             className="
                     absolute inset-0 bg-linear-to-t from-black/30 to-transparent
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700
                   "
                           />
                         </div>
                       </SwiperSlide>
                     ))}
                   </Swiper>
                 </div>
               </div>
             </div>
  )
}

export default GalleryWidget