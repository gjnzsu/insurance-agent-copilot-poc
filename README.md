# Insurance Agent Copilot PoC

Interview-ready prototype for an insurance Agent Copilot workflow.

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
