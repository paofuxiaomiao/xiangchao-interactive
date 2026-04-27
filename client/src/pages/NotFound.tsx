import { AlertTriangle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, oklch(0.58 0.22 25 / 20%) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <div className="flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-[#DC2626]" />
        </div>

        <h1 className="font-display text-7xl sm:text-9xl font-black text-white mb-4 tracking-tight">
          4<span className="text-[#DC2626]">0</span>4
        </h1>

        <p className="font-mono text-sm text-[oklch(0.5_0.005_280)] tracking-wider mb-2">
          PAGE NOT FOUND
        </p>
        <p className="font-body text-lg text-[oklch(0.6_0.005_280)] mb-8">
          你访问的页面不存在，可能已被移除或地址有误。
        </p>

        <button
          onClick={() => setLocation('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#DC2626] text-white font-display text-sm font-bold tracking-wider
                     hover:bg-[#EF4444] transition-all duration-300
                     shadow-[0_0_20px_oklch(0.58_0.22_25/30%)]"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          }}
        >
          <Home className="w-4 h-4" />
          返回首页
        </button>
      </motion.div>
    </div>
  );
}
