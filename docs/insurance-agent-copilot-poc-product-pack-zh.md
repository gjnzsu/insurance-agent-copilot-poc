# 保险代理人 Copilot PoC：产品需求与用户故事包

## 1. 文档目的

本文档总结保险代理人 Copilot 首个 PoC 的产品设计。目标是验证：AI 能否基于可追溯的客户资料，帮助香港寿险代理人更可信、高效地准备 Policy Review Meeting Brief，同时保留持牌代理人的最终判断与审批责任。

本文以香港寿险及监管环境作为工作假设。AIA 内部流程、数据结构、审批规则及量化痛点仍需通过业务、代理人、合规、隐私和技术团队验证。本文不构成法律或合规意见。

## 2. Why This Product

### 战略问题

寿险代理人的客户经营工作横跨 CRM、保单资料、历史互动和产品知识。信息与流程割裂，代理人在会前、会中和会后需要反复查找、复制、整理和确认资料。

### 首个 PoC 切入点

产品愿景是端到端 Agent Copilot，但首个 PoC 只聚焦已安排好的 Policy Review 会前准备。系统综合 CRM、保单记录和历史互动，生成有证据支持、可由代理人审核的个性化 Meeting Brief。

### 用户与业务结果

首要目标不是单纯增加代理人服务客户的数量，而是将行政准备时间转化为理解客户需要、开展个性化沟通和维护长期客户关系的时间。

### Why AI

Policy Review 需要综合结构化保单数据和非结构化互动记录，并根据每位客户的上下文形成不同的会议重点。普通 Dashboard 可以展示资料，流程自动化可以搬运资料，规则引擎可以执行明确检查；AI 的增量价值在于跨来源归纳、识别潜在遗漏，并动态生成待确认问题。

AI 只负责辅助归纳与生成。确定性规则负责结构、状态和禁止项检查，持牌代理人负责适当性判断、内容采用和客户沟通。

### 核心 PoC 假设

如果 Copilot 能准确整合 CRM、保单记录和历史互动，区分事实、AI 推断和待确认事项，并为关键陈述提供证据，那么代理人可以更快地审核和采用 Meeting Brief，而无需重新核查全部原始资料。

首轮不预设效率提升百分比。先建立人工准备与 AI 辅助准备的时间、质量和信任基线。

## 3. Target User 与 Problem Statement

### Primary Persona

香港市场中拥有稳定客户组合、熟悉 Policy Review，并能够判断 Meeting Brief 质量的成熟寿险代理人或 Financial Planner。

关键行为特征：

- 定期服务现有客户并进行 Policy Review。
- 已形成自己的会前准备方式。
- 对客户沟通和专业判断承担最终责任。
- 对 AI 谨慎开放，不会因为文字流畅就直接采用。
- 需要查看原始证据，才会判断 AI 内容是否可信。

### Primary Job-to-be-Done

当我要与现有客户进行 Policy Review 时，我希望在有限准备时间内识别最相关的客户变化、保障情况和待确认事项，使我能够有准备、有信心地进行个性化且有依据的客户对话。

### Problem Statement

香港成熟寿险代理人需要一种能够在有限准备时间内掌握客户全貌并识别 Policy Review 重点的方法，因为客户资料、保单和互动记录分散在不同系统中，需要手工查找、核对和重新组合，导致准备负担增加，也使代理人担心遗漏影响客户沟通的重要信息。

该问题目前属于 `Problem hypothesis`，需要通过 3–5 位目标代理人的访谈和工作观察验证。

### Stakeholders

- Agency Manager：业务 Sponsor，关注采用、效率和服务质量一致性。
- Compliance Reviewer：治理 Stakeholder，定义允许范围和审计要求。
- Customer：间接受益者，感受服务是否个性化且可信。
- Data / IT Owner：提供数据、权限、安全和系统集成能力。

## 4. MVP 用户流程与范围

### Entry Assumptions

