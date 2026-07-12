# Insurance Agent Copilot PoC: Product Evolution Roadmap

Last refreshed: 2026-07-12

## 1. Purpose

This document compares the current first-version codebase with the agreed PoC product scope and defines the evolution from an interaction demo to a trustworthy PoC, agent validation pilot, governed enterprise pilot, and reusable insurance AI platform.

The roadmap uses two layers:

- The executive layer uses `Now / Next / Later / Horizon` to communicate outcomes and risk reduction.
- The delivery layer defines the Outcome, Epics, Dependencies, Exit Criteria, and Non-goals for each phase.

This is an outcome-driven roadmap, not a fixed delivery-date commitment. Each later phase must be adjusted based on evidence from the previous phase.

## 2. Strategic Direction

### Strategic Vision

Create an Agent Copilot that connects client information, policy data, product knowledge, AI-assisted analysis, and human approval so insurance agents can manage client work through a continuous, trustworthy, and governed workflow.

### First PoC Focus

The first trustworthy PoC validates preparation for an already scheduled Policy Review. It synthesizes CRM, Policy Record, and Interaction Note data into an evidence-backed, personalized Meeting Brief that remains subject to agent review.

### Evolution Principle

The roadmap is driven by progressive risk reduction rather than feature volume:

1. **Usability risk:** Can agents understand and complete the review workflow?
2. **Trust risk:** Is the output accurate, evidenced, and rejectable?
3. **Model risk:** Can failure modes be evaluated and controlled consistently?
4. **Adoption risk:** Does the product reduce real work, and will agents use it?
5. **Enterprise risk:** Can data, compliance, security, and operations support controlled scale?

## 3. Current State: First-version Code Assessment

### 3.1 Implemented

| Capability | Current Implementation | Product Significance |
|---|---|---|
| Scheduled meeting entry | Opens directly on Sunny Tan's Family Protection Review | Matches the minimal PoC entry assumption |
| Synthetic client data | Uses static `demoData` | Enables safe demonstration without real client data |
| Meeting Brief | Generates a snapshot, policy summary, questions, and reminders | Demonstrates the basic information experience |
| Three-step workflow | Brief → Approval → Follow-up | Demonstrates an end-to-end story |
| Human controls | Approve, Edit, and Reject | Establishes the human-in-the-loop concept |
| Source references | Talking Points link to `sourceIds` | Provides a foundation for evidence evolution |
| Compliance panel | Shows static guardrails and status | Establishes governance visibility |
| Workflow tests | Covers approval, rejection, editing, and navigation | Provides a regression-test foundation |
| First evidence-backed focus | Critical Illness is separated into Observation, Potential Issue, Confirmation Question, Evidence, and Limitation | Starts the Trustworthy Brief PoC with one inspectable vertical slice |
| Epistemic labels | The Critical Illness focus distinguishes Fact, Inference, and Confirmation | Helps agents see what is known, derived, or unresolved |
| Lightweight evidence | The Critical Illness observation shows a source ID, type, supporting excerpt, and last-updated date | Enables claim-level verification for the first slice |
| PoC transparency | Displays `Synthetic demo data` and `Meeting preparation support only` | Reduces the risk of overstating product or model maturity |
| Experienced-agent validation kit | Includes a moderated session guide, scorecard, directional pass rule, and result template | Makes early trust validation executable with one to three mature agents |

### 3.2 Simulated or Partial

| Capability | Current Limitation | Gap to Target Scope |
|---|---|---|
| AI generation | Uses deterministic TypeScript fixtures, not a model call | Does not validate model quality, latency, or failure modes |
| Client context | Includes Snapshot and Policy Summary | Missing a distinct Recent Context section, data states, and limitations |
| Potential issues | Critical Illness uses the new structure; the other Talking Points and `coverageGaps` remain fixed | Extend Fact, Inference, Confirmation Question, and Limitation semantics beyond the first slice |
| Evidence | Critical Illness has claim-level evidence; other content still shows source titles and types | Extend excerpts, recency, and limitation handling consistently across the brief |
| Editing | Allows client-language editing | Missing `Save & Approve` semantics and original-versus-edited version records |
| Approval state | Supports only `pending / approved / rejected` | Missing Approved with edits, rejection reasons, and review metadata |
| Compliance | Uses static flags | Does not implement testable G0–G6 gate boundaries |

### 3.3 Missing or Misaligned

