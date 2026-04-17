export interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string;
  color: string;
  glowColor: string;
  story: string;
  ability: string;
  abilityDesc: string;
  abilityIcon: string;
  stat1: { label: string; value: number };
  stat2: { label: string; value: number };
  stat3: { label: string; value: number };
}

export const characters: Character[] = [
  {
    id: "archer",
    name: "Артём",
    title: "Стратег",
    avatar: "🏹",
    color: "from-cyan-500 to-blue-600",
    glowColor: "shadow-cyan-500/40",
    story:
      "Артём — тихий парень, который всегда думает наперёд. Он анализирует каждую ситуацию и находит неожиданные решения. Его сила — в терпении и точном расчёте.",
    ability: "Точный выстрел",
    abilityDesc: "Пропустить сложный вопрос и вернуться без штрафа",
    abilityIcon: "Target",
    stat1: { label: "Интеллект", value: 90 },
    stat2: { label: "Скорость", value: 60 },
    stat3: { label: "Удача", value: 70 },
  },
  {
    id: "mage",
    name: "Майя",
    title: "Волшебница",
    avatar: "🔮",
    color: "from-purple-500 to-pink-600",
    glowColor: "shadow-purple-500/40",
    story:
      "Майя обладает редким даром — она чувствует скрытые связи между идеями. Книги открывают ей двери в другие миры. Её магия — это знания, которые она превращает в силу.",
    ability: "Магический взгляд",
    abilityDesc: "Подсказка на сложном уровне один раз за сессию",
    abilityIcon: "Sparkles",
    stat1: { label: "Интеллект", value: 95 },
    stat2: { label: "Скорость", value: 75 },
    stat3: { label: "Удача", value: 80 },
  },
  {
    id: "warrior",
    name: "Никита",
    title: "Воин",
    avatar: "⚔️",
    color: "from-orange-500 to-red-600",
    glowColor: "shadow-orange-500/40",
    story:
      "Никита никогда не сдаётся. Каждая неудача делает его сильнее. Он идёт вперёд даже когда всё против него — и именно поэтому всегда побеждает.",
    ability: "Второй шанс",
    abilityDesc: "Одна дополнительная попытка на провальном уровне",
    abilityIcon: "Shield",
    stat1: { label: "Интеллект", value: 70 },
    stat2: { label: "Скорость", value: 85 },
    stat3: { label: "Удача", value: 65 },
  },
  {
    id: "rogue",
    name: "Соня",
    title: "Разведчик",
    avatar: "🗡️",
    color: "from-green-500 to-teal-600",
    glowColor: "shadow-green-500/40",
    story:
      "Соня действует быстро и незаметно. Она замечает то, что другие упускают, и использует это с умом. Её девиз: знай всё, покажи малое.",
    ability: "Разведка",
    abilityDesc: "Видеть количество правильных ответов до выбора",
    abilityIcon: "Eye",
    stat1: { label: "Интеллект", value: 80 },
    stat2: { label: "Скорость", value: 95 },
    stat3: { label: "Удача", value: 75 },
  },
];

export const achievements = [
  {
    id: "first_win",
    title: "Первая победа",
    description: "Пройди первый уровень",
    icon: "Trophy",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    unlocked: true,
  },
  {
    id: "speed_run",
    title: "Спидраннер",
    description: "Пройди уровень за 60 секунд",
    icon: "Zap",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    unlocked: true,
  },
  {
    id: "perfect",
    title: "Перфекционист",
    description: "Ответь правильно на все вопросы",
    icon: "Star",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    unlocked: false,
  },
  {
    id: "streak5",
    title: "Серия х5",
    description: "5 правильных ответов подряд",
    icon: "Flame",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    unlocked: false,
  },
  {
    id: "explorer",
    title: "Исследователь",
    description: "Открой все локации",
    icon: "Map",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/30",
    unlocked: false,
  },
  {
    id: "legend",
    title: "Легенда",
    description: "Набери 10 000 очков",
    icon: "Crown",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    unlocked: false,
  },
];

export const levels = [
  {
    id: 1,
    title: "Лес начала",
    description: "Первые шаги в мире знаний",
    icon: "🌲",
    difficulty: "Легко",
    difficultyColor: "text-green-400",
    xp: 100,
    stars: 3,
    unlocked: true,
    completed: true,
  },
  {
    id: 2,
    title: "Пещера загадок",
    description: "Тёмные коридоры таят сюрпризы",
    icon: "🕌",
    difficulty: "Легко",
    difficultyColor: "text-green-400",
    xp: 150,
    stars: 2,
    unlocked: true,
    completed: true,
  },
  {
    id: 3,
    title: "Горный перевал",
    description: "Испытание на выносливость",
    icon: "⛰️",
    difficulty: "Средне",
    difficultyColor: "text-yellow-400",
    xp: 200,
    stars: 1,
    unlocked: true,
    completed: false,
  },
  {
    id: 4,
    title: "Замок иллюзий",
    description: "Ничто не то, чем кажется",
    icon: "🏰",
    difficulty: "Средне",
    difficultyColor: "text-yellow-400",
    xp: 250,
    stars: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 5,
    title: "Вулкан хаоса",
    description: "Огненное испытание разума",
    icon: "🌋",
    difficulty: "Сложно",
    difficultyColor: "text-orange-400",
    xp: 350,
    stars: 0,
    unlocked: false,
    completed: false,
  },
  {
    id: 6,
    title: "Небесная цитадель",
    description: "Финальная битва знаний",
    icon: "🌌",
    difficulty: "Эпик",
    difficultyColor: "text-purple-400",
    xp: 500,
    stars: 0,
    unlocked: false,
    completed: false,
  },
];