- Policy Review 已经预约。
- 客户身份已经确认。
- 代理人已有权访问该客户资料。
- CRM、保单和历史互动数据已经准备好。
- PoC 不验证搜索、预约、提醒或真实身份认证。

### 用户流程

1. 代理人进入 Sunny Tan 已安排的 Policy Review。
2. 系统读取 CRM Profile、Policy Records 和 Interaction Notes。
3. 系统生成 Customer Snapshot、Policy Summary 和 Recent Context。
4. AI 识别 Potential Issue，并生成 Suggested Confirmation Question。
5. 代理人逐条查看 Lightweight Evidence。
6. 代理人选择 Approve、Edit 后 Save & Approve，或 Reject 并选择原因。
7. 所有建议处理完成后，系统生成最终 Meeting Brief 版本快照。

### Must Have

- 固定结构、动态内容的客户上下文摘要。
- 事实、AI inference 和待确认事项明确区分。
- 每条 Meeting Focus 包含 Observation、Potential Issue、Confirmation Question、Evidence 和 Limitation。
- 关键陈述提供来源、短证据片段、更新时间和限制。
- 缺失资料保持缺失；冲突资料保持可见。
- AI 可以在证据不足时生成零条建议。
- 支持 Approve、Save & Approve、Reject。
- Reject 必须选择轻量原因：Inaccurate、Not relevant、Insufficient evidence 或 Other。
- 代理人可拒绝全部 AI 建议，并仍生成事实型 Brief。
- Pending 建议不得进入最终 Brief。
- 最终 Brief 显示版本、批准人和批准时间。

### Out of Scope

- 客户搜索、预约和 Review 提醒。
- 自动 FNA、suitability 或 affordability 判断。
- 具体产品推荐或排名。
- 自动向客户发送内容。
- PDF / Word 导出。
- 会中记录和会后 Follow-up 的 PoC 验证。
- 真实生产系统集成、企业认证和生产部署。

现有 Demo 可保留 Follow-up 作为扩展愿景，但核心 PoC 成功边界止于最终 Meeting Brief。

## 5. User Stories

### US-01：快速掌握客户上下文

**As a** 正在准备 Policy Review 的成熟寿险代理人，  
**I want to** 在一个结构化视图中查看 CRM、保单和历史互动整理出的客户上下文，  
**so that** 我能够快速掌握客户当前情况并判断后续检查重点。

验收重点：

- 展示 Customer Snapshot、Existing Policy Summary 和 Recent Context。
- 关键事实显示来源与更新时间。
- 缺失资料标记为未提供或待确认，不自行补全。
- 冲突资料保留双方来源，不自动选择一个为事实。
- 来源不可用时显示 Partial View，不把摘要表示为完整视图。

### US-02：识别潜在问题与确认问题

**As a** 正在准备 Policy Review 的成熟寿险代理人，  
**I want to** 查看 AI 根据客户资料识别的潜在问题和确认问题，  
**so that** 我能够注意到可能遗漏的重要事项，并决定是否带入客户会议。

验收重点：

- 每条提示包含 Observation、Potential Issue、Confirmation Question、Evidence 和 Limitation。
- Observation 标为来源事实，Potential Issue 标为 AI inference。
- “未发现记录”不得写成“客户没有保障”。
- 不得形成确定性保障缺口、suitability 或具体产品推荐。
- 证据不足时不生成正式建议；零建议是合法结果。

### US-03：验证关键陈述的证据

**As a** 对 AI 输出保持谨慎的成熟寿险代理人，  
**I want to** 查看关键陈述对应的来源、证据片段、更新时间和限制，  
**so that** 我无需重新搜索全部原始系统就能判断内容是否值得采用。

验收重点：

- Evidence Preview 显示来源类型、短证据片段、更新时间和限制。
- 多来源证据分别显示。
- 证据不能支持陈述时，该内容不得作为可批准建议展示。
- PoC Evidence 为模拟数据；自动 citation validation 属于生产化要求。

### US-04：人工审核 AI 建议

