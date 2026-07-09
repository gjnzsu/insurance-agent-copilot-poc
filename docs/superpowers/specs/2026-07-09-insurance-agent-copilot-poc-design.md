# Insurance Agent Copilot PoC Design

Date: 2026-07-09

## Purpose

This PoC is an interview-ready prototype for an AI Project Manager role at AIA. It demonstrates how an insurance agent can use AI to prepare for a client policy review, approve AI-suggested talking points, and generate a compliant follow-up message.

The core message is:

> AI helps agents prepare faster and advise better, while human approval and compliance controls stay central.

## First MVP Slice

The first MVP focuses on one guided workflow:

**Prepare -> Approve -> Follow Up**

The prototype should feel like a realistic internal agent tool, with a guided demo rail that makes it easy to present in a short interview.

## Demo Scenario

The demo client is **Sunny Tan - Family Protection Review**.

Sunny Tan is married and has one young child. The review is triggered by an annual policy review after a family life event. Sunny has basic life insurance and medical coverage, but limited critical illness protection and no visible education-planning coverage.

The agent's goal is to prepare for a review meeting, identify possible protection gaps, approve suitable talking points, and send a compliant follow-up after the discussion.

## Target User

The primary user is an insurance agent or financial planner who manages client relationships and policy reviews.

The user needs help with:

- Preparing client meeting briefs quickly.
- Understanding existing policies and possible protection gaps.
- Identifying next-best actions.
- Producing client-ready follow-up messages.
- Staying within compliance and suitability boundaries.

## Prototype Structure

The UI should use a **Workspace + Demo Rail** layout.

- **Left rail**: Guided demo steps.
- **Center workspace**: AI-generated brief, approval workflow, and follow-up draft.
- **Right control panel**: Evidence sources, compliance flags, approval status, and human decision controls.

The guided steps are:

1. **Meeting Brief**
   - Agent starts from Sunny Tan's review case.
   - AI generates a structured brief.

2. **Agent Approval**
   - AI shows suggested talking points and next-best action.
   - Agent approves, edits, or rejects each recommendation.

3. **Follow-up Draft**
   - AI drafts a follow-up message using only approved points.
   - Agent performs final review before the message is marked ready for agent send.

## Core Interactions

1. Start with `Sunny Tan - Family Protection Review`.
2. Click `Generate Meeting Brief`.
3. AI produces:
   - Customer snapshot.
   - Life event and family context.
   - Existing policy summary.
   - Coverage gap analysis.
   - Suggested discovery questions.
   - Next-best action.
   - Compliance reminders.
4. Agent reviews recommended talking points.
5. Agent approves, edits, or rejects each point.
6. Click `Generate Follow-up Draft`.
7. AI creates a client message from approved points only.
8. Agent sees compliance checks and source references.
9. Agent must final-approve before the prototype shows the message as ready.

## Human-in-the-Loop Controls

The PoC must make human control visible and central.

- AI recommendations are draft suggestions, not automatic advice.
- The agent can approve, edit, or reject each talking point.
- Follow-up generation is limited to approved talking points.
- Compliance warnings appear before final approval.
- No client communication is sent automatically.
- The prototype should label the final action as `Mark Ready for Agent Send`, not actual sending.

## AI Capabilities Demonstrated

The prototype should demonstrate these AI patterns without requiring real integrations:

- Retrieval-augmented generation from product and compliance knowledge.
- Customer-context summarization from CRM-like data.
- Policy-summary extraction from structured policy records.
- Coverage-gap reasoning based on simple rules and retrieved guidance.
- Next-best-action recommendation.
- Controlled generation for follow-up messaging.
- Human-in-the-loop approval and auditability.

## Mock Data Needed

The PoC can use local mock data rather than external systems.

Minimum data:

- Sunny Tan profile:
  - Married.
  - One young child.
  - Annual policy review due.
  - Household protection priority.

- Existing policies:
  - Basic life policy.
  - Medical plan.
  - No critical illness rider.
  - Limited education planning coverage.

- Interaction history:
  - Last review focused on affordability.
  - Client recently asked about family protection.
  - Agent noted interest in child education planning.

- Product knowledge snippets:
  - Life protection positioning.
  - Critical illness protection positioning.
  - Education planning positioning.

- Compliance snippets:
  - Avoid guaranteed outcome claims.
  - Confirm suitability before making recommendations.
  - Disclose underwriting and eligibility caveats.

## Out of Scope

The first PoC will not include:

- Real CRM integration.
- Real policy admin integration.
- Actual message sending.
- Full product recommendation engine.
- Complex underwriting logic.
- Multi-client campaign management.
- Production authentication and role management.

## Success Criteria

The prototype succeeds if an interviewer can understand within 5-8 minutes:

- What problem the agent has.
- What data the AI uses.
- What the AI generates.
- Where the human agent reviews and approves.
- How compliance risks are controlled.
- How this could reduce preparation time and improve follow-up quality.

The demo should support a simple before-and-after story:

- Before: agent spends time collecting scattered customer, policy, and product information.
- After: agent receives a structured AI brief and uses human-controlled recommendations to prepare faster.

## Future Expansion

After the first PoC, the concept can expand into:

- CRM and policy-system integrations.
- Renewal and lapse-risk workflows.
- Product comparison support.
- Meeting-note summarization.
- Manager review and coaching dashboard.
- Compliance audit logs and approval analytics.
- Next-best-action model evaluation.

## Open Design Principle

The PoC should not present AI as replacing the agent. It should present AI as a trusted preparation and drafting layer that improves agent productivity while preserving human accountability.
