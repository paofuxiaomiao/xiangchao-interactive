/* Light Mode - Footer */
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#DC2626]" />
            <span className="font-display text-sm font-bold tracking-wider text-gray-900">
              湘超<span className="text-[#DC2626]">联赛</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400 ml-2">
              HUNAN SUPER LEAGUE 2025
            </span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono text-gray-400">
            <span>湘超地图互动页面</span>
            <span>·</span>
            <span>数据仅供展示</span>
            <span>·</span>
            <span>v1.0</span>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#DC2626]/15 to-transparent" />
      </div>
    </footer>
  );
}
