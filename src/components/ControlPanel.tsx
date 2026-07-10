import { useState } from "react";
import type {
  ComplianceState,
  FollowUpDraft,
  MeetingBrief,
  TalkingPointDecision,
} from "../domain/types";

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

type ControlTab = "approvals" | "evidence" | "compliance";

const visibleDetailCount = 3;

export function ControlPanel({
  brief,
  compliance,
  decisions,
  draft,
  onDecision,
  onEditClientLanguage,
  onMarkReady,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<ControlTab>("approvals");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftLanguage, setDraftLanguage] = useState("");

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
  const complianceFlags = compliance?.flags ?? ["Generate a brief to load compliance checks."];
  const pendingCount = talkingPoints.filter(
    (point) => !brief || decisions[point.id] === "pending",
  ).length;
  const approvedCount = talkingPoints.filter(
    (point) => brief && decisions[point.id] === "approved",
  ).length;
  const rejectedCount = talkingPoints.filter(
    (point) => brief && decisions[point.id] === "rejected",
  ).length;
  const readyLabel =
    draft?.status === "ready_for_agent_send"
      ? "Ready"
      : brief
        ? "Review required"
        : "Waiting for brief";
  const riskLabel = compliance?.level === "clear" ? "Clear" : "Needs review";
  const visibleEvidence = evidenceRows.slice(0, visibleDetailCount);
  const visibleCompliance = complianceFlags.slice(0, visibleDetailCount);
  const hiddenEvidenceCount = Math.max(evidenceRows.length - visibleEvidence.length, 0);
  const hiddenComplianceCount = Math.max(
    complianceFlags.length - visibleCompliance.length,
    0,
  );

  return (
    <aside className="control-panel" aria-label="Control panel">
      <div className="control-header">
        <div>
          <p className="eyebrow">Human in the loop</p>
          <h2>Human Control Hub</h2>
        </div>
        <span className={`hub-status ${draft?.status === "ready_for_agent_send" ? "clear" : ""}`}>
          {readyLabel}
        </span>
      </div>

      <div className="control-metrics" aria-label="Control summary">
        <div className="metric-tile">
          <strong>{pendingCount} pending</strong>
          <span>Approvals</span>
        </div>
        <div className="metric-tile">
          <strong>{evidenceRows.length} linked</strong>
          <span>Evidence</span>
        </div>
        <div className="metric-tile">
          <strong>{riskLabel}</strong>
          <span>Compliance</span>
        </div>
      </div>

      <section className="current-decision" aria-label="Current human decision">
        <p className="eyebrow">Current decision</p>
        <p>
          {draft
            ? "Final agent send readiness"
            : brief
              ? `${approvedCount} approved, ${rejectedCount} rejected`
              : "Generate the brief to unlock controls"}
        </p>
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
      </section>

      <div className="control-tabs" role="tablist" aria-label="Control detail views">
        {(["approvals", "evidence", "compliance"] as const).map((tab) => (
          <button
            aria-controls={`control-${tab}-panel`}
            aria-selected={activeTab === tab}
            className={activeTab === tab ? "active" : ""}
            id={`control-${tab}-tab`}
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            type="button"
          >
            {tab[0].toUpperCase()}
            {tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "approvals" ? (
        <section
          aria-labelledby="control-approvals-tab"
          className="tab-detail stack"
          id="control-approvals-panel"
          role="tabpanel"
        >
          <p className="helper-text">
            Changing approvals or client language clears the current draft.
          </p>
          {talkingPoints.map((point) => (
            <article className="approval-row" key={point.id}>
              <div>
                <h3>{point.title}</h3>
                <p>
                  Status:{" "}
                  <span className={`decision ${brief ? decisions[point.id] : "pending"}`}>
                    {brief ? decisions[point.id] : "pending"}
                  </span>
                </p>
              </div>
              {editingId === point.id ? (
                <div className="edit-stack compact-editor">
                  <label className="editor-label" htmlFor={`control-edit-${point.id}`}>
                    Talking point language for {point.title}
                  </label>
                  <textarea
                    className="editor-input"
                    id={`control-edit-${point.id}`}
                    onChange={(event) => setDraftLanguage(event.target.value)}
                    rows={3}
                    value={draftLanguage}
                  />
                  <div className="inline-actions">
                    <button
                      disabled={draftLanguage.trim().length === 0}
                      onClick={() => {
                        onEditClientLanguage(point.id, draftLanguage);
                        setEditingId(null);
                      }}
                      type="button"
                    >
                      Save {point.title}
                    </button>
                    <button
                      onClick={() => {
                        setDraftLanguage(
                          "clientLanguage" in point ? (point.clientLanguage ?? "") : "",
                        );
                        setEditingId(null);
                      }}
                      type="button"
                    >
                      Cancel {point.title}
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="approval-row-actions">
                {"clientLanguage" in point ? (
                  <button
                    aria-label={`Edit ${point.title}`}
                    disabled={!brief}
                    onClick={() => {
                      setDraftLanguage(point.clientLanguage ?? "");
                      setEditingId(point.id);
                    }}
                    type="button"
                  >
                    Edit wording
                  </button>
                ) : null}
                <button
                  aria-label={`Approve ${point.title}`}
                  disabled={!brief}
                  onClick={() => onDecision(point.id, "approved")}
                  type="button"
                >
                  Approve
                </button>
                <button
                  aria-label={`Reject ${point.title}`}
                  disabled={!brief}
                  onClick={() => onDecision(point.id, "rejected")}
                  type="button"
                >
                  Reject
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {activeTab === "evidence" ? (
        <section
          aria-labelledby="control-evidence-tab"
          className="tab-detail"
          id="control-evidence-panel"
          role="tabpanel"
        >
          <p className="detail-count">
            Showing {visibleEvidence.length} of {evidenceRows.length} linked sources
          </p>
          <ul className="compact-list">
            {visibleEvidence.map(({ id, label, kindLabel }) => (
              <li key={id}>
                <span>{label}</span>
                <strong>{kindLabel}</strong>
              </li>
            ))}
          </ul>
          {hiddenEvidenceCount > 0 ? (
            <p className="more-note">+{hiddenEvidenceCount} more available in source drill-down</p>
          ) : null}
        </section>
      ) : null}

      {activeTab === "compliance" ? (
        <section
          aria-labelledby="control-compliance-tab"
          className="tab-detail"
          id="control-compliance-panel"
          role="tabpanel"
        >
          <p className="detail-count">
            Showing {visibleCompliance.length} of {complianceFlags.length} guardrails
          </p>
          <ul className="compact-list">
            {visibleCompliance.map((flag) => (
              <li key={flag}>{flag}</li>
            ))}
          </ul>
          {hiddenComplianceCount > 0 ? (
            <p className="more-note">
              +{hiddenComplianceCount} more guardrail{hiddenComplianceCount > 1 ? "s" : ""}
            </p>
          ) : null}
        </section>
      ) : null}
    </aside>
  );
}
