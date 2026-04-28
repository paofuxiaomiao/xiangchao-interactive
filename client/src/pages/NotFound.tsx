import { AlertTriangle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle, oklch(0.55 0.22 25 / 20%) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-[#DC2626]" />
        </div>
        <h1 className={`font-display text-7xl sm:text-9xl font-black mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          4<span className="text-[#DC2626]">0</span>4
        </h1>
        <p className={`font-mono text-sm tracking-wider mb-2 ${isDark ? 'text-[oklch(0.6_0.005_280)]' : 'text-gray-500'}`}>页面未找到</p>
        <p className={`font-body text-lg mb-8 ${isDark ? 'text-[oklch(0.7_0.005_280)]' : 'text-gray-600'}`}>你访问的页面不存在，可能已被移除或地址有误。</p>
        <button onClick={() => setLocation('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white font-display text-sm font-bold tracking-wider hover:bg-[#B91C1C] transition-all duration-300 rounded-lg shadow-lg shadow-red-200/50">
          <Home className="w-4 h-4" /> 返回首页
        </button>
      </motion.div>
    </div>
  );
}
