import { render, screen, fireEvent } from "@testing-library/react";
import { QuizList } from "../components/home/QuizList";

test("modale opens and closes", () => {
  render(<QuizList />);

  // Vérifier que la modale n'est pas affichée au début
  expect(screen.queryByText("Settings")).toBeNull();

  // Cliquer sur un élément pour ouvrir la modale
  fireEvent.click(screen.getByText("Start Quiz"));

  // Vérifier que la modale s'est ouverte
  expect(screen.getByText("Settings")).toBeInTheDocument();

  // Cliquer sur le bouton pour fermer la modale
  fireEvent.click(screen.getByRole("button", { name: "Close" }));

  // Vérifier que la modale s'est fermée
  expect(screen.queryByText("Settings")).toBeNull();
});
