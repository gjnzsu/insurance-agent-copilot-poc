import { useEffect, useState } from "react";
import type { TalkingPoint, TalkingPointDecision } from "../domain/types";

interface ApprovalCardProps {
  point: Pick<TalkingPoint, "id" | "title"> &
    Partial<Pick<TalkingPoint, "rationale" | "clientLanguage">>;
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
        {point.rationale ? <p>{point.rationale}</p> : null}
        {point.clientLanguage && !isEditing ? (
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
