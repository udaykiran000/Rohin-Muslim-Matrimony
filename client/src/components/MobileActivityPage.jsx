import React, { useState } from 'react';

const MobileActivityPage = ({ receivedRequests, sentRequests }) => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Interest', 'Profile Visits', 'Gallery Requests', 'Connections'];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#faf8f5] flex flex-col font-outfit pb-20">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 bg-[#faf8f5]">
        <h1 className="text-[28px] font-extrabold text-[#111111] tracking-tight">Activity</h1>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar px-6 gap-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap pb-3 text-sm font-semibold transition-colors relative ${
              activeTab === tab ? 'text-[#111111]' : 'text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#111111] rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Empty State (Matches image-5) */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center mt-20">
        <h2 className="text-xl font-bold text-[#111111] mb-3">No activity yet</h2>
        <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-[260px]">
          No one's reached out yet. Keep exploring to get responses.
        </p>
      </div>
    </div>
  );
};

export default MobileActivityPage;
