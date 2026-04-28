/* Light Mode - League Table & Top Scorers */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Handshake } from 'lucide-react';
import { getLeagueTable, getTopScorers, getTopAssisters, TEAMS } from '@/lib/data';
import { useInteraction } from '@/contexts/InteractionContext';

type LeaderboardTab = 'table' | 'scorers' | 'assists';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('table');
  const { votes } = useInteraction();

  const leagueTable = getLeagueTable();
  const topScorers = getTopScorers();
  const topAssisters = getTopAssisters();

  const tabs = [
    { id: 'table' as const, label: '积分榜', icon: Trophy },
    { id: 'scorers' as const, label: '射手榜', icon: Target },
    { id: 'assists' as const, label: '助攻榜', icon: Handshake },
  ];

  return (
    <section id="leaderboard" className="relative py-20 lg:py-28">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-[#DC2626]" />
          <span className="font-mono text-xs text-[#DC2626] tracking-[0.3em]">LEAGUE STANDINGS</span>
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-8">
          联赛<span className="text-[#DC2626]">榜单</span>
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-medium tracking-wide transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-red-50 border border-[#DC2626]/20 text-gray-900'
                  : 'text-gray-400 hover:text-gray-700 bg-white border border-gray-200'
                }
              `}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#DC2626]' : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* League Table */}
        {activeTab === 'table' && (
          <div className="glass-panel rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="col-span-1 font-mono text-[10px] text-gray-400">#</div>
              <div className="col-span-3 font-mono text-[10px] text-gray-400">球队</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center">场</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center">胜</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center">平</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center">负</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center hidden sm:block">进/失</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center hidden sm:block">净胜</div>
              <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center hidden sm:block">热度</div>
              <div className="col-span-1 font-mono text-[10px] text-[#DC2626] text-center">积分</div>
            </div>

            {/* Rows */}
            {leagueTable.map((team, index) => {
              const totalGames = team.wins + team.draws + team.losses;
              const gd = team.goalsFor - team.goalsAgainst;
              const teamVotes = team.votes + (votes[team.id] || 0);

              return (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className={`
                    grid grid-cols-12 gap-2 px-4 py-3 items-center transition-colors
                    ${index < 3 ? 'bg-red-50/40' : ''}
                    ${index % 2 === 0 && index >= 3 ? 'bg-gray-50/50' : ''}
                    hover:bg-gray-100/60
                    border-b border-gray-100
                  `}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    <span
                      className={`
                        inline-flex w-6 h-6 rounded items-center justify-center font-mono text-xs font-bold
                        ${index === 0 ? 'bg-amber-100 text-[#F59E0B]' :
                          index === 1 ? 'bg-gray-200 text-gray-500' :
                          index === 2 ? 'bg-orange-100 text-[#CD7F32]' :
                          'text-gray-400'}
                      `}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Team */}
                  <div className="col-span-3 flex items-center gap-2">
                    <img src={team.logo} alt={team.name} className="w-7 h-7 rounded object-cover" />
                    <span className="font-body text-sm font-medium text-gray-800 truncate">{team.city}</span>
                  </div>

                  {/* Stats */}
                  <div className="col-span-1 font-mono text-xs text-gray-500 text-center">{totalGames}</div>
                  <div className="col-span-1 font-mono text-xs text-[#16A34A] text-center">{team.wins}</div>
                  <div className="col-span-1 font-mono text-xs text-gray-500 text-center">{team.draws}</div>
                  <div className="col-span-1 font-mono text-xs text-[#EF4444] text-center">{team.losses}</div>
                  <div className="col-span-1 font-mono text-xs text-gray-500 text-center hidden sm:block">{team.goalsFor}/{team.goalsAgainst}</div>
                  <div className="col-span-1 font-mono text-xs text-center hidden sm:block" style={{ color: gd > 0 ? '#16A34A' : gd < 0 ? '#EF4444' : '#9CA3AF' }}>
                    {gd > 0 ? '+' : ''}{gd}
                  </div>
                  <div className="col-span-1 font-mono text-[10px] text-gray-400 text-center hidden sm:block">{teamVotes}</div>
                  <div className="col-span-1 font-mono text-sm font-bold text-[#DC2626] text-center">{team.points}</div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Top Scorers */}
        {activeTab === 'scorers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topScorers.map((item, index) => (
              <motion.div
                key={item.player.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm font-black
                      ${index === 0 ? 'bg-amber-100 text-[#F59E0B]' :
                        index === 1 ? 'bg-gray-200 text-gray-500' :
                        index === 2 ? 'bg-orange-100 text-[#CD7F32]' :
                        'bg-gray-100 text-gray-400'}
                    `}
                  >
                    {index + 1}
                  </span>
                  <img src={item.team.logo} alt={item.team.name} className="w-8 h-8 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-body text-sm font-semibold text-gray-900">{item.player.name}</div>
                    <div className="text-[10px] font-mono text-gray-400">{item.team.city} · #{item.player.number}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-black text-[#DC2626]">{item.player.goals}</div>
                    <div className="text-[10px] font-mono text-gray-400">进球</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Top Assisters */}
        {activeTab === 'assists' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topAssisters.map((item, index) => (
              <motion.div
                key={item.player.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-panel rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-display text-sm font-black
                      ${index === 0 ? 'bg-amber-100 text-[#F59E0B]' :
                        index === 1 ? 'bg-gray-200 text-gray-500' :
                        index === 2 ? 'bg-orange-100 text-[#CD7F32]' :
                        'bg-gray-100 text-gray-400'}
                    `}
                  >
                    {index + 1}
                  </span>
                  <img src={item.team.logo} alt={item.team.name} className="w-8 h-8 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-body text-sm font-semibold text-gray-900">{item.player.name}</div>
                    <div className="text-[10px] font-mono text-gray-400">{item.team.city} · #{item.player.number}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-black text-[#0284C7]">{item.player.assists}</div>
                    <div className="text-[10px] font-mono text-gray-400">助攻</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
