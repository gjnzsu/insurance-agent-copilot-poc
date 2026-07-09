import type { TalkingPoint, TalkingPointDecision } from "../domain/types";

interface ApprovalCardProps {
  point: Pick<TalkingPoint, "id" | "title"> &
    Partial<Pick<TalkingPoint, "rationale" | "clientLanguage">>;
  decision: TalkingPointDecision;
  onDecision?: (id: string, decision: TalkingPointDecision) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ApprovalCard({
  point,
  decision,
  onDecision,
  disabled = false,
  compact = false,
}: ApprovalCardProps) {
  return (
    <article className={`approval-card ${compact ? "compact" : ""}`}>
      <div>
        <h3>{point.title}</h3>
        {point.rationale ? <p>{point.rationale}</p> : null}
        {point.clientLanguage ? (
          <p className="client-language">{point.clientLanguage}</p>
        ) : null}
        <p className="decision-line">
          Status: <span className={`decision ${decision}`}>{decision}</span>
        </p>
      </div>
      {onDecision ? (
        <div className="approval-actions">
          <button
            disabled={disabled}
            onClick={() => onDecision(point.id, "approved")}
            type="button"
          >
            Approve {point.title}
          </button>
          <button
            disabled={disabled}
            onClick={() => onDecision(point.id, "rejected")}
            type="button"
          >
            Reject {point.title}
          </button>
        </div>
      ) : null}
    </article>
  );
}
