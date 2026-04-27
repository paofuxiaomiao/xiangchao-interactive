/* Cyber Arena - Interactive Center: Voting, Cheering, Comments */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Flame, Send, ThumbsUp, Zap } from 'lucide-react';
import { TEAMS, CHEER_SLOGANS, type Team } from '@/lib/data';
import { useInteraction } from '@/contexts/InteractionContext';
import { toast } from 'sonner';

type InteractiveTab = 'vote' | 'cheer' | 'comment';

export default function InteractiveCenter() {
  const [activeTab, setActiveTab] = useState<InteractiveTab>('vote');

  const tabs = [
    { id: 'vote' as const, label: '热度投票', icon: Heart, color: '#DC2626' },
    { id: 'cheer' as const, label: '线上打气', icon: Flame, color: '#39FF14' },
    { id: 'comment' as const, label: '留言板', icon: MessageSquare, color: '#00D4FF' },
  ];

  return (
    <section id="interactive" className="relative py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("https://d2xsxph8kpxj0f.cloudfront.net/310519663342549613/maCaBegFg79dkZmom7ZdUj/data-viz-bg-7y5QBVPpNsu4smeTc8SFo9.webp")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="container mx-auto relative">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-[#39FF14]" />
          <span className="font-mono text-xs text-[#39FF14] tracking-[0.3em]">INTERACTIVE HUB</span>
        </div>
        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white tracking-tight mb-8">
          互动<span className="text-[#39FF14]">中心</span>
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap
                ${activeTab === tab.id
                  ? 'text-white shadow-[0_0_15px_oklch(0.58_0.22_25/20%)]'
                  : 'text-[oklch(0.5_0.005_280)] hover:text-white bg-[oklch(0.12_0.01_280/60%)] border border-[oklch(1_0_0/6%)]'
                }
              `}
              style={activeTab === tab.id ? {
                backgroundColor: `${tab.color}20`,
                border: `1px solid ${tab.color}40`,
              } : undefined}
            >
              <tab.icon className="w-4 h-4" style={activeTab === tab.id ? { color: tab.color } : undefined} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'vote' && <VotingPanel />}
            {activeTab === 'cheer' && <CheeringPanel />}
            {activeTab === 'comment' && <CommentPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---- Voting Panel ---- */
function VotingPanel() {
  const { votes, hasVoted, voteForTeam } = useInteraction();
  const [animatingTeam, setAnimatingTeam] = useState<string | null>(null);

  // Combine base votes with user votes
  const teamVotes = TEAMS.map(team => ({
    ...team,
    totalVotes: team.votes + (votes[team.id] || 0),
  })).sort((a, b) => b.totalVotes - a.totalVotes);

  const maxVotes = Math.max(...teamVotes.map(t => t.totalVotes));

  const handleVote = (teamId: string) => {
    if (hasVoted) {
      toast.error('每台设备只能投出一票哦！');
      return;
    }
    setAnimatingTeam(teamId);
    voteForTeam(teamId);
    toast.success('投票成功！感谢你的支持！');
    setTimeout(() => setAnimatingTeam(null), 1000);
  };

  return (
    <div>
      <p className="text-sm font-body text-[oklch(0.5_0.005_280)] mb-6">
        为你支持的球队投上宝贵的一票！每台设备限投一次。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {teamVotes.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`
              glass-panel rounded-xl p-4 transition-all duration-300 cursor-pointer group
              ${animatingTeam === team.id ? 'ring-2 ring-[#DC2626] shadow-[0_0_30px_oklch(0.58_0.22_25/40%)]' : ''}
              ${hasVoted && votes[team.id] ? 'ring-1 ring-[#39FF14]/30' : ''}
            `}
            onClick={() => handleVote(team.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white">{team.city}</span>
                  <span className="font-mono text-xs text-[oklch(0.4_0.005_280)]">#{index + 1}</span>
                </div>
              </div>
            </div>

            {/* Vote bar */}
            <div className="mb-2">
              <div className="h-2 rounded-full bg-[oklch(0.12_0.01_280)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(team.totalVotes / maxVotes) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  style={{
                    background: `linear-gradient(90deg, ${team.color}, ${team.color}88)`,
                    boxShadow: `0 0 10px ${team.color}40`,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[oklch(0.5_0.005_280)]">
                {team.totalVotes.toLocaleString()} 票
              </span>
              {hasVoted && votes[team.id] ? (
                <span className="text-[10px] font-mono text-[#39FF14] flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> 已投票
                </span>
              ) : (
                <span className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] group-hover:text-[#DC2626] transition-colors">
                  点击投票
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Cheering Panel ---- */
function CheeringPanel() {
  const { cheerHeat, cheerSlogan } = useInteraction();
  const [selectedTeam, setSelectedTeam] = useState<Team>(TEAMS[0]);
  const [burstEffects, setBurstEffects] = useState<{ id: string; text: string }[]>([]);

  const handleCheer = (sloganId: string, text: string) => {
    cheerSlogan(sloganId);

    // Add burst effect
    const effectId = `${Date.now()}-${Math.random()}`;
    setBurstEffects(prev => [...prev, { id: effectId, text }]);
    setTimeout(() => {
      setBurstEffects(prev => prev.filter(e => e.id !== effectId));
    }, 1500);
  };

  return (
    <div>
      <p className="text-sm font-body text-[oklch(0.5_0.005_280)] mb-6">
        选择你支持的球队，为他们线上打气！点击口号即可增加热度。
      </p>

      {/* Team selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TEAMS.slice(0, 8).map(team => (
          <button
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-body font-medium transition-all whitespace-nowrap
              ${selectedTeam.id === team.id
                ? 'bg-[oklch(0.58_0.22_25/15%)] border border-[#DC2626]/30 text-white'
                : 'bg-[oklch(0.1_0.01_280/50%)] border border-[oklch(1_0_0/6%)] text-[oklch(0.5_0.005_280)]'
              }
            `}
          >
            <img src={team.logo} alt={team.name} className="w-5 h-5 rounded-full object-cover" />
            {team.city}
          </button>
        ))}
      </div>

      {/* Cheer slogans grid */}
      <div className="relative">
        {/* Burst effects */}
        <AnimatePresence>
          {burstEffects.map(effect => (
            <motion.div
              key={effect.id}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -60, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            >
              <span className="font-display text-2xl font-bold text-[#39FF14] whitespace-nowrap"
                style={{ textShadow: '0 0 20px #39FF14, 0 0 40px #39FF14' }}>
                {effect.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CHEER_SLOGANS.map(slogan => {
            const heat = cheerHeat[slogan.id] || 0;
            return (
              <motion.button
                key={slogan.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCheer(slogan.id, slogan.text)}
                className="glass-panel rounded-xl p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.85_0.3_142/20%)] group"
              >
                <div className="font-body text-base font-semibold text-white mb-2 group-hover:text-[#39FF14] transition-colors">
                  {slogan.text}
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span className="font-mono text-sm font-bold text-[#F59E0B]">{heat}</span>
                  <span className="font-mono text-[10px] text-[oklch(0.4_0.005_280)]">热度</span>
                </div>
              </motion.button>
            );
          })}

          {/* Custom team cheer */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleCheer(`team-${selectedTeam.id}`, selectedTeam.slogan);
            }}
            className="glass-panel rounded-xl p-4 text-center transition-all duration-300 border border-dashed border-[oklch(1_0_0/10%)] hover:border-[#DC2626]/40"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src={selectedTeam.logo} alt={selectedTeam.name} className="w-6 h-6 rounded-full object-cover" />
              <span className="font-body text-sm font-semibold text-white">{selectedTeam.city}专属</span>
            </div>
            <div className="font-body text-xs text-[oklch(0.5_0.005_280)] italic">"{selectedTeam.slogan}"</div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Zap className="w-3 h-3 text-[#DC2626]" />
              <span className="font-mono text-xs text-[oklch(0.4_0.005_280)]">点击打气</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ---- Comment Panel ---- */
function CommentPanel() {
  const { comments, addComment } = useInteraction();
  const [nickname, setNickname] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(TEAMS[0].id);
  const [content, setContent] = useState('');
  const [commentType, setCommentType] = useState<'cheer' | 'review'>('cheer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !content.trim()) {
      toast.error('请填写昵称和留言内容');
      return;
    }
    addComment({
      nickname: nickname.trim(),
      teamId: selectedTeamId,
      content: content.trim(),
      type: commentType,
    });
    setContent('');
    toast.success('留言发表成功！');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Comment form */}
      <div className="lg:col-span-2">
        <div className="glass-panel rounded-xl p-6 sticky top-20">
          <h4 className="font-display text-sm font-bold text-[oklch(0.6_0.005_280)] tracking-wider mb-4">
            发表留言
          </h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nickname */}
            <div>
              <label className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] tracking-wider mb-1 block">昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="输入你的昵称"
                maxLength={20}
                className="w-full px-3 py-2 rounded-lg bg-[oklch(0.1_0.01_280/60%)] border border-[oklch(1_0_0/8%)]
                           text-white font-body text-sm placeholder:text-[oklch(0.3_0.005_280)]
                           focus:border-[#00D4FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all"
              />
            </div>

            {/* Team select */}
            <div>
              <label className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] tracking-wider mb-1 block">支持球队</label>
              <select
                value={selectedTeamId}
                onChange={e => setSelectedTeamId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[oklch(0.1_0.01_280/60%)] border border-[oklch(1_0_0/8%)]
                           text-white font-body text-sm
                           focus:border-[#00D4FF]/40 focus:outline-none transition-all"
              >
                {TEAMS.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="flex gap-2">
              {[
                { type: 'cheer' as const, label: '赛前打气', color: '#39FF14' },
                { type: 'review' as const, label: '赛后评价', color: '#00D4FF' },
              ].map(t => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setCommentType(t.type)}
                  className={`
                    flex-1 py-2 rounded-lg text-xs font-body font-medium transition-all
                    ${commentType === t.type
                      ? 'text-white'
                      : 'text-[oklch(0.5_0.005_280)] bg-[oklch(0.1_0.01_280/40%)] border border-[oklch(1_0_0/6%)]'
                    }
                  `}
                  style={commentType === t.type ? {
                    backgroundColor: `${t.color}15`,
                    border: `1px solid ${t.color}40`,
                  } : undefined}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div>
              <label className="text-[10px] font-mono text-[oklch(0.4_0.005_280)] tracking-wider mb-1 block">留言内容</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={commentType === 'cheer' ? '为你的球队加油打气吧！' : '分享你的赛后感想...'}
                maxLength={200}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-[oklch(0.1_0.01_280/60%)] border border-[oklch(1_0_0/8%)]
                           text-white font-body text-sm placeholder:text-[oklch(0.3_0.005_280)] resize-none
                           focus:border-[#00D4FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/20 transition-all"
              />
              <div className="text-right text-[10px] font-mono text-[oklch(0.3_0.005_280)] mt-1">
                {content.length}/200
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00D4FF] text-[#0A0A0F] font-display text-sm font-bold tracking-wider
                         hover:bg-[#00D4FF]/90 transition-all shadow-[0_0_15px_oklch(0.75_0.15_220/30%)]"
            >
              <Send className="w-4 h-4" />
              发表留言
            </button>
          </form>
        </div>
      </div>

      {/* Comments list */}
      <div className="lg:col-span-3">
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {comments.length === 0 ? (
            <div className="glass-panel rounded-xl p-8 text-center">
              <MessageSquare className="w-8 h-8 text-[oklch(0.3_0.005_280)] mx-auto mb-3" />
              <p className="font-body text-sm text-[oklch(0.4_0.005_280)]">还没有留言，来做第一个发言的人吧！</p>
            </div>
          ) : (
            comments.map((comment, index) => {
              const team = TEAMS.find(t => t.id === comment.teamId);
              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {team && (
                      <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full object-cover" />
                    )}
                    <span className="font-body text-sm font-semibold text-white">{comment.nickname}</span>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: comment.type === 'cheer' ? '#39FF1415' : '#00D4FF15',
                        color: comment.type === 'cheer' ? '#39FF14' : '#00D4FF',
                      }}
                    >
                      {comment.type === 'cheer' ? '打气' : '评价'}
                    </span>
                    <span className="text-[10px] font-mono text-[oklch(0.3_0.005_280)] ml-auto">
                      {new Date(comment.timestamp).toLocaleString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-body text-sm text-[oklch(0.7_0.005_280)] leading-relaxed pl-9">
                    {comment.content}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
