import { type ComponentType, useMemo, useState } from "react";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { generateFollowUpDraft, generateMeetingBrief, getComplianceState } from "./domain/copilot";
import { demoData } from "./domain/mockData";
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

const initialTalkingPoints = [
  "critical-illness-gap",
  "education-planning",
  "family-protection-review",
] as const;

const expectedTalkingPointTitles: Record<(typeof initialTalkingPoints)[number], string> = {
  "critical-illness-gap": "Critical illness protection gap",
  "education-planning": "Education planning conversation",
  "family-protection-review": "Family protection review",
};

const fallbackEvidence = [
  "Policy record(s)",
  "Product knowledge snippet(s)",
  "Compliance guideline(s)",
  "CRM interaction history",
];

export default function App() {
  const [step, setStep] = useState<WorkflowStep>("brief");
  const [brief, setBrief] = useState<MeetingBrief | null>(null);
  const [decisions, setDecisions] =
    useState<Record<string, TalkingPointDecision>>(initialDecisions);
  const [draft, setDraft] = useState<FollowUpDraft | null>(null);

  const compliance = useMemo(
    () => (brief ? getComplianceState(brief, draft ?? undefined) : undefined),
    [brief, draft],
  );
  const canAccessApproval = Boolean(brief);
  const canAccessFollowup = Boolean(draft);
  const evidenceRows = brief
    ? brief.sources.slice(0, 6).map((item) => ({
        ...item,
        label: item.title,
        kindLabel: item.kind,
      }))
    : fallbackEvidence.map((item) => ({
        id: item,
        title: item,
        kind: "mock-source" as const,
        label: item,
        kindLabel: "pending",
      }));

  function handleGenerateBrief() {
    setBrief(generateMeetingBrief(demoData));
    setDecisions(initialDecisions);
    setDraft(null);
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

  function canNavigateTo(target: WorkflowStep) {
    if (target === "approval") return canAccessApproval;
    if (target === "followup") return canAccessFollowup;
    return true;
  }

  function navigateTo(target: WorkflowStep) {
    if (canNavigateTo(target)) {
      setStep(target);
    }
  }

  const stepLabel = {
    brief: "Meeting Brief",
    approval: "Review AI-suggested talking points",
    followup: "Follow-up Draft",
  }[step];

  const workflowSteps: Array<{
    id: WorkflowStep;
    label: string;
    Icon: ComponentType<{ size: number }>;
  }> = [
    { id: "brief", label: "Meeting Brief", Icon: FileText },
    {
      id: "approval",
      label: "Agent Approval",
      Icon: CheckCircle2,
    },
    {
      id: "followup",
      label: "Follow-up Draft",
      Icon: ShieldCheck,
    },
  ];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">AIA Agent Copilot PoC</p>
          <h1>Sunny Tan - Family Protection Review</h1>
          <p className="hero-copy">
            Prepare a review brief, approve AI-suggested talking points, and
            mark a compliant follow-up as ready for agent send.
          </p>
        </div>
        <div className="status-chip">
          <ShieldCheck size={18} />
          Human approval required
        </div>
      </header>

      <section className="workspace-grid">
        <aside className="demo-rail" aria-label="Workflow steps">
          {workflowSteps.map(({ id, label, Icon }) => (
            <button
              className={`rail-step ${step === id ? "active" : ""}`}
              key={String(id)}
              disabled={!canNavigateTo(id)}
              onClick={() => navigateTo(id)}
              type="button"
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </aside>

        <section className="center-workspace" aria-live="polite">
          {step === "brief" && (
            <div className="panel">
              <p className="eyebrow">Step 1</p>
              <h2>{stepLabel}</h2>
              <p>
                Start directly from Sunny Tan&apos;s annual family protection
                review. The brief gathers the client snapshot, policy context,
                talking points, and compliance reminders.
              </p>
              <button className="primary-action" onClick={handleGenerateBrief} type="button">
                Generate Meeting Brief
              </button>
            </div>
          )}

          {step === "approval" && brief && (
            <div className="panel stack">
              <p className="eyebrow">Step 2</p>
              <h2>{stepLabel}</h2>
              <p>{brief.snapshot}</p>
              <div className="detail-grid">
                <article className="detail-block">
                  <h3>Family context</h3>
                  <p>{brief.policySummary.join(" ")}</p>
                </article>
                <article className="detail-block">
                  <h3>Discovery questions</h3>
                  <ul>
                    {brief.discoveryQuestions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </article>
              </div>
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
              <h2>{stepLabel}</h2>
              <p className="status-line">
                Status:{" "}
                <strong>
                  {draft.status === "ready_for_agent_send"
                    ? "Ready for agent send"
                    : "Needs final agent approval"}
                </strong>
              </p>
              <pre className="message-draft">{draft.body}</pre>
            </div>
          )}
        </section>

        <aside className="control-panel" aria-label="Control panel">
          <h2>Human control</h2>
          <p>
            Status:{" "}
            <strong>
              {draft?.status === "ready_for_agent_send"
                ? "Ready"
                : step === "brief"
                  ? "Waiting for brief"
                  : "Review required"}
            </strong>
          </p>
          <h3>Compliance</h3>
          <ul>
            {(compliance?.flags ?? ["Generate a brief to load compliance checks."]).map(
              (flag) => (
                <li key={flag}>{flag}</li>
              ),
            )}
          </ul>
          <h3>Evidence</h3>
          <ul>
            {evidenceRows.map(({ id, label, kindLabel }) => (
              <li key={id}>
                {label} <span>{kindLabel}</span>
              </li>
            ))}
          </ul>

          <h3>Talking point controls</h3>
          {initialTalkingPoints.map((pointId) => (
            <article className="approval-card" key={pointId}>
              <p>{expectedTalkingPointTitles[pointId]}</p>
              <p>
                Status:
                <strong>
                  {brief ? decisions[pointId] : "pending"}
                </strong>
              </p>
              <div className="approval-actions">
                <button
                  disabled={!brief}
                  onClick={() => setDecision(pointId, "approved")}
                  type="button"
                >
                  Approve {expectedTalkingPointTitles[pointId]}
                </button>
                <button
                  disabled={!brief}
                  onClick={() => setDecision(pointId, "rejected")}
                  type="button"
                >
                  Reject {expectedTalkingPointTitles[pointId]}
                </button>
              </div>
            </article>
          ))}

          {draft && (
            <button className="primary-action" onClick={markReady} type="button">
              Mark Ready for Agent Send
            </button>
          )}
        </aside>
      </section>
    </main>
  );
}
