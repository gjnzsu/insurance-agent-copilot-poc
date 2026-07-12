export type WorkflowStep = "brief" | "approval" | "followup";

export type TalkingPointDecision = "pending" | "approved" | "rejected";

export interface ClientProfile {
  name: string;
  segment: string;
  familyContext: string;
  reviewTrigger: string;
  priority: string;
}

export interface PolicyRecord {
  id: string;
  type: string;
  summary: string;
  coverageLevel: "basic" | "moderate" | "missing";
  sourceExcerpt?: string;
  lastUpdated?: string;
}

export interface KnowledgeSnippet {
  id: string;
  title: string;
  body: string;
  kind: "product" | "compliance";
}

export interface DemoData {
  client: ClientProfile;
  policies: PolicyRecord[];
  interactionHistory: string[];
  knowledge: KnowledgeSnippet[];
}

export interface SourceReference {
  id: string;
  title: string;
  kind: "product" | "compliance" | "policy" | "crm";
}

export interface TalkingPoint {
  id: string;
  title: string;
  rationale: string;
  clientLanguage: string;
  decision: TalkingPointDecision;
  sourceIds: string[];
  meetingFocus?: EvidenceBackedMeetingFocus;
}

export interface LabeledClaim {
  label: "fact" | "inference" | "confirmation";
  text: string;
}

export interface LightweightEvidence {
  sourceId: string;
  sourceType: SourceReference["kind"];
  excerpt: string;
  lastUpdated: string;
}

export interface EvidenceBackedMeetingFocus {
  observation: LabeledClaim;
  potentialIssue: LabeledClaim;
  confirmationQuestion: LabeledClaim;
  evidence: LightweightEvidence[];
  limitation: string;
}

export interface MeetingBrief {
  clientName: string;
  snapshot: string;
  policySummary: string[];
  coverageGaps: string[];
  discoveryQuestions: string[];
  nextBestAction: string;
  talkingPoints: TalkingPoint[];
  complianceReminders: string[];
  sources: SourceReference[];
}

export interface FollowUpDraft {
  subject: string;
  body: string;
  includedTalkingPointIds: string[];
  status: "needs_final_agent_approval" | "ready_for_agent_send";
}

export interface ComplianceState {
  level: "clear" | "review_required";
  flags: string[];
}
