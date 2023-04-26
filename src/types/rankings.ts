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
