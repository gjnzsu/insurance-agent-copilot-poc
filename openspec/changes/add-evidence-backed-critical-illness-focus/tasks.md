## 1. Domain Contract and Test Fixtures

- [x] 1.1 Add failing domain tests for the five meeting-focus fields, epistemic labels, evidence metadata, and safe limitation.
- [x] 1.2 Extend domain types with the smallest structured meeting-focus and lightweight-evidence contracts needed by the critical-illness item.
- [x] 1.3 Add synthetic source excerpt and last-updated metadata to Sunny Tan's critical-illness policy record.
- [x] 1.4 Update deterministic brief generation so the critical-illness focus satisfies the new contract without becoming a recommendation.

## 2. Agent Review Experience

- [x] 2.1 Add failing UI tests for visible Fact, Inference, Confirmation, Evidence, and Limitation content.
- [x] 2.2 Render the structured critical-illness focus in the existing approval workspace while preserving approve, edit, and reject controls.
- [x] 2.3 Add a visible synthetic-data and meeting-preparation boundary near the structured focus.
- [x] 2.4 Verify keyboard access and responsive behavior for the evidence details and decision controls.

## 3. Mature-Agent Validation

- [x] 3.1 Create a one-page moderated validation script using the Sunny Tan case and the five agent tasks defined in the design.
- [x] 3.2 Create a session scorecard for task completion, verification time, evidence inspected, decision and reason, issue detection, and confidence.
- [x] 3.3 Define the directional pass rule and a result-summary template that avoids claims of compliance approval or model validation.

## 4. Verification

- [x] 4.1 Run focused domain and UI tests and confirm the existing approval/rejection regressions still pass.
- [x] 4.2 Run the full test suite and production build.
- [x] 4.3 Manually complete the Sunny Tan review path and confirm evidence traceability, limitation visibility, and rejectability.
