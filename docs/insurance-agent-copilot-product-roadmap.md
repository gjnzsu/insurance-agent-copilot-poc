# Insurance Agent Copilot PoC：产品演进路线图

## 1. 文档目的

本文档将当前第一版代码与已确认的 PoC Product Scope 进行对比，并定义从交互 Demo 演进到可信 PoC、代理人验证、企业受控试点及可复用保险 AI 平台的方向。

Roadmap 采用双层结构：

- 上层使用 `Now / Next / Later / Horizon` 表达产品演进和风险递减。
- 下层为每个阶段定义 Outcome、Epics、Dependencies、Exit Criteria 和 Non-goals。

这是一份 outcome-driven roadmap，不是固定日期承诺。后续阶段必须根据上一阶段的验证结果调整。

## 2. 产品战略主线

### Strategic Vision

建立一个连接客户信息、保单数据、产品知识、AI 辅助判断和人工审批的 Agent Copilot，使保险代理人能够在连续、可信且合规可控的流程中完成客户经营工作。

### First PoC Focus

首个可信 PoC 只验证已安排 Policy Review 的会前准备：系统综合 CRM、Policy Records 和 Interaction Notes，生成有证据支持、可由代理人审核的个性化 Meeting Brief。

### Evolution Principle

产品演进不以功能数量为主线，而以逐步降低以下风险为主线：

1. Usability risk：代理人能否理解并完成审核？
2. Trust risk：输出是否准确、有证据、可拒绝？
3. Model risk：不同失败场景是否可评估和控制？
4. Adoption risk：真实代理人是否节省工作并愿意采用？
5. Enterprise risk：数据、合规、安全和运营是否允许扩展？

## 3. Current State：第一版代码盘点

### 3.1 Implemented

| 能力 | 当前实现 | 产品意义 |
|---|---|---|
| 已安排会议入口 | 直接进入 Sunny Tan Family Protection Review | 符合 PoC 最小入口假设 |
| Synthetic customer data | 使用静态 `demoData` | 可安全演示，不接触真实客户数据 |
| Meeting Brief | 生成客户摘要、保单摘要、问题和提醒 | 已证明基础信息呈现概念 |
| Three-step workflow | Brief → Approval → Follow-up | 已证明端到端 Demo 叙事 |
| Human controls | Approve、Edit、Reject | 已证明人工介入概念 |
| Source references | Talking Point 绑定 `sourceIds` | 已具备 Evidence 演进基础 |
| Compliance panel | 展示静态 guardrails 和状态 | 已具备治理可见性基础 |
| Workflow tests | 覆盖审批、拒绝、编辑和导航 | 已建立回归测试基础 |

### 3.2 Simulated or Partial

| 能力 | 当前限制 | 与目标 Scope 的差距 |
|---|---|---|
| AI generation | 使用确定性 TypeScript fixture，不是真实模型调用 | 尚未验证模型能力、延迟或失败模式 |
| Client context | 有 Snapshot 和 Policy Summary | 缺少独立 Recent Context、数据状态和限制 |
| Potential issues | 使用固定 talking points 和 `coverageGaps` | 未明确区分 Fact、Inference 和 Confirmation Question |
| Evidence | 只显示来源标题与类型 | 缺少 claim-level excerpt、更新时间和 limitation |
| Editing | 可以修改 client language | 缺少 `Save & Approve` 语义和原始/修改版本记录 |
| Approval state | 仅 `pending / approved / rejected` | 缺少 Approved with edits、拒绝原因和审核元数据 |
| Compliance | 静态 flags | 未实现可测试的 G0–G6 Gate 边界 |

### 3.3 Missing or Misaligned

