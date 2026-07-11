# Insurance Agent Copilot PoC: Product Requirements and User Story Pack

## 1. Purpose

This document defines the first Insurance Agent Copilot PoC. It tests whether AI can help Hong Kong life insurance agents prepare trustworthy, evidence-backed Policy Review meeting briefs while preserving the licensed agent's final judgment and approval responsibility.

Hong Kong life insurance and regulatory practices are working assumptions. AIA's internal workflows, data structures, approval rules, and quantified pain points require validation with business, agent, compliance, privacy, and technology stakeholders. This document is not legal or compliance advice.

## 2. Why This Product

### Strategic Problem

Client servicing spans CRM data, policy records, interaction history, and product knowledge. Fragmented systems force agents to repeatedly search, copy, reconcile, and reframe information across pre-meeting, meeting, and follow-up activities.

### First PoC Slice

The product vision is an end-to-end Agent Copilot. The first PoC focuses only on preparation for an already scheduled Policy Review. It synthesizes CRM, policy, and interaction data into a personalized, evidence-backed meeting brief that the agent must review.

### User and Business Outcome

The primary outcome is not simply serving more customers. It is shifting agent time from administrative preparation toward deeper client understanding, personalized conversations, and long-term relationship building.

### Why AI

Policy Review preparation combines structured policy data with unstructured interaction history. Dashboards can display records, automation can move data, and rules can execute deterministic checks. AI adds value by synthesizing context across sources, identifying potentially overlooked issues, and generating client-specific confirmation questions.

AI supports synthesis and generation. Deterministic controls enforce structure, state, and prohibited content. The licensed agent retains responsibility for suitability, content adoption, and client communication.

### Core PoC Hypothesis

If the Copilot can accurately synthesize CRM, policy, and interaction data; distinguish facts, AI inferences, and confirmation items; and provide evidence for important claims, then agents can review and adopt a meeting brief without rechecking every source record.

The first study will establish manual and AI-assisted baselines rather than assume a percentage efficiency gain.

## 3. Target User and Problem Statement

### Primary Persona

An experienced Hong Kong life insurance agent or Financial Planner who manages an established client portfolio, conducts recurring Policy Reviews, and can assess the quality of a meeting brief.

Key characteristics:

- Regularly services existing clients and conducts Policy Reviews.
- Has an established preparation method.
- Remains accountable for professional judgment and client communication.
- Is cautiously open to AI and will not trust fluent output by default.
- Needs source evidence before adopting AI-generated content.

### Primary Job-to-be-Done

When preparing for an existing client's Policy Review, I want to identify the most relevant client changes, current coverage, and items to confirm within limited preparation time, so I can enter the meeting prepared and confident for a personalized, evidence-based conversation.

### Problem Statement

Experienced Hong Kong life insurance agents need a way to understand a client's current situation and identify Policy Review priorities within limited preparation time because client, policy, and interaction data are fragmented across systems and must be manually searched, reconciled, and reframed, increasing preparation effort and the risk of overlooking information that could affect the client conversation.

This remains a `problem hypothesis` until validated through interviews and workflow observation with three to five target agents.

### Stakeholders

- Agency Manager: business sponsor focused on adoption, productivity, and service consistency.
- Compliance Reviewer: governance stakeholder defining permitted use and audit controls.
- Customer: indirect beneficiary of a more personalized and prepared review.
- Data / IT Owner: enabling stakeholder for data, access, security, and integration.

## 4. MVP Journey and Scope

### Entry Assumptions

- The Policy Review is already scheduled.
- The customer identity is known.
- The agent is authorized to access the customer record.
- CRM, policy, and interaction data are available.
- Search, scheduling, reminders, and real authentication are outside the PoC.

### User Journey

1. The agent opens Sunny Tan's scheduled Policy Review.
2. The system reads CRM Profile, Policy Records, and Interaction Notes.
3. It generates Customer Snapshot, Policy Summary, and Recent Context sections.
4. AI identifies a Potential Issue and creates a Suggested Confirmation Question.
5. The agent inspects Lightweight Evidence for each important claim.
6. The agent selects Approve, Edit followed by Save & Approve, or Reject with a reason.
7. After all suggestions are resolved, the system creates a versioned final Meeting Brief snapshot.

### Must Have

- Stable information structure with dynamically selected client-specific content.
- Explicit separation of facts, AI inferences, and confirmation items.
- Each Meeting Focus contains Observation, Potential Issue, Confirmation Question, Evidence, and Limitation.
- Claim-level evidence shows source, excerpt, last-updated date, and limitation.
- Missing data remains missing; conflicting data remains visible.
- AI may return zero suggestions when evidence is insufficient.
- Approve, Save & Approve, and Reject controls.
- Reject requires a lightweight reason: Inaccurate, Not relevant, Insufficient evidence, or Other.
- The agent may reject all AI suggestions and still create a factual brief.
- Pending suggestions cannot enter the final brief.
- The final brief shows version, approver, and approval time.