**As a** 对最终 Meeting Brief 负责的成熟寿险代理人，  
**I want to** Approve、Edit 或 Reject 每条 AI Meeting Focus，  
**so that** 最终材料只包含经过我专业判断后决定采用的内容。

状态模型：

- Pending → Approve → Approved
- Pending → Edit → Save & Approve → Approved with edits
- Pending → Edit → Cancel → Pending
- Pending → Reject + reason → Rejected

Observation 和 Evidence 只读；Potential Issue 和 Confirmation Question 可编辑。编辑不等于审批，只有 Save & Approve 才完成采用决定。

### US-05：生成最终 Meeting Brief

**As a** 已完成 AI 内容审核的成熟寿险代理人，  
**I want to** 生成只包含已验证事实和我决定采用的会议重点的最终 Brief，  
**so that** 我可以有准备、有信心地进入客户会议。

验收重点：

- 所有建议必须完成处理；存在 Pending 时阻止最终确认。
- Brief 包含已验证事实、Approved 和 Approved with edits 的最终内容。
- Rejected 内容不得进入 Brief。
- 全部拒绝或零建议时，仍允许生成事实型 Brief。
- 最终 Brief 是轻量版本快照，显示版本、批准人和时间。
- 审批后修改必须返回审核流程并生成新版本。

## 6. AI / Model Solution

### Staged Hybrid Pipeline

1. Data Retrieval：读取获准的 CRM、Policy 和 Interaction 数据。
2. Normalization：转换为统一的客户事实结构。
3. Evidence-grounded Synthesis：生成带来源的客户摘要。
4. Issue Detection：生成 Potential Issue 和 Confirmation Question。
5. Deterministic Validation：检查结构、证据、状态和禁止表达。
6. Human Review：代理人作出采用、修改或拒绝决定。
7. Final Assembly：使用确定性逻辑生成 Brief 版本快照。

### Gate Boundaries

- G0 Access Gate：可以读取这些数据吗？由身份与应用层负责。
- G1 Data Quality Gate：数据是否属于正确客户，缺失和冲突是否透明？
- G2 Grounding Gate：关键事实是否有证据，陈述是否超出证据？
- G3 Suggestion Quality Gate：建议是否完整、相关且值得交给人审核？
- G4 Compliance Gate：内容是否越过 Meeting Preparation 的允许边界？
- G5 Human Approval Gate：代理人是否明确采用最终版本？
- G6 Finalization Gate：最终 Brief 是否忠实反映审批结果？

LLM 可以提出内容，但不能独立决定其内容是否可信、合规或最终采用。

### Model Selection

PoC 可先用一个企业级通用 LLM，通过不同 prompt 和 schema 完成 Context Synthesis、Issue Detection 和 Content Generation。暂不锁定具体供应商或模型。

候选模型主要比较：Groundedness、隐私与企业控制、Instruction Following、结构化输出、长上下文、中英文能力、Abstention、Latency 和 Cost。模型最终选择需要基于统一 Golden Dataset 和 Evaluation Rubric，而不是个人偏好。

首版不进行 Fine-tuning，不使用 propensity、产品排名、自动 suitability 或自主 Agent 模型。

## 7. Data Requirements

### PoC 数据来源

- CRM Profile：家庭、职业、已记录目标、人生阶段和更新时间。
- Policy Records：保单类型、保障类别、状态、关键 rider 和更新时间。
- Interaction Notes：与本次 Review 相关的近期片段、日期和待跟进事项。
- Product / Compliance Knowledge：只用于 guardrails，不用于具体产品推荐。

### 简化数据契约

来源记录至少携带：`recordId`、`customerId`、`sourceSystem`、`sourceType`、`content`、`lastUpdatedAt`、`dataStatus`、`evidenceId` 和 `limitation`。

AI Claim 至少携带：`claimId`、`claimType`、`content`、`evidenceIds`、`modelVersion`、`promptVersion` 和 `status`。

人工决定至少携带：`decision`、`rejectionReason`、`approvedContent`、`reviewedBy`、`reviewedAt` 和 `briefVersion`。