| 能力 | 当前状态 | 目标方向 |
|---|---|---|
| Final Meeting Brief | 未实现；当前终点是 Follow-up Draft | 终点改为带审批记录的 Meeting Brief 快照 |
| Reject all | 当前至少批准一项才可继续 | 允许全部拒绝并生成事实型 Brief |
| Complete review gate | 只检查批准数量 | 所有建议必须离开 Pending 后才可 finalise |
| Version and audit | 无版本、批准人和批准时间 | 增加轻量版本快照和 session audit |
| Missing data | 固定 happy path | 缺失保持缺失并显示 limitation |
| Conflicting data | 未实现 | 保留冲突来源并转化为确认事项 |
| Zero suggestions | 未实现 | 证据不足时允许 abstain |
| Data contract | 当前类型缺少 lineage 字段 | 增加 record、claim、decision 最小契约 |
| Evaluation | 只有功能测试 | 增加 Golden Dataset 和三层评估指标 |
| Synthetic label | 页面未明确说明 | 明确标记 `Synthetic demo data` |

## 4. Scope Alignment Decisions

### Retain

- 三栏工作区和 Human Control Hub。
- Sunny Tan 已安排会议的直接入口。
- Talking Point 审核交互。
- Evidence 与 Compliance 可见性。
- React domain/UI 分层和现有测试基础。

### Reframe

- `coverageGaps` → `potentialIssues`。
- `clientLanguage` → `confirmationQuestion`。
- Source-level evidence → claim-level Lightweight Evidence。
- `approved / rejected` → 完整内容状态与审批状态模型。
- Follow-up Gate → Final Meeting Brief Gate。

### Remove from Core PoC

- Follow-up Draft 和 Ready for Agent Send。
- 至少批准一项 AI 建议才能继续的规则。
- 具体产品 positioning 作为客户建议依据。
- 销售导向的确定性 Next Best Action。

Follow-up 可以保留为未来扩展愿景，但不参与首轮 PoC 成功判断。

## 5. Roadmap Overview

| 阶段 | 产品结果 | 主要风险 | Exit Criteria |
|---|---|---|---|
| **Now: Demo Baseline** | 证明交互概念和 Human Control 故事 | Usability | 已完成可演示流程与测试 |
| **Next 1: Trustworthy Brief PoC** | 证明可信、可审核的 Meeting Brief | Trust | 无未经标记的重大错误进入最终 Brief |
| **Next 2: Evaluation-ready PoC** | 证明 PoC 能产生可重复学习 | Model | 能比较 AI 与人工流程的质量、时间和核查成本 |
| **Later 1: Agent Validation Pilot** | 证明目标代理人愿意使用 | Adoption | 达到可接受质量并获得真实采用意愿 |
| **Later 2: Governed Enterprise Pilot** | 证明可在企业环境安全试点 | Enterprise | 获得受控试点批准且无重大治理阻塞 |
| **Horizon: Insurance AI Platform** | 复用公共能力扩展保险场景 | Scale | 新场景可复用公共能力而非重复建设 |

## 6. Phase Details

### Now：Demo Baseline

**Outcome**

以合成数据展示 Meeting Brief、AI-suggested Talking Points、Human Control、Compliance 和 Follow-up 的完整故事。

**Completed Epics**

- Sunny Tan Policy Review 演示数据。
- Meeting Brief 与 Talking Points。
- Approve、Edit、Reject 交互。
- Human Control Hub、Evidence 和 Compliance Tabs。
- Follow-up Draft 扩展体验。
- Domain 与 UI 回归测试。

**Known Limitations**

- 输出由固定逻辑生成，不代表模型表现。
- Evidence、Compliance 和 Audit 为模拟概念。
- 当前流程与新 PoC 成功边界不完全一致。

### Next 1：Trustworthy Brief PoC

**Outcome**

把现有 Demo 收敛为可信 Meeting Brief PoC，验证代理人能否检查证据、处理所有 AI 建议，并生成与审批结果一致的最终 Brief。

**Epics**

1. **Structured Client Context**
   - Customer Snapshot、Policy Summary、Recent Context。
   - 缺失、冲突、来源不可用状态。
   - 来源与更新时间可见。

