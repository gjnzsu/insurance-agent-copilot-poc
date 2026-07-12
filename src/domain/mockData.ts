import type { DemoData } from "./types";

export const demoData: DemoData = {
  client: {
    name: "Sunny Tan",
    segment: "Young family",
    familyContext: "Married with one young child",
    reviewTrigger: "Annual policy review after a family life event",
    priority: "Household protection and child education planning",
  },
  policies: [
    {
      id: "POL-LIFE-001",
      type: "Life",
      summary: "Basic life policy with entry-level family protection.",
      coverageLevel: "basic",
    },
    {
      id: "POL-MED-002",
      type: "Medical",
      summary: "Medical plan active; hospital coverage is in force.",
      coverageLevel: "moderate",
    },
    {
      id: "POL-CI-003",
      type: "Critical Illness",
      summary: "No critical illness rider currently visible.",
      coverageLevel: "missing",
      sourceExcerpt: "No critical illness rider currently visible.",
      lastUpdated: "2026-06-30",
    },
    {
      id: "POL-EDU-004",
      type: "Education Planning",
      summary: "Limited education planning coverage visible.",
      coverageLevel: "basic",
    },
  ],
  interactionHistory: [
    "Last review focused on affordability and keeping monthly premium stable.",
    "Sunny recently asked whether the family has enough protection after having a child.",
    "Agent noted interest in education planning, but no recommendation was approved.",
  ],
  knowledge: [
    {
      id: "KNOW-LIFE",
      title: "Life protection positioning",
      kind: "product",
      body: "Life protection discussions should connect coverage to income replacement, family continuity, and household obligations.",
    },
    {
      id: "KNOW-CI",
      title: "Critical illness protection positioning",
      kind: "product",
      body: "Critical illness protection can help families manage income disruption and treatment-related financial stress.",
    },
    {
      id: "KNOW-EDU",
      title: "Education planning positioning",
      kind: "product",
      body: "Education planning conversations should explore time horizon, contribution comfort, and flexibility needs.",
    },
    {
      id: "COMP-SUITABILITY",
      title: "Suitability confirmation",
      kind: "compliance",
      body: "Confirm suitability before making recommendations.",
    },
    {
      id: "COMP-GUARANTEE",
      title: "No guaranteed outcome claims",
      kind: "compliance",
      body: "Avoid guaranteed outcome claims.",
    },
    {
      id: "COMP-UNDERWRITING",
      title: "Underwriting caveat",
      kind: "compliance",
      body: "Disclose underwriting and eligibility caveats.",
    },
  ],
};
