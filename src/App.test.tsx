import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import PhoneNumberInput from "./components/phone-number/PhoneNumberInput";

const mockprefixes = [
  { country: "c1", prefix: "1" },
  { country: "c2", prefix: "2" },
  { country: "c3", prefix: "3" },
  { country: "c4", prefix: "4" },
  { country: "c5", prefix: "5" },
];
it("check if default prefix select value is empty", () => {
  const mockOnChange = jest.fn();
  render(
    <PhoneNumberInput
      prefixes={mockprefixes}
      value={{ prefix: "", number: "" }}
      onChange={mockOnChange}
    />
  );
  expect(screen.getByRole("combobox")).toHaveValue("");
});

it("check if prefix select changes value", async () => {
  const mockOnChange = jest.fn();
  render(
    <PhoneNumberInput
      prefixes={mockprefixes}
      value={{ prefix: "", number: "" }}
      onChange={mockOnChange}
    />
  );
  const selectElement = screen.getByRole("combobox");
  fireEvent.focus(selectElement);
  fireEvent.keyDown(selectElement, { key: "ArrowDown", code: 40 });
  fireEvent.keyDown(selectElement, { key: "Enter", code: 13 });
  fireEvent.focusOut(selectElement);
  expect(screen.getByText("+1 (c1)")).toBeInTheDocument();
});

it("check if number is default empty", () => {
  const mockOnChange = jest.fn();
  render(
    <PhoneNumberInput
      prefixes={mockprefixes}
      value={{ prefix: "", number: "" }}
      onChange={mockOnChange}
    />
  );
  expect(
    screen.getByPlaceholderText("Phone number...").textContent
  ).toHaveLength(0);
});

it("check if number input can not be longer than 9", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(
    "Phone number..."
  ) as HTMLInputElement;
  userEvent.type(inputElement, "1234567890");
  await waitFor(() => {
    expect(inputElement.value).toBe("123456789");
  });
});

it("check if number input accepts only numbers", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(
    "Phone number..."
  ) as HTMLInputElement;
  userEvent.type(inputElement, "qwertyuiopasdfghjklzxcvbnm1234567890");

  await waitFor(() => {
    expect(inputElement.value).toBe("123456789");
  });
});
