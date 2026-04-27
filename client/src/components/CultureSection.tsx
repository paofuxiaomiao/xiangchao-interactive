/* Cyber Arena - Team Culture Section */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Landmark, Users, Flag, Sparkles } from 'lucide-react';
import { TEAMS, type Team } from '@/lib/data';

export default function CultureSection() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(TEAMS[0]);

  return (
    <section id="culture" className="relative py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663342549613/maCaBegFg79dkZmom7ZdUj/culture-bg-VuVaekcWv4TaG5MUrT2CrN.webp")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="container mx-auto relative">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-[#F59E0B]" />
          <span className="font-mono text-xs text-[#F59E0B] tracking-[0.3em]">CULTURE & HERITAGE</span>
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight mb-8">
          主场<span className="text-[#F59E0B]">文化</span>
        </h2>

        {/* Team grid selector */}
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 mb-8">
          {TEAMS.map(team => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`
                relative aspect-square rounded-lg overflow-hidden transition-all duration-300 group
                ${selectedTeam.id === team.id
                  ? 'ring-2 ring-[#F59E0B] shadow-[0_0_15px_oklch(0.7_0.18_50/30%)]'
                  : 'opacity-50 hover:opacity-80'
                }
              `}
            >
              <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
              {selectedTeam.id === team.id && (
                <div className="absolute inset-0 bg-[#F59E0B]/10" />
              )}
            </button>
          ))}
        </div>

        {/* Culture content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTeam.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main culture card */}
            <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden">
              {/* Header with team color accent */}
              <div
                className="p-6 relative"
                style={{
                  background: `linear-gradient(135deg, ${selectedTeam.color}15, transparent)`,
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{selectedTeam.city}</h3>
                    <p className="font-body text-sm text-[oklch(0.5_0.005_280)]">{selectedTeam.cultureLine}</p>
                  </div>
                </div>

                {/* City description */}
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="w-4 h-4 text-[#F59E0B] mt-1 shrink-0" />
                  <p className="font-body text-sm text-[oklch(0.7_0.005_280)] leading-relaxed">
                    {selectedTeam.culture.description}
                  </p>
                </div>

                {/* Heritage */}
                <div className="flex items-start gap-3 mb-6">
                  <Landmark className="w-4 h-4 text-[#00D4FF] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] tracking-wider block mb-1">文化遗产</span>
                    <p className="font-body text-sm text-[oklch(0.7_0.005_280)]">{selectedTeam.culture.heritage}</p>
                  </div>
                </div>

                {/* Fan group */}
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#DC2626] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] tracking-wider block mb-1">球迷组织</span>
                    <p className="font-display text-lg font-bold" style={{ color: selectedTeam.color }}>
                      {selectedTeam.culture.fanGroup}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rituals & Banners */}
            <div className="flex flex-col gap-6">
              {/* Rituals */}
              <div className="glass-panel rounded-xl p-6 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <h4 className="font-display text-sm font-bold text-[oklch(0.6_0.005_280)] tracking-wider">
                    主场仪式
                  </h4>
                </div>
                <div className="space-y-3">
                  {selectedTeam.culture.rituals.map((ritual, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: `${selectedTeam.color}30` }}
                      >
                        {i + 1}
                      </span>
                      <span className="font-body text-sm text-[oklch(0.7_0.005_280)]">{ritual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banners */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Flag className="w-4 h-4 text-[#DC2626]" />
                  <h4 className="font-display text-sm font-bold text-[oklch(0.6_0.005_280)] tracking-wider">
                    代表性横幅
                  </h4>
                </div>
                <div className="space-y-3">
                  {selectedTeam.culture.banners.map((banner, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg text-center font-display text-sm font-bold tracking-wider"
                      style={{
                        backgroundColor: `${selectedTeam.color}10`,
                        border: `1px solid ${selectedTeam.color}30`,
                        color: selectedTeam.color,
                      }}
                    >
                      "{banner}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