### Out of Scope

- Client search, scheduling, and review reminders.
- Automated FNA, suitability, or affordability decisions.
- Specific product recommendation or ranking.
- Automatic client communication.
- PDF or Word export.
- Validation of meeting capture or post-meeting follow-up.
- Production system integration, enterprise identity, and deployment.

The existing demo may retain follow-up as an expansion path, but the core PoC success boundary ends with the final Meeting Brief.

## 5. User Stories

### US-01: Understand Client Context

**As an** experienced life insurance agent preparing a Policy Review,  
**I want to** view client context synthesized from CRM, policy, and interaction data in a structured workspace,  
**so that** I can quickly understand the client's current situation and decide what to inspect next.

Acceptance focus:

- Show Customer Snapshot, Existing Policy Summary, and Recent Context.
- Show source and last-updated date for important facts.
- Mark missing information as unavailable or requiring confirmation; do not infer it.
- Preserve conflicting values and their sources rather than selecting one as fact.
- Show a partial-view state when a source is unavailable.

### US-02: Identify Potential Issues and Confirmation Questions

**As an** experienced life insurance agent preparing a Policy Review,  
**I want to** review potential issues and confirmation questions identified from the client context,  
**so that** I can notice potentially overlooked matters and decide whether to discuss them with the client.

Acceptance focus:

- Each suggestion contains Observation, Potential Issue, Confirmation Question, Evidence, and Limitation.
- Observations are sourced facts; Potential Issues are labeled AI inferences.
- "No record found" must never become "the client has no coverage."
- Do not produce confirmed coverage gaps, suitability conclusions, or specific product recommendations.
- Suggestions without adequate evidence do not enter the review queue; zero suggestions is valid.

### US-03: Inspect Evidence for Important Claims

**As an** experienced agent who is cautious about AI output,  
**I want to** inspect the source, evidence excerpt, last-updated date, and limitation for important claims,  
**so that** I can assess whether to adopt the content without searching every source system.

Acceptance focus:

- Lightweight Evidence Preview shows source type, excerpt, last-updated date, and limitation.
- Multiple evidence sources are shown separately.
- A claim that is not supported by its evidence cannot be shown as approvable.
- PoC evidence is simulated; automated citation validation is a production requirement.

### US-04: Review AI Suggestions

**As an** experienced agent accountable for the final Meeting Brief,  
**I want to** approve, edit, or reject each AI Meeting Focus,  
**so that** the final material contains only content I have chosen to adopt after professional review.

State model:

- Pending -> Approve -> Approved
- Pending -> Edit -> Save & Approve -> Approved with edits
- Pending -> Edit -> Cancel -> Pending
- Pending -> Reject + reason -> Rejected

Observation and Evidence remain read-only. Potential Issue and Confirmation Question may be edited. Editing is not approval; only Save & Approve records an adoption decision.

### US-05: Create the Final Meeting Brief

**As an** experienced agent who has completed AI content review,  
**I want to** create a final brief containing verified facts and meeting priorities I chose to adopt,  
**so that** I can enter the client meeting prepared and confident.

Acceptance focus:

- All suggestions must be resolved; Pending blocks finalization.
- Include verified facts, Approved suggestions, and the final Approved-with-edits content.
- Exclude Rejected content.
- Allow a factual brief when all suggestions are rejected or no qualified suggestion exists.
- Create a lightweight snapshot with version, approver, and time.
- Post-approval edits return to review and create a new version.

## 6. AI and Model Solution

### Staged Hybrid Pipeline

1. Data Retrieval: obtain authorized CRM, Policy, and Interaction data.
2. Normalization: convert sources into a consistent client-fact structure.
3. Evidence-grounded Synthesis: create a sourced customer summary.
4. Issue Detection: create Potential Issues and Confirmation Questions.
5. Deterministic Validation: check schema, evidence, states, and prohibited language.
6. Human Review: the agent adopts, edits, or rejects each suggestion.
7. Final Assembly: deterministic logic creates the versioned brief snapshot.

### Gate Boundaries

- G0 Access Gate: may these records be read?
- G1 Data Quality Gate: is this the correct client, with missing and conflicting states visible?
- G2 Grounding Gate: is each important factual claim supported without exceeding its evidence?
- G3 Suggestion Quality Gate: is the suggestion complete, relevant, and suitable for human review?
- G4 Compliance Gate: does the content remain within the meeting-preparation boundary?
- G5 Human Approval Gate: did the agent explicitly adopt the final content version?
- G6 Finalization Gate: does the final brief faithfully reflect all approval decisions?

An LLM may propose content, but it cannot independently determine that its own output is trustworthy, compliant, or approved for use.

### Model Selection

The PoC may use one enterprise-grade general LLM with separate prompts and schemas for Context Synthesis, Issue Detection, and Content Generation. A specific provider or model is not locked at the product-requirement stage.

