import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FaChevronLeft, FaPaperPlane, FaEllipsisV } from 'react-icons/fa';

const MobileChatRoom = () => {
  const { id } = useParams(); // Chat partner ID
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([
    // Mock messages for UI layout
    { sender: 'other', content: 'Assalamualaikum, this is a message from admin to check the chat layout.' },
    { sender: user?._id, content: 'Walaikum As-salam! The layout looks great.' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add locally for UI
    setMessages([...messages, { sender: user?._id, content: newMessage }]);
    setNewMessage('');
    toast.success('Message sent! (Mock)');
  };

  return (
    <div className="flex flex-col h-screen bg-[#faf8f5] font-outfit">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-800">
            <FaChevronLeft className="text-lg" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e61a52] flex items-center justify-center text-white">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#111111]">Admin</span>
              <span className="text-[11px] font-medium text-slate-500">Online</span>
            </div>
          </div>
        </div>
        
        <button className="p-2 text-slate-600">
          <FaEllipsisV />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center text-[10px] font-bold text-slate-400 my-4 uppercase tracking-wider">
          Today
        </div>
        
        {messages.map((msg, idx) => {
          const isMine = msg.sender === user?._id;
          return (
            <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                  isMine 
                    ? 'bg-[#5c7cfa] text-white rounded-[20px] rounded-br-sm' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-[20px] rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 z-10 pb-6">
        <form onSubmit={handleSend} className="flex items-center gap-3 relative">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-slate-100/80 rounded-full py-3.5 pl-5 pr-12 text-[14px] font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="absolute right-2 w-10 h-10 bg-[#5c7cfa] rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105"
          >
            <FaPaperPlane className="ml-[-2px] text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileChatRoom;
