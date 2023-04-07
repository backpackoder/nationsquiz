import { it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

// Components
import { QuizList } from "../components/home/QuizSelection";

describe("QuizList component", () => {
  function setUp() {
    const utils = render(<QuizList />);
    const quizItemBtn = utils.getAllByRole("button", {
      name: /quizList.start/i,
    })[0];
    return {
      quizItemBtn,
      ...utils,
    };
  }

  it("should render the first button", () => {
    const { quizItemBtn } = setUp();

    expect(quizItemBtn).toBeVisible();
  });

  // it("should open Modale on Start button click", async () => {
  //   const { getByText, queryByTestId } = render(<QuizList />);

  // const startButton = getByText(/quizList.start/i);
  // const startButton = screen.getAllByRole("button", {
  //   name: /quizList.start/i,
  // })[0];
  // const settingsTitle = screen.getByText(/quizList.start/i);
  // expect(settingsTitle).toBeVisible();

  // const notOk = screen.getByText(/quizList.title/i);
  // expect("notOk").not.toBeInTheDocument();

  // fireEvent.click(startButton);
  // expect(settingsTitle).not.toBeVisible();
  // });
});
