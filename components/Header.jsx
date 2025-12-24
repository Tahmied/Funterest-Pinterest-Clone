'use client'
import Link from 'next/link';
import { useState } from 'react';

const PinterestHeader = ({ 
  isLoggedIn = false, 
  userInitial = 'U',
  userName = 'User',
  onUploadClick,
  onLoginClick,
  onSignupClick,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-[#0f1116] border-b border-[rgba(255,255,255,0.08)] backdrop-blur-xl z-[1000] h-[70px]">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto h-full px-4 md:px-6">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center text-[#06b6d4] text-[22px] md:text-[28px] font-bold tracking-tight hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="w-[38px] h-[38px] md:w-[44px] md:h-[44px] mr-2 md:mr-3 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center shadow-lg">
              <span className="text-white text-xl md:text-2xl font-black">A</span>
            </div>
            <span>An!mied</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-grow max-w-[700px] mx-6">
            <div className="w-full relative group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280] group-focus-within:text-[#06b6d4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                className="w-full py-3 pl-12 pr-4 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-base text-white placeholder-[#6b7280] transition-all duration-300 ease-in-out focus:outline-none focus:border-[#06b6d4] focus:bg-[rgba(255,255,255,0.08)] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)]"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {/* Home Button */}
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-white font-medium text-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </Link>

                {/* Create Button */}
                <button
                  onClick={onUploadClick}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#06b6d4] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#0891b2] hover:shadow-lg hover:shadow-[rgba(6,182,212,0.3)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create</span>
                </button>

                {/* Saved Button */}
                <Link 
                  href="/saved" 
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </Link>
                
                {/* Profile Button */}
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-2 pl-2 pr-4 py-1.5 rounded-full text-white font-medium text-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white flex items-center justify-center font-bold shadow-md">
                    {userInitial}
                  </div>
                  <span className="hidden lg:inline">{userName}</span>
                </Link>
              </>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={onLoginClick}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium text-sm transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Log in</span>
                </button>

                {/* Signup Button */}
                <button
                  onClick={onSignupClick}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#06b6d4] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#0891b2] hover:shadow-lg hover:shadow-[rgba(6,182,212,0.3)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Sign up</span>
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-200 hover:bg-[rgba(255,255,255,0.08)]"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-[rgba(255,255,255,0.08)] px-4 py-3 bg-[#0a0c10]">
          <div className="w-full relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="w-full py-2.5 pl-10 pr-4 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-sm text-white placeholder-[#6b7280] transition-all duration-300 focus:outline-none focus:border-[#06b6d4] focus:bg-[rgba(255,255,255,0.08)]"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] top-[126px]"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-[#1a1d25] w-full max-w-sm ml-auto h-full shadow-2xl animate-[slideIn_0.25s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col p-4 gap-2">
              {isLoggedIn ? (
                <>
                  {/* Profile Section */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[rgba(6,182,212,0.1)] to-transparent border border-[rgba(6,182,212,0.2)] hover:border-[rgba(6,182,212,0.4)] transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#0891b2] text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-base m-0 leading-tight">{userName}</p>
                      <p className="text-[#6b7280] text-sm m-0 leading-tight mt-0.5">View profile</p>
                    </div>
                  </Link>

                  <div className="h-px bg-[rgba(255,255,255,0.08)] my-2"></div>

                  {/* Menu Items */}
                  <Link
                    href="/"
                    className="flex items-center gap-3 p-3.5 rounded-xl text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium">Home</span>
                  </Link>

                  <button
                    onClick={() => {
                      onUploadClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#06b6d4] text-white hover:bg-[#0891b2] transition-all font-semibold shadow-lg text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Pin</span>
                  </button>

                  <Link
                    href="/saved"
                    className="flex items-center gap-3 p-3.5 rounded-xl text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="font-medium">Saved</span>
                  </Link>

                  <div className="h-px bg-[rgba(255,255,255,0.08)] my-2"></div>

                  <button
                    onClick={() => {
                      onLogout?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-xl text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] transition-all font-medium text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLoginClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-xl text-white hover:bg-[rgba(255,255,255,0.05)] transition-all font-medium text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Log in</span>
                  </button>

                  <button
                    onClick={() => {
                      onSignupClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#06b6d4] text-white hover:bg-[#0891b2] transition-all font-semibold shadow-lg text-left"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Sign up</span>
                  </button>

                  <div className="mt-4 p-4 bg-gradient-to-r from-[rgba(6,182,212,0.15)] to-[rgba(6,182,212,0.05)] rounded-xl border border-[rgba(6,182,212,0.2)]">
                    <p className="text-[#06b6d4] font-semibold text-sm m-0 mb-1">Join An!mied today</p>
                    <p className="text-[#6b7280] text-xs m-0 leading-relaxed">Discover and save creative ideas from around the world</p>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default PinterestHeader;