| Capability | Current State | Target Direction |
|---|---|---|
| Final Meeting Brief | Not implemented; the current endpoint is a Follow-up Draft | End with an approval-aligned Meeting Brief snapshot |
| Reject all | At least one item must be approved to continue | Allow all suggestions to be rejected while retaining a factual brief |
| Complete review gate | Checks approved count only | Require every suggestion to leave Pending before finalisation |
| Version and audit | No version, approver, or approval time | Add a lightweight version snapshot and session audit |
| Missing data | Fixed happy path | Keep missing data missing and expose limitations |
| Conflicting data | Not implemented | Preserve conflicting sources and create confirmation items |
| Zero suggestions | Not implemented | Allow abstention when evidence is insufficient |
| Data contract | The first focus has lightweight claim and lineage metadata | Generalise minimum record, claim, and decision contracts only after agent validation |
| Evaluation | Functional tests only | Add a Golden Dataset and three-layer evaluation |

## 4. Scope Alignment Decisions

### Retain

- Three-column workspace and Human Control Hub.
- Direct entry into Sunny Tan's scheduled review.
- Talking Point review interactions.
- Evidence and Compliance visibility.
- Existing React domain/UI separation and test foundation.

### Reframe

- `coverageGaps` → `potentialIssues`.
- `clientLanguage` → `confirmationQuestion`.
- Source-level evidence → claim-level Lightweight Evidence.
- `approved / rejected` → separate content and approval state models.
- Follow-up Gate → Final Meeting Brief Gate.

### Remove from the Core PoC

- Follow-up Draft and Ready for Agent Send.
- The rule that at least one AI suggestion must be approved.
- Product positioning as the basis for client recommendations.
- Deterministic, sales-oriented Next Best Action language.

Follow-up may remain as an expansion path, but it does not contribute to first-round PoC success.

## 5. Roadmap Overview

| Phase | Product Outcome | Primary Risk | Exit Criteria |
|---|---|---|---|
| **Now: Demo Baseline** | Demonstrate the interaction concept and Human Control story | Usability | Demonstrable workflow and regression tests completed |
| **Next 1: Trustworthy Brief PoC** | Demonstrate a trustworthy, reviewable Meeting Brief | Trust | No unmarked material error enters the final brief |
| **Next 2: Evaluation-ready PoC** | Make product learning repeatable and comparable | Model | Compare AI and manual quality, time, and verification effort |
| **Later 1: Agent Validation Pilot** | Demonstrate that target agents will use the product | Adoption | Acceptable quality and genuine agent adoption intent |
| **Later 2: Governed Enterprise Pilot** | Demonstrate safe use under enterprise controls | Enterprise | Controlled-pilot approval with no critical governance blocker |
| **Horizon: Insurance AI Platform** | Reuse validated capabilities across insurance use cases | Scale | New use cases reuse shared controls rather than rebuild them |

## 6. Phase Details

### Now: Demo Baseline

**Outcome**

Use synthetic data to demonstrate the complete story of Meeting Brief generation, AI-suggested Talking Points, Human Control, Compliance, and Follow-up.

**Completed Epics**

- Sunny Tan Policy Review demo data.
- Meeting Brief and Talking Points.
- Approve, Edit, and Reject interactions.
- Human Control Hub with Evidence and Compliance tabs.
- Follow-up Draft expansion experience.
- Domain and UI regression tests.

**Known Limitations**

- Output is generated through fixed logic and does not represent model performance.
- Evidence, Compliance, and Audit are simulated concepts.
- The current endpoint is not aligned with the newly agreed PoC success boundary.

### Next 1: Trustworthy Brief PoC

**Status: In progress.** The first evidence-backed Critical Illness vertical slice was delivered on 2026-07-12. Completion of this slice does not mean the phase exit criteria have been met.

**Outcome**

Refocus the current demo into a trustworthy Meeting Brief PoC that tests whether an agent can inspect evidence, resolve every AI suggestion, and create a final brief aligned with approval decisions.

**Epics**

1. **Structured Client Context**
   - Customer Snapshot, Policy Summary, and Recent Context.
   - Missing, conflicting, and unavailable-source states.
   - Visible source and last-updated information.

2. **Evidence-backed Meeting Focus**
   - Observation, Potential Issue, Confirmation Question, Evidence, and Limitation.
   - Fact, Inference, and Confirmation labels.
   - Zero suggestions when evidence is insufficient.
   - **Progress:** The first two items are implemented for the Critical Illness focus only. Zero-suggestion behaviour and consistent coverage across other focuses remain open.

