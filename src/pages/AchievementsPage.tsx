import Icon from "@/components/ui/icon";
import { achievements } from "@/data/characters";
import { useGameStore } from "@/store/gameStore";

export default function AchievementsPage() {
  const { xp, level, coins, streak } = useGameStore();

  const unlocked = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;

  return (
    <div className="min-h-screen pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-orbitron font-black text-3xl gradient-text mb-1">Достижения</h1>
          <p className="text-muted-foreground text-sm">Твои награды за смелость и знания</p>
        </div>

        {/* Progress summary */}
        <div className="bg-card border border-border rounded-2xl p-5 mb-8 animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Открыто достижений</span>
            <span className="font-orbitron font-bold text-primary">{unlocked} / {total}</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full transition-all duration-700 progress-bar"
              style={{ width: `${(unlocked / total) * 100}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Уровень", value: level, icon: "⚔️" },
              { label: "Опыт", value: `${xp} XP`, icon: "⚡" },
              { label: "Монеты", value: coins, icon: "🪙" },
            ].map(s => (
              <div key={s.label} className="text-center rounded-xl py-3"
                style={{ background: "hsl(230 20% 13%)", border: "1px solid hsl(230 20% 20%)" }}>
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-orbitron font-bold text-sm text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak card */}
        {streak > 0 && (
          <div className="rounded-2xl p-4 mb-6 flex items-center gap-4 animate-fade-in"
            style={{
              background: "linear-gradient(135deg, hsl(25 100% 55% / 0.15), hsl(230 20% 10%))",
              border: "1px solid hsl(25 100% 55% / 0.35)"
            }}>
            <div className="text-4xl animate-float">🔥</div>
            <div>
              <div className="font-orbitron font-bold text-lg text-orange-400">{streak}-дневная серия!</div>
              <div className="text-xs text-muted-foreground font-rubik">Не прерывай — скоро новая награда</div>
            </div>
          </div>
        )}

        {/* Achievements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach, idx) => (
            <div
              key={ach.id}
              className={`relative rounded-2xl p-5 transition-all duration-300 overflow-hidden
                ${ach.unlocked ? "card-hover" : "opacity-50"}
              `}
              style={{
                background: ach.unlocked ? ach.bgColor.replace("/10", "/15") : "hsl(230 20% 10%)",
                border: `1px solid ${ach.unlocked ? ach.borderColor.replace("/30", "/50") : "hsl(230 20% 18%)"}`,
                boxShadow: ach.unlocked ? `0 0 20px ${ach.bgColor.replace("bg-", "").replace("/10", "")} / 0.2)` : "none",
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              {/* Shimmer for unlocked */}
              {ach.unlocked && (
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${ach.color.replace("text-", "")}, transparent)` }} />
              )}

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                  ${ach.unlocked ? ach.bgColor : "bg-muted/30"}
                `}
                  style={{ border: `1px solid ${ach.unlocked ? ach.borderColor.replace("/30", "/50") : "hsl(230 20% 20%)"}` }}>
                  {ach.unlocked
                    ? <Icon name={ach.icon} size={22} className={ach.color} />
                    : <Icon name="Lock" size={20} className="text-muted-foreground" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-orbitron font-bold text-sm ${ach.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {ach.title}
                    </span>
                    {ach.unlocked && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-rubik font-medium"
                        style={{
                          background: "hsl(160 80% 45% / 0.2)",
                          color: "hsl(160 80% 55%)",
                          border: "1px solid hsl(160 80% 45% / 0.3)"
                        }}>
                        ✓ Получено
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-rubik">{ach.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational footer */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-sm text-muted-foreground font-rubik">
            Ещё <span className="text-primary font-bold">{total - unlocked}</span> достижений ждут тебя — иди играть!
          </p>
        </div>
      </div>
    </div>
  );
}
