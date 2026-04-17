import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useGameStore } from "@/store/gameStore";
import CharacterModal from "@/components/CharacterModal";
import { characters } from "@/data/characters";

type Page = "home" | "levels" | "achievements";

interface Props {
  onNavigate: (p: Page) => void;
}

const STARS = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: (i * 37 + 13) % 100,
  top: (i * 53 + 7) % 100,
  size: (i % 3) + 1,
  delay: (i * 0.3) % 5,
  duration: 2 + (i % 3),
}));

export default function HomePage({ onNavigate }: Props) {
  const { xp, level, coins, streak, selectedCharacter } = useGameStore();
  const [charModalOpen, setCharModalOpen] = useState(false);

  const xpProgress = ((xp % 500) / 500) * 100;

  return (
    <div className="min-h-screen stars-bg relative overflow-hidden">
      {/* Floating stars */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: 0.25,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-xs text-primary mb-5 font-rubik">
            <Icon name="Sparkles" size={12} />
            Психологическая квест-игра
          </div>
          <h1 className="font-orbitron font-black text-4xl sm:text-6xl mb-4 leading-tight">
            <span className="gradient-text">МОЗГО</span>
            <span className="text-foreground">КВЕСТ</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-sm mx-auto font-rubik">
            Исследуй себя, прокачивай навыки и покоряй уровни вместе со своим персонажем
          </p>
        </div>

        {/* Player card */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-5">
            {/* Character avatar */}
            <button onClick={() => setCharModalOpen(true)} className="relative flex-shrink-0 group">
              <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl transition-all duration-300
                ${selectedCharacter
                  ? "border-primary/60 bg-primary/10 group-hover:scale-105 shadow-lg"
                  : "border-dashed border-muted-foreground/40 bg-muted/20 group-hover:border-primary/50"
                }`}
                style={selectedCharacter ? { boxShadow: "0 0 20px hsl(270 80% 65% / 0.3)" } : {}}>
                {selectedCharacter
                  ? selectedCharacter.avatar
                  : <Icon name="Plus" size={28} className="text-muted-foreground" />}
              </div>
              {selectedCharacter && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap font-orbitron">
                  {selectedCharacter.title}
                </div>
              )}
              {!selectedCharacter && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap">
                  Выбрать героя
                </div>
              )}
            </button>

            {/* Stats */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="font-orbitron font-bold text-base text-foreground">
                    {selectedCharacter ? selectedCharacter.name : "Герой не выбран"}
                  </h2>
                  <p className="text-muted-foreground text-xs font-rubik">Уровень {level} · {xp} XP</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-orbitron font-black text-primary">{level}</div>
                  <div className="text-[10px] text-muted-foreground font-rubik">ур.</div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                <div className="h-full progress-bar rounded-full transition-all duration-700" style={{ width: `${xpProgress}%` }} />
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1">
                  <Icon name="Flame" size={13} className="text-orange-400" />
                  <span className="text-xs font-medium text-orange-400 font-rubik">{streak} серия</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs">🪙</span>
                  <span className="text-xs font-medium text-yellow-400 font-rubik">{coins}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Trophy" size={13} className="text-purple-400" />
                  <span className="text-xs font-medium text-purple-400 font-rubik">2 ачивки</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
          {[
            { emoji: "⚔️", title: "Играть", desc: "Продолжи с уровня 3", cta: "Начать", page: "levels" as Page, color: "hsl(270 80% 65%)" },
            { emoji: "🧙", title: "Персонаж", desc: selectedCharacter ? `Играешь за ${selectedCharacter.name}` : "Выбери героя", cta: "Выбрать", page: null, color: "hsl(200 80% 55%)" },
            { emoji: "🏆", title: "Достижения", desc: "2 из 6 открыто", cta: "Смотреть", page: "achievements" as Page, color: "hsl(45 100% 55%)" },
          ].map((action) => (
            <button
              key={action.title}
              onClick={() => action.page ? onNavigate(action.page) : setCharModalOpen(true)}
              className="group relative bg-card border border-border rounded-2xl p-5 text-left card-hover overflow-hidden"
              style={{ borderColor: "hsl(230 20% 18%)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = action.color + "44")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(230 20% 18%)")}
            >
              <div className="text-3xl mb-2">{action.emoji}</div>
              <h3 className="font-orbitron font-bold text-sm text-foreground mb-0.5">{action.title}</h3>
              <p className="text-xs text-muted-foreground font-rubik mb-3">{action.desc}</p>
              <div className="flex items-center gap-1 text-xs font-medium font-rubik" style={{ color: action.color }}>
                {action.cta} <Icon name="ArrowRight" size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* Characters row */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-orbitron font-bold text-base text-foreground">Герои</h2>
            <button onClick={() => setCharModalOpen(true)} className="text-xs text-primary hover:underline font-rubik">Выбрать →</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => setCharModalOpen(true)}
                className="relative bg-card border rounded-xl p-3 text-center card-hover transition-all duration-300"
                style={{
                  borderColor: selectedCharacter?.id === char.id ? "hsl(270 80% 65% / 0.6)" : "hsl(230 20% 18%)",
                  background: selectedCharacter?.id === char.id ? "hsl(270 80% 65% / 0.08)" : "",
                }}
              >
                <div className="text-3xl mb-1">{char.avatar}</div>
                <div className="font-bold text-xs text-foreground font-rubik">{char.name}</div>
                <div className="text-[10px] text-muted-foreground font-rubik">{char.title}</div>
                {selectedCharacter?.id === char.id && (
                  <div className="absolute top-1.5 right-1.5">
                    <Icon name="CheckCircle" size={12} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Daily challenge */}
        <div className="relative bg-gradient-to-r from-purple-900/30 via-card to-cyan-900/30 border border-primary/25 rounded-2xl p-5 overflow-hidden animate-pulse-glow animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 animate-float pointer-events-none">⭐</div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Calendar" size={14} className="text-accent" />
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-orbitron">Ежедневный вызов</span>
            </div>
            <h3 className="font-orbitron font-bold text-base text-foreground mb-1">«Зеркало эмоций»</h3>
            <p className="text-xs text-muted-foreground mb-4 font-rubik">Определи настроение и исследуй, что за ним стоит. +200 XP</p>
            <button
              onClick={() => onNavigate("levels")}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold font-orbitron transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, hsl(270 80% 55%), hsl(200 80% 45%))", color: "#fff", boxShadow: "0 0 20px hsl(270 80% 65% / 0.4)" }}>
              Принять вызов <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      <CharacterModal open={charModalOpen} onClose={() => setCharModalOpen(false)} />
    </div>
  );
}