3. **Explicit Human Decision Model**
   - Approve.
   - Edit → Save & Approve.
   - Reject with a structured reason.
   - Every suggestion must leave Pending before finalisation.

4. **Versioned Final Brief**
   - Includes verified facts and adopted content.
   - Excludes Rejected content.
   - Supports a factual brief when all suggestions are rejected.
   - Shows version, approver, and approval time.

5. **PoC Transparency**
   - Display `Synthetic demo data`.
   - State the Meeting Preparation Support boundary.
   - Do not claim completion of FNA, suitability assessment, or product recommendation.
   - **Progress:** Implemented for the first evidence-backed Critical Illness slice; broader placement and agent comprehension still require validation.

**Delivered Slice: Evidence-backed Critical Illness Focus**

- Separates a policy-record observation from a system inference and client confirmation question.
- Provides claim-level evidence with an excerpt and last-updated date.
- States that visible records do not establish need, affordability, eligibility, underwriting outcome, or suitability.
- Preserves Approve, Edit, and Reject controls.
- Includes a 20–25 minute mature-agent validation guide and scorecard.

**Remaining Before the Next 1 Gate**

- Validate the first slice with one to three mature agents and record verification time, evidence use, decisions, reasons, issue detection, and confidence.
- Apply the validated structure consistently to the remaining meeting-focus content.
- Implement Approved with edits, structured rejection reasons, and complete-review semantics.
- Allow reject-all while retaining a factual brief.
- Create the versioned Final Meeting Brief with approver and approval time.
- Add missing, conflicting, unavailable-source, and zero-suggestion states.

**Dependencies**

- The five agreed User Stories.
- Simplified claim-level data contract.
- Human Approval and Finalisation business rules.

**Exit Criteria**

- No unmarked material factual error or unsupported conclusion enters the final brief.
- Pending and Rejected states remain correct across every workflow path.
- Agents can reject all suggestions without being forced to adopt AI output.
- The final brief matches its approved content version.

**Non-goals**

- Real CRM or Policy integration.
- Real client data.
- Automated Follow-up.
- Specific product recommendation.

### Next 2: Evaluation-ready PoC

**Outcome**

Upgrade the PoC from a single happy-path demonstration into a repeatable and comparable AI product experiment.

**Epics**

1. **Synthetic Golden Dataset**
   - Normal, missing, conflicting, zero-suggestion, unsupported-evidence, and prohibited-suggestion scenarios.
   - Expected facts, allowed inferences, and prohibited outputs for each scenario.

2. **Model Evaluation Harness**
   - Critical factual accuracy.
   - Groundedness and evidence correctness.
   - Safe uncertainty handling.

3. **Human Review Analytics**
   - Review time.
   - Approved / Approved with edits / Rejected distribution.
   - Rejection reasons and missed critical error rate.

4. **Workflow Baseline**
   - Record manual preparation time.
   - Record AI generation, review, editing, and verification time.
   - Compare Final Brief quality and source-rechecking frequency.

**Dependencies**

- Stable structured output, state, and Evidence models from Next 1.
- Golden Answers defined with insurance domain experts.

**Exit Criteria**

- The same dataset can compare multiple candidate models reproducibly.
- Critical failures can be attributed to data, model, prompt, rules, or human review.
- Manual and AI-assisted baselines are established without assuming an improvement percentage.

### Later 1: Agent Validation Pilot

**Outcome**

Validate whether target agents find the product trustworthy and useful enough to adopt before a Policy Review.

**Epics**

- Recruit three to five experienced agents with established client portfolios.
- Run controlled task tests and interviews.
- Validate the current Problem Statement and JTBD.
- Analyse evidence-viewing behaviour, rejection reasons, and editing patterns.
- Compare candidate models and record the selection decision.
- Refine information density, workflow, and language from observed behaviour.

**Dependencies**

- Evaluation-ready PoC.
- Research protocol, participant consent, and synthetic test materials.

**Exit Criteria**

- Agents complete the end-to-end review without facilitator explanation.
- Final Brief quality meets a basic domain-expert standard.
- Agents express credible adoption intent and can explain value and concerns.
- The core Problem Hypothesis is supported or explicitly revised.

### Later 2: Governed Enterprise Pilot

**Outcome**

Validate controlled use under enterprise data, access, security, and governance constraints.

**Epics**

- CRM, Policy, and Interaction data adapters.
- SSO, RBAC, and record-level client authorization.
- Data minimisation, retention, and deletion controls.
- Model gateway, prompt/model versioning, and observability.
- Immutable audit and security monitoring.
- Compliance Gate rules and formal approval workflow.
- Legal, Compliance, Privacy, Security, and Model Risk review.

