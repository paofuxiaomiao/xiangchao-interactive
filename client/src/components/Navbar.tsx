/* Light Mode - Clean top navigation bar */
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: '首页', icon: '◆' },
  { id: 'dashboard', label: '数据看板', icon: '◈' },
  { id: 'matches', label: '赛事战报', icon: '◇' },
  { id: 'interactive', label: '互动中心', icon: '◆' },
  { id: 'culture', label: '主场文化', icon: '◈' },
  { id: 'leaderboard', label: '联赛榜单', icon: '◇' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Light glassmorphism background */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-sm" />

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC2626]/40 to-transparent" />

      <div className="relative container mx-auto flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 group"
        >
          <Zap className="w-5 h-5 text-[#DC2626]" />
          <span className="font-display text-lg font-bold tracking-wider text-gray-900">
            湘超<span className="text-[#DC2626]">联赛</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-[#0284C7] opacity-70 tracking-widest ml-1">
            INTERACTIVE
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative px-4 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300
                ${activeSection === item.id
                  ? 'text-[#DC2626]'
                  : 'text-gray-500 hover:text-gray-900'
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-[8px] opacity-40">{item.icon}</span>
                {item.label}
              </span>
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#DC2626] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Live indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
          </span>
          <span className="text-[10px] font-mono text-[#16A34A] tracking-wider">LIVE</span>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-700"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg">
          <div className="container py-4 space-y-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-body text-sm font-medium tracking-wide transition-all
                  ${activeSection === item.id
                    ? 'text-[#DC2626] bg-red-50'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-[8px] opacity-40 mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
