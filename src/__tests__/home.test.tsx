import { render } from "./utils/test-utils";
import { screen } from "@testing-library/react";

// Components
import { Home } from "../components/home/Home";

import { TITLE } from "../commons/commons";

describe("Home page", () => {
  it("should render the title", () => {
    render(<Home />);
    const title = screen.getByRole("heading", { name: TITLE });
    expect(title).toBeVisible();
  });
});