**Dependencies**

- Agent Validation Pilot meets the continue-investment threshold.
- Enterprise Data Owners and governance teams participate.
- Model-vendor and data-processing arrangements pass review.

**Exit Criteria**

- Only authorized agents can access the relevant client record.
- Data purpose, retention, transfer, and vendor responsibilities are approved.
- The audit chain traces source records through to the final brief.
- The controlled pilot has no critical privacy, security, or compliance blocker.

### Horizon: Reusable Insurance AI Platform

**Outcome**

Abstract capabilities validated in Policy Review into reusable insurance AI services supporting agent servicing, claims, underwriting, and compliance use cases.

**Candidate Platform Capabilities**

- Data access and purpose-control layer.
- Evidence and lineage service.
- AI claim schema and grounding validator.
- Human approval and audit service.
- Policy and compliance guardrail service.
- Model gateway and evaluation platform.
- Prompt, model, dataset, and release version management.

**Potential Expansion Paths**

- Meeting capture and minutes.
- Post-meeting follow-up.
- Renewal and policy service reminders.
- Claims assistant.
- Underwriting preparation support.
- Compliance review copilot.

**Platform Entry Criteria**

- At least two use cases prove that the same capabilities can be reused.
- Shared services show a clear cost, governance, or quality advantage over duplicated implementations.
- Ownership, service boundaries, and the operating model are explicit.

## 7. Dependencies and Decision Gates

```text
Interaction Demo
      ↓
Trustworthy Output and Human Approval
      ↓
Repeatable AI Evaluation
      ↓
Real Agent Validation
      ↓
Enterprise Data and Governance
      ↓
Reusable Platform Expansion
```

Mandatory sequencing principles:

- Do not connect real client data before claim-level evidence is established.
- Do not select a model subjectively before a Golden Dataset exists.
- Do not invest in production integration before agent validation.
- Do not automate client communication before governance approval.
- Do not declare platform success before a second use case proves reuse.

## 8. Roadmap Metrics

Each phase retains only the metrics relevant to its primary risk.

| Phase | Primary Metric | Supporting Metrics |
|---|---|---|
| Trustworthy Brief PoC | Missed critical error rate | Evidence correctness, state integrity |
| Evaluation-ready PoC | Reproducible evaluation coverage | Model comparison, failure attribution |
| Agent Validation Pilot | Agent confidence and adoption intent | Review time, decision distribution |
| Governed Enterprise Pilot | Critical governance findings | Access violations, audit completeness |
| Platform Horizon | Capability reuse rate | Time to enable a new use case, shared-control coverage |

## 9. Key Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Demo is mistaken for real AI capability | Stakeholders overestimate maturity | Label deterministic and simulated components explicitly |
| AI output is fluent but unsupported | Agent trust decreases | Claim-level evidence and Grounding Gate |
| Human approval becomes ceremonial | Material errors enter the final brief | Structured decisions, rejection reasons, and missed-error evaluation |
| Scope returns to feature accumulation | Core hypothesis cannot be tested | Keep the Meeting Brief as the only first-round success boundary |
| Real data is introduced too early | Privacy and security exposure | Use a Synthetic Golden Dataset first |
| Platform abstraction starts too early | Wrong abstractions and wasted investment | Wait for at least two use cases to prove reuse |

## 10. Recommended Next Decision

Continue **Trustworthy Brief PoC**, but validate the completed Critical Illness slice before expanding the pattern across the full brief.

The immediate decision gate is a directional review with one to three mature insurance agents. The review should test whether they can:

- distinguish Fact from Inference without facilitator explanation;
- trace the observation to supporting evidence;
- judge whether the Confirmation Question belongs in the meeting;
- Approve, Edit, or Reject with a substantive reason; and
- identify unsupported, misleading, or missing information.

If the structure improves verification and does not read as a product recommendation or suitability conclusion, extend the pattern to the remaining meeting focuses. If agents find the structure slow, misleading, or incomplete, revise the information model before adding breadth.

Do not move immediately into real CRM integration, automated Follow-up, product recommendation, or platform construction. First demonstrate:

> The Agent Copilot can use inspectable synthetic evidence to create an accurate, rejectable, editable final Meeting Brief that remains aligned with explicit human approval.

Only after the complete Trustworthy Brief gate is passed should the roadmap advance to repeatable model evaluation, broader agent validation, and enterprise-governance investment.
