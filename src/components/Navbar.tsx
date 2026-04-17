import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useGameStore } from "@/store/gameStore";

const navItems = [
  { path: "/", label: "Главная", icon: "Home" },
  { path: "/levels", label: "Уровни", icon: "Map" },
  { path: "/achievements", label: "Достижения", icon: "Trophy" },
];

export default function Navbar() {
  const location = useLocation();
  const { xp, coins, streak, selectedCharacter } = useGameStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🎮</span>
          <span className="font-orbitron font-bold text-lg gradient-text hidden sm:block">
            QuestMind
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span className="hidden sm:block">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {streak > 0 && (
            <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1">
              <Icon name="Flame" size={14} className="text-orange-400" />
              <span className="text-xs font-bold text-orange-400">{streak}</span>
            </div>
          )}
          <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1">
            <span className="text-xs">🪙</span>
            <span className="text-xs font-bold text-yellow-400">{coins}</span>
          </div>
          <div className="flex items-center gap-1 bg-primary/20 border border-primary/30 rounded-full px-3 py-1">
            <Icon name="Zap" size={14} className="text-primary" />
            <span className="text-xs font-bold text-primary">{xp} XP</span>
          </div>
          {selectedCharacter && (
            <span className="text-xl">{selectedCharacter.avatar}</span>
          )}
        </div>
      </div>
    </header>
  );
}