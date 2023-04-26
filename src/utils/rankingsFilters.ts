type getRankingsFiltersProps = {
  theme: string;
  difficulty: string;
  length: string;
  region: string;
};

export function getRankingsFilters({ theme, difficulty, length, region }: getRankingsFiltersProps) {
  const rankingsFilters = {
    theme: {
      title: "theme",
      default: { value: theme, label: theme },
      options: [
        { value: "flags", label: "flags" },
        { value: "capitals", label: "capitals" },
        { value: "demography", label: "demography" },
        { value: "borders", label: "borders" },
        { value: "areas", label: "areas" },
      ],
    },
    region: {
      title: "continent",
      default: { value: region, label: region },
      options: [
        { value: "world", label: "world" },
        { value: "europe", label: "europe" },
        { value: "africa", label: "africa" },
        { value: "asia", label: "asia" },
        { value: "americas", label: "americas" },
        { value: "oceania", label: "oceania" },
      ],
    },
    difficulty: {
      title: "difficulty",
      default: { value: difficulty, label: difficulty },
      options: [
        { value: "kid", label: "kid" },
        { value: "easy", label: "easy" },
        { value: "medium", label: "medium" },
        { value: "hard", label: "hard" },
        { value: "expert", label: "expert" },
      ],
    },
    length: {
      title: "length",
      default: { value: length, label: length },
      options: [
        { value: "short", label: "short" },
        { value: "normal", label: "normal" },
        { value: "long", label: "long" },
      ],
    },
    score: {
      title: "min score",
      default: { value: 0, label: "all" },
      options: [
        { value: 0, label: "all" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 15, label: "15" },
        { value: 20, label: "20" },
        { value: 25, label: "25" },
      ],
    },
    time: {
      title: "max time",
      default: { value: 999, label: "all" },
      options: [
        { value: 999, label: "all" },
        { value: 100, label: "100" },
        { value: 80, label: "80" },
        { value: 60, label: "60" },
        { value: 40, label: "40" },
        { value: 20, label: "20" },
      ],
    },
  };

  return rankingsFilters;
}
