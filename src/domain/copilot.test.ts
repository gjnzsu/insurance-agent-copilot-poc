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
    const sourceById = new Map(brief.sources.map((source) => [source.id, source]));
    const expectedSources = [
      { id: "CRM-SUNNY", title: "Sunny Tan CRM profile and interaction notes", kind: "crm" as const },
      { id: "POL-LIFE-001", title: "Life policy record", kind: "policy" as const },
      { id: "POL-MED-002", title: "Medical policy record", kind: "policy" as const },
      { id: "POL-CI-003", title: "Critical Illness policy record", kind: "policy" as const },
      { id: "POL-EDU-004", title: "Education Planning policy record", kind: "policy" as const },
      { id: "KNOW-LIFE", title: "Life protection positioning", kind: "product" as const },
      { id: "KNOW-CI", title: "Critical illness protection positioning", kind: "product" as const },
      { id: "KNOW-EDU", title: "Education planning positioning", kind: "product" as const },
      { id: "COMP-SUITABILITY", title: "Suitability confirmation", kind: "compliance" as const },
      { id: "COMP-GUARANTEE", title: "No guaranteed outcome claims", kind: "compliance" as const },
      { id: "COMP-UNDERWRITING", title: "Underwriting caveat", kind: "compliance" as const },
    ];

    expect(brief.clientName).toBe("Sunny Tan");
    expect(brief.sources.length).toBe(expectedSources.length);
    expect(brief.sources).toEqual(
      expect.arrayContaining(
        expectedSources.map((source) =>
          expect.objectContaining({
            id: source.id,
            title: source.title,
            kind: source.kind,
          }),
        ),
      ),
    );
    expect(brief.talkingPoints.length).toBeGreaterThanOrEqual(3);
    expect(brief.complianceReminders).toContain(
      "Confirm suitability before making recommendations.",
    );

    for (const talkingPoint of brief.talkingPoints) {
      expect(talkingPoint.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of talkingPoint.sourceIds) {
        expect(sourceById.has(sourceId)).toBe(true);
      }
    }

    const criticalIllnessSources = brief.talkingPoints.find(
      (point) => point.id === "critical-illness-gap",
    );
    const educationSources = brief.talkingPoints.find((point) => point.id === "education-planning");
    const familySources = brief.talkingPoints.find(
      (point) => point.id === "family-protection-review",
    );

    expect(criticalIllnessSources?.sourceIds).toEqual(
      expect.arrayContaining(["POL-CI-003", "KNOW-CI", "COMP-SUITABILITY"]),
    );
    expect(educationSources?.sourceIds).toEqual(
      expect.arrayContaining(["POL-EDU-004", "KNOW-EDU", "COMP-SUITABILITY"]),
    );
    expect(familySources?.sourceIds).toEqual(
      expect.arrayContaining(["POL-LIFE-001", "KNOW-LIFE", "COMP-GUARANTEE"]),
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
