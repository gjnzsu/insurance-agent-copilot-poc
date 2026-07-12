## Why

The current critical-illness talking point is fluent but does not let an experienced insurance agent distinguish source facts from AI inference or inspect the evidence behind the suggested meeting focus. This first trustworthy-brief slice tests whether explicit claim structure and lightweight evidence help an agent verify, challenge, or reject the content before using it in meeting preparation.

## What Changes

- Replace the single critical-illness talking-point presentation with five inspectable fields: Observation, Potential Issue, Confirmation Question, Evidence, and Limitation.
- Label content as Fact, Inference, or Confirmation so the agent can see its epistemic status at a glance.
- Show claim-level evidence excerpts, source type, and last-updated information for the critical-illness focus.
- Keep the suggestion rejectable and avoid turning the potential issue into a product recommendation or completed suitability assessment.
- Add deterministic product checks and a lightweight mature-agent validation protocol covering correctness, traceability, usefulness, and safe uncertainty.
- Limit this change to the critical-illness focus; the other talking points and the wider final-brief workflow remain unchanged.

## Capabilities

### New Capabilities

- `evidence-backed-meeting-focus`: Defines how one meeting-focus suggestion separates facts, inference, confirmation questions, evidence, and limitations, and how an experienced insurance agent validates it.

### Modified Capabilities

None.

## Impact

- Domain types and Sunny Tan synthetic source records gain claim and lineage metadata needed by the critical-illness focus.
- Meeting-brief generation produces the new structured focus while retaining deterministic local behavior.
- The approval workspace renders the structure and evidence without changing the overall three-column layout.
- Domain and UI tests cover labels, evidence lineage, limitation visibility, and rejectability.
- No external model, CRM, policy-system integration, real client data, product recommendation, or automated communication is introduced.
