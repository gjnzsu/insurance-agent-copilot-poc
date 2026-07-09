# Insurance Agent Copilot PoC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interview-ready Agent Copilot prototype that demonstrates Sunny Tan's family protection review workflow: Prepare -> Approve -> Follow Up.

**Architecture:** Create a Vite React TypeScript single-page app with local mock data and deterministic "AI-like" generation functions. Keep domain logic in pure TypeScript modules with tests, then render it through a Workspace + Demo Rail UI with visible human approval and compliance controls.

**Tech Stack:** Vite, React, TypeScript, Vitest, Testing Library, CSS modules or plain CSS, local mock data only.

## Global Constraints

- The app starts directly in `Sunny Tan - Family Protection Review`.
- The workflow has exactly three guided steps: `Meeting Brief`, `Agent Approval`, `Follow-up Draft`.
- The follow-up draft uses approved talking points only.
- A rejected talking point must not appear in the follow-up draft.
- The final action text is `Mark Ready for Agent Send`, not `Send`.
- No real CRM, policy admin, product engine, underwriting, authentication, or message sending.
- The right control panel always shows source evidence, compliance state, approval status, and human decision controls.

---

## File Structure

- `package.json` - scripts and dependencies for the React prototype.
- `index.html` - Vite entry document.
- `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts` - TypeScript and Vite configuration.
- `src/main.tsx` - React mount point.
- `src/App.tsx` - top-level workflow state and page composition.
- `src/styles.css` - global responsive internal-tool styling.
- `src/domain/types.ts` - shared domain types.
- `src/domain/mockData.ts` - Sunny Tan profile, policies, notes, product snippets, compliance snippets.
- `src/domain/copilot.ts` - pure functions that generate the meeting brief, compliance state, and follow-up draft.
- `src/domain/copilot.test.ts` - unit tests for approval filtering and compliance output.
- `src/components/DemoRail.tsx` - left guided step rail.
- `src/components/Workspace.tsx` - center content that changes by workflow step.
- `src/components/ControlPanel.tsx` - right evidence, compliance, and HITL panel.
- `src/components/ApprovalCard.tsx` - approve/edit/reject controls for each AI talking point.
- `src/App.test.tsx` - integration tests for the visible workflow.

---

### Task 1: Scaffold the Vite React TypeScript Project

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

**Interfaces:**
- Consumes: none.
- Produces: A runnable React app shell with `npm run dev`, `npm test`, and `npm run build`.

- [ ] **Step 1: Create package metadata and scripts**

Create `package.json`:

```json
{
  "name": "insurance-agent-copilot-poc",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "tsc -b && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.7",
    "typescript": "^5.7.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create the Vite HTML entry**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agent Copilot PoC</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create TypeScript and Vite config**

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom/vitest"],
  },
});
```

- [ ] **Step 4: Create the minimal React shell**

Create `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <section className="hero-strip">
        <p className="eyebrow">AIA Agent Copilot PoC</p>
        <h1>Sunny Tan - Family Protection Review</h1>
        <p>
          Prepare a review brief, approve AI-suggested talking points, and mark
          a compliant follow-up as ready for agent send.
        </p>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #1f2933;
  background: #eef3f7;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
textarea {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  padding: 24px;
}

.hero-strip {
  max-width: 1120px;
  margin: 0 auto;
}

.eyebrow {
  color: #c9252d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 8px;
  text-transform: uppercase;
}

h1 {
  font-size: 2rem;
  line-height: 1.15;
  margin: 0 0 10px;
}

p {
  line-height: 1.55;
}
```

- [ ] **Step 5: Install dependencies**

Run:

```powershell
npm install
```

Expected: `node_modules` is created and npm exits with code 0.

- [ ] **Step 6: Verify the shell builds**

Run:

```powershell
npm run build
```

Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 7: Commit the scaffold**

Run:

```powershell
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts src/main.tsx src/App.tsx src/styles.css
git commit -m "feat: scaffold insurance copilot prototype"
```

---

