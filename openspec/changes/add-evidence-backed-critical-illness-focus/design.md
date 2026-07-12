## Context

The current `TalkingPoint` model combines a rationale and client-facing language with a list of source IDs. An agent can see which sources are associated with the suggestion, but cannot determine which sentence is a source fact, which is an AI inference, or what remains unknown. The first slice applies a richer structure only to the critical-illness meeting focus so that its value can be validated before changing every suggestion or the full workflow.

The principal stakeholder for product validation is a mature insurance agent who regularly prepares policy-review meetings. Compliance and engineering remain stakeholders, but this change tests the agent's ability to review the output rather than claiming regulatory approval.

## Goals / Non-Goals

**Goals:**

- Make the critical-illness focus inspectable at claim level.
- Preserve a clear boundary between record facts, system inference, and questions for the client.
- Let an experienced agent trace claims to short evidence excerpts and identify source recency and limitations.
- Keep the focus rejectable under the existing human-decision workflow.
- Produce testable acceptance criteria and a short moderated validation protocol.

**Non-Goals:**

- Redesign all three talking points or implement the complete Trustworthy Brief phase.
- Complete financial-needs analysis, suitability assessment, or product recommendation.
- Introduce real client data, external model calls, CRM integration, or compliance approval.
- Replace the current Follow-up endpoint or implement the Final Brief in this change.

## Decisions

### Use a structured meeting-focus object

The critical-illness item will expose `observation`, `potentialIssue`, `confirmationQuestion`, `evidence`, and `limitation` as separate fields. Each content claim carries an explicit `fact`, `inference`, or `confirmation` label.

This is preferred over adding labels inside free-form text because the UI and tests can enforce boundaries. A fully generic claim graph was considered but rejected as premature for a one-item slice.

### Attach lightweight evidence directly to the claim

Each evidence item contains source ID, source type, excerpt, and last-updated date. The excerpt must support the displayed claim without requiring the agent to infer support from a source title alone.

This duplicates a small amount of source metadata, but keeps the slice understandable and avoids introducing a reusable evidence service before its shape has been validated.

### Preserve uncertainty explicitly

The potential issue describes a review consideration, not a confirmed coverage gap or recommendation. The confirmation question asks the agent/client to resolve missing context. The limitation states that visible records do not establish needs, affordability, eligibility, underwriting outcome, or suitability.

### Validate with a task-based mature-agent review

One to three experienced agents will review the focus using synthetic Sunny Tan data. Without facilitator explanation, each participant will:

1. Identify the record fact and its source.
2. Explain what is inferred rather than known.
3. Decide whether the confirmation question belongs in the meeting.
4. Approve, edit, or reject the focus and give a reason.
5. Name any unsupported, misleading, or missing information.

The moderator records task completion, time to verification, evidence opened, decision, edit/rejection reason, and confidence on a five-point scale. The slice passes product validation when every participant correctly distinguishes fact from inference, no participant mistakes the focus for a product recommendation or suitability conclusion, and identified material issues can be traced to a field or missing source. With a small sample, results are directional rather than statistically generalizable.

## Risks / Trade-offs

- **One carefully authored item may overstate general quality** → Label the output as synthetic and deterministic; do not generalize validation to other meeting focuses or model performance.
- **More structure may slow experienced agents** → Measure verification time and ask which fields can be collapsed after trust is established.
- **Source recency may create false confidence** → Show a limitation and make clear that the date describes the synthetic record, not authoritative completeness.
- **Agent approval may become ceremonial** → Require a reason during moderated validation and observe whether the agent checks evidence before deciding.
- **Insurance language varies by market** → Validate conceptual clarity first and flag jurisdiction-specific wording for later domain/compliance review.

