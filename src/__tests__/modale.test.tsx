import { render, screen } from "./utils/test-utils";
import { t } from "i18next";

// Components
import { SettingsModale } from "../modales/SettingsModale";

const quizTheme = { theme: "flags", title: "title", description: "description" };
const setIsModaleOpened = () => {};

test("modale", () => {
  render(<SettingsModale quizTheme={quizTheme} setIsModaleOpened={setIsModaleOpened} />);

  const quizThemeTitle = t(`quizList.${"flags"}.title`);
  const btn = t("modale.settings.start");
  const kid = t("modale.settings.difficulty.kid");
  const short = `${t("modale.settings.length.short")}`;
  const world = t("modale.settings.region.world");

  expect(screen.getByText(quizThemeTitle)).toBeInTheDocument();
  expect(screen.getByText(btn)).toBeInTheDocument();
  expect(screen.getByText(kid)).toBeInTheDocument();
  expect(screen.getByText(short)).toBeInTheDocument();
  expect(screen.getByText(world)).toBeInTheDocument();
});
