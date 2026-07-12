import type {
  ComplianceState,
  DemoData,
  FollowUpDraft,
  MeetingBrief,
  SourceReference,
  TalkingPoint,
  TalkingPointDecision,
} from "./types";

function source(
  id: string,
  title: string,
  kind: SourceReference["kind"],
): SourceReference {
  return { id, title, kind };
}

export function generateMeetingBrief(data: DemoData): MeetingBrief {
  const criticalIllnessRecord = data.policies.find(
    (policy) => policy.id === "POL-CI-003",
  );

  const productSources = data.knowledge
    .filter((item) => item.kind === "product")
    .map((item) => source(item.id, item.title, "product"));
  const complianceSources = data.knowledge
    .filter((item) => item.kind === "compliance")
    .map((item) => source(item.id, item.title, "compliance"));

  const talkingPoints: TalkingPoint[] = [
    {
      id: "critical-illness-gap",
      title: "Critical illness protection gap",
      rationale:
        "Sunny has a young child and no visible critical illness rider, so income disruption is a relevant review topic.",
      clientLanguage:
        "We can review whether critical illness protection would help protect your household if treatment affects your income.",
      decision: "pending",
      sourceIds: ["POL-CI-003", "KNOW-CI", "COMP-SUITABILITY"],
      meetingFocus: {
        observation: {
          label: "fact",
          text: "No critical illness rider is visible in the current synthetic policy record.",
        },
        potentialIssue: {
          label: "inference",
          text: "A possible income disruption after a serious illness may be a relevant meeting-preparation topic for this young family.",
        },
        confirmationQuestion: {
          label: "confirmation",
          text: "How long would your household need income support if a serious illness affected work?",
        },
        evidence: [
          {
            sourceId: criticalIllnessRecord?.id ?? "POL-CI-003",
            sourceType: "policy",
            excerpt:
              criticalIllnessRecord?.sourceExcerpt ??
              "No critical illness rider currently visible.",
            lastUpdated: criticalIllnessRecord?.lastUpdated ?? "Unavailable",
          },
        ],
        limitation:
          "Visible synthetic records do not establish need, affordability, eligibility, underwriting outcome, or suitability. Confirm the client's circumstances before taking this topic further.",
      },
    },
    {
      id: "education-planning",
      title: "Education planning conversation",
      rationale:
        "Sunny previously asked about child education planning, but no recommendation has been approved.",
      clientLanguage:
        "We can also revisit education planning and understand your preferred contribution level and time horizon.",
      decision: "pending",
      sourceIds: ["POL-EDU-004", "KNOW-EDU", "COMP-SUITABILITY"],
    },
    {
      id: "family-protection-review",
      title: "Family protection review",
      rationale:
        "The annual review follows a family life event, and the existing life policy is basic.",
      clientLanguage:
        "Let us check whether your current family protection still matches your new household responsibilities.",
      decision: "pending",
      sourceIds: ["POL-LIFE-001", "KNOW-LIFE", "COMP-GUARANTEE"],
    },
  ];

  return {
    clientName: data.client.name,
    snapshot: `${data.client.name} is in the ${data.client.segment.toLowerCase()} segment. Context: ${data.client.familyContext}. Trigger: ${data.client.reviewTrigger}.`,
    policySummary: data.policies.map((policy) => `${policy.type}: ${policy.summary}`),
    coverageGaps: [
      "No visible critical illness rider.",
      "Basic life cover may not reflect new family responsibilities.",
      "Education planning coverage appears limited.",
    ],
    discoveryQuestions: [
      "Has your household income or monthly budget changed after the new family event?",
      "How long would your family need income support if illness affected work?",
      "Would you like to discuss education planning now, or keep it as a later review topic?",
    ],
    nextBestAction:
      "Run a needs-analysis conversation focused on family protection, then confirm suitability before any product recommendation.",
    talkingPoints,
    complianceReminders: [
      "Confirm suitability before making recommendations.",
      "Avoid guaranteed outcome claims.",
      "Disclose underwriting and eligibility caveats.",
    ],
    sources: [
      source("CRM-SUNNY", "Sunny Tan CRM profile and interaction notes", "crm"),
      ...data.policies.map((policy) =>
        source(policy.id, `${policy.type} policy record`, "policy"),
      ),
      ...productSources,
      ...complianceSources,
    ],
  };
}

export function generateFollowUpDraft(
  brief: MeetingBrief,
  decisions: Record<string, TalkingPointDecision>,
): FollowUpDraft {
  const approvedPoints = brief.talkingPoints.filter(
    (point) => decisions[point.id] === "approved",
  );

  if (approvedPoints.length === 0) {
    throw new Error(
      "At least one talking point must be approved before generating a follow-up draft.",
    );
  }

  const approvedBody = approvedPoints.map((point) => `- ${point.clientLanguage}`).join("\n");

  const body = [
    `Hi ${brief.clientName},`,
    "",
    "Thank you for the review conversation. Based on the points we discussed, I will prepare a needs-analysis follow-up for your confirmation.",
    "",
    approvedBody,
    "",
    "Before any recommendation, I will confirm suitability, eligibility, and underwriting considerations with you.",
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return {
    subject: "Follow-up on your family protection review",
    body,
    includedTalkingPointIds: approvedPoints.map((point) => point.id),
    status: "needs_final_agent_approval",
  };
}

export function getComplianceState(
  brief: MeetingBrief,
  draft?: FollowUpDraft,
): ComplianceState {
  const flags = [
    "No guaranteed outcome claims detected.",
    "Suitability confirmation required before recommendation.",
    "Underwriting and eligibility caveat present.",
  ];

  if (draft?.status !== "ready_for_agent_send") {
    flags.push("Final agent approval required before use.");
  }

  if (brief.sources.some((item) => item.kind === "compliance")) {
    flags.push("Compliance source linked to generated content.");
  }

  return {
    level: draft?.status === "ready_for_agent_send" ? "clear" : "review_required",
    flags,
  };
}
