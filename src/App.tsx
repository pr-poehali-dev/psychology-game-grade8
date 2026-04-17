import { useState } from "react";
import Icon from "@/components/ui/icon";
import HomePage from "./pages/HomePage";
import LevelsPage from "./pages/LevelsPage";
import AchievementsPage from "./pages/AchievementsPage";

type Page = "home" | "levels" | "achievements";

const NAV: { id: Page; label: string; emoji: string; icon: string }[] = [
  { id: "home", label: "Главная", emoji: "🏠", icon: "Home" },
  { id: "levels", label: "Уровни", emoji: "⚔️", icon: "Layers" },
  { id: "achievements", label: "Достижения", emoji: "🏆", icon: "Trophy" },
];

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen stars-bg">
      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5"
        style={{
          background: "hsl(230 25% 7% / 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid hsl(270 80% 65% / 0.15)",
        }}
      >
        <button onClick={() => setPage("home")} className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-orbitron font-black text-sm tracking-wider gradient-text">МозгоКвест</span>
        </button>

        {/* Top nav — desktop */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV.map((item) => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-rubik font-medium transition-all duration-200"
                style={{
                  background: active ? "hsl(270 80% 65% / 0.15)" : "transparent",
                  border: `1px solid ${active ? "hsl(270 80% 65% / 0.4)" : "transparent"}`,
                  color: active ? "hsl(270 80% 75%)" : "hsl(215 20% 55%)",
                }}
              >
                <span>{item.emoji}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="w-8" />
      </header>

      {/* Page content */}
      <main className="pt-14 pb-20 sm:pb-6">
        {page === "home" && <HomePage onNavigate={setPage} />}
        {page === "levels" && <LevelsPage />}
        {page === "achievements" && <AchievementsPage />}
      </main>

      {/* Bottom nav — mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex sm:hidden justify-around items-center px-2 py-2"
        style={{
          background: "hsl(230 25% 7% / 0.97)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid hsl(270 80% 65% / 0.15)",
        }}
      >
        {NAV.map((item) => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-all duration-200"
              style={{
                background: active ? "hsl(270 80% 65% / 0.12)" : "transparent",
                border: `1px solid ${active ? "hsl(270 80% 65% / 0.3)" : "transparent"}`,
              }}
            >
              <span className="text-lg">{item.emoji}</span>
              <span
                className="text-[10px] font-rubik font-medium"
                style={{ color: active ? "hsl(270 80% 75%)" : "hsl(215 20% 50%)" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