Candidate models should be compared on groundedness, privacy and enterprise control, instruction following, structured output, long-context handling, Chinese and English capability, abstention, latency, and cost. Selection should use a common Golden Dataset and Evaluation Rubric.

The first version does not require fine-tuning, propensity models, product ranking, automated suitability scoring, or autonomous agents.

## 7. Data Requirements

### PoC Sources

- CRM Profile: family context, occupation, recorded goals, life stage, and last-updated date.
- Policy Records: policy type, coverage category, status, key riders, and last-updated date.
- Interaction Notes: recent relevant excerpts, dates, and follow-up items.
- Product / Compliance Knowledge: guardrails only, not specific product recommendation.

### Simplified Data Contract

Source records carry at least: `recordId`, `customerId`, `sourceSystem`, `sourceType`, `content`, `lastUpdatedAt`, `dataStatus`, `evidenceId`, and `limitation`.

AI claims carry at least: `claimId`, `claimType`, `content`, `evidenceIds`, `modelVersion`, `promptVersion`, and `status`.

Human decisions carry at least: `decision`, `rejectionReason`, `approvedContent`, `reviewedBy`, `reviewedAt`, and `briefVersion`.

The PoC displays last-updated dates but does not automatically classify records as stale. Production freshness rules should be defined by business, data, and compliance owners by data type.

### Data Minimization

The model receives only authorized, pre-filtered data necessary for the current Policy Review. Identity, purpose, field, and time-range filtering belong in the application layer. The model must not receive all available client data and decide for itself what it is permitted to use.

## 8. Compliance, Privacy, and Security

### Hong Kong Working Assumption

The PoC is informed by Hong Kong Insurance Authority principles relating to FNA, suitability, and fair customer treatment, and by PCPD guidance relating to AI governance, risk assessment, human oversight, and personal data protection.

### PoC Controls

- Use fully synthetic Sunny Tan dummy data only.
- Display a `Synthetic demo data` label.
- Do not import real or de-identified customer data.
- Label AI-generated content and make important content inspectable.
- Do not replace formal FNA, suitability, affordability, or agent accountability.
- Simulate approval records within the current session; do not claim production-grade immutable audit.

### Production Requirements

- Enterprise SSO, RBAC, and record-level authorization.
- Encryption in transit and at rest, key management, and DLP.
- Retention, deletion, purpose limitation, and model-vendor review.
- Data residency and cross-border transfer assessment.
- Immutable audit, security monitoring, and incident response.
- Formal approval by Legal, Compliance, Privacy, Security, and Model Risk.

## 9. Evaluation Metrics

The first study establishes a baseline rather than assuming an improvement percentage. Each layer uses three metrics.

### AI Output Quality

1. Critical factual accuracy.
2. Groundedness and evidence correctness.
3. Safe uncertainty handling.

### Human Review Quality

1. Review time.
2. Approved / Approved with edits / Rejected distribution and rejection reasons.
3. Missed critical error rate.

### Workflow Outcome

1. Total preparation time compared with the manual baseline.
2. Final Brief quality rated for accuracy, relevance, and completeness by agents or domain experts.
3. Agent confidence and adoption intent.

Primary go/no-go gate: no unmarked material factual error or unsupported conclusion may enter the final Meeting Brief.

## 10. Non-functional Requirements

### Reliability and State Integrity

- Pending and Rejected content cannot enter the final brief.
- Approved-with-edits uses the final approved version.
- Data or generation failures are explicit and never silently completed.

### Performance and Responsiveness

- UI actions provide immediate feedback.
- Generation shows a clear progress state.
- Duplicate clicks do not create duplicate outputs.
- Timeouts allow safe retry; the first study records latency before setting a target.

### Security, Privacy, and Traceability

- Client contexts cannot be mixed.
- The model receives only necessary data.
- Outputs retain source, model, prompt, human decision, and brief-version information.
- Logs do not expose complete sensitive content.

The PoC does not promise production SLA, disaster recovery, multi-region deployment, high concurrency, full accessibility certification, or automated enterprise data lifecycle management.

## 11. Validation Plan and Open Questions

### Recommended Validation

- Use a synthetic Golden Dataset covering normal, missing, conflicting, no-suggestion, and prohibited-suggestion scenarios.
- Run controlled Policy Review preparation tests with three to five target agents.
- Compare manual and AI-assisted time, quality, and source rechecking.
- Have insurance domain and compliance reviewers inspect final briefs and failure cases.

### Open Questions

- What systems and steps do agents use today?
- Which information is most often missing, conflicting, or outdated?
- Which fields and evidence may be provided to a model under law and company policy?
- Which Hong Kong business rules require deterministic compliance checks?
- Which candidate model best balances quality, privacy, latency, and cost on the Golden Dataset?

## 12. Product Principles

- Missing data must remain missing.
- Abstention is a valid AI outcome.
- Trust comes from inspectability, not AI authority.
- Human editing is not human approval.
- Human control includes the right to reject all AI suggestions.
- Final content must remain aligned with its approval record.