### Task 2: Add Domain Data and Copilot Generation Logic

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/mockData.ts`
- Create: `src/domain/copilot.ts`
- Create: `src/domain/copilot.test.ts`

**Interfaces:**
- Consumes: none.
- Produces:
  - `generateMeetingBrief(data: DemoData): MeetingBrief`
  - `generateFollowUpDraft(brief: MeetingBrief, decisions: Record<string, TalkingPointDecision>): FollowUpDraft`
  - `getComplianceState(brief: MeetingBrief, draft?: FollowUpDraft): ComplianceState`

- [ ] **Step 1: Write failing tests for approval filtering and compliance evidence**

Create `src/domain/copilot.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```powershell
npm test -- src/domain/copilot.test.ts
```

Expected: FAIL because `mockData`, `copilot`, and domain types do not exist.

- [ ] **Step 3: Create shared domain types**

Create `src/domain/types.ts`:

```ts
export type WorkflowStep = "brief" | "approval" | "followup";

export type TalkingPointDecision = "pending" | "approved" | "rejected";

export interface ClientProfile {
  name: string;
  segment: string;
  familyContext: string;
  reviewTrigger: string;
  priority: string;
}

export interface PolicyRecord {
  id: string;
  type: string;
  summary: string;
  coverageLevel: "basic" | "moderate" | "missing";
}

export interface KnowledgeSnippet {
  id: string;
  title: string;
  body: string;
  kind: "product" | "compliance";
}

export interface DemoData {
  client: ClientProfile;
  policies: PolicyRecord[];
  interactionHistory: string[];
  knowledge: KnowledgeSnippet[];
}

export interface SourceReference {
  id: string;
  title: string;
  kind: "product" | "compliance" | "policy" | "crm";
}

export interface TalkingPoint {
  id: string;
  title: string;
  rationale: string;
  clientLanguage: string;
  decision: TalkingPointDecision;
  sourceIds: string[];
}

export interface MeetingBrief {
  clientName: string;
  snapshot: string;
  policySummary: string[];
  coverageGaps: string[];
  discoveryQuestions: string[];
  nextBestAction: string;
  talkingPoints: TalkingPoint[];
  complianceReminders: string[];
  sources: SourceReference[];
}

export interface FollowUpDraft {
  subject: string;
  body: string;
  includedTalkingPointIds: string[];
  status: "needs_final_agent_approval" | "ready_for_agent_send";
}

export interface ComplianceState {
  level: "clear" | "review_required";
  flags: string[];
}
```

- [ ] **Step 4: Create Sunny Tan mock data**

Create `src/domain/mockData.ts`:

```ts
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
```

- [ ] **Step 5: Implement deterministic copilot functions**

Create `src/domain/copilot.ts`:

```ts
import type {
  ComplianceState,
  DemoData,
  FollowUpDraft,
  MeetingBrief,
  SourceReference,
  TalkingPoint,
  TalkingPointDecision,
} from "./types";

function source(id: string, title: string, kind: SourceReference["kind"]): SourceReference {
  return { id, title, kind };
}

export function generateMeetingBrief(data: DemoData): MeetingBrief {
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
      ...data.policies.map((policy) => source(policy.id, `${policy.type} policy record`, "policy")),
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

  const approvedBody = approvedPoints
    .map((point) => `- ${point.clientLanguage}`)
    .join("\n");

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
```

- [ ] **Step 6: Run domain tests**

Run:

```powershell
npm test -- src/domain/copilot.test.ts
```

Expected: PASS with 3 tests.

- [ ] **Step 7: Commit domain logic**

Run:

```powershell
git add src/domain/types.ts src/domain/mockData.ts src/domain/copilot.ts src/domain/copilot.test.ts
git commit -m "feat: add Sunny Tan copilot domain model"
```

---

