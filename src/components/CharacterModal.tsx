import Icon from "@/components/ui/icon";
import { characters } from "@/data/characters";
import { useGameStore } from "@/store/gameStore";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CharacterModal({ open, onClose }: Props) {
  const { selectedCharacter, setCharacter } = useGameStore();
  const [preview, setPreview] = useState(selectedCharacter ?? characters[0]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: "hsl(230 25% 5% / 0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden animate-scale-in"
        style={{ background: "hsl(230 20% 9%)", border: "1px solid hsl(270 80% 65% / 0.25)" }}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid hsl(230 20% 15%)" }}>
          <div>
            <h2 className="font-orbitron font-bold text-xl gradient-text">Выбор героя</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Каждый герой открывает уникальную способность</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
            <Icon name="X" size={16} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Character list */}
          <div className="sm:w-44 p-4 flex sm:flex-col gap-2 flex-shrink-0"
            style={{ borderRight: "1px solid hsl(230 20% 15%)" }}>
            {characters.map(char => (
              <button
                key={char.id}
                onClick={() => setPreview(char)}
                className="flex items-center gap-2 p-3 rounded-xl text-left transition-all duration-200 w-full"
                style={{
                  background: preview.id === char.id ? "hsl(270 80% 65% / 0.15)" : "transparent",
                  border: `1px solid ${preview.id === char.id ? "hsl(270 80% 65% / 0.4)" : "transparent"}`,
                }}
              >
                <span className="text-2xl">{char.avatar}</span>
                <div className="hidden sm:block min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">{char.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{char.title}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="flex-1 p-6">
            <div className="text-center mb-5">
              <div className="text-7xl mb-3 animate-float inline-block">{preview.avatar}</div>
              <h3 className="font-orbitron font-black text-2xl gradient-text">{preview.name}</h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mt-1 text-xs font-medium"
                style={{ background: "hsl(270 80% 65% / 0.15)", border: "1px solid hsl(270 80% 65% / 0.3)", color: "hsl(270 80% 75%)" }}>
                {preview.title}
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-rubik text-center mb-5 leading-relaxed">
              {preview.story}
            </p>

            {/* Ability */}
            <div className="rounded-xl p-4 mb-5"
              style={{ background: "hsl(270 80% 65% / 0.08)", border: "1px solid hsl(270 80% 65% / 0.2)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Icon name={preview.abilityIcon} size={16} className="text-primary" />
                <span className="font-bold text-sm text-primary font-orbitron">{preview.ability}</span>
              </div>
              <p className="text-xs text-muted-foreground font-rubik">{preview.abilityDesc}</p>
            </div>

            {/* Stats */}
            <div className="space-y-2.5 mb-6">
              {[
                { label: preview.stat1.label, value: preview.stat1.value },
                { label: preview.stat2.label, value: preview.stat2.value },
                { label: preview.stat3.label, value: preview.stat3.value },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 shrink-0">{stat.label}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted">
                    <div
                      className="h-full rounded-full progress-bar transition-all duration-700"
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                  <span className="text-xs font-orbitron font-bold text-primary w-6 text-right">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Select button */}
            <button
              onClick={() => { setCharacter(preview); onClose(); }}
              className="w-full py-3 rounded-xl font-orbitron font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: selectedCharacter?.id === preview.id
                  ? "hsl(160 80% 45% / 0.2)"
                  : "linear-gradient(135deg, hsl(270 80% 55%), hsl(200 80% 45%))",
                color: selectedCharacter?.id === preview.id ? "hsl(160 80% 65%)" : "#fff",
                border: selectedCharacter?.id === preview.id ? "1px solid hsl(160 80% 45% / 0.4)" : "none",
                boxShadow: selectedCharacter?.id === preview.id ? "none" : "0 0 20px hsl(270 80% 65% / 0.4)",
              }}
            >
              {selectedCharacter?.id === preview.id ? "✓ Уже выбран" : `Выбрать ${preview.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}