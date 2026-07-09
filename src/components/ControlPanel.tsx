import type {
  ComplianceState,
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
} from "../domain/types";
import { ApprovalCard } from "./ApprovalCard";

interface ControlPanelProps {
  brief: MeetingBrief | null;
  compliance?: ComplianceState;
  decisions: Record<string, TalkingPointDecision>;
  draft: FollowUpDraft | null;
  onDecision: (id: string, decision: TalkingPointDecision) => void;
  onEditClientLanguage: (id: string, clientLanguage: string) => void;
  onMarkReady: () => void;
}

const fallbackEvidence = [
  "Policy record(s)",
  "Product knowledge snippet(s)",
  "Compliance guideline(s)",
  "CRM interaction history",
];

const fallbackTalkingPoints = [
  {
    id: "critical-illness-gap",
    title: "Critical illness protection gap",
  },
  {
    id: "education-planning",
    title: "Education planning conversation",
  },
  {
    id: "family-protection-review",
    title: "Family protection review",
  },
] as const;

export function ControlPanel({
  brief,
  compliance,
  decisions,
  draft,
  onDecision,
  onEditClientLanguage,
  onMarkReady,
}: ControlPanelProps) {
  const evidenceRows = brief
    ? brief.sources.map((item) => ({
        id: item.id,
        label: item.title,
        kindLabel: item.kind,
      }))
    : fallbackEvidence.map((item) => ({
        id: item,
        label: item,
        kindLabel: "pending",
      }));

  const talkingPoints = brief?.talkingPoints ?? fallbackTalkingPoints;

  return (
    <aside className="control-panel" aria-label="Control panel">
      <h2>Human control</h2>
      <p>
        Status:{" "}
        <strong>
          {draft?.status === "ready_for_agent_send"
            ? "Ready"
            : brief
              ? "Review required"
              : "Waiting for brief"}
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
        {evidenceRows.map(({ id, label, kindLabel }) => (
          <li key={id}>
            {label} <span>{kindLabel}</span>
          </li>
        ))}
      </ul>

      <h3>Talking point controls</h3>
      {draft ? (
        <p className="helper-text">Changing approvals or client language clears the current draft.</p>
      ) : null}
      <div className="stack">
        {talkingPoints.map((point) => (
          <ApprovalCard
            compact
            decision={brief ? decisions[point.id] : "pending"}
            disabled={!brief}
            key={point.id}
            onEdit={brief ? onEditClientLanguage : undefined}
            onDecision={onDecision}
            point={point}
          />
        ))}
      </div>

      {draft ? (
        <button
          className="primary-action"
          disabled={draft.status === "ready_for_agent_send"}
          onClick={onMarkReady}
          type="button"
        >
          {draft.status === "ready_for_agent_send"
            ? "Ready for agent send"
            : "Mark Ready for Agent Send"}
        </button>
      ) : null}
    </aside>
  );
}
