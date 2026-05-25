import React from 'react';

const SimpleSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 min-h-screen w-full bg-[#170204] flex items-center justify-center z-[9999]">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SimpleSpinner;
