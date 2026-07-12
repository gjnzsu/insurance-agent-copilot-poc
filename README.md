# Insurance Agent Copilot PoC

Interview-ready prototype for an insurance Agent Copilot workflow.

The current product-evolution slice adds an evidence-backed Critical Illness
meeting focus so an agent can distinguish record facts, system inference, and
questions that still require client confirmation.

## Demo Story

Sunny Tan is a young-family client with an annual family protection review. The agent uses AI to prepare a meeting brief, approve suggested talking points, and mark a compliant follow-up draft as ready for agent send.

## Run Locally

```powershell
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Demo Path

1. Start on `Sunny Tan - Family Protection Review`.
2. Click `Generate Meeting Brief`.
3. Approve `Critical illness protection gap`.
4. Reject `Education planning conversation`.
5. Approve `Family protection review`.
6. Click `Generate Follow-up Draft`.
7. Confirm the draft excludes the rejected education planning point.
8. Confirm the final action is `Mark Ready for Agent Send`.

## Guardrails Shown

- Human approval required before follow-up use.
- Compliance flags remain visible in the right panel.
- Evidence sources are shown from mock CRM, policy, product, and compliance data.
- No client message is sent automatically.

## Evidence-backed Meeting Focus

After generating the Meeting Brief, the `Critical illness protection gap`
card separates its content into:

- **Observation / Fact**: what is visible in the synthetic policy record.
- **Potential Issue / Inference**: why the topic may be relevant for meeting preparation.
- **Confirmation Question**: what the agent still needs to establish with the client.
- **Evidence**: source ID, source type, supporting excerpt, and last-updated date.
- **Limitation**: what the available records cannot establish, including need,
  affordability, eligibility, underwriting outcome, and suitability.

The interface labels the case as `Synthetic demo data` and
`Meeting preparation support only`. The focus remains subject to the existing
Approve, Edit, and Reject controls.

## Experienced-agent Validation

The repository includes a lightweight validation kit for testing this slice
with one to three experienced insurance agents:

- [`docs/validation/experienced-agent-session-guide.md`](docs/validation/experienced-agent-session-guide.md)
  contains the moderated 20–25 minute session.
- [`docs/validation/experienced-agent-scorecard.md`](docs/validation/experienced-agent-scorecard.md)
  records traceability, decision quality, verification time, and confidence.

Results from this small synthetic-data study are directional product evidence;
they are not statistical proof, compliance approval, or model validation.

## Quality Checks

```powershell
npm run lint
npm test
npm run build
```

Product evolution decisions are documented in
[`docs/insurance-agent-copilot-product-roadmap.md`](docs/insurance-agent-copilot-product-roadmap.md).
