import { type ComponentType } from "react";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import type { WorkflowStep } from "../domain/types";

interface DemoRailProps {
  step: WorkflowStep;
  canNavigateTo: (step: WorkflowStep) => boolean;
  onChangeStep: (step: WorkflowStep) => void;
}

const steps: Array<{
  id: WorkflowStep;
  label: string;
  Icon: ComponentType<{ size: number }>;
}> = [
  { id: "brief", label: "Meeting Brief", Icon: FileText },
  { id: "approval", label: "Agent Approval", Icon: CheckCircle2 },
  { id: "followup", label: "Follow-up Draft", Icon: ShieldCheck },
];

export function DemoRail({ step, canNavigateTo, onChangeStep }: DemoRailProps) {
  return (
    <aside className="demo-rail" aria-label="Workflow steps">
      {steps.map(({ id, label, Icon }) => (
        <button
          className={`rail-step ${step === id ? "active" : ""}`}
          disabled={!canNavigateTo(id)}
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
