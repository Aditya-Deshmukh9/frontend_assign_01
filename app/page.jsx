'use client';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import GalleryWidget from '../components/gallery-widget';



export default function Home() {
  const [activeTab, setActiveTab] = useState('about');



  const aboutContent = {
    title: "About Me",
    text: "Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.\n\nI was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a..."
  };



  const tabContent = {
    about: aboutContent,
    experiences: aboutContent,
    recommended: aboutContent
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
              <div className="w-full mx-10 flex justify-center items-center bg-gray-900 rounded-2xl p-1">
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
                      className={`relative px-8 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${isActive
                        ? "text-white shadow-[0_8px_25px_rgba(0,0,0,0.45)] shadow-black"
                        : "text-gray-400 hover:text-gray-200"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-[#22262B] rounded-2xl shadow-lg"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.text}</span>
                    </button>
                  );
                })}
              </div>
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
          <GalleryWidget/>
        </div>
      </div>
    </div>
  );
}