PoC 只显示更新时间，不自动判定 stale。生产化 freshness 规则应由业务、数据和合规团队按数据类型定义。

### 数据最小化

模型只接收完成本次 Policy Review 所需、已授权且经过预筛选的数据。应用层负责身份、用途、字段和时间范围过滤，不能把全部资料交给 LLM 后让模型自行决定是否有权使用。

## 8. Compliance、Privacy 与 Security

### 香港工作假设

本 PoC 参考香港保险业监管局关于 FNA、适当性和公平待客的原则，以及香港个人资料私隐专员公署关于 AI 治理、风险评估、人工监督和个人资料保护的建议。

### PoC 控制

- 仅使用完全合成的 Sunny Tan Dummy Data。
- 页面明确标记 `Synthetic demo data`。
- 真实客户数据及脱敏真实数据均不得导入。
- AI 内容明确标识，关键内容可检查。
- AI 不替代正式 FNA、suitability、affordability 或代理人责任。
- 当前会话中模拟审批记录，不实现生产级不可篡改日志。

### Production Requirements

- 企业 SSO、RBAC 和记录级授权。
- 传输与静态加密、密钥管理和 DLP。
- 数据保留、删除、用途限制和模型供应商审查。
- 数据区域及跨境传输评估。
- 不可篡改审计、安全监控和事件响应。
- Legal、Compliance、Privacy、Security 和 Model Risk 正式批准。

## 9. Evaluation Metrics

首轮不预设提升百分比，先建立 baseline。每层只保留 Top 3。

### AI Output Quality

1. Critical factual accuracy。
2. Groundedness and evidence correctness。
3. Safe uncertainty handling。

### Human Review Quality

1. Review time。
2. Approved / Approved with edits / Rejected 分布及拒绝原因。
3. Missed critical error rate。

### Workflow Outcome

1. Total preparation time，与纯人工 baseline 比较。
2. Final Brief quality，由代理人或领域专家评估准确性、相关性和完整性。
3. Agent confidence and adoption intent。

首要 Go/No-Go Gate：不得有未经标记的重大事实错误或无依据结论进入最终 Brief。

## 10. Non-functional Requirements

### Reliability and State Integrity

- Pending 和 Rejected 内容不得进入最终 Brief。
- Approved with edits 必须使用最终批准版本。
- 数据或生成失败必须明确显示，不能静默补全。

### Performance and Responsiveness

- 页面操作有即时反馈。
- 生成期间显示明确进度。
- 防止重复点击生成多个结果。
- 超时后允许安全重试；首轮记录真实耗时后再定义目标。

### Security, Privacy and Traceability

- 不允许跨客户上下文混合。
- 模型只接收必要数据。
- 输出保留来源、模型、prompt、人工决定和 Brief 版本信息。
- 日志不输出完整敏感内容。

PoC 不承诺生产级 SLA、灾难恢复、多区域、高并发、完整无障碍认证或企业级数据生命周期自动化。

## 11. Validation Plan 与 Open Questions

### 建议验证方式

- 使用合成 Golden Dataset 覆盖正常、缺失、冲突、无建议和违规建议场景。
- 邀请 3–5 位目标代理人完成受控 Policy Review 准备测试。
- 比较纯人工与 AI 辅助流程的时间、质量和核查次数。
- 由保险领域专家和合规人员审查最终 Brief 与失败案例。

### Open Questions

- 真实代理人目前使用哪些系统和准备步骤？
- 什么信息最常缺失、冲突或过期？
- 哪些字段和证据可依法及按公司政策提供给模型？
- 哪些香港业务规则需要进入确定性 Compliance Gate？
- 哪个候选模型在 Golden Dataset 上达到最佳质量、隐私、延迟和成本平衡？

## 12. 产品原则

- Missing data must remain missing.
- Abstention is a valid AI outcome.
- Trust comes from inspectability, not AI authority.
- Human editing is not human approval.
- Human control includes the right to reject all AI suggestions.
- Final content must remain aligned with its approval record.

