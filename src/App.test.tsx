import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Agent Copilot workflow", () => {
  it("starts directly in Sunny Tan's review case", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Sunny Tan/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Sunny Tan - Family Protection Review/i),
    ).toBeInTheDocument();
  });

  it("requires approval and excludes rejected talking points from follow-up", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));
    await user.click(screen.getByRole("button", { name: /Approve Critical illness protection gap/i }));
    await user.click(screen.getByRole("button", { name: /Reject Education planning conversation/i }));
    await user.click(screen.getByRole("button", { name: /Approve Family protection review/i }));
    await user.click(screen.getByRole("button", { name: /Generate Follow-up Draft/i }));

    expect(screen.getByText(/critical illness protection/i)).toBeInTheDocument();
    expect(screen.getByText(/current family protection/i)).toBeInTheDocument();
    expect(screen.queryByText(/education planning and understand/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mark Ready for Agent Send/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Send$/i })).not.toBeInTheDocument();
  });
});
