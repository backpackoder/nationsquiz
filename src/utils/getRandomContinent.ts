// Commons
import { CONTINENTS } from "../commons/commons";

export function getRandomContinent() {
  const continents_list = Object.keys(CONTINENTS).map(
    (key) => CONTINENTS[key as keyof typeof CONTINENTS]
  );
  const randomContinent = continents_list[Math.floor(Math.random() * continents_list.length)];

  return randomContinent;
}
