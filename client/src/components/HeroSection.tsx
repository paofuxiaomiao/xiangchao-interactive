/* Light Mode - Hero Section with stadium banner and live match ticker */
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Trophy, Users } from 'lucide-react';
import { TEAMS, MATCHES } from '@/lib/data';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const liveMatches = MATCHES.filter(m => m.status === 'LIVE');
  const totalVotes = TEAMS.reduce((sum, t) => sum + t.votes, 0);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663342549613/maCaBegFg79dkZmom7ZdUj/hero-banner-SggMt6bUqj4QvJg2tWghFa.webp"
          alt="Stadium"
          className="w-full h-full object-cover"
        />
        {/* Light overlays - white/warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-[oklch(0.97_0.005_280)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto pt-24 pb-16 lg:pt-32">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-[1px] w-12 bg-[#DC2626]" />
            <span className="font-mono text-xs text-[#DC2626] tracking-[0.3em] uppercase">
              Hunan Super League 2025
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
          >
            <span className="text-gray-900">湘超</span>
            <br />
            <span className="text-[#DC2626]">互动中心</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 font-body max-w-xl mb-10 leading-relaxed"
          >
            14支球队，14座城市，一场属于湖南人的足球盛宴。
            <br />
            投票、打气、评分——你的每一次互动都在书写湘超历史。
          </motion.p>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-gray-900">{TEAMS.length}</div>
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">参赛球队</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#0284C7]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-gray-900">{liveMatches.length}</div>
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">正在直播</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-gray-900">{totalVotes.toLocaleString()}</div>
                <div className="text-[10px] font-mono text-gray-400 tracking-wider">累计投票</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => onNavigate('interactive')}
              className="group relative px-8 py-3 bg-[#DC2626] text-white font-display text-sm font-bold tracking-wider
                         hover:bg-[#B91C1C] transition-all duration-300 rounded-lg
                         shadow-lg shadow-red-200/50 hover:shadow-xl hover:shadow-red-200/60"
            >
              立即参与互动
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-display text-sm font-bold tracking-wider
                         hover:border-[#0284C7] hover:text-[#0284C7] transition-all duration-300 rounded-lg
                         bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              查看数据看板
            </button>
          </motion.div>
        </div>
      </div>

      {/* Live match ticker at bottom */}
      {liveMatches.length > 0 && (
        <div className="relative mt-auto">
          <div className="container mx-auto pb-6">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
                </span>
                <span className="font-mono text-xs text-[#16A34A] tracking-wider">LIVE MATCHES</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {liveMatches.map(match => {
                  const home = TEAMS.find(t => t.id === match.homeTeam);
                  const away = TEAMS.find(t => t.id === match.awayTeam);
                  if (!home || !away) return null;
                  return (
                    <div key={match.id} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border border-gray-100">
                      <div className="flex items-center gap-2">
                        <img src={home.logo} alt={home.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-body text-sm text-gray-800 font-medium">{home.city}</span>
                      </div>
                      <div className="font-mono text-lg font-bold text-gray-900 px-2">
                        {match.homeScore} <span className="text-gray-300">-</span> {match.awayScore}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm text-gray-800 font-medium">{away.city}</span>
                        <img src={away.logo} alt={away.name} className="w-6 h-6 rounded-full object-cover" />
                      </div>
                      <span className="font-mono text-xs text-[#16A34A] ml-2">{match.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
