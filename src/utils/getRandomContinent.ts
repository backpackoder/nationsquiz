// Commons
import { CONTINENTS } from "../commons/commons";

// Types
import { SettingsStrings } from "../types/main";

export function getRandomContinent() {
  const continents_list = Object.keys(CONTINENTS).map(
    (key) => CONTINENTS[key as keyof typeof CONTINENTS]
  );
  const continents_list_without_world: Omit<SettingsStrings["regions"][], "World"> =
    continents_list.filter((item) => item !== "World");
  const randomContinent: Omit<SettingsStrings["regions"], "World"> =
    continents_list_without_world[Math.floor(Math.random() * continents_list_without_world.length)];

  return randomContinent;
}
