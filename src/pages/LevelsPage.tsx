import { useState } from "react";
import Icon from "@/components/ui/icon";
import { levels } from "@/data/characters";
import { useGameStore } from "@/store/gameStore";

function StarRating({ count, max = 3 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-sm ${i < count ? "text-yellow-400" : "text-muted/40"}`}>★</span>
      ))}
    </div>
  );
}

export default function LevelsPage() {
  const { xp, selectedCharacter, addXp, addCoins } = useGameStore();
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  const [completedNow, setCompletedNow] = useState<number[]>([]);

  function handleStart(id: number) {
    setActiveLevel(id);
    setTimeout(() => {
      setActiveLevel(null);
      if (!completedNow.includes(id)) {
        setCompletedNow(prev => [...prev, id]);
        const lvl = levels.find(l => l.id === id);
        if (lvl) {
          addXp(lvl.xp);
          addCoins(50);
        }
      }
    }, 2000);
  }

  const worldGroups = [
    { title: "Мир 1 — Лес Начала", ids: [1, 2], emoji: "🌲" },
    { title: "Мир 2 — Горы Разума", ids: [3, 4], emoji: "⛰️" },
    { title: "Мир 3 — Огненный Чертог", ids: [5, 6], emoji: "🔥" },
  ];

  return (
    <div className="min-h-screen pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-orbitron font-black text-3xl gradient-text mb-1">Уровни</h1>
          <p className="text-muted-foreground text-sm">
            Пройди все испытания и познай себя
          </p>
        </div>

        {/* Overall progress bar */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Общий прогресс</span>
            <span className="text-sm font-bold text-primary">
              {levels.filter(l => l.completed || completedNow.includes(l.id)).length} / {levels.length}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full progress-bar rounded-full transition-all duration-700"
              style={{
                width: `${(levels.filter(l => l.completed || completedNow.includes(l.id)).length / levels.length) * 100}%`
              }}
            />
          </div>
          {selectedCharacter && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{selectedCharacter.avatar}</span>
              <span>Способность: <span className="text-primary">{selectedCharacter.ability}</span></span>
            </div>
          )}
        </div>

        {/* Level groups */}
        {worldGroups.map((world, wIdx) => (
          <div key={world.title} className="mb-8 animate-fade-in" style={{ animationDelay: `${0.1 + wIdx * 0.1}s` }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{world.emoji}</span>
              <h2 className="font-orbitron font-bold text-sm text-muted-foreground uppercase tracking-wider">
                {world.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levels.filter(l => world.ids.includes(l.id)).map((lvl) => {
                const done = lvl.completed || completedNow.includes(lvl.id);
                const locked = !lvl.unlocked && !done;
                const loading = activeLevel === lvl.id;

                return (
                  <div
                    key={lvl.id}
                    className={`relative bg-card border rounded-2xl p-5 transition-all duration-300 overflow-hidden
                      ${locked ? "opacity-50 cursor-not-allowed border-border" : "card-hover cursor-pointer border-border hover:border-primary/40"}
                      ${done ? "border-primary/30 bg-primary/5" : ""}
                    `}
                  >
                    {/* Background glow for completed */}
                    {done && (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                    )}

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                          ${done ? "bg-primary/20 border border-primary/30" : "bg-muted/50 border border-border"}
                        `}>
                          {locked ? "🔒" : lvl.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-orbitron font-bold text-sm text-foreground">{lvl.title}</span>
                            <span className={`text-xs font-medium ${lvl.difficultyColor}`}>{lvl.difficulty}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{lvl.description}</p>
                          <StarRating count={done ? (lvl.stars || 1) : 0} />
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-accent font-bold">
                          <Icon name="Zap" size={12} />
                          {lvl.xp} XP
                        </div>
                        {!locked && (
                          <button
                            onClick={() => !loading && !done && handleStart(lvl.id)}
                            disabled={loading || done}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                              ${done
                                ? "bg-primary/20 text-primary border border-primary/30 cursor-default"
                                : loading
                                  ? "bg-muted text-muted-foreground cursor-wait"
                                  : "bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
                              }
                            `}
                          >
                            {done ? "✓ Пройдено" : loading ? "Загрузка..." : "Играть"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Hint */}
        <div className="text-center text-xs text-muted-foreground/60 mt-4">
          Пройди предыдущие уровни, чтобы открыть следующие
        </div>
      </div>
    </div>
  );
}
