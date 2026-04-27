/* Cyber Arena - HUD-style top navigation bar */
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
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[oklch(0.06_0.01_280/85%)] backdrop-blur-xl border-b border-[oklch(1_0_0/6%)]" />

      {/* Scanline accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DC2626] to-transparent opacity-60" />

      <div className="relative container mx-auto flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 group"
        >
          <Zap className="w-5 h-5 text-[#DC2626] group-hover:drop-shadow-[0_0_8px_#DC2626]" />
          <span className="font-display text-lg font-bold tracking-wider text-white">
            湘超<span className="text-[#DC2626]">联赛</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-[#00D4FF] opacity-60 tracking-widest ml-1">
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
                  : 'text-[oklch(0.7_0.005_280)] hover:text-white'
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-[8px] opacity-50">{item.icon}</span>
                {item.label}
              </span>
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#DC2626] shadow-[0_0_8px_#DC2626]" />
              )}
            </button>
          ))}
        </div>

        {/* Live indicator */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
          </span>
          <span className="text-[10px] font-mono text-[#39FF14] tracking-wider">LIVE</span>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[oklch(0.08_0.01_280/95%)] backdrop-blur-xl border-b border-[oklch(1_0_0/6%)]">
          <div className="container py-4 space-y-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded font-body text-sm font-medium tracking-wide transition-all
                  ${activeSection === item.id
                    ? 'text-[#DC2626] bg-[oklch(0.58_0.22_25/10%)]'
                    : 'text-[oklch(0.7_0.005_280)] hover:text-white hover:bg-[oklch(1_0_0/5%)]'
                  }
                `}
              >
                <span className="text-[8px] opacity-50 mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
