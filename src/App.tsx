import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { ControlPanel } from "./components/ControlPanel";
import { DemoRail } from "./components/DemoRail";
import { Workspace } from "./components/Workspace";
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

export default function App() {
  const [step, setStep] = useState<WorkflowStep>("brief");
  const [brief, setBrief] = useState<MeetingBrief | null>(null);
  const [decisions, setDecisions] =
    useState<Record<string, TalkingPointDecision>>(initialDecisions);
  const [draft, setDraft] = useState<FollowUpDraft | null>(null);
  const approvedCount = brief
    ? brief.talkingPoints.filter((point) => decisions[point.id] === "approved").length
    : 0;

  const compliance = useMemo(
    () => (brief ? getComplianceState(brief, draft ?? undefined) : undefined),
    [brief, draft],
  );
  const canAccessApproval = Boolean(brief);
  const canAccessFollowup = Boolean(draft);

  function handleGenerateBrief() {
    setBrief(generateMeetingBrief(demoData));
    setDecisions(initialDecisions);
    setDraft(null);
    setStep("approval");
  }

  function setDecision(id: string, decision: TalkingPointDecision) {
    if (decisions[id] === decision) {
      return;
    }

    setDecisions((current) => ({ ...current, [id]: decision }));

    if (draft) {
      setDraft(null);
      setStep("approval");
    }
  }

  function setTalkingPointLanguage(id: string, clientLanguage: string) {
    const nextLanguage = clientLanguage.trim();

    if (!brief || nextLanguage.length === 0) {
      return;
    }

    const currentPoint = brief.talkingPoints.find((point) => point.id === id);
    if (!currentPoint || currentPoint.clientLanguage === nextLanguage) {
      return;
    }

    setBrief({
      ...brief,
      talkingPoints: brief.talkingPoints.map((point) =>
        point.id === id ? { ...point, clientLanguage: nextLanguage } : point,
      ),
    });

    if (draft) {
      setDraft(null);
      setStep("approval");
    }
  }

  function handleGenerateDraft() {
    if (!brief || approvedCount === 0) return;
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
        <DemoRail canNavigateTo={canNavigateTo} onChangeStep={navigateTo} step={step} />
        <Workspace
          approvedCount={approvedCount}
          brief={brief}
          decisions={decisions}
          draft={draft}
          onGenerateBrief={handleGenerateBrief}
          onGenerateDraft={handleGenerateDraft}
          onMarkReady={markReady}
          step={step}
        />
        <ControlPanel
          brief={brief}
          compliance={compliance}
          decisions={decisions}
          draft={draft}
          onDecision={setDecision}
          onEditClientLanguage={setTalkingPointLanguage}
          onMarkReady={markReady}
        />
      </section>
    </main>
  );
}
