/* Dual-theme Navigation Bar with Light/Dark toggle */
import { useState } from 'react';
import { Menu, X, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Background */}
      <div className={`absolute inset-0 backdrop-blur-xl border-b shadow-sm transition-colors duration-300
        ${isDark
          ? 'bg-[oklch(0.08_0.01_280/85%)] border-[oklch(1_0_0/8%)]'
          : 'bg-white/85 border-gray-200/60'
        }`}
      />

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#DC2626]/40 to-transparent" />

      <div className="relative container mx-auto flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <button onClick={() => onNavigate('hero')} className="flex items-center gap-2 group">
          <Zap className="w-5 h-5 text-[#DC2626]" />
          <span className={`font-display text-lg font-bold tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
            湘超<span className="text-[#DC2626]">联赛</span>
          </span>
          <span className={`hidden sm:inline text-[10px] font-mono tracking-widest ml-1 ${isDark ? 'text-[#00D4FF] opacity-70' : 'text-[#0284C7] opacity-70'}`}>
            INTERACTIVE
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-4 py-2 font-body text-sm font-medium tracking-wide transition-all duration-300
                ${activeSection === item.id
                  ? 'text-[#DC2626]'
                  : isDark ? 'text-[oklch(0.5_0.005_280)] hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
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

        {/* Right side: theme toggle + live indicator */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme toggle button */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border
                ${isDark
                  ? 'bg-[oklch(0.15_0.01_280)] border-[oklch(1_0_0/10%)] text-[#F59E0B] hover:border-[#F59E0B]/40'
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-[#6366F1]/40 hover:text-[#6366F1]'
                }`}
              title={isDark ? '开灯（切换亮色模式）' : '关灯（切换暗色模式）'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>开灯</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>关灯</span>
                </>
              )}
            </button>
          )}

          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-[#39FF14]' : 'bg-[#16A34A]'}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-[#39FF14]' : 'bg-[#16A34A]'}`} />
            </span>
            <span className={`text-[10px] font-mono tracking-wider ${isDark ? 'text-[#39FF14]' : 'text-[#16A34A]'}`}>LIVE</span>
          </div>
        </div>

        {/* Mobile: theme toggle + menu */}
        <div className="lg:hidden flex items-center gap-2">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'text-[#F59E0B]' : 'text-gray-600'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${isDark ? 'text-white' : 'text-gray-700'}`}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-lg transition-colors
          ${isDark ? 'bg-[oklch(0.08_0.01_280/95%)] border-[oklch(1_0_0/8%)]' : 'bg-white/95 border-gray-200/60'}`}
        >
          <div className="container py-4 space-y-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-body text-sm font-medium tracking-wide transition-all
                  ${activeSection === item.id
                    ? isDark ? 'text-[#DC2626] bg-[oklch(0.58_0.22_25/10%)]' : 'text-[#DC2626] bg-red-50'
                    : isDark ? 'text-[oklch(0.5_0.005_280)] hover:text-white hover:bg-[oklch(1_0_0/5%)]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
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