### Task 3: Build Workflow State and Integration Tests

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`

**Interfaces:**
- Consumes:
  - `generateMeetingBrief(data: DemoData): MeetingBrief`
  - `generateFollowUpDraft(brief: MeetingBrief, decisions: Record<string, TalkingPointDecision>): FollowUpDraft`
- Produces:
  - A visible workflow where rejected talking points are excluded from the follow-up draft.

- [ ] **Step 1: Write an integration test for the workflow**

Create `src/App.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Agent Copilot workflow", () => {
  it("starts directly in Sunny Tan's review case", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Sunny Tan/i })).toBeInTheDocument();
    expect(screen.getByText(/Family Protection Review/i)).toBeInTheDocument();
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
```

- [ ] **Step 2: Run the integration test to verify it fails**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: FAIL because the app shell does not yet render workflow controls.

- [ ] **Step 3: Implement workflow state in App**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from "react";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { demoData } from "./domain/mockData";
import {
  generateFollowUpDraft,
  generateMeetingBrief,
  getComplianceState,
} from "./domain/copilot";
import type {
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
  WorkflowStep,
} from "./domain/types";

const initialDecisions: Record<string, TalkingPointDecision> = {
  "critical-illness-gap": "pending",
  "education-planning": "pending",
  "family-protection-review": "pending",
};

export default function App() {
  const [step, setStep] = useState<WorkflowStep>("brief");
  const [brief, setBrief] = useState<MeetingBrief | null>(null);
  const [decisions, setDecisions] =
    useState<Record<string, TalkingPointDecision>>(initialDecisions);
  const [draft, setDraft] = useState<FollowUpDraft | undefined>();

  const compliance = useMemo(
    () => (brief ? getComplianceState(brief, draft) : undefined),
    [brief, draft],
  );

  function handleGenerateBrief() {
    setBrief(generateMeetingBrief(demoData));
    setStep("approval");
  }

  function setDecision(id: string, decision: TalkingPointDecision) {
    setDecisions((current) => ({ ...current, [id]: decision }));
  }

  function handleGenerateDraft() {
    if (!brief) return;
    setDraft(generateFollowUpDraft(brief, decisions));
    setStep("followup");
  }

  function markReady() {
    if (!draft) return;
    setDraft({ ...draft, status: "ready_for_agent_send" });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AIA Agent Copilot PoC</p>
          <h1>Sunny Tan - Family Protection Review</h1>
        </div>
        <div className="status-chip">
          <ShieldCheck size={18} />
          Human approval required
        </div>
      </header>

      <section className="workspace-grid">
        <aside className="demo-rail" aria-label="Demo steps">
          {[
            ["brief", "Meeting Brief", FileText],
            ["approval", "Agent Approval", CheckCircle2],
            ["followup", "Follow-up Draft", ShieldCheck],
          ].map(([id, label, Icon]) => (
            <button
              className={`rail-step ${step === id ? "active" : ""}`}
              key={String(id)}
              onClick={() => setStep(id as WorkflowStep)}
              type="button"
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </aside>

        <section className="center-workspace">
          {step === "brief" && (
            <div className="panel">
              <p className="eyebrow">Step 1</p>
              <h2>Prepare meeting brief</h2>
              <p>
                Start directly from Sunny Tan's annual family protection review.
                The brief summarizes CRM-like context, policy data, product
                knowledge, and compliance reminders.
              </p>
              <button className="primary-action" onClick={handleGenerateBrief} type="button">
                Generate Meeting Brief
              </button>
            </div>
          )}

          {step === "approval" && brief && (
            <div className="panel stack">
              <p className="eyebrow">Step 2</p>
              <h2>Review AI-suggested talking points</h2>
              <p>{brief.snapshot}</p>
              {brief.talkingPoints.map((point) => (
                <article className="approval-card" key={point.id}>
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.rationale}</p>
                    <p className="client-language">{point.clientLanguage}</p>
                    <span className={`decision ${decisions[point.id]}`}>
                      {decisions[point.id]}
                    </span>
                  </div>
                  <div className="approval-actions">
                    <button
                      onClick={() => setDecision(point.id, "approved")}
                      type="button"
                    >
                      Approve {point.title}
                    </button>
                    <button
                      onClick={() => setDecision(point.id, "rejected")}
                      type="button"
                    >
                      Reject {point.title}
                    </button>
                  </div>
                </article>
              ))}
              <button className="primary-action" onClick={handleGenerateDraft} type="button">
                Generate Follow-up Draft
              </button>
            </div>
          )}

          {step === "followup" && draft && (
            <div className="panel stack">
              <p className="eyebrow">Step 3</p>
              <h2>{draft.subject}</h2>
              <pre className="message-draft">{draft.body}</pre>
              <button className="primary-action" onClick={markReady} type="button">
                Mark Ready for Agent Send
              </button>
            </div>
          )}
        </section>

        <aside className="control-panel" aria-label="Control panel">
          <h2>Human control</h2>
          <p>
            Status:{" "}
            <strong>{draft?.status === "ready_for_agent_send" ? "Ready" : "Review required"}</strong>
          </p>
          <h3>Compliance</h3>
          <ul>
            {(compliance?.flags ?? ["Generate a brief to load compliance checks."]).map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
          <h3>Evidence</h3>
          <ul>
            {(brief?.sources.slice(0, 6) ?? []).map((item) => (
              <li key={item.id}>
                {item.title} <span>{item.kind}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the integration test**

Run:

```powershell
npm test -- src/App.test.tsx
```

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit workflow behavior**

Run:

```powershell
git add src/App.tsx src/App.test.tsx
git commit -m "feat: add human approved copilot workflow"
```

---

### Task 4: Split Presentation Components and Polish the Internal Tool UI

**Files:**
- Create: `src/components/DemoRail.tsx`
- Create: `src/components/Workspace.tsx`
- Create: `src/components/ControlPanel.tsx`
- Create: `src/components/ApprovalCard.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: App state and domain types from Task 3.
- Produces: A maintainable Workspace + Demo Rail UI with the same tested behavior.

