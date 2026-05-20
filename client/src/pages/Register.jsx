import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  FaEnvelope, FaLock, FaUser, FaCity, FaCalendarAlt, FaVenusMars, FaEye, FaEyeSlash
} from 'react-icons/fa';
import logo3 from '../assets/logo3.png';
import islamicBg from '../assets/islamic_bg_login.png';

const Register = () => {
  const { register, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Form States (6 essential registration fields + default matching values)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: 'male',
    age: 25,
    city: '',
    // Preset defaults for backend
    profileCreatedBy: 'Self',
    maritalStatus: 'Never Married',
    height: "5'6\"",
    motherTongue: 'Urdu',
    sect: 'Sunni',
    namazFrequency: 'Always Praying',
    waliContact: '',
    fatherOccupation: '',
    motherOccupation: '',
    siblingsCount: 0,
    profession: '',
    education: '',
    about: '',
    partnerAgeRange: '20-30',
    partnerSect: 'No Preference',
    partnerEducation: "Doesn't Matter"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    
    const res = await register(formData);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-[90vh] flex items-center justify-center px-3 sm:px-4 py-2 sm:py-12 relative bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(20, 1, 3, 0.4), rgba(20, 1, 3, 0.55)), url(${islamicBg})`,
        backgroundAttachment: 'scroll' 
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gold-600/10 rounded-full blur-[120px]"></div>

      {/* Register Glass Card */}
      <div className="w-full max-w-md bg-[#180205]/18 backdrop-blur-[4px] rounded-2xl sm:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.85)] border border-gold-500/30 pt-3 pb-2.5 px-4 sm:p-7 relative z-10">
        
        {/* Top Sleek Header Box (No Logo, Compact) */}
        <div className="bg-[#4a040b]/40 rounded-xl px-4 py-1 border border-gold-500/15 text-center mb-2.5 relative">
          <h2 className="text-white text-sm sm:text-base md:text-lg font-serif font-extrabold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Create Free Account</h2>
          <p className="text-[#ffd666] text-[7.5px] sm:text-[9px] font-bold tracking-widest uppercase mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">10-Second Fast Registration</p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/65 text-red-200 text-xs font-semibold p-1.5 rounded-xl border border-red-500/30 mb-2.5 animate-fadeIn">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Single-Step Form */}
        <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-3.5 text-left">
          
          {/* Full Name */}
          <div className="space-y-0.5">
            <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaUser className="text-xs sm:text-sm" /></span>
              <input 
                type="text" 
                required 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="e.g. Shaik Habib" 
                className="w-full pl-8 pr-4 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold" 
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-0.5">
            <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaEnvelope className="text-xs sm:text-sm" /></span>
              <input 
                type="email" 
                required 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@domain.com" 
                className="w-full pl-8 pr-4 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold" 
              />
            </div>
          </div>

          {/* Password with visibility toggle */}
          <div className="space-y-0.5">
            <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaLock className="text-xs sm:text-sm" /></span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                minLength={6} 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Minimum 6 characters" 
                className="w-full pl-8 pr-10 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="text-xs sm:text-sm" /> : <FaEye className="text-xs sm:text-sm" />}
              </button>
            </div>
          </div>

          {/* Gender and Age Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="space-y-0.5">
              <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Gender</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaVenusMars className="text-xs sm:text-sm" /></span>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange} 
                  className="w-full pl-8 pr-4 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold appearance-none"
                >
                  <option className="bg-slate-900 text-white font-semibold" value="male">Male</option>
                  <option className="bg-slate-900 text-white font-semibold" value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="space-y-0.5">
              <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">Age</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaCalendarAlt className="text-xs sm:text-sm" /></span>
                <input 
                  type="number" 
                  required 
                  min={18} 
                  max={70} 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  className="w-full pl-8 pr-4 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold" 
                />
              </div>
            </div>
          </div>

          {/* City */}
          <div className="space-y-0.5">
            <label className="text-[#ffd666] text-[9px] sm:text-xs font-bold uppercase tracking-wider pl-1 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">City</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/60"><FaCity className="text-xs sm:text-sm" /></span>
              <input 
                type="text" 
                required 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="e.g. Hyderabad, Vijayawada" 
                className="w-full pl-8 pr-4 py-1 sm:py-2 rounded-xl bg-black/15 border border-white/20 focus:border-white/40 focus:ring-1 focus:ring-white/40 focus:outline-none transition-all text-xs sm:text-sm text-white placeholder-slate-400 font-semibold" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gold-gradient text-crimson-950 font-bold py-1.5 sm:py-2.5 rounded-xl shadow-lg hover:shadow-gold-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-0.5 sm:mt-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-crimson-950 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Create Free Profile'
              )}
            </button>
          </div>
        </form>

        {/* Redirect */}
        <p className="text-white/85 text-[10px] sm:text-sm text-center mt-2 sm:mt-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Already registered?{' '}
          <Link to="/login" className="text-[#ffd666] font-bold hover:underline hover:text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
