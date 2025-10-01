'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../store/store';
import { authenticateUser, loginAdmin, clearError } from '../../store/authSlice';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  Building, 
  Home, 
  ArrowRight,
  Shield,
  UserCheck
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const { user, admin, isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else if (admin) {
      router.push('/admin');
    }
  }, [user, admin, router]);

  useEffect(() => {
    dispatch(clearError() as any);
  }, [isLogin, isAdmin, dispatch]);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isAdmin) {
      dispatch(loginAdmin({ 
        email: formData.email, 
        password: formData.password 
      }) as any);
    } else {
      const userData = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            phone: formData.phone 
          };
      
      dispatch(authenticateUser(userData) as any);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: ''
    });
  };

  const handleModeSwitch = (newIsAdmin: boolean) => {
    setIsAdmin(newIsAdmin);
    setIsLogin(true);
    resetForm();
  };

  const handleAuthTypeSwitch = (newIsLogin: boolean) => {
    setIsLogin(newIsLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Auth Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {isAdmin ? (
                <div className="p-3 bg-slate-100 rounded-full">
                  <Shield className="w-8 h-8 text-slate-700" />
                </div>
              ) : (
                <div className="p-3 bg-blue-100 rounded-full">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isAdmin ? 'Admin Portal' : 'Sudha Realty'}
            </h1>
            <p className="text-slate-600">
              {isAdmin 
                ? 'Secure admin access' 
                : (isLogin ? 'Welcome back!' : 'Create your account')
              }
            </p>
          </div>

          {/* User Type Selector */}
          <div className="mb-6">
            <div className="bg-slate-100 rounded-xl p-1 grid grid-cols-2">
              <button
                type="button"
                onClick={() => handleModeSwitch(false)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  !isAdmin 
                    ? 'bg-white text-blue-600 shadow-sm font-medium' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>User</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch(true)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isAdmin 
                    ? 'bg-white text-slate-700 shadow-sm font-medium' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Login/Register Toggle for Users */}
          {!isAdmin && (
            <div className="mb-6">
              <div className="bg-blue-50 rounded-xl p-1 grid grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleAuthTypeSwitch(true)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isLogin 
                      ? 'bg-blue-600 text-white shadow-sm font-medium' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => handleAuthTypeSwitch(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-blue-600 text-white shadow-sm font-medium' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Name Field (Register only) */}
            {!isAdmin && !isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Field (Register only) */}
            {!isAdmin && !isLogin && (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number * <span className="text-slate-400"></span></span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                isAdmin
                  ? 'bg-slate-700 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              } disabled:opacity-50 disabled:cursor-not-allowed group`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                <>
                  <span>
                    {isAdmin ? 'Access Admin Panel' : (isLogin ? 'Sign In' : 'Create Account')}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                <span>Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70">
          <p className="text-sm">
            © 2025 Sudha Realty. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}