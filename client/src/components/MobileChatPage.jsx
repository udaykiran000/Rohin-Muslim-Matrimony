import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MobileChatPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const tabs = ['All', 'Unread', 'Requests', 'Recent Activity'];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#faf8f5] flex flex-col font-outfit pb-20">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 bg-[#faf8f5] sticky top-0 z-10">
        <h1 className="text-[28px] font-extrabold text-[#111111] tracking-tight">Chat</h1>
      </div>

      {/* Pills Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar px-6 gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
              activeTab === tab 
                ? 'bg-[#2a2a2a] text-white border-[#2a2a2a] shadow-md' 
                : 'bg-transparent text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 px-4">
        {/* Mock Conversation 1 (Admin) */}
        <div 
          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer"
          onClick={() => navigate('/chat/admin')}
        >
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-[#e61a52] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="12" r="5" />
              <circle cx="16" cy="12" r="5" />
            </svg>
          </div>
          
          {/* Message Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[15px] font-bold text-[#111111] truncate">Admin</h3>
              <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap ml-2">Today, 2:32 PM</span>
            </div>
            <p className="text-[13px] font-medium text-slate-500 truncate">
              Assalamualaikum, this is a...
            </p>
          </div>
          
          {/* Unread / Pin Indicator */}
          <div className="w-2 h-2 rounded-full bg-[#e61a52] flex-shrink-0 mt-[-20px]"></div>
        </div>

      </div>
    </div>
  );
};

export default MobileChatPage;
