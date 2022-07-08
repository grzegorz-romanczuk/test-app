import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

it("Check if button opens paragraph", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  const paragraphElement = screen.getByText(/It's open/i);
  expect(paragraphElement).toBeInTheDocument();
});
