import type { FaqItem, ServiceSlug } from "./services";

/**
 * Proposed consulting approach. The owner should confirm this before launch,
 * especially the scope of the "Support" stage.
 */
export const approach = [
  {
    step: "Understand",
    summary: "Listen first and agree on the questions that matter.",
    body: "We start with your goals, your constraints, and the situation as you and your team see it. We review relevant documents and data, then agree on the specific questions the engagement should answer.",
  },
  {
    step: "Assess",
    summary: "Build a clear, shared picture of the issues and their causes.",
    body: "We examine the business against those questions, looking at how work gets done, what the numbers indicate, and what is happening in your market, so the problem is defined before solutions are proposed.",
  },
  {
    step: "Recommend",
    summary: "Put practical options and a recommended path in front of you.",
    body: "You receive clear options and a recommended course of action, with the reasoning, trade-offs, priorities, and sequencing spelled out and sized to the resources you actually have.",
  },
  {
    step: "Support",
    summary: "Help with next steps, to the extent the scope includes it.",
    body: "Where the engagement includes it, we help plan the rollout, work with your team as changes are adopted, and review progress. The level of follow-through support is agreed up front.",
  },
] as const;

export const principles = [
  {
    title: "Tailored to the business in front of us",
    body: "There is no packaged program. Scope, depth, and deliverables are set around your situation, the size of your organization, and what you are prepared to invest.",
  },
  {
    title: "Strategic, not just tactical",
    body: "A problem that shows up in one department often starts somewhere else. We look at how a decision affects the whole business before recommending a fix.",
  },
  {
    title: "Recommendations you can act on",
    body: "Advice is written for the people who will carry it out, with clear priorities, owners, and a realistic sequence, not a list of everything that could be better.",
  },
  {
    title: "Working with your team",
    body: "Your people know the business. We work with them rather than around them, explain our reasoning, and keep you informed as the work progresses.",
  },
  {
    title: "Attention to efficiency",
    body: "We look for unnecessary steps, duplicated effort, and spending that doesn’t support the goals of the business, because every hour and dollar has another use.",
  },
  {
    title: "Growth the business can sustain",
    body: "Growth should hold up financially, operationally, and for the people doing the work. Recommendations take capacity and pace into account.",
  },
] as const;

/** Homepage: the situations that most often bring a business to BNX 24. */
export const challenges: { title: string; body: string; services: ServiceSlug[] }[] = [
  {
    title: "Planning the next stage of growth",
    body: "The business has outgrown the way it was planned and run. Before adding people, offerings, or locations, you want an order of operations that the team and the budget can support.",
    services: ["business-development-growth", "business-expansion-strategic-advisory"],
  },
  {
    title: "Bringing clarity to business priorities",
    body: "Several initiatives are competing for the same people and money, and leaders describe the goals differently. The work is agreeing on what matters most, and what can wait.",
    services: ["business-strategy-planning", "management-consulting"],
  },
  {
    title: "Improving inefficient operations",
    body: "Handoffs break down, tasks are done twice, and the same problems return every month. You want to see where time and cost are going, and what to change first.",
    services: ["business-operations-consulting", "process-improvement-cost-optimization"],
  },
  {
    title: "Making better-informed decisions",
    body: "A significant choice is on the table, and it rests on assumptions about customers, competitors, or performance that haven’t been tested. You want evidence before you commit.",
    services: ["market-research-business-analysis", "business-strategy-planning"],
  },
];

/**
 * Homepage "Why BNX 24": four working principles, worded to stand apart from
 * the hero and the approach section.
 */
export const homePrinciples = [
  {
    title: "Shaped around your situation",
    body: "Scope, depth, and deliverables are set by your business: its size, its stage, and what you are prepared to invest. There is no packaged program to fit into.",
  },
  {
    title: "A view of the whole business",
    body: "A problem that shows up in one department often starts in another. Each recommendation is weighed against its effect on the rest of the organization.",
  },
  {
    title: "Advice written to be used",
    body: "Recommendations come with priorities, owners, and a realistic sequence, written for the people who will carry them out rather than for a shelf.",
  },
  {
    title: "Attention to how work gets done",
    body: "Strategy only matters if operations can deliver it. We look closely at workflows, handoffs, and costs so that plans hold up in day-to-day practice.",
  },
] as const;

export const clientTypes = [
  {
    title: "Small and midsize businesses",
    body: "Companies that have grown beyond informal management and need clearer priorities, structure, and routines.",
  },
  {
    title: "Startups and entrepreneurs",
    body: "Founders building the business model, plan, and early organization that the next stage requires.",
  },
  {
    title: "Established companies",
    body: "Mature businesses reviewing direction, performance, or organization after years of steady operation.",
  },
  {
    title: "Businesses improving operations",
    body: "Organizations that want work to run with fewer delays, less rework, and better visibility into costs.",
  },
  {
    title: "Companies planning growth",
    body: "Businesses preparing to enter new markets, add offerings, or expand their reach, and wanting to do it in the right order.",
  },
] as const;

export const homeFaqs: FaqItem[] = [
  {
    question: "What does a general business consultant do?",
    answer:
      "A general business consultant helps owners and leadership teams work through questions that affect the whole business, such as direction, priorities, organization, operations, and growth. The work typically combines conversations with your team, analysis of how the business operates, and practical recommendations.",
  },
  {
    question: "What kinds of businesses does BNX 24 work with?",
    answer:
      "Small and midsize businesses, startups, and established companies in a range of industries. What matters most is that there is a real decision or problem to work on and a leadership team ready to engage with it.",
  },
  {
    question: "Do you work with businesses outside your area?",
    answer:
      "Yes. BNX 24 serves clients across the United States. Much of the work, including interviews, document reviews, and working sessions, can be done remotely. Working arrangements are agreed for each engagement.",
  },
  {
    question: "How does an engagement start?",
    answer:
      "With a conversation about your situation. If there appears to be a good fit, BNX 24 outlines a proposed scope covering objectives, activities, deliverables, timing, and fees for your review. Work begins once the scope is agreed.",
  },
  {
    question: "How are engagements priced?",
    answer:
      "Fees depend on the scope, complexity, and duration of the work. They are set out in the proposal before any work begins, so there are no open-ended commitments.",
  },
  {
    question: "Do you provide legal, tax, accounting, or investment advice?",
    answer:
      "No. BNX 24 provides business consulting. Where a question involves legal, tax, accounting, financial, or investment matters, you should work with a qualified professional in that field. We can help you frame the business questions for those conversations.",
  },
];
