import { describe, expect, it } from "vitest";
import { demoData } from "./mockData";
import {
  generateFollowUpDraft,
  generateMeetingBrief,
  getComplianceState,
} from "./copilot";

describe("copilot domain logic", () => {
  it("generates a meeting brief for Sunny Tan with cited sources", () => {
    const brief = generateMeetingBrief(demoData);

    expect(brief.clientName).toBe("Sunny Tan");
    expect(brief.sources.length).toBeGreaterThanOrEqual(2);
    expect(brief.talkingPoints.length).toBeGreaterThanOrEqual(3);
    expect(brief.complianceReminders).toContain(
      "Confirm suitability before making recommendations.",
    );
  });

  it("excludes rejected talking points from the follow-up draft", () => {
    const brief = generateMeetingBrief(demoData);
    const draft = generateFollowUpDraft(brief, {
      "critical-illness-gap": "approved",
      "education-planning": "rejected",
      "family-protection-review": "approved",
    });

    expect(draft.body).toContain("critical illness");
    expect(draft.body).toContain("family protection");
    expect(draft.body).not.toContain("education planning");
    expect(draft.status).toBe("needs_final_agent_approval");
  });

  it("marks compliance as review required until final agent approval", () => {
    const brief = generateMeetingBrief(demoData);
    const draft = generateFollowUpDraft(brief, {
      "critical-illness-gap": "approved",
      "education-planning": "rejected",
      "family-protection-review": "approved",
    });
    const state = getComplianceState(brief, draft);

    expect(state.level).toBe("review_required");
    expect(state.flags).toContain("No guaranteed outcome claims detected.");
    expect(state.flags).toContain("Final agent approval required before use.");
  });
});
