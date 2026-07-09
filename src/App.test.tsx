import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
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

  it("shows human controls and evidence placeholders before brief generation", () => {
    render(<App />);

    const controlPanel = screen.getByRole("complementary", {
      name: /Control panel/i,
    });
    const panel = within(controlPanel);

    expect(panel.getByText(/Waiting for brief/i)).toBeInTheDocument();
    expect(panel.getByRole("heading", { name: /Compliance/i })).toBeInTheDocument();
    expect(
      panel.getByText(/Generate a brief to load compliance checks\./i),
    ).toBeInTheDocument();

    expect(panel.getByRole("heading", { name: /Evidence/i })).toBeInTheDocument();
    expect(panel.getByText(/Policy record\(s\)/i)).toBeInTheDocument();
    expect(panel.getByText(/Product knowledge snippet\(s\)/i)).toBeInTheDocument();
    expect(panel.getByText(/Compliance guideline\(s\)/i)).toBeInTheDocument();
    expect(panel.getByText(/CRM interaction history/i)).toBeInTheDocument();

    expect(
      panel.getByRole("button", { name: /Approve Critical illness protection gap/i }),
    ).toBeDisabled();
    expect(
      panel.getByRole("button", { name: /Reject Critical illness protection gap/i }),
    ).toBeDisabled();
    expect(
      panel.getByRole("button", { name: /Approve Education planning conversation/i }),
    ).toBeDisabled();
    expect(
      panel.getByRole("button", { name: /Reject Education planning conversation/i }),
    ).toBeDisabled();
    expect(
      panel.getByRole("button", { name: /Approve Family protection review/i }),
    ).toBeDisabled();
    expect(
      panel.getByRole("button", { name: /Reject Family protection review/i }),
    ).toBeDisabled();
  });

  it("shows point-level human controls in the right control panel after brief generation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));
    const controlPanel = screen.getByRole("complementary", {
      name: /Control panel/i,
    });
    const panel = within(controlPanel);

    expect(
      panel.getByRole("button", { name: /Approve Critical illness protection gap/i }),
    ).toBeInTheDocument();
    expect(
      panel.getByRole("button", { name: /Reject Critical illness protection gap/i }),
    ).toBeInTheDocument();
    expect(
      panel.getByRole("button", { name: /Approve Education planning conversation/i }),
    ).toBeInTheDocument();
    expect(
      panel.getByRole("button", { name: /Reject Education planning conversation/i }),
    ).toBeInTheDocument();
    expect(
      panel.getByRole("button", { name: /Approve Family protection review/i }),
    ).toBeInTheDocument();
    expect(
      panel.getByRole("button", { name: /Reject Family protection review/i }),
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

    const followupPanel = screen.getByText("Follow-up Draft", { selector: "h2" }).parentElement;
    const followupBody = followupPanel?.querySelector("pre");
    if (!followupBody) {
      throw new Error("Follow-up draft body was not rendered.");
    }
    expect(
      within(followupBody).getByText(
        /We can review whether critical illness protection would help protect/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(followupBody).getByText(
        /Let us check whether your current family protection still matches your new household responsibilities/i,
      ),
    ).toBeInTheDocument();
    expect(
      within(followupBody).queryByText(/We can also revisit education planning/i),
    ).not.toBeInTheDocument();
    const readyButtons = screen.getAllByRole("button", {
      name: /Mark Ready for Agent Send/i,
    });
    expect(readyButtons).toHaveLength(1);
    await user.click(readyButtons[0]);
    expect(readyButtons[0]).toBeDisabled();
    expect(readyButtons[0]).toHaveTextContent("Ready for agent send");
    expect(screen.queryByRole("button", { name: /^Send$/i })).not.toBeInTheDocument();
  });

  it("disables follow-up generation until at least one talking point is approved", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));

    const generateDraftButton = screen.getByRole("button", {
      name: /Generate Follow-up Draft/i,
    });

    expect(generateDraftButton).toBeDisabled();
    expect(
      screen.getByText(/Approve at least one talking point to generate follow-up\./i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Approve Critical illness protection gap/i }),
    );

    expect(generateDraftButton).toBeEnabled();
    expect(
      screen.queryByText(/Approve at least one talking point to generate follow-up\./i),
    ).not.toBeInTheDocument();
  });

  it("invalidates the current draft when a talking point decision changes after draft generation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));
    await user.click(
      screen.getByRole("button", { name: /Approve Critical illness protection gap/i }),
    );
    await user.click(screen.getByRole("button", { name: /Generate Follow-up Draft/i }));

    expect(screen.getByRole("heading", { name: /Follow-up Draft/i })).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /Reject Critical illness protection gap/i }),
    );

    expect(
      screen.getByRole("heading", { name: /Review AI-suggested talking points/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Follow-up Draft/i })).not.toBeInTheDocument();

    const workflowRail = screen.getByRole("complementary", {
      name: /Workflow steps/i,
    });
    expect(
      within(workflowRail).getByRole("button", { name: /Follow-up Draft/i }),
    ).toBeDisabled();
  });

  it("renders the full meeting brief with coverage gaps, next-best action, and compliance reminders", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));

    expect(screen.getByRole("heading", { name: /Meeting brief/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Coverage gaps/i })).toBeInTheDocument();
    expect(screen.getByText(/No visible critical illness rider\./i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Next-best action/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Run a needs-analysis conversation focused on family protection/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Compliance reminders/i })).toBeInTheDocument();
    expect(screen.getByText(/Avoid guaranteed outcome claims\./i)).toBeInTheDocument();
  });

  it("shows all compliance evidence sources in the control panel", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));

    const controlPanel = screen.getByRole("complementary", {
      name: /Control panel/i,
    });
    const panel = within(controlPanel);
    const evidenceSection = panel.getByRole("heading", { name: /Evidence/i }).nextElementSibling;

    if (!(evidenceSection instanceof HTMLElement)) {
      throw new Error("Evidence list was not rendered.");
    }

    expect(within(evidenceSection).getByText(/^Suitability confirmation/i)).toBeInTheDocument();
    expect(within(evidenceSection).getByText(/^No guaranteed outcome claims/i)).toBeInTheDocument();
    expect(within(evidenceSection).getByText(/^Underwriting caveat$/i)).toBeInTheDocument();
  });

  it("uses edited approved talking point language in the follow-up draft", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));
    await user.click(
      screen.getByRole("button", { name: /Edit Critical illness protection gap/i }),
    );

    const editor = screen.getByLabelText(
      /Talking point language for Critical illness protection gap/i,
    );
    await user.clear(editor);
    await user.type(
      editor,
      "We should review how a critical illness buffer could support your family budget.",
    );
    await user.click(screen.getByRole("button", { name: /Save Critical illness protection gap/i }));
    await user.click(
      screen.getByRole("button", { name: /Approve Critical illness protection gap/i }),
    );
    await user.click(screen.getByRole("button", { name: /Generate Follow-up Draft/i }));

    const followupPanel = screen.getByRole("heading", { name: /Follow-up Draft/i }).parentElement;
    const followupBody = followupPanel?.querySelector("pre");

    if (!(followupBody instanceof HTMLElement) || !followupPanel) {
      throw new Error("Follow-up draft body was not rendered.");
    }

    expect(
      within(followupBody).getByText(
        /We should review how a critical illness buffer could support your family budget\./i,
      ),
    ).toBeInTheDocument();
  });

  it("locks workflow navigation until required prerequisites are complete", async () => {
    const user = userEvent.setup();
    render(<App />);

    const workflowRail = screen.getByRole("complementary", {
      name: /Workflow steps/i,
    });
    const [briefStepButton, approvalStepButton, followupStepButton] =
      within(workflowRail).getAllByRole("button");

    expect(briefStepButton).toBeEnabled();
    expect(approvalStepButton).toBeDisabled();
    expect(followupStepButton).toBeDisabled();

    expect(
      screen.getByRole("heading", { name: /Meeting Brief/i }),
    ).toBeInTheDocument();

    await user.click(approvalStepButton);
    expect(
      screen.getByRole("heading", { name: /Meeting Brief/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Generate Meeting Brief/i }));
    expect(approvalStepButton).toBeEnabled();
    expect(followupStepButton).toBeDisabled();

    await user.click(approvalStepButton);
    expect(screen.getByRole("heading", { name: /Review AI-suggested/i })).toBeInTheDocument();

    await user.click(followupStepButton);
    expect(screen.getByRole("heading", { name: /Review AI-suggested/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Approve Critical illness protection gap/i }));
    await user.click(screen.getByRole("button", { name: /Approve Education planning conversation/i }));
    await user.click(screen.getByRole("button", { name: /Approve Family protection review/i }));
    await user.click(screen.getByRole("button", { name: /Generate Follow-up Draft/i }));

    expect(followupStepButton).toBeEnabled();
    await user.click(followupStepButton);
    expect(screen.getByRole("heading", { name: /Follow-up Draft/i })).toBeInTheDocument();
  });
});
