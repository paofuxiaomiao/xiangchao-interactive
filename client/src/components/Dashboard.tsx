/* Light Mode - Team Dashboard with data visualization */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Target, Award, ChevronRight, Star } from 'lucide-react';
import { TEAMS, type Team } from '@/lib/data';
import RadarChart from './RadarChart';
import PlayerCard from './PlayerCard';

export default function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(TEAMS[0]);
  const [showRoster, setShowRoster] = useState(false);

  const avgHeight = Math.round(
    selectedTeam.players.reduce((s, p) => s + p.height, 0) / selectedTeam.players.length
  );
  const avgWeight = Math.round(
    selectedTeam.players.reduce((s, p) => s + p.weight, 0) / selectedTeam.players.length
  );
  const topScorer = [...selectedTeam.players].sort((a, b) => b.goals - a.goals)[0];

  // Team average stats for radar chart
  const teamAvgStats = {
    speed: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.speed, 0) / selectedTeam.players.length),
    shooting: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.shooting, 0) / selectedTeam.players.length),
    passing: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.passing, 0) / selectedTeam.players.length),
    defense: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.defense, 0) / selectedTeam.players.length),
    stamina: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.stamina, 0) / selectedTeam.players.length),
    technique: Math.round(selectedTeam.players.reduce((s, p) => s + p.stats.technique, 0) / selectedTeam.players.length),
  };

  return (
    <section id="dashboard" className="relative py-20 lg:py-28">
      {/* Section header */}
      <div className="container mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-[#DC2626]" />
          <span className="font-mono text-xs text-[#DC2626] tracking-[0.3em]">DATA DASHBOARD</span>
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          球队<span className="text-[#DC2626]">数据看板</span>
        </h2>
      </div>

      <div className="container mx-auto">
        {/* Team selector - horizontal scroll */}
        <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {TEAMS.map(team => (
              <button
                key={team.id}
                onClick={() => { setSelectedTeam(team); setShowRoster(false); }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 whitespace-nowrap
                  ${selectedTeam.id === team.id
                    ? 'bg-red-50 border border-[#DC2626]/30 shadow-sm'
                    : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                <img src={team.logo} alt={team.name} className="w-7 h-7 rounded-full object-cover" />
                <span className={`font-body text-sm font-medium ${selectedTeam.id === team.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {team.city}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main dashboard grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTeam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6"
          >
            {/* Team overview card */}
            <div className="lg:col-span-4 glass-panel rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={selectedTeam.logo}
                    alt={selectedTeam.name}
                    className="w-20 h-20 rounded-xl object-cover shadow-sm"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white"
                    style={{ backgroundColor: selectedTeam.color }}
                  >
                    {selectedTeam.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-gray-900">{selectedTeam.name}</h3>
                  <p className="text-sm text-gray-500 font-body">{selectedTeam.stadiumName}</p>
                  <p className="text-xs text-gray-400 font-mono mt-1">{selectedTeam.cultureLine}</p>
                </div>
              </div>

              {/* Team slogan */}
              <div className="mb-6 p-3 rounded-lg bg-gray-50 border-l-2" style={{ borderColor: selectedTeam.color }}>
                <p className="font-body text-sm text-gray-600 italic">"{selectedTeam.slogan}"</p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                  <Shield className="w-4 h-4 text-[#0284C7]" />
                  <div>
                    <div className="font-mono text-xs text-gray-400">教练</div>
                    <div className="font-body text-sm text-gray-800 font-medium">{selectedTeam.coach}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                  <Users className="w-4 h-4 text-[#16A34A]" />
                  <div>
                    <div className="font-mono text-xs text-gray-400">阵容</div>
                    <div className="font-body text-sm text-gray-800 font-medium">{selectedTeam.players.length}人</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                  <Target className="w-4 h-4 text-[#DC2626]" />
                  <div>
                    <div className="font-mono text-xs text-gray-400">风格</div>
                    <div className="font-body text-sm text-gray-800 font-medium">{selectedTeam.coachStyle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50">
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                  <div>
                    <div className="font-mono text-xs text-gray-400">得分王</div>
                    <div className="font-body text-sm text-gray-800 font-medium">{topScorer.name}</div>
                  </div>
                </div>
              </div>

              {/* Body stats */}
              <div className="mt-4 flex gap-4">
                <div className="flex-1 text-center p-2 rounded-lg bg-gray-50">
                  <div className="font-mono text-lg text-gray-900 font-bold">{avgHeight}<span className="text-xs text-gray-400">cm</span></div>
                  <div className="font-mono text-[10px] text-gray-400">平均身高</div>
                </div>
                <div className="flex-1 text-center p-2 rounded-lg bg-gray-50">
                  <div className="font-mono text-lg text-gray-900 font-bold">{avgWeight}<span className="text-xs text-gray-400">kg</span></div>
                  <div className="font-mono text-[10px] text-gray-400">平均体重</div>
                </div>
              </div>
            </div>

            {/* Radar chart + Season stats */}
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
              {/* Radar chart */}
              <div className="glass-panel rounded-xl p-6 flex-1">
                <h4 className="font-display text-sm font-bold text-gray-500 tracking-wider mb-4">
                  球队能力雷达
                </h4>
                <RadarChart stats={teamAvgStats} color={selectedTeam.color} />
              </div>

              {/* Season record */}
              <div className="glass-panel rounded-xl p-6">
                <h4 className="font-display text-sm font-bold text-gray-500 tracking-wider mb-4">
                  赛季战绩
                </h4>
                <div className="grid grid-cols-5 gap-2 text-center">
                  {[
                    { label: '积分', value: selectedTeam.points, color: '#DC2626' },
                    { label: '胜', value: selectedTeam.wins, color: '#16A34A' },
                    { label: '平', value: selectedTeam.draws, color: '#F59E0B' },
                    { label: '负', value: selectedTeam.losses, color: '#EF4444' },
                    { label: '净胜', value: selectedTeam.goalsFor - selectedTeam.goalsAgainst, color: '#0284C7' },
                  ].map(stat => (
                    <div key={stat.label} className="p-2 rounded-lg bg-gray-50">
                      <div className="font-mono text-xl font-bold" style={{ color: stat.color }}>
                        {stat.value > 0 && stat.label === '净胜' ? '+' : ''}{stat.value}
                      </div>
                      <div className="font-mono text-[10px] text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                {/* Goals bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-1">
                    <span>进球 {selectedTeam.goalsFor}</span>
                    <span>失球 {selectedTeam.goalsAgainst}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden flex">
                    <div
                      className="h-full rounded-l-full transition-all duration-700"
                      style={{
                        width: `${(selectedTeam.goalsFor / (selectedTeam.goalsFor + selectedTeam.goalsAgainst)) * 100}%`,
                        background: `linear-gradient(90deg, ${selectedTeam.color}, ${selectedTeam.color}88)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Roster panel */}
            <div className="lg:col-span-4 glass-panel rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display text-sm font-bold text-gray-500 tracking-wider">
                  阵容档案
                </h4>
                <button
                  onClick={() => setShowRoster(!showRoster)}
                  className="flex items-center gap-1 text-xs font-mono text-[#0284C7] hover:text-[#0284C7]/80 transition-colors"
                >
                  {showRoster ? '收起' : '展开全部'}
                  <ChevronRight className={`w-3 h-3 transition-transform ${showRoster ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Position groups */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {(['前锋', '中场', '后卫', '门将'] as const).map(pos => {
                  const posPlayers = selectedTeam.players.filter(p => p.position === pos);
                  return (
                    <div key={pos}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono text-gray-400 tracking-wider">{pos}</span>
                        <span className="flex-1 h-[1px] bg-gray-200" />
                      </div>
                      <div className="space-y-1.5">
                        {(showRoster ? posPlayers : posPlayers.slice(0, 2)).map(player => (
                          <PlayerCard
                            key={player.id}
                            player={player}
                            teamColor={selectedTeam.color}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