2. **Evidence-backed Meeting Focus**
   - Observation、Potential Issue、Confirmation Question、Evidence、Limitation。
   - Fact、Inference 和待确认事项标签。
   - 证据不足时允许零建议。

3. **Explicit Human Decision Model**
   - Approve。
   - Edit → Save & Approve。
   - Reject + structured reason。
   - 所有建议必须离开 Pending 才可 finalise。

4. **Versioned Final Brief**
   - 包含已验证事实和已采用内容。
   - 排除 Rejected 内容。
   - 全部拒绝时允许事实型 Brief。
   - 显示版本、批准人和时间。

5. **PoC Transparency**
   - `Synthetic demo data` 标识。
   - 明确 Meeting Preparation Support 边界。
   - 不宣称完成 FNA、suitability 或产品推荐。

**Dependencies**

- 已确认的五条 User Stories。
- 简化 claim-level data contract。
- Human Approval 与 Finalisation 业务规则。

**Exit Criteria**

- 无未经标记的重大事实错误或无依据结论进入最终 Brief。
- Pending 和 Rejected 状态在所有路径上保持正确。
- 代理人可以拒绝全部建议而不被强迫采用 AI。
- 最终 Brief 与审批版本一致。

**Non-goals**

- 真实 CRM / Policy 集成。
- 真实客户数据。
- 自动发送 Follow-up。
- 具体产品推荐。

### Next 2：Evaluation-ready PoC

**Outcome**

让 PoC 从单一 happy path 演示升级为可重复、可比较的 AI 产品实验。

**Epics**

1. **Synthetic Golden Dataset**
   - 正常、缺失、冲突、零建议、证据不支持和违规建议场景。
   - 每个场景定义 expected facts、allowed inferences 和 prohibited outputs。

2. **Model Evaluation Harness**
   - 比较候选模型的 Critical factual accuracy。
   - Groundedness and evidence correctness。
   - Safe uncertainty handling。

3. **Human Review Analytics**
   - Review time。
   - Approved / Approved with edits / Rejected 分布。
   - 拒绝原因与 missed critical error rate。

4. **Workflow Baseline**
   - 记录纯人工准备时间。
   - 记录 AI 生成、审核、修改和核查总时间。
   - 比较 Final Brief quality 和核查次数。

**Dependencies**

- Next 1 的结构化输出、状态和 Evidence 模型稳定。
- 保险领域专家定义 Golden Answers。

**Exit Criteria**

- 同一数据集可重复比较多个候选模型。
- 关键失败模式可归因到数据、模型、prompt、规则或人工审核。
- 获得人工与 AI 辅助流程 baseline，不预设提升比例。

### Later 1：Agent Validation Pilot

**Outcome**

验证真实目标代理人是否认为产品可信、有用，并愿意在 Policy Review 前采用。

**Epics**

- 招募 3–5 位拥有稳定客户组合的成熟代理人。
- 进行受控任务测试与访谈。
- 验证当前 Problem Statement 和 JTBD。
- 分析证据查看行为、拒绝原因和修改模式。
- 比较候选模型并记录选择决定。
- 根据观察调整信息密度、流程和语言。

**Dependencies**

- Evaluation-ready PoC。
- 研究计划、参与者同意和合成测试材料。

**Exit Criteria**

- 代理人能够完成端到端审核而不依赖主持人解释。
- Final Brief 达到领域专家认可的基本质量。
- 代理人表达真实使用意愿，并能说明价值和顾虑。
- 核心 Problem Hypothesis 得到支持或被明确修正。

### Later 2：Governed Enterprise Pilot

**Outcome**

验证产品可在企业数据、权限和治理约束下进行小范围受控试点。

**Epics**

