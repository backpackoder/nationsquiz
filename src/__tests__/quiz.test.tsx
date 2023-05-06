import { render } from "./utils/test-utils";
import { it, expect } from "vitest";
import { t } from "i18next";

import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

// Components
import { QuizList } from "../components/home/QuizList";

describe("QuizList component", () => {
  function setUp() {
    const utils = render(<QuizList />);
    const quizItemBtn = utils.getAllByRole("button", {
      name: t("quizList.start"),
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
});
