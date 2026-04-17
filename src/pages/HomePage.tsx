import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useGameStore } from "@/store/gameStore";
import CharacterModal from "@/components/CharacterModal";
import { characters } from "@/data/characters";

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

export default function HomePage() {
  const { xp, level, coins, streak, selectedCharacter } = useGameStore();
  const [charModalOpen, setCharModalOpen] = useState(false);

  const xpToNext = level * 500;
  const xpProgress = ((xp % 500) / 500) * 100;

  return (
    <div className="min-h-screen stars-bg relative overflow-hidden pt-16">
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
            opacity: 0.3,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Ambient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 py-10">
        {/* Hero section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            <Icon name="Sparkles" size={14} />
            Психологическая квест-игра
          </div>
          <h1 className="font-orbitron font-black text-5xl sm:text-6xl mb-4 leading-tight">
            <span className="gradient-text">QUEST</span>
            <br />
            <span className="text-foreground">MIND</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Исследуй себя, прокачивай навыки и покоряй уровни вместе со своим персонажем
          </p>
        </div>

        {/* Player card */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Character display */}
            <button
              onClick={() => setCharModalOpen(true)}
              className="relative flex-shrink-0 group"
            >
              <div className={`w-24 h-24 rounded-2xl border-2 flex items-center justify-center text-5xl transition-all duration-300 ${
                selectedCharacter
                  ? `border-primary/60 bg-primary/10 group-hover:scale-105 ${selectedCharacter.glowColor} shadow-lg`
                  : "border-dashed border-muted-foreground/40 bg-muted/20 group-hover:border-primary/50"
              }`}>
                {selectedCharacter ? selectedCharacter.avatar : <Icon name="Plus" size={32} className="text-muted-foreground" />}
              </div>
              {selectedCharacter && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  {selectedCharacter.title}
                </div>
              )}
              {!selectedCharacter && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                  Выбрать героя
                </div>
              )}
            </button>

            {/* Stats */}
            <div className="flex-1 w-full mt-4 sm:mt-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-orbitron font-bold text-xl text-foreground">
                    {selectedCharacter ? selectedCharacter.name : "Герой не выбран"}
                  </h2>
                  <p className="text-muted-foreground text-sm">Уровень {level} • {xp} XP</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-orbitron font-black text-primary">{level}</div>
                  <div className="text-xs text-muted-foreground">уровень</div>
                </div>
              </div>

              {/* XP bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Опыт</span>
                  <span>{xp % 500} / 500</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full progress-bar rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Mini stats row */}
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <Icon name="Flame" size={14} className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">{streak} серия</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🪙</span>
                  <span className="text-sm font-medium text-yellow-400">{coins} монет</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Trophy" size={14} className="text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">2 ачивки</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/levels"
            className="group relative bg-card border border-border hover:border-primary/50 rounded-2xl p-6 card-hover overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-4xl mb-3">⚔️</div>
            <h3 className="font-orbitron font-bold text-base text-foreground mb-1">Играть</h3>
            <p className="text-sm text-muted-foreground">Продолжи с уровня 3</p>
            <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
              Начать <Icon name="ArrowRight" size={14} />
            </div>
          </Link>

          <button
            onClick={() => setCharModalOpen(true)}
            className="group relative bg-card border border-border hover:border-secondary/50 rounded-2xl p-6 card-hover overflow-hidden text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-4xl mb-3">🧙</div>
            <h3 className="font-orbitron font-bold text-base text-foreground mb-1">Персонаж</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCharacter ? `Сменить с ${selectedCharacter.name}` : "Выбери своего героя"}
            </p>
            <div className="mt-4 flex items-center gap-1 text-secondary text-sm font-medium">
              Выбрать <Icon name="ArrowRight" size={14} />
            </div>
          </button>

          <Link
            to="/achievements"
            className="group relative bg-card border border-border hover:border-accent/50 rounded-2xl p-6 card-hover overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-orbitron font-bold text-base text-foreground mb-1">Достижения</h3>
            <p className="text-sm text-muted-foreground">2 из 6 открыто</p>
            <div className="mt-4 flex items-center gap-1 text-accent text-sm font-medium">
              Смотреть <Icon name="ArrowRight" size={14} />
            </div>
          </Link>
        </div>

        {/* Characters preview */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-orbitron font-bold text-lg text-foreground">Герои</h2>
            <button onClick={() => setCharModalOpen(true)} className="text-sm text-primary hover:underline">
              Выбрать
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => setCharModalOpen(true)}
                className={`relative bg-card border rounded-xl p-4 text-center card-hover transition-all duration-300 ${
                  selectedCharacter?.id === char.id
                    ? "border-primary/60 bg-primary/10"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div className="text-4xl mb-2">{char.avatar}</div>
                <div className="font-bold text-sm text-foreground">{char.name}</div>
                <div className="text-xs text-muted-foreground">{char.title}</div>
                {selectedCharacter?.id === char.id && (
                  <div className="absolute top-2 right-2">
                    <Icon name="CheckCircle" size={14} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Daily challenge banner */}
        <div className="mt-8 relative bg-gradient-to-r from-purple-900/40 via-card to-cyan-900/40 border border-primary/30 rounded-2xl p-6 overflow-hidden animate-pulse-glow">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-20 animate-float">⭐</div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={16} className="text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Ежедневный вызов</span>
            </div>
            <h3 className="font-orbitron font-bold text-lg text-foreground mb-1">
              «Зеркало эмоций»
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Определи своё настроение и исследуй, что за ним стоит. +200 XP за прохождение
            </p>
            <Link to="/levels" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity">
              Принять вызов
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
        </div>
      </div>

      <CharacterModal open={charModalOpen} onClose={() => setCharModalOpen(false)} />
    </div>
  );
}