- CRM、Policy 和 Interaction 数据适配层。
- SSO、RBAC 和记录级客户授权。
- Data minimisation、retention 和 deletion controls。
- Model gateway、prompt/model versioning 和 observability。
- 不可篡改审计及安全监控。
- Compliance Gate 规则库和正式审批流程。
- Legal、Compliance、Privacy、Security 和 Model Risk review。

**Dependencies**

- Agent Validation Pilot 达到继续投资条件。
- 企业数据 Owner 和治理团队参与。
- 模型供应商与数据处理安排通过审查。

**Exit Criteria**

- 仅授权代理人能访问相应客户记录。
- 数据用途、保留、传输和供应商责任得到批准。
- 审计链可从来源记录追溯到最终 Brief。
- 受控试点无重大隐私、安全或合规阻塞。

### Horizon：Reusable Insurance AI Platform

**Outcome**

把在 Policy Review 中验证的能力抽象为可复用保险 AI 平台能力，支持更多代理人、服务、理赔、核保和合规场景。

**Candidate Platform Capabilities**

- Data access and purpose-control layer。
- Evidence and lineage service。
- AI claim schema and grounding validator。
- Human approval and audit service。
- Policy and compliance guardrail service。
- Model gateway and evaluation platform。
- Prompt、model、dataset 和 release version management。

**Potential Expansion Paths**

- Meeting capture and minutes。
- Post-meeting follow-up。
- Renewal and policy service reminders。
- Claims assistant。
- Underwriting preparation support。
- Compliance review copilot。

**Platform Entry Criteria**

- 至少两个场景验证了相同能力可以复用。
- 共享服务比场景内重复建设有清晰的成本、治理或质量优势。
- Ownership、service boundaries 和 operating model 已明确。

## 7. Dependency and Decision Gates

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

必须遵守的依赖原则：

- 没有 claim-level evidence，不先接入真实客户数据。
- 没有 Golden Dataset，不凭主观印象锁定模型。
- 没有代理人验证，不投资生产级系统集成。
- 没有治理批准，不自动向客户发送内容。
- 没有第二个复用场景，不提前宣布平台化成功。

## 8. Roadmap Metrics

每个阶段只保留少量与其风险匹配的指标。

| 阶段 | Primary Metric | Supporting Metrics |
|---|---|---|
| Trustworthy Brief PoC | Missed critical error rate | Evidence correctness、state integrity |
| Evaluation-ready PoC | Reproducible evaluation coverage | Model comparison、failure attribution |
| Agent Validation Pilot | Agent confidence and adoption intent | Review time、decision distribution |
| Governed Enterprise Pilot | Critical governance findings | Access violations、audit completeness |
| Platform Horizon | Capability reuse rate | Time-to-enable new use case、shared control coverage |

## 9. Key Risks and Mitigations

| 风险 | 影响 | 缓解方向 |
|---|---|---|
| Demo 被误认为真实 AI 能力 | Stakeholder 高估成熟度 | 明确标记 deterministic / simulated components |
| AI 生成流畅但无证据 | 降低代理人信任 | Claim-level evidence 和 Grounding Gate |
| Human approval 变成形式按钮 | 重大错误进入最终 Brief | Structured decisions、拒绝原因和 missed-error evaluation |
| Scope 回到功能堆叠 | 无法验证核心假设 | 以 Meeting Brief 为唯一首轮成功边界 |
| 过早接入真实数据 | 隐私与安全风险 | 先使用 Synthetic Golden Dataset |
| 过早平台化 | 抽象错误、成本浪费 | 等两个以上场景证明复用需求 |

## 10. Recommended Next Decision

下一阶段唯一建议重点是 **Trustworthy Brief PoC**。

暂不进入真实 CRM 集成、自动 Follow-up、产品推荐或平台建设。先证明：

> Agent Copilot 能够基于可检查的合成证据，生成准确、可拒绝、可编辑且与人工审批一致的最终 Meeting Brief。

只有通过该 Gate，后续模型评估、真实代理人试点和企业治理投入才具有合理基础。

