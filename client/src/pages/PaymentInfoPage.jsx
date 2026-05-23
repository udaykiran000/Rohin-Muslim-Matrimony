import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaChevronLeft, FaRegCreditCard, FaFileInvoiceDollar, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa';
import api from '../services/api';

const PaymentInfoPage = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        if (user) {
          await refreshUser();
          const res = await api.get('/auth/transactions');
          if (res.data.success) {
            setTransactions(res.data.data);
          }
        }
      } catch (error) {
        console.error('Failed to load transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-crimson-200 border-t-crimson-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-50 pt-24 px-4 flex items-center justify-center">
        <div className="text-center max-w-sm">
          <p className="text-slate-600 mb-4">Please sign in to view your payment and plan info.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-crimson-950 text-white font-bold px-6 py-2.5 rounded-full hover:bg-crimson-900 transition-all text-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return <FaCheckCircle className="text-emerald-500" />;
      case 'failed': return <FaExclamationCircle className="text-red-500" />;
      case 'pending': return <FaClock className="text-amber-500" />;
      default: return null;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'failed': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-16 lg:pt-24 pb-20 px-4 md:px-8 relative overflow-hidden font-outfit">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gradient-to-b from-crimson-900/5 to-transparent rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/my-profile')} 
          className="mb-6 text-crimson-900 font-bold flex items-center gap-1.5 bg-white border border-slate-200/80 px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-all text-xs uppercase tracking-wider cursor-pointer w-max"
        >
          <FaChevronLeft className="text-[10px]" /> Back to Profile
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-crimson-950 mb-1.5">Payment & Plan Info</h1>
          <p className="text-sm text-slate-500">Manage your subscription and view your transaction history.</p>
        </div>

        {/* Current Plan Display Card */}
        <div className={`rounded-3xl p-6 md:p-8 mb-8 border relative overflow-hidden shadow-md text-white ${
          user.plan === 'elite'
            ? 'bg-gradient-to-br from-[#4f080e] via-[#3d060b] to-[#1a0204] border-gold-500/30'
            : user.plan === 'premium'
            ? 'bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 border-emerald-500/20'
            : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-slate-700/50'
        }`}>
          {/* Subtle gold decoration for Elite */}
          {user.plan === 'elite' && (
            <div className="absolute top-[-30%] right-[-15%] w-48 h-48 bg-gold-500/10 rounded-full blur-2xl"></div>
          )}

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm ${
                user.plan === 'elite'
                  ? 'bg-gold-500/10 text-gold-400 border-gold-500/20'
                  : user.plan === 'premium'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-white/10 text-slate-300 border-white/10'
              }`}>
                {user.plan || 'Free'} Account
              </span>
              <h2 className="text-3xl font-serif font-bold mt-3 text-white tracking-tight capitalize">
                {user.plan || 'Free'} Plan
              </h2>
            </div>
            <div className={`p-4 rounded-2xl flex items-center justify-center shadow-lg ${
              user.plan === 'elite'
                ? 'bg-gradient-to-br from-gold-400 to-amber-600 text-crimson-950'
                : user.plan === 'premium'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/10 text-slate-300'
            }`}>
              {user.plan === 'free' ? <FaRegCreditCard className="text-2xl" /> : <FaCrown className="text-2xl" />}
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex items-center justify-between text-xs relative z-10">
            <div className="text-slate-300">
              Status: <span className="font-bold text-white">Active</span>
            </div>
            <div className="text-slate-300">
              Verified User: <span className="font-bold text-white">{user.isManuallyVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-4 mb-4 flex items-center gap-2">
            <FaFileInvoiceDollar className="text-crimson-700 text-lg" /> Transaction History & Invoices
          </h3>

          {transactions.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <FaRegCreditCard className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600 mb-1">No Transactions Found</p>
              <p className="text-xs text-slate-400">You haven't made any payments yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-100">
                    <th className="p-4 font-bold rounded-tl-xl">Transaction ID</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Plan</th>
                    <th className="p-4 font-bold">Amount</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-xs font-mono text-slate-600">{tx.transactionId}</td>
                      <td className="p-4 text-xs text-slate-600">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="p-4 font-bold text-slate-800 capitalize">{tx.plan}</td>
                      <td className="p-4 font-bold text-slate-800">
                        ₹{tx.amount?.toLocaleString('en-IN') || 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusClass(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CTA Banner if not on Elite */}
        {user.plan !== 'elite' && (
          <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-300/30 rounded-3xl p-6 text-center space-y-4 shadow-sm">
            <div className="flex justify-center text-amber-600">
              <FaCrown className="text-3xl animate-bounce" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-amber-900 text-lg">Ready to Upgrade?</h4>
              <p className="text-xs text-amber-700 mt-1 max-w-sm mx-auto leading-relaxed">
                Take your profile to the next level with our premium plans and unlock exclusive features.
              </p>
            </div>
            <button 
              onClick={() => navigate('/plans')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md transition-all transform active:scale-95 cursor-pointer"
            >
              Explore Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInfoPage;
