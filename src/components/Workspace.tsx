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
  draft: FollowUpDraft | null;
  onGenerateBrief: () => void;
  onGenerateDraft: () => void;
  onMarkReady: () => void;
}

export function Workspace({
  step,
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
        <div className="panel stack">
          <p className="eyebrow">Step 2</p>
          <h2>Review AI-suggested talking points</h2>
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
            <ApprovalCard
              decision={decisions[point.id]}
              key={point.id}
              point={point}
            />
          ))}
          <button className="primary-action" onClick={onGenerateDraft} type="button">
            Generate Follow-up Draft
          </button>
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
          <button className="primary-action" onClick={onMarkReady} type="button">
            Mark Ready for Agent Send
          </button>
        </div>
      ) : null}
    </section>
  );
}
