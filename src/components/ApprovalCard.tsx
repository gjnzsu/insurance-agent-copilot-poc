import { useEffect, useState } from "react";
import type { TalkingPoint, TalkingPointDecision } from "../domain/types";

interface ApprovalCardProps {
  point: Pick<TalkingPoint, "id" | "title"> &
    Partial<Pick<TalkingPoint, "rationale" | "clientLanguage" | "meetingFocus">>;
  decision: TalkingPointDecision;
  onDecision?: (id: string, decision: TalkingPointDecision) => void;
  onEdit?: (id: string, clientLanguage: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ApprovalCard({
  point,
  decision,
  onDecision,
  onEdit,
  disabled = false,
  compact = false,
}: ApprovalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftLanguage, setDraftLanguage] = useState(point.clientLanguage ?? "");
  const editorId = `talking-point-language-${point.id}`;

  useEffect(() => {
    setDraftLanguage(point.clientLanguage ?? "");
  }, [point.clientLanguage]);

  return (
    <article className={`approval-card ${compact ? "compact" : ""}`}>
      <div>
        <h3>{point.title}</h3>
        {point.meetingFocus && !compact ? (
          <section className="meeting-focus" aria-label={`${point.title} evidence-backed focus`}>
            <div className="scope-notice">
              <strong>Synthetic demo data</strong>
              <span>Meeting preparation support only</span>
            </div>
            <div className="claim-block">
              <div className="claim-heading">
                <h4>Observation</h4>
                <span className="claim-label fact">Fact</span>
              </div>
              <p>{point.meetingFocus.observation.text}</p>
            </div>
            <div className="claim-block">
              <div className="claim-heading">
                <h4>Potential Issue</h4>
                <span className="claim-label inference">Inference</span>
              </div>
              <p>{point.meetingFocus.potentialIssue.text}</p>
            </div>
            <div className="claim-block">
              <div className="claim-heading">
                <h4>Confirmation Question</h4>
                <span className="claim-label confirmation">Confirmation</span>
              </div>
              <p>{point.meetingFocus.confirmationQuestion.text}</p>
            </div>
            <details className="focus-evidence">
              <summary>Evidence</summary>
              {point.meetingFocus.evidence.map((item) => (
                <div className="evidence-item" key={`${item.sourceId}-${item.lastUpdated}`}>
                  <p><strong>{item.sourceId}</strong> · {item.sourceType}</p>
                  <blockquote>{item.excerpt}</blockquote>
                  <p>Last updated: {item.lastUpdated}</p>
                </div>
              ))}
            </details>
            <div className="limitation-block">
              <h4>Limitation</h4>
              <p>{point.meetingFocus.limitation}</p>
            </div>
          </section>
        ) : null}
        {point.rationale && !compact ? <p>{point.rationale}</p> : null}
        {point.clientLanguage && !isEditing && !compact ? (
          <p className="client-language">{point.clientLanguage}</p>
        ) : null}
        {point.clientLanguage && isEditing && onEdit ? (
          <div className="edit-stack">
            <label className="editor-label" htmlFor={editorId}>
              Talking point language for {point.title}
            </label>
            <textarea
              className="editor-input"
              id={editorId}
              onChange={(event) => setDraftLanguage(event.target.value)}
              rows={4}
              value={draftLanguage}
            />
            <div className="inline-actions">
              <button
                disabled={draftLanguage.trim().length === 0}
                onClick={() => {
                  onEdit(point.id, draftLanguage);
                  setIsEditing(false);
                }}
                type="button"
              >
                Save {point.title}
              </button>
              <button
                onClick={() => {
                  setDraftLanguage(point.clientLanguage ?? "");
                  setIsEditing(false);
                }}
                type="button"
              >
                Cancel {point.title}
              </button>
            </div>
          </div>
        ) : null}
        <p className="decision-line">
          Status: <span className={`decision ${decision}`}>{decision}</span>
        </p>
      </div>
      {onDecision ? (
        <div className="approval-actions">
          {onEdit && point.clientLanguage ? (
            <button disabled={disabled} onClick={() => setIsEditing(true)} type="button">
              Edit {point.title}
            </button>
          ) : null}
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
