'use client';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';


export default function Home() {
  const [activeTab, setActiveTab] = useState('about');
  const [galleryImages, setGalleryImages] = useState([
    "/gallery-img.png",
    "/gallery-img.png",
    "/gallery-img.png",
    "/gallery-img.png",
  ]);
  const fileInputRef = useRef(null);


  const aboutContent = {
    title: "About Me",
    text: "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a..."
  };



  const tabContent = {
    about: aboutContent,
    experiences: aboutContent,
    recommended: aboutContent
  };

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
    <div className="min-h-screen bg-linear-to-br from-[#373E44] to-[#191B1F] p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl flex gap-8">
        {/* Left Panel - Instructions */}
        <div className="w-1/2 bg-[#616161] bg-opacity-50 border border-[#96BEE7] backdrop-blur-sm rounded-3xl p-8 shadow-2xl">

        </div>

        {/* Right Panel - Widgets */}
        <div className="w-1/2 space-y-6">
          {/* About Me Widget */}
          <div className="bg-[#363C43] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-2">
              <HelpCircle className="w-6 h-6 text-gray-500 ml-4" />
              <div className="flex bg-gray-900 rounded-full p-1">
                {[
                  { link: "about", text: "About Me" },
                  { link: "experiences", text: "Experiences" },
                  { link: "recommended", text: "Recommended" }
                ].map((tab) => {
                  const isActive = activeTab === tab.link;
                  return (
                    <button
                      key={tab.text}
                      onClick={() => setActiveTab(tab.link)}
                      className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-gray-700 rounded-full shadow-lg"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.text}</span>
                    </button>
                  );
                })}
              </div>
              <div className="w-6"></div>
            </div>

            <div className="px-8 py-6">
              <div className="h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-4">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {tabContent[activeTab].text}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Widget */}
          <div className="bg-[#363C43] rounded-3xl shadow-2xl p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-6 h-6 text-gray-400" />
                <button className="px-8 py-3 bg-gray-900 text-white rounded-full text-sm font-medium shadow-md">
                  Gallery
                </button>
              </div>

              <div className="flex items-center gap-4">
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
                  className='soft-button text-white text-xs font-bold uppercase py-4 px-12 rounded-full tracking-wider flex items-center'
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
                  <button className="swiper-button-prev-custom w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all shadow-md">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button className="swiper-button-next-custom w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all shadow-md">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              spaceBetween={20}
              slidesPerView={3}
              loop={true}
              className="rounded-2xl"
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {galleryImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="aspect-square rounded-2xl overflow-hidden group relative cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <Image
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      height={300}
                      width={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}