// Types
import { getRankingsFilters, getRankingsFiltersProps } from "../types/rankings";

export function getRankingsFilters({ theme, difficulty, length, region }: getRankingsFiltersProps) {
  const rankingsFilters: getRankingsFilters = {
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
      title: "region",
      default: { value: region, label: region },
      options: [
        { value: "world", label: "world" },
        { value: "africa", label: "africa" },
        { value: "americas", label: "americas" },
        { value: "asia", label: "asia" },
        { value: "europe", label: "europe" },
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
  };

  return rankingsFilters;
}
