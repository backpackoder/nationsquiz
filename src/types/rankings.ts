export type RankingsType =
  | null
  | {
      [x: string]: any;
    }[];

export type RankingsInitialState = {
  theme: string;
  region: string;
  difficulty: string;
  length: string;
  score: number;
  time: number;
};

export type getRankingsFiltersProps = {
  theme: string;
  difficulty: string;
  length: string;
  region: string;
};

export type getRankingsFilters = {
  [key: string]: getRankingsFiltersItem;
};

export type getRankingsFiltersItem = {
  title: string;
  default: { value: string; label: string };
  options: { value: string; label: string }[];
};