- [ ] **Step 1: Run the existing tests before refactor**

Run:

```powershell
npm test
```

Expected: PASS for domain and app tests.

- [ ] **Step 2: Extract DemoRail component**

Create `src/components/DemoRail.tsx`:

```tsx
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import type { WorkflowStep } from "../domain/types";

interface DemoRailProps {
  step: WorkflowStep;
  onChangeStep: (step: WorkflowStep) => void;
}

const steps: Array<[WorkflowStep, string, typeof FileText]> = [
  ["brief", "Meeting Brief", FileText],
  ["approval", "Agent Approval", CheckCircle2],
  ["followup", "Follow-up Draft", ShieldCheck],
];

export function DemoRail({ step, onChangeStep }: DemoRailProps) {
  return (
    <aside className="demo-rail" aria-label="Demo steps">
      {steps.map(([id, label, Icon]) => (
        <button
          className={`rail-step ${step === id ? "active" : ""}`}
          key={id}
          onClick={() => onChangeStep(id)}
          type="button"
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </aside>
  );
}
```

- [ ] **Step 3: Extract ApprovalCard component**

Create `src/components/ApprovalCard.tsx`:

```tsx
import type { TalkingPoint, TalkingPointDecision } from "../domain/types";

interface ApprovalCardProps {
  point: TalkingPoint;
  decision: TalkingPointDecision;
  onDecision: (id: string, decision: TalkingPointDecision) => void;
}

export function ApprovalCard({ point, decision, onDecision }: ApprovalCardProps) {
  return (
    <article className="approval-card">
      <div>
        <h3>{point.title}</h3>
        <p>{point.rationale}</p>
        <p className="client-language">{point.clientLanguage}</p>
        <span className={`decision ${decision}`}>{decision}</span>
      </div>
      <div className="approval-actions">
        <button onClick={() => onDecision(point.id, "approved")} type="button">
          Approve {point.title}
        </button>
        <button onClick={() => onDecision(point.id, "rejected")} type="button">
          Reject {point.title}
        </button>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Extract Workspace component**

Create `src/components/Workspace.tsx`:

```tsx
import type {
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
  WorkflowStep,
} from "../domain/types";
import { ApprovalCard } from "./ApprovalCard";

interface WorkspaceProps {
  step: WorkflowStep;
  brief: MeetingBrief | null;
  decisions: Record<string, TalkingPointDecision>;
  draft?: FollowUpDraft;
  onGenerateBrief: () => void;
  onDecision: (id: string, decision: TalkingPointDecision) => void;
  onGenerateDraft: () => void;
  onMarkReady: () => void;
}

