import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("App component", () => {
  it("renders cli-mtl", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch(/cli-mtl/i);
  });

  it("renders la carte after button click", async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole("button", { name: "Clickez-moi" });

    await user.click(button);

    expect(screen.getByRole("heading").textContent).toMatch(/la carte/i);
  });
});
