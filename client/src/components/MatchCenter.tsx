/* Light Mode - Match Center with live scores and reports */
import { motion } from 'framer-motion';
import { MATCHES, TEAMS, type Match } from '@/lib/data';

function MatchCard({ match, index }: { match: Match; index: number }) {
  const home = TEAMS.find(t => t.id === match.homeTeam);
  const away = TEAMS.find(t => t.id === match.awayTeam);
  if (!home || !away) return null;

  const statusColors = {
    LIVE: { bg: 'bg-green-50', text: 'text-[#16A34A]', border: 'border-green-200' },
    'FULL TIME': { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
    PREVIEW: { bg: 'bg-blue-50', text: 'text-[#0284C7]', border: 'border-blue-200' },
  };

  const statusStyle = statusColors[match.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass-panel rounded-xl p-5 ${match.status === 'LIVE' ? 'border-green-300 shadow-md shadow-green-100/50' : ''}`}
    >
      {/* Status + Round */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] text-gray-400 tracking-wider">
          第{match.round}轮
        </span>
        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
          {match.status === 'LIVE' && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#16A34A]" />
            </span>
          )}
          {match.status === 'LIVE' ? `LIVE ${match.time}` : match.status === 'PREVIEW' ? '即将开始' : '已结束'}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between">
        {/* Home */}
        <div className="flex items-center gap-3 flex-1">
          <img src={home.logo} alt={home.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
          <div>
            <div className="font-display text-base font-bold text-gray-900">{home.city}</div>
            <div className="text-[10px] font-mono text-gray-400">主场</div>
          </div>
        </div>

        {/* Score */}
        <div className="px-6 text-center">
          {match.status === 'PREVIEW' ? (
            <div className="font-mono text-sm text-gray-400">{match.time}</div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-black text-gray-900">{match.homeScore}</span>
              <span className="font-mono text-lg text-gray-300">:</span>
              <span className="font-display text-3xl font-black text-gray-900">{match.awayScore}</span>
            </div>
          )}
        </div>

        {/* Away */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="text-right">
            <div className="font-display text-base font-bold text-gray-900">{away.city}</div>
            <div className="text-[10px] font-mono text-gray-400">客场</div>
          </div>
          <img src={away.logo} alt={away.name} className="w-12 h-12 rounded-lg object-cover shadow-sm" />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-xs font-body text-gray-500 leading-relaxed">{match.summary}</p>
      </div>
    </motion.div>
  );
}

export default function MatchCenter() {
  const liveMatches = MATCHES.filter(m => m.status === 'LIVE');
  const upcomingMatches = MATCHES.filter(m => m.status === 'PREVIEW');
  const finishedMatches = MATCHES.filter(m => m.status === 'FULL TIME');

  return (
    <section id="matches" className="relative py-20 lg:py-28">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-[#0284C7]" />
          <span className="font-mono text-xs text-[#0284C7] tracking-[0.3em]">MATCH CENTER</span>
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-12">
          赛事<span className="text-[#0284C7]">战报</span>
        </h2>

        {/* Live matches */}
        {liveMatches.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
              </span>
              <span className="font-mono text-xs text-[#16A34A] tracking-wider">正在进行</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingMatches.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span className="font-mono text-xs text-[#0284C7] tracking-wider">即将开始</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Finished */}
        {finishedMatches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="font-mono text-xs text-gray-400 tracking-wider">已结束</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {finishedMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