export function Workspace({
  step,
  brief,
  decisions,
  draft,
  onGenerateBrief,
  onDecision,
  onGenerateDraft,
  onMarkReady,
}: WorkspaceProps) {
  if (step === "brief") {
    return (
      <section className="center-workspace">
        <div className="panel">
          <p className="eyebrow">Step 1</p>
          <h2>Prepare meeting brief</h2>
          <p>
            Start directly from Sunny Tan's annual family protection review. The
            brief summarizes CRM-like context, policy data, product knowledge,
            and compliance reminders.
          </p>
          <button className="primary-action" onClick={onGenerateBrief} type="button">
            Generate Meeting Brief
          </button>
        </div>
      </section>
    );
  }

  if (step === "approval" && brief) {
    return (
      <section className="center-workspace">
        <div className="panel stack">
          <p className="eyebrow">Step 2</p>
          <h2>Review AI-suggested talking points</h2>
          <p>{brief.snapshot}</p>
          {brief.talkingPoints.map((point) => (
            <ApprovalCard
              decision={decisions[point.id]}
              key={point.id}
              onDecision={onDecision}
              point={point}
            />
          ))}
          <button className="primary-action" onClick={onGenerateDraft} type="button">
            Generate Follow-up Draft
          </button>
        </div>
      </section>
    );
  }

  if (step === "followup" && draft) {
    return (
      <section className="center-workspace">
        <div className="panel stack">
          <p className="eyebrow">Step 3</p>
          <h2>{draft.subject}</h2>
          <pre className="message-draft">{draft.body}</pre>
          <button className="primary-action" onClick={onMarkReady} type="button">
            Mark Ready for Agent Send
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="center-workspace">
      <div className="panel">
        <h2>Generate the meeting brief to continue</h2>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Extract ControlPanel component**

Create `src/components/ControlPanel.tsx`:

```tsx
import type { ComplianceState, FollowUpDraft, MeetingBrief } from "../domain/types";

interface ControlPanelProps {
  brief: MeetingBrief | null;
  compliance?: ComplianceState;
  draft?: FollowUpDraft;
}

export function ControlPanel({ brief, compliance, draft }: ControlPanelProps) {
  return (
    <aside className="control-panel" aria-label="Control panel">
      <h2>Human control</h2>
      <p>
        Status:{" "}
        <strong>
          {draft?.status === "ready_for_agent_send" ? "Ready" : "Review required"}
        </strong>
      </p>
      <h3>Compliance</h3>
      <ul>
        {(compliance?.flags ?? ["Generate a brief to load compliance checks."]).map((flag) => (
          <li key={flag}>{flag}</li>
        ))}
      </ul>
      <h3>Evidence</h3>
      <ul>
        {(brief?.sources.slice(0, 6) ?? []).map((item) => (
          <li key={item.id}>
            {item.title} <span>{item.kind}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

- [ ] **Step 6: Replace App with composed components**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { ControlPanel } from "./components/ControlPanel";
import { DemoRail } from "./components/DemoRail";
import { Workspace } from "./components/Workspace";
import { demoData } from "./domain/mockData";
import {
  generateFollowUpDraft,
  generateMeetingBrief,
  getComplianceState,
} from "./domain/copilot";
import type {
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
  WorkflowStep,
} from "./domain/types";

const initialDecisions: Record<string, TalkingPointDecision> = {
  "critical-illness-gap": "pending",
  "education-planning": "pending",
  "family-protection-review": "pending",
};

export default function App() {
  const [step, setStep] = useState<WorkflowStep>("brief");
  const [brief, setBrief] = useState<MeetingBrief | null>(null);
  const [decisions, setDecisions] =
    useState<Record<string, TalkingPointDecision>>(initialDecisions);
  const [draft, setDraft] = useState<FollowUpDraft | undefined>();

  const compliance = useMemo(
    () => (brief ? getComplianceState(brief, draft) : undefined),
    [brief, draft],
  );

  function handleGenerateBrief() {
    setBrief(generateMeetingBrief(demoData));
    setStep("approval");
  }

  function setDecision(id: string, decision: TalkingPointDecision) {
    setDecisions((current) => ({ ...current, [id]: decision }));
  }

  function handleGenerateDraft() {
    if (!brief) return;
    setDraft(generateFollowUpDraft(brief, decisions));
    setStep("followup");
  }

  function markReady() {
    if (!draft) return;
    setDraft({ ...draft, status: "ready_for_agent_send" });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AIA Agent Copilot PoC</p>
          <h1>Sunny Tan - Family Protection Review</h1>
        </div>
        <div className="status-chip">
          <ShieldCheck size={18} />
          Human approval required
        </div>
      </header>

      <section className="workspace-grid">
        <DemoRail onChangeStep={setStep} step={step} />
        <Workspace
          brief={brief}
          decisions={decisions}
          draft={draft}
          onDecision={setDecision}
          onGenerateBrief={handleGenerateBrief}
          onGenerateDraft={handleGenerateDraft}
          onMarkReady={markReady}
          step={step}
        />
        <ControlPanel brief={brief} compliance={compliance} draft={draft} />
      </section>
    </main>
  );
}
```

- [ ] **Step 7: Replace styling with the polished internal tool layout**

Replace `src/styles.css` with:

```css
:root {
  color: #1f2933;
  background: #eef3f7;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  min-height: 100vh;
  padding: 24px;
}

.topbar,
.workspace-grid {
  max-width: 1360px;
  margin: 0 auto;
}

.topbar {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 18px;
}

.eyebrow {
  color: #c9252d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  margin: 0 0 8px;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: 2rem;
  line-height: 1.15;
  margin-bottom: 6px;
}

h2 {
  font-size: 1.25rem;
  line-height: 1.25;
}

h3 {
  font-size: 1rem;
  line-height: 1.3;
}

p,
li {
  line-height: 1.55;
}

.status-chip {
  align-items: center;
  background: #fff;
  border: 1px solid #d7dee8;
  border-radius: 8px;
  display: inline-flex;
  gap: 8px;
  min-height: 40px;
  padding: 8px 12px;
}

.workspace-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 210px minmax(0, 1fr) 300px;
}

.demo-rail,
.panel,
.control-panel {
  background: #fff;
  border: 1px solid #d7dee8;
  border-radius: 8px;
}

.demo-rail,
.control-panel {
  padding: 12px;
}

.rail-step {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 6px;
  color: #344054;
  display: flex;
  gap: 10px;
  min-height: 42px;
  padding: 10px;
  text-align: left;
  width: 100%;
}

.rail-step.active {
  background: #f9e7e9;
  color: #a61f28;
  font-weight: 700;
}

.center-workspace {
  min-width: 0;
}

.panel {
  min-height: 560px;
  padding: 20px;
}

.stack {
  display: grid;
  gap: 14px;
}

.primary-action,
.approval-actions button {
  border: 1px solid #b8c2cc;
  border-radius: 6px;
  min-height: 40px;
  padding: 9px 12px;
}

.primary-action {
  background: #c9252d;
  border-color: #c9252d;
  color: #fff;
  font-weight: 700;
}

.approval-card {
  border: 1px solid #d7dee8;
  border-radius: 8px;
  display: grid;
  gap: 14px;
  grid-template-columns: minmax(0, 1fr) auto;
  padding: 14px;
}

.client-language {
  background: #f5f8fb;
  border-left: 3px solid #3b82f6;
  padding: 10px;
}

.approval-actions {
  align-content: start;
  display: grid;
  gap: 8px;
}

.decision {
  border-radius: 999px;
  display: inline-flex;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 8px;
}

.decision.pending {
  background: #fef3c7;
}

.decision.approved {
  background: #dcfce7;
}

.decision.rejected {
  background: #fee2e2;
}

.message-draft {
  background: #f8fafc;
  border: 1px solid #d7dee8;
  border-radius: 8px;
  overflow: auto;
  padding: 14px;
  white-space: pre-wrap;
}

.control-panel ul {
  margin: 0 0 18px;
  padding-left: 20px;
}

.control-panel span {
  color: #667085;
  font-size: 0.78rem;
  margin-left: 4px;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .workspace-grid {
    grid-template-columns: 1fr;
  }

  .demo-rail {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .approval-card {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 8: Run tests after refactor and polish**

Run:

```powershell
npm test
```

Expected: PASS for all tests.

- [ ] **Step 9: Build the app**

Run:

```powershell
npm run build
```

Expected: Vite build completes with exit code 0.

- [ ] **Step 10: Commit component split and styling**

Run:

```powershell
git add src/App.tsx src/App.test.tsx src/components/DemoRail.tsx src/components/Workspace.tsx src/components/ControlPanel.tsx src/components/ApprovalCard.tsx src/styles.css
git commit -m "feat: polish agent copilot workspace UI"
```

---

### Task 5: Verify Demo Readiness and Add Project README

**Files:**
- Create: `README.md`
- Modify: `docs/superpowers/specs/2026-07-09-insurance-agent-copilot-poc-design.md` only if verification finds a spec mismatch.

**Interfaces:**
- Consumes: completed prototype.
- Produces: Run instructions and a verified 5-8 minute demo path.

- [ ] **Step 1: Create README with demo path**

Create `README.md`:

```md
# Insurance Agent Copilot PoC

Interview-ready prototype for an insurance Agent Copilot workflow.

## Demo Story

Sunny Tan is a young-family client with an annual family protection review. The agent uses AI to prepare a meeting brief, approve suggested talking points, and mark a compliant follow-up draft as ready for agent send.

## Run Locally

```powershell
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Demo Path

1. Start on `Sunny Tan - Family Protection Review`.
2. Click `Generate Meeting Brief`.
3. Approve `Critical illness protection gap`.
4. Reject `Education planning conversation`.
5. Approve `Family protection review`.
6. Click `Generate Follow-up Draft`.
7. Confirm the draft excludes the rejected education planning point.
8. Confirm the final action is `Mark Ready for Agent Send`.

## Guardrails Shown

- Human approval required before follow-up use.
- Compliance flags remain visible in the right panel.
- Evidence sources are shown from mock CRM, policy, product, and compliance data.
- No client message is sent automatically.
```

- [ ] **Step 2: Run the full verification suite**

Run:

```powershell
npm test
npm run build
```

Expected: both commands exit with code 0.

- [ ] **Step 3: Start the dev server**

Run:

```powershell
npm run dev
```

Expected: Vite prints a local URL such as `http://127.0.0.1:5173/`.

- [ ] **Step 4: Manual browser verification**

Open the Vite URL and perform the README demo path.

Expected:

- The app starts directly in Sunny Tan's review case.
- The meeting brief workflow appears without setup.
- The right panel shows evidence and compliance after generating the brief.
- At least two talking points can be explicitly approved or rejected.
- The rejected education planning talking point does not appear in the follow-up draft.
- The final button says `Mark Ready for Agent Send`.

- [ ] **Step 5: Commit README and verified state**

Run:

```powershell
git add README.md
git commit -m "docs: add prototype demo instructions"
```

---

## Self-Review

Spec coverage:

- Prepare -> Approve -> Follow Up is implemented by Tasks 2, 3, and 4.
- Sunny Tan mock data is implemented by Task 2.
- Workspace + Demo Rail layout is implemented by Task 4.
- Human approval controls are implemented by Tasks 3 and 4.
- Follow-up draft from approved points only is tested in Tasks 2 and 3.
- Compliance and evidence panel is implemented by Tasks 3 and 4.
- No actual sending is enforced by button text and tests in Tasks 3 and 4.
- Demo acceptance checks are verified by Tasks 3 and 5.

Placeholder scan:

- The plan contains no placeholder markers, deferred implementation notes, or unspecified testing steps.
- Each code-producing step includes concrete file content or exact replacement content.

Type consistency:

- `WorkflowStep`, `TalkingPointDecision`, `MeetingBrief`, `FollowUpDraft`, and `ComplianceState` are defined in Task 2 and reused consistently in later tasks.
- `generateMeetingBrief`, `generateFollowUpDraft`, and `getComplianceState` signatures are consistent across tests and UI code.
