# evidence-backed-meeting-focus Specification

## Purpose
TBD - created by archiving change add-evidence-backed-critical-illness-focus. Update Purpose after archive.
## Requirements
### Requirement: Structured critical-illness meeting focus
The system SHALL present the critical-illness meeting focus as separate Observation, Potential Issue, Confirmation Question, Evidence, and Limitation fields.

#### Scenario: Agent opens the critical-illness focus
- **WHEN** the Sunny Tan meeting brief has been generated
- **THEN** the critical-illness focus displays all five fields without requiring the agent to infer their boundaries from prose

### Requirement: Epistemic labels
The system SHALL label record-backed observations as Fact, system-derived potential issues as Inference, and unresolved client questions as Confirmation.

#### Scenario: Agent distinguishes known and unknown content
- **WHEN** the agent reviews the critical-illness focus
- **THEN** the observation, potential issue, and confirmation question display Fact, Inference, and Confirmation labels respectively

### Requirement: Claim-level lightweight evidence
The system SHALL provide evidence supporting the critical-illness observation with a source identifier, source type, short supporting excerpt, and last-updated date.

#### Scenario: Agent verifies the observation
- **WHEN** the agent inspects evidence for the critical-illness observation
- **THEN** the visible excerpt directly supports the observation that no critical-illness rider is visible in the synthetic policy record

### Requirement: Safe uncertainty boundary
The system MUST state that the visible records do not establish client need, affordability, eligibility, underwriting outcome, or suitability and MUST NOT present the potential issue as a product recommendation.

#### Scenario: Evidence is insufficient for a recommendation
- **WHEN** the critical-illness focus is displayed
- **THEN** the limitation is visible and the content is framed as a meeting-preparation consideration requiring confirmation

### Requirement: Existing human decision control
The agent SHALL be able to approve, edit, or reject the critical-illness focus using the existing decision workflow.

#### Scenario: Agent rejects the focus
- **WHEN** the agent selects Reject for the critical-illness focus
- **THEN** the item retains a rejected state and is not treated as adopted agent content

### Requirement: Mature-agent product validation
The change SHALL include a moderated task-based validation protocol for experienced insurance agents that tests correctness, traceability, usefulness, and safe uncertainty.

#### Scenario: Experienced agent validates the slice
- **WHEN** an experienced agent reviews the focus using the synthetic Sunny Tan case without facilitator explanation
- **THEN** the session records whether the agent identifies fact versus inference, traces the fact to evidence, decides whether the question belongs in the meeting, makes an explicit decision with a reason, and detects unsupported or missing information

#### Scenario: Validation avoids false maturity claims
- **WHEN** results from one to three experienced agents are summarized
- **THEN** the result is described as directional product evidence and not as statistical proof, compliance approval, or validation of model performance

