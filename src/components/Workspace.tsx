import type {
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
  WorkflowStep,
} from "../domain/types";
import { ApprovalCard } from "./ApprovalCard";

interface WorkspaceProps {
  step: WorkflowStep;
  approvedCount: number;
  brief: MeetingBrief | null;
  decisions: Record<string, TalkingPointDecision>;
  draft: FollowUpDraft | null;
  onGenerateBrief: () => void;
  onGenerateDraft: () => void;
  onMarkReady: () => void;
}

export function Workspace({
  step,
  approvedCount,
  brief,
  decisions,
  draft,
  onGenerateBrief,
  onGenerateDraft,
  onMarkReady,
}: WorkspaceProps) {
  return (
    <section className="center-workspace" aria-live="polite">
      {step === "brief" ? (
        <div className="panel">
          <p className="eyebrow">Step 1</p>
          <h2>Meeting Brief</h2>
          <p>
            Start directly from Sunny Tan&apos;s annual family protection review.
            The brief gathers the client snapshot, policy context, talking
            points, and compliance reminders.
          </p>
          <button className="primary-action" onClick={onGenerateBrief} type="button">
            Generate Meeting Brief
          </button>
        </div>
      ) : null}

      {step === "approval" && brief ? (
        <div
          aria-label="Agent approval workspace"
          className="panel stack approval-workspace"
          role="region"
        >
          <div className="approval-hero">
            <div>
              <p className="eyebrow">Step 2</p>
              <h2>Review AI-suggested talking points</h2>
              <p>{brief.snapshot}</p>
            </div>
            <section className="decision-checkpoint" aria-label="Decision checkpoint">
              <p className="eyebrow">Human decision</p>
              <h3>Decision checkpoint</h3>
              <p>
                <strong>{approvedCount}</strong> of {brief.talkingPoints.length} talking
                points approved
              </p>
              <button
                className="primary-action"
                disabled={approvedCount === 0}
                onClick={onGenerateDraft}
                type="button"
              >
                Generate Follow-up Draft
              </button>
              {approvedCount === 0 ? (
                <p className="helper-text">
                  Approve at least one talking point to generate follow-up.
                </p>
              ) : null}
            </section>
          </div>

          <div className="brief-summary-grid" aria-label="Meeting brief summary">
            <article className="summary-card">
              <span>{brief.policySummary.length}</span>
              <strong>policy records</strong>
              <p>{brief.policySummary[0]}</p>
            </article>
            <article className="summary-card">
              <span>{brief.coverageGaps.length}</span>
              <strong>coverage gaps</strong>
              <p>{brief.coverageGaps[0]}</p>
            </article>
            <article className="summary-card">
              <span>{brief.complianceReminders.length}</span>
              <strong>guardrails</strong>
              <p>{brief.complianceReminders[0]}</p>
            </article>
          </div>

          <details className="brief-details">
            <summary>Meeting brief details</summary>
            <div className="detail-grid">
              <article className="detail-block">
                <h3>Policy summary</h3>
                <ul>
                  {brief.policySummary.map((summary) => (
                    <li key={summary}>{summary}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-block">
                <h3>Coverage gaps</h3>
                <ul>
                  {brief.coverageGaps.map((gap) => (
                    <li key={gap}>{gap}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-block">
                <h3>Discovery questions</h3>
                <ul>
                  {brief.discoveryQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </article>
              <article className="detail-block">
                <h3>Next-best action</h3>
                <p>{brief.nextBestAction}</p>
              </article>
              <article className="detail-block">
                <h3>Compliance reminders</h3>
                <ul>
                  {brief.complianceReminders.map((reminder) => (
                    <li key={reminder}>{reminder}</li>
                  ))}
                </ul>
              </article>
            </div>
          </details>

          {brief.talkingPoints.map((point) => (
            <ApprovalCard
              decision={decisions[point.id]}
              key={point.id}
              point={point}
            />
          ))}
        </div>
      ) : null}

      {step === "followup" && draft ? (
        <div className="panel stack">
          <p className="eyebrow">Step 3</p>
          <h2>Follow-up Draft</h2>
          <p className="draft-subject">{draft.subject}</p>
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
      ) : null}
    </section>
  );
}
