'use client';
import React, { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Timer effect
  useEffect(() => {
    if (timer > 0 && showOtpPage) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [timer, showOtpPage]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const next = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
        if (next) next.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = document.querySelector(`input[name=otp-${index - 1}]`) as HTMLInputElement;
      if (prev) prev.focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#00aeef] to-blue-600 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6">Welcome to Lookaround</h1>
          <p className="text-lg text-white/90 text-center max-w-md">
            Experience properties in immersive 360° views. Join our community to explore amazing spaces.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {!showOtpPage ? (
            <>
              {/* Toggle Buttons */}
              <div className="flex mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    isLogin ? 'bg-white shadow-sm text-[#00aeef]' : 'text-gray-600'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    !isLogin ? 'bg-white shadow-sm text-[#00aeef]' : 'text-gray-600'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef] focus:border-transparent"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
                <button
                  onClick={() => setShowOtpPage(true)}
                  className="w-full bg-gradient-to-r from-[#00aeef] to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 flex items-center justify-center"
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP UI */}
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowOtpPage(false)}
                  className="flex items-center text-gray-600 hover:text-[#00aeef] mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
                <p className="text-gray-600">We've sent a verification code to your email</p>
                <p className="text-[#00aeef] font-medium mt-1">{email}</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                    />
                  ))}
                </div>

                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

                <div className="text-center text-sm text-gray-600">
                  {timer > 0 ? (
                    `Resend code in ${timer}s`
                  ) : (
                    <button
                      type="button"
                      className="text-[#00aeef] hover:underline"
                      disabled={!canResend}
                    >
                      Resend code
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setIsVerifying(true)}
                  disabled={isVerifying}
                  className="w-full bg-gradient-to-r from-[#00aeef] to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 flex items-center justify-center"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-center text-sm text-gray-600">
            By {isLogin ? 'logging in' : 'signing up'}, you agree to our{' '}
            <Link href="/terms" className="text-[#00aeef] hover:underline">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-[#00aeef] hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
