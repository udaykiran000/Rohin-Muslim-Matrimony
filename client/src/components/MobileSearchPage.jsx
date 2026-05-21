import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaSearch, FaCrown, FaHeart } from 'react-icons/fa';

const MobileSearchPage = ({ filters, onFilterChange, onApplyFilters }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-24 font-outfit">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 bg-[#faf8f5] sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="text-slate-800 p-1">
          <FaChevronLeft className="text-xl" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 tracking-wide">Search Profiles</h1>
      </div>

      <div className="px-5 mt-2">
        <h2 className="text-[15px] font-bold text-slate-800 mb-5">Basic Details</h2>

        {/* Age Range Slider (Visual representation) */}
        <div className="bg-transparent border border-slate-200/60 rounded-3xl p-5 mb-4 shadow-sm">
          <label className="text-sm font-semibold text-slate-600 block mb-3">Age</label>
          <div className="flex justify-between text-[13px] font-bold text-slate-800 mb-4">
            <span>Min {filters.ageMin || 18} yrs</span>
            <span>Max {filters.ageMax || 28} yrs</span>
          </div>
          {/* Fake Visual Slider for design match */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full my-4">
            <div className="absolute left-[10%] right-[30%] h-1 bg-[#e61a52] rounded-full"></div>
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#faf8f5] border-2 border-[#e61a52] rounded-full"></div>
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#faf8f5] border-2 border-[#e61a52] rounded-full"></div>
          </div>
        </div>

        {/* Height Range Slider */}
        <div className="bg-transparent border border-slate-200/60 rounded-3xl p-5 mb-4 shadow-sm">
          <label className="text-sm font-semibold text-slate-600 block mb-3">Height</label>
          <div className="flex justify-between text-[13px] font-bold text-slate-800 mb-4">
            <span>Min Below 4ft 6in</span>
            <span>Max Above 6ft 2in</span>
          </div>
          {/* Fake Visual Slider for design match */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full my-4">
            <div className="absolute left-[5%] right-[5%] h-1 bg-[#e61a52] rounded-full"></div>
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#faf8f5] border-2 border-[#e61a52] rounded-full"></div>
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#faf8f5] border-2 border-[#e61a52] rounded-full"></div>
          </div>
        </div>

        {/* Marital Status Selector */}
        <div className="bg-transparent border border-slate-200/60 rounded-3xl p-4 mb-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <FaHeart className="text-sm" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">Marital Status</p>
              <select 
                name="maritalStatus"
                value={filters.maritalStatus}
                onChange={onFilterChange}
                className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none appearance-none w-32"
              >
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
          <div className="text-slate-400 text-sm font-bold px-2">v</div>
        </div>

        {/* Mother Tongue Selector (Premium) */}
        <div className="bg-transparent border border-slate-200/60 rounded-3xl p-4 mb-8 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-serif font-bold text-xs">
              A
            </div>
            <p className="text-sm font-bold text-slate-600">Mother Tongue</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#f3d79b] flex items-center justify-center text-[#c28b1e]">
            <FaCrown className="text-[10px]" />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#faf8f5] border-t border-slate-100 z-30 pb-20">
        <button 
          onClick={onApplyFilters}
          className="w-full bg-[#e61a52] text-white font-bold py-4 rounded-[30px] flex items-center justify-center gap-2 text-base shadow-lg shadow-red-500/20"
        >
          <FaSearch className="text-sm" /> Search Profiles
        </button>
      </div>
    </div>
  );
};

export default MobileSearchPage;
