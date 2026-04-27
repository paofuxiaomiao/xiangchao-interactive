/* Cyber Arena - Player card with rating capability */
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useInteraction } from '@/contexts/InteractionContext';
import { toast } from 'sonner';
import type { Player } from '@/lib/data';

interface PlayerCardProps {
  player: Player;
  teamColor: string;
  compact?: boolean;
}

export default function PlayerCard({ player, teamColor, compact }: PlayerCardProps) {
  const { ratePlayer, ratedPlayers, getPlayerAvgRating } = useInteraction();
  const [hoverRating, setHoverRating] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const hasRated = ratedPlayers.includes(player.id);
  const avgRating = getPlayerAvgRating(player.id, player.baseRating);

  const handleRate = (star: number) => {
    ratePlayer(player.id, star);
    toast.success(`已为 ${player.name} 评分 ${star} 星`, {
      style: { background: '#1a1a2e', border: `1px solid ${teamColor}40`, color: '#fff' },
    });
  };

  if (compact) {
    return (
      <div className="group">
        <div
          className="flex items-center gap-3 p-2.5 rounded-lg bg-[oklch(0.1_0.01_280/50%)] hover:bg-[oklch(0.12_0.01_280/60%)] transition-colors cursor-pointer"
          onClick={() => !hasRated && setShowRating(!showRating)}
        >
          {/* Number badge */}
          <div
            className="w-8 h-8 rounded flex items-center justify-center font-mono text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: `${teamColor}30`, border: `1px solid ${teamColor}50` }}
          >
            {player.number}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-body text-sm font-semibold text-white truncate">{player.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[oklch(1_0_0/5%)] text-[oklch(0.5_0.005_280)]">
                {player.position}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-mono text-[oklch(0.4_0.005_280)]">
                {player.height}cm / {player.weight}kg
              </span>
              <span className="text-[10px] font-mono text-[oklch(0.4_0.005_280)]">
                ⚽{player.goals} 🅰️{player.assists}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 shrink-0">
            {!hasRated && (
              <span className="text-[9px] font-mono text-[oklch(0.35_0.005_280)] opacity-0 group-hover:opacity-100 transition-opacity mr-1">
                点击评分
              </span>
            )}
            <Star className="w-3 h-3 text-[#F59E0B]" fill="#F59E0B" />
            <span className="font-mono text-sm font-bold" style={{ color: teamColor }}>
              {avgRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Expandable rating stars */}
        {showRating && !hasRated && (
          <div className="flex items-center justify-center gap-2 py-2 px-3 mt-1 rounded-lg bg-[oklch(0.08_0.01_280/80%)] border border-[oklch(1_0_0/6%)]">
            <span className="text-[10px] font-mono text-[oklch(0.5_0.005_280)] mr-2">为 {player.name} 评分:</span>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRate(star);
                  setShowRating(false);
                }}
                className="transition-all hover:scale-125 p-0.5"
              >
                <Star
                  className="w-5 h-5"
                  fill={star <= (hoverRating || 0) ? '#F59E0B' : 'transparent'}
                  stroke={star <= (hoverRating || 0) ? '#F59E0B' : 'oklch(0.3 0.005 280)'}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl p-4 hover:shadow-[0_0_20px_oklch(0.58_0.22_25/15%)] transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Number */}
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center font-display text-2xl font-black text-white"
          style={{ backgroundColor: `${teamColor}25`, border: `1px solid ${teamColor}40` }}
        >
          {player.number}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-display text-lg font-bold text-white">{player.name}</h4>
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ backgroundColor: `${teamColor}20`, color: teamColor }}
            >
              {player.position}
            </span>
          </div>

          <div className="flex gap-4 text-xs font-mono text-[oklch(0.5_0.005_280)] mb-3">
            <span>{player.height}cm</span>
            <span>{player.weight}kg</span>
            <span>⚽ {player.goals}球</span>
            <span>🅰️ {player.assists}助攻</span>
          </div>

          {/* Mini stat bars */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {Object.entries(player.stats).map(([key, value]) => {
              const labels: Record<string, string> = {
                speed: '速度', shooting: '射门', passing: '传球',
                defense: '防守', stamina: '体能', technique: '技术',
              };
              return (
                <div key={key}>
                  <div className="flex justify-between text-[9px] font-mono text-[oklch(0.4_0.005_280)] mb-0.5">
                    <span>{labels[key]}</span>
                    <span style={{ color: teamColor }}>{value}</span>
                  </div>
                  <div className="h-1 rounded-full bg-[oklch(0.15_0.01_280)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${teamColor}, ${teamColor}88)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-xs font-mono text-[oklch(0.5_0.005_280)]">评分:</span>
              <span className="font-mono text-lg font-bold" style={{ color: teamColor }}>
                {avgRating.toFixed(1)}
              </span>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  disabled={hasRated}
                  onMouseEnter={() => !hasRated && setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRate(star)}
                  className={`transition-all ${hasRated ? 'cursor-default' : 'hover:scale-125'}`}
                >
                  <Star
                    className="w-4 h-4"
                    fill={star <= (hoverRating || Math.round(avgRating)) ? '#F59E0B' : 'transparent'}
                    stroke={star <= (hoverRating || Math.round(avgRating)) ? '#F59E0B' : 'oklch(0.3 0.005 280)'}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
