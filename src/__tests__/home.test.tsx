import { render, screen } from "@testing-library/react";

// Components
import { Home } from "../components/home/Home";

import { TITLE } from "../commons/commons";

describe("Home page", () => {
  it("should render the title", () => {
    render(<Home />);
    const title = screen.getByRole("heading", { name: TITLE });
    expect(title).toBeVisible();
  });

  it("should render the catchPhrase", () => {
    render(<Home />);
    const catchPhrase = screen.queryByText(/home.catchPhrase/i);
    expect(catchPhrase).toBeVisible();
  });
});
