/* Cyber Arena - Hero Section with stadium banner and live match ticker */
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
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.06_0.01_280/70%)] via-[oklch(0.06_0.01_280/50%)] to-[oklch(0.08_0.01_280)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.06_0.01_280/60%)] to-transparent" />
      </div>

      {/* Hex grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663342549613/maCaBegFg79dkZmom7ZdUj/hex-pattern-4u44sLCNj2wS6TCSNF528i.webp")`,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        }}
      />

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
            <span className="text-white">湘超</span>
            <br />
            <span className="neon-text">互动中心</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-[oklch(0.7_0.005_280)] font-body max-w-xl mb-10 leading-relaxed"
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
              <div className="w-10 h-10 rounded bg-[oklch(0.58_0.22_25/15%)] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-white">{TEAMS.length}</div>
                <div className="text-[10px] font-mono text-[oklch(0.5_0.005_280)] tracking-wider">参赛球队</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[oklch(0.75_0.15_220/15%)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-white">{liveMatches.length}</div>
                <div className="text-[10px] font-mono text-[oklch(0.5_0.005_280)] tracking-wider">正在直播</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[oklch(0.85_0.3_142/15%)] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#39FF14]" />
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-white">{totalVotes.toLocaleString()}</div>
                <div className="text-[10px] font-mono text-[oklch(0.5_0.005_280)] tracking-wider">累计投票</div>
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
                         hover:bg-[#EF4444] transition-all duration-300
                         shadow-[0_0_20px_oklch(0.58_0.22_25/30%)] hover:shadow-[0_0_30px_oklch(0.58_0.22_25/50%)]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
            >
              立即参与互动
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-3 border border-[oklch(1_0_0/15%)] text-white font-display text-sm font-bold tracking-wider
                         hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all duration-300
                         bg-[oklch(0.1_0.01_280/50%)] backdrop-blur-sm"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              }}
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
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39FF14] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#39FF14]" />
                </span>
                <span className="font-mono text-xs text-[#39FF14] tracking-wider">LIVE MATCHES</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {liveMatches.map(match => {
                  const home = TEAMS.find(t => t.id === match.homeTeam);
                  const away = TEAMS.find(t => t.id === match.awayTeam);
                  if (!home || !away) return null;
                  return (
                    <div key={match.id} className="flex items-center gap-3 bg-[oklch(0.1_0.01_280/60%)] rounded px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img src={home.logo} alt={home.name} className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-body text-sm text-white font-medium">{home.city}</span>
                      </div>
                      <div className="font-mono text-lg font-bold text-white px-2">
                        {match.homeScore} <span className="text-[oklch(0.4_0.005_280)]">-</span> {match.awayScore}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-sm text-white font-medium">{away.city}</span>
                        <img src={away.logo} alt={away.name} className="w-6 h-6 rounded-full object-cover" />
                      </div>
                      <span className="font-mono text-xs text-[#39FF14] ml-2">{match.time}</span>
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
          <ChevronDown className="w-5 h-5 text-[oklch(0.4_0.005_280)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
