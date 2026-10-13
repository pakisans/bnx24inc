/**
 * Service definitions. Each service has its own purpose, so the copy below is
 * written per service rather than generated from a shared template.
 * Outputs are examples only; actual deliverables depend on the agreed scope.
 */

export const serviceSlugs = [
  "business-strategy-planning",
  "business-development-growth",
  "business-operations-consulting",
  "management-consulting",
  "small-business-startup-consulting",
  "market-research-business-analysis",
  "process-improvement-cost-optimization",
  "business-expansion-strategic-advisory",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: ServiceSlug;
  number: string;
  title: string;
  /** The distinct job this service does, in a few words. */
  focus: string;
  /** The question a client is usually asking when this service fits. */
  question: string;
  /** One or two sentences for cards and listings. */
  summary: string;
  seo: {
    title: string;
    description: string;
    /** Internal SEO notes. Keyword themes are hypotheses, not researched data. */
    intent: string;
    theme: string;
  };
  headline: string;
  intro: [string, ...string[]];
  audience: string[];
  situations: string[];
  areas: { title: string; body: string }[];
  outputs: string[];
  faqs: FaqItem[];
  related: [ServiceSlug, ServiceSlug, ServiceSlug];
  cta: { heading: string; body: string };
}

export const services: Service[] = [
  {
    slug: "business-strategy-planning",
    number: "01",
    title: "Business Strategy & Planning",
    focus: "Direction and priorities",
    question: "Where should we focus over the next year or two?",
    summary:
      "Agree on where the business is headed, narrow a long list of initiatives to the few that matter, and turn them into a plan your team can follow.",
    seo: {
      title: "Business Strategy & Planning Consulting",
      description:
        "Strategy and planning support for U.S. business owners and leadership teams: clarify goals, set priorities, evaluate opportunities, and build a plan people use.",
      intent: "Commercial: owners looking for outside help with a strategic plan or priority setting",
      theme: "business strategy consulting; strategic planning consultant for small and midsize businesses",
    },
    headline: "Decide where the business is going, and what comes first.",
    intro: [
      "Most businesses don’t lack ideas. What they lack is an agreed view of which ideas matter most right now. Strategy and planning work helps owners and leadership teams set a clear direction, choose a manageable number of priorities, and turn them into a plan people actually use.",
      "We start with where the business stands today, test the assumptions behind your goals, and shape a plan that fits the people, time, and money you actually have.",
    ],
    audience: [
      "Owners whose business has outgrown planning that lives in their head",
      "Leadership teams that need to agree on priorities before the next budget or fiscal year",
      "Companies weighing a new opportunity against everything already underway",
      "Businesses coming out of a period of change, such as new leadership, the loss of a major customer, or a stretch of rapid growth",
    ],
    situations: [
      "Every initiative feels urgent, and the team is spread across too many of them.",
      "Ask three leaders about the company’s goals and you get three different answers.",
      "There is an annual plan, but nobody uses it to make decisions.",
      "A new opportunity has come up, and it’s unclear whether it fits.",
      "Growth has slowed, and it’s time to decide what to change.",
    ],
    areas: [
      {
        title: "Current position",
        body: "An honest review of what is working, what isn’t, and what is changing in your market and inside the organization.",
      },
      {
        title: "Goals and priorities",
        body: "Defining what the business is trying to achieve over the next one to three years, then narrowing the priority list to what the organization can realistically support.",
      },
      {
        title: "Opportunity evaluation",
        body: "Weighing proposed initiatives against your direction, capacity, and appetite for risk before you commit people or money to them.",
      },
      {
        title: "Planning and accountability",
        body: "Translating priorities into initiatives with owners, milestones, and a small set of measures that leadership reviews on a regular schedule.",
      },
    ],
    outputs: [
      "A summary of the current situation and the key strategic questions",
      "Defined goals with a ranked list of priorities",
      "A strategic plan or a one-page plan summary",
      "Assessments of specific opportunities under consideration",
      "A quarterly review format for tracking progress",
    ],
    faqs: [
      {
        question: "How long does a strategic planning engagement take?",
        answer:
          "It depends on the size of the organization and how much groundwork already exists. A focused priority-setting effort for a small business can be fairly short, while a full planning process involving several leaders takes longer. The timeline is agreed before work begins.",
      },
      {
        question: "Will you write the plan for us?",
        answer:
          "The plan should belong to your leadership team. BNX 24 facilitates the discussion, does the analysis, drafts the documents, and challenges the assumptions, but the decisions stay with you. That ownership is what keeps a plan in use after the engagement ends.",
      },
      {
        question: "What is the difference between strategy and business development?",
        answer:
          "Strategy sets the overall direction and priorities. Business development pursues specific opportunities, such as markets, customers, and partnerships, within that direction. Many companies settle strategy first and move on to development work afterward.",
      },
    ],
    related: [
      "business-development-growth",
      "management-consulting",
      "business-expansion-strategic-advisory",
    ],
    cta: {
      heading: "Ready to set clearer priorities?",
      body: "Tell us where the business stands and which decisions are coming up. We’ll talk through whether a strategy and planning engagement makes sense and what it could cover.",
    },
  },
  {
    slug: "business-development-growth",
    number: "02",
    title: "Business Development & Growth",
    focus: "Opportunities and partnerships",
    question: "Where will our next customers, markets, or partners come from?",
    summary:
      "Identify the customers, channels, and partnerships that fit your business, compare the options, and pursue the best ones with an organized plan.",
    seo: {
      title: "Business Development & Growth Consulting",
      description:
        "Business development consulting for companies seeking new customers, segments, channels, and partnerships, with a practical plan for pursuing the right ones.",
      intent: "Commercial: companies seeking help finding and organizing growth opportunities",
      theme: "business development consulting; business growth consultant; partnership strategy",
    },
    headline: "Find the growth opportunities worth pursuing, then pursue them with a plan.",
    intro: [
      "Growth rarely comes from chasing everything at once. Business development work helps you identify which customers, segments, channels, and partnerships make sense for your business, and how to pursue them in an organized way.",
      "The focus stays practical. Where could new revenue come from, what would it take to win it, and what does your business need in place to support it?",
    ],
    audience: [
      "Businesses with a solid core offer that want to reach new customers or segments",
      "Owners who depend heavily on a few clients or a single referral source",
      "Companies exploring partnerships, distribution relationships, or joint offerings",
      "Teams whose sales and marketing activity is busy but not well coordinated",
    ],
    situations: [
      "Most of our revenue depends on a handful of customers.",
      "Referrals bring in work, but there is no repeatable way to grow beyond them.",
      "A potential partner reached out, and we don’t know how to evaluate the fit.",
      "We think there is demand in an adjacent segment, but we haven’t tested it.",
      "Sales and operations disagree about what we’re actually selling.",
    ],
    areas: [
      {
        title: "Growth options",
        body: "Identifying and comparing possible paths, including new segments, offers, channels, or geographic reach, based on fit, effort, and risk.",
      },
      {
        title: "Customer and offer focus",
        body: "Clarifying which customers are most worth pursuing and how your offer should be framed for them.",
      },
      {
        title: "Partnerships",
        body: "Defining what a good partner looks like, what each side contributes, and how to evaluate specific prospects. Contracts and legal terms stay with your attorney.",
      },
      {
        title: "Development plan",
        body: "Setting targets, activities, responsibilities, and a review rhythm for the opportunities you choose to pursue.",
      },
    ],
    outputs: [
      "A comparison of growth options with recommended areas of focus",
      "Target customer profiles and positioning notes",
      "Partner evaluation criteria and a review of specific prospects",
      "A business development plan with activities and owners",
      "Simple measures for tracking pipeline and progress",
    ],
    faqs: [
      {
        question: "Will you sell on our behalf?",
        answer:
          "No. BNX 24 helps you decide where to focus and how to organize the effort. The customer relationships and the selling stay with your team.",
      },
      {
        question: "Can you guarantee new revenue?",
        answer:
          "No consultant can honestly guarantee results. The aim is better decisions about where to invest your time and money, and a clearer plan for following through.",
      },
      {
        question: "How is this different from expansion advisory?",
        answer:
          "Business development looks for opportunities within your current business model. Expansion advisory is for larger moves, such as entering new regions, adding service lines, or changing how the business is structured.",
      },
    ],
    related: [
      "market-research-business-analysis",
      "business-strategy-planning",
      "business-expansion-strategic-advisory",
    ],
    cta: {
      heading: "Looking for your next growth opportunity?",
      body: "Share what drives growth today and where you think the next opportunity might be. We’ll discuss how a business development engagement could help you evaluate it.",
    },
  },
  {
    slug: "business-operations-consulting",
    number: "03",
    title: "Business Operations Consulting",
    focus: "How work is organized and delivered",
    question: "Why does day-to-day work feel harder than it should?",
    summary:
      "Look at how work actually moves through your organization, clarify who owns what, and fix the handoffs where coordination breaks down.",
    seo: {
      title: "Business Operations Consulting",
      description:
        "Operations consulting for growing U.S. businesses: map workflows, clarify roles and handoffs, and build an operating rhythm that depends less on a few key people.",
      intent: "Commercial: owners of growing businesses with coordination and workflow problems",
      theme: "business operations consulting; operations consultant for small business; workflow and roles",
    },
    headline: "Make the way your business runs day to day clearer and more dependable.",
    intro: [
      "As a business grows, the way work gets done often grows by accident. Responsibilities blur, handoffs fail, and a few key people end up holding everything together. Operations consulting looks at how work really moves through your organization and where coordination breaks down.",
      "The goal is an operation that is easier to manage, depends less on heroics, and can support the business you are trying to build.",
    ],
    audience: [
      "Growing businesses where informal ways of working no longer hold up",
      "Owners pulled into day-to-day issues that others should be able to handle",
      "Companies with recurring delays, rework, or customer issues caused by internal coordination",
      "Organizations that added people or locations without updating how work is organized",
    ],
    situations: [
      "Everything runs through one or two people.",
      "Different team members handle the same task in different ways.",
      "Handoffs between sales, delivery, and billing keep breaking down.",
      "We’ve added staff, but output hasn’t kept pace.",
      "No one is entirely sure who is responsible for what.",
    ],
    areas: [
      {
        title: "Workflow mapping",
        body: "Documenting how key work flows from start to finish, including who does what, in which order, and with which tools, so problems become visible.",
      },
      {
        title: "Roles and ownership",
        body: "Clarifying who owns each task and decision to reduce overlap, gaps, and bottlenecks.",
      },
      {
        title: "Coordination and handoffs",
        body: "Improving how information and work pass between people, teams, and systems.",
      },
      {
        title: "Operating rhythm",
        body: "Setting up meetings, reporting, and checkpoints that keep operations on track without adding bureaucracy.",
      },
    ],
    outputs: [
      "Current-state maps of selected workflows",
      "An assessment of bottlenecks, gaps, and duplicated effort",
      "Recommended changes to roles, handoffs, or procedures",
      "Outlines of standard operating procedures for priority work",
      "An implementation roadmap sequenced by impact and effort",
    ],
    faqs: [
      {
        question: "How is operations consulting different from process improvement?",
        answer:
          "Operations consulting looks at the organization as a whole, meaning how teams, roles, and workflows fit together. Process improvement and cost optimization goes deeper into specific processes or cost areas that have already been identified as problems.",
      },
      {
        question: "Will this disrupt our team?",
        answer:
          "Most of the work involves conversations, observation, and a review of existing documents. Interviews and working sessions are scheduled around your operations.",
      },
      {
        question: "Do you recommend software?",
        answer:
          "If tools are part of the problem, we’ll say so and outline what your process needs from them. The choice of tools and vendors remains yours.",
      },
    ],
    related: [
      "process-improvement-cost-optimization",
      "management-consulting",
      "small-business-startup-consulting",
    ],
    cta: {
      heading: "Want operations that run with less friction?",
      body: "Describe where work tends to get stuck and who ends up fixing it. We’ll discuss which parts of the operation would be worth reviewing first.",
    },
  },
  {
    slug: "management-consulting",
    number: "04",
    title: "Management Consulting",
    focus: "Leadership decisions and resource allocation",
    question: "How should we organize, resource, and lead the business?",
    summary:
      "An outside perspective for owners and leadership teams on organizational structure, where to commit people and budget, and how performance is reviewed.",
    seo: {
      title: "Management Consulting for Owners & Leadership Teams",
      description:
        "Management consulting for business owners and leadership teams: organizational structure, resource allocation, performance measures, and decision-making.",
      intent: "Commercial: owners and executives seeking an outside advisor on leadership decisions",
      theme: "management consulting for small and midsize businesses; organizational structure; resource allocation",
    },
    headline: "Support for the decisions that land on the leadership team’s desk.",
    intro: [
      "Owners and leadership teams make decisions every week about people, money, and time, often without room to step back. Management consulting brings an outside perspective to organizational decisions, the allocation of resources, and how business performance is measured.",
      "BNX 24 works alongside your leaders as an analyst and sounding board. We help frame each decision, gather what is needed to make it, and keep the follow-through on track.",
    ],
    audience: [
      "Owners who make most major decisions alone and want a structured second perspective",
      "Leadership teams that need to align on structure, priorities, or budget",
      "Businesses whose organizational structure no longer matches their size or goals",
      "Companies that track results but aren’t sure what the numbers are telling them",
    ],
    situations: [
      "We need to decide where next year’s budget and new hires should go.",
      "Our organizational chart made sense three years ago.",
      "Leadership meetings run long, but decisions don’t stick.",
      "It isn’t clear which parts of the business are actually performing.",
      "Too many decisions are waiting on the owner.",
    ],
    areas: [
      {
        title: "Organizational structure",
        body: "Reviewing reporting lines, roles, and spans of responsibility so the structure supports how the business needs to operate.",
      },
      {
        title: "Resource allocation",
        body: "Helping leadership weigh where to commit budget, people, and management attention when needs compete.",
      },
      {
        title: "Performance review",
        body: "Defining a focused set of measures and a review routine that help leaders spot issues early and respond.",
      },
      {
        title: "Decision-making",
        body: "Clarifying who decides what, how decisions are made, and how they are communicated and carried out.",
      },
    ],
    outputs: [
      "An organizational review with structure options",
      "A framework for prioritizing budget and staffing decisions",
      "A leadership scorecard of key performance measures",
      "Meeting and decision-making guidelines for the leadership team",
      "Briefing materials for specific decisions under consideration",
    ],
    faqs: [
      {
        question: "Is this executive coaching?",
        answer:
          "No. Management consulting focuses on the organization’s decisions, structure, and performance rather than on individual leadership development.",
      },
      {
        question: "Can you work with just the owner?",
        answer:
          "Yes. With smaller businesses, much of the work is often done with the owner directly, with input from key staff as needed.",
      },
      {
        question: "Do you handle HR or employment matters?",
        answer:
          "We can help you think through structure and roles. Employment law, compensation compliance, and personnel actions should be handled with qualified HR and legal professionals.",
      },
    ],
    related: [
      "business-strategy-planning",
      "business-operations-consulting",
      "process-improvement-cost-optimization",
    ],
    cta: {
      heading: "Facing a leadership decision?",
      body: "Tell us about the decision in front of you and who is involved in making it. We’ll talk through how outside support could help you work through it.",
    },
  },
  {
    slug: "small-business-startup-consulting",
    number: "05",
    title: "Small Business & Startup Consulting",
    focus: "Business foundations",
    question: "What do we need in place to grow from here?",
    summary:
      "Practical structure for founders and small businesses: a clear business model, a usable plan, defined roles, and simple processes sized to your stage.",
    seo: {
      title: "Small Business & Startup Consulting",
      description:
        "Consulting for entrepreneurs, startups, and small businesses: clarify the business model, build a practical plan, define first roles, and set up core processes.",
      intent: "Commercial: founders and small business owners looking for practical business guidance",
      theme: "small business consulting; startup business consultant; business plan and foundations",
    },
    headline: "Build the foundation your business needs to grow on purpose.",
    intro: [
      "Early-stage companies and small businesses often run on energy and instinct. That works until the business needs to plan, hire, or take on a bigger commitment. Small business and startup consulting helps founders and owners put practical structure in place without slowing the business down.",
      "The work is sized to your stage. You get enough planning and organization to make good decisions, without paperwork no one will use.",
    ],
    audience: [
      "Founders turning an idea or early traction into a structured business",
      "Owner-operated businesses getting ready to hire their first managers or key staff",
      "Small businesses that grew quickly and need basic systems to keep up",
      "Entrepreneurs who want an outside perspective before a significant commitment",
    ],
    situations: [
      "I’m doing everything myself and don’t know what to hand off first.",
      "We need a business plan that reflects how we’ll actually operate.",
      "We’re busy, but we don’t know which work is really profitable.",
      "I’m not sure how to define roles before I hire.",
      "We want to test the business model before investing more.",
    ],
    areas: [
      {
        title: "Business model",
        body: "Defining who you serve, what you offer, how you deliver it, and how the business earns money.",
      },
      {
        title: "Planning foundations",
        body: "Building a practical business plan, budget assumptions, and near-term goals. Financial statements, taxes, and legal formation belong with your accountant and attorney.",
      },
      {
        title: "Organization and roles",
        body: "Deciding what the owner should keep, what to delegate, and how the first roles should be defined.",
      },
      {
        title: "Core routines",
        body: "Setting up simple, repeatable ways to handle sales, delivery, customer service, and administration.",
      },
    ],
    outputs: [
      "A one-page business model summary",
      "A practical business plan or 12-month operating plan",
      "Role outlines for first hires and an owner delegation plan",
      "Simple checklists for core activities",
      "A short list of priorities for the next stage",
    ],
    faqs: [
      {
        question: "Do you help with incorporation, taxes, or funding?",
        answer:
          "No. BNX 24 does not provide legal, tax, accounting, or investment advice. We can help you organize your plan and your questions so conversations with those professionals are more productive.",
      },
      {
        question: "Is my business too small?",
        answer:
          "Not necessarily. Scope can be matched to the size and needs of the business. The first conversation is the right place to find out whether there is a good fit.",
      },
      {
        question: "Can you help with a business plan for a lender or investor?",
        answer:
          "We can help develop the business thinking behind the plan, including your model, priorities, and operating assumptions. Financial projections and materials for lenders or investors should be reviewed by your accountant or financial advisor.",
      },
    ],
    related: [
      "business-strategy-planning",
      "business-operations-consulting",
      "market-research-business-analysis",
    ],
    cta: {
      heading: "Building something and want a clearer plan?",
      body: "Tell us what stage the business is at and what is keeping you up at night. We’ll talk through which foundations to put in place first.",
    },
  },
  {
    slug: "market-research-business-analysis",
    number: "06",
    title: "Market Research & Business Analysis",
    focus: "Evidence for decisions",
    question: "What does the evidence actually say?",
    summary:
      "Scoped research into markets, competitors, customers, and your own data, organized so you can decide with a clearer view of the risks.",
    seo: {
      title: "Market Research & Business Analysis Services",
      description:
        "Market research and business analysis for decision-makers: market and competitor reviews, customer insight, and internal data analysis tied to a specific question.",
      intent: "Commercial/informational: businesses needing evidence before a market or investment decision",
      theme: "market research for small business; competitive analysis; business analysis consulting",
    },
    headline: "Get the facts in front of you before you make the call.",
    intro: [
      "Important decisions often rest on assumptions: that demand exists, that competitors won’t respond, that a segment is worth the effort. Market research and business analysis replaces those assumptions with organized evidence, so you can decide with a clearer view of the risks.",
      "Every project is scoped to a specific question. The aim isn’t a thick report. It’s an answer you can act on, with the reasoning shown.",
    ],
    audience: [
      "Businesses considering a new market, product, service, or customer segment",
      "Leadership teams that want an objective view of their competitive position",
      "Owners preparing for a strategic decision who want evidence behind it",
      "Companies seeing a shift in demand and trying to understand why",
    ],
    situations: [
      "We believe there is demand, but we haven’t checked.",
      "A competitor is changing the market, and we need to understand how.",
      "Our pricing hasn’t been compared with the market in years.",
      "We need a clearer picture of our customers before we invest.",
      "Leadership disagrees, and we need facts to settle the question.",
    ],
    areas: [
      {
        title: "Market assessment",
        body: "Examining demand drivers, customer segments, market size indicators, and trends relevant to your decision, using public and industry sources.",
      },
      {
        title: "Competitive analysis",
        body: "Reviewing how competitors position, price, and deliver, and where your business stands out or is exposed.",
      },
      {
        title: "Customer insight",
        body: "Organizing what you already know about customers and, where appropriate, gathering new input through interviews or surveys.",
      },
      {
        title: "Internal analysis",
        body: "Reviewing your own data, such as sales, margins by offering, and customer mix, to see what it says about performance and opportunity.",
      },
    ],
    outputs: [
      "A defined research question and approach",
      "Market and competitor summaries with sources noted",
      "Findings from customer interviews or surveys",
      "Analysis of internal performance data",
      "A decision brief with findings, implications, and options",
    ],
    faqs: [
      {
        question: "What sources do you use?",
        answer:
          "It depends on the question. Typical sources include public data, industry publications, competitor materials, and your own business records. If primary research such as customer interviews is in scope, the approach is agreed in advance.",
      },
      {
        question: "Can research tell us whether a new product will succeed?",
        answer:
          "No one can predict outcomes with certainty. Research reduces uncertainty and brings risks to the surface. It does not remove them.",
      },
      {
        question: "How is this different from strategy work?",
        answer:
          "Research supplies evidence. Strategy combines that evidence with judgment about goals and resources to set direction. Research can stand alone or be one step within a strategy or expansion engagement.",
      },
    ],
    related: [
      "business-development-growth",
      "business-expansion-strategic-advisory",
      "business-strategy-planning",
    ],
    cta: {
      heading: "Have a question that needs evidence?",
      body: "Tell us about the decision you’re facing and what you already know. We’ll discuss what kind of research would help and how it could be scoped.",
    },
  },
  {
    slug: "process-improvement-cost-optimization",
    number: "07",
    title: "Process Improvement & Cost Optimization",
    focus: "Specific workflow and cost issues",
    question: "Where are we losing time or money in a specific area?",
    summary:
      "A close look at a defined process or cost area to remove unnecessary steps, rework, and spending, with changes your team can realistically adopt.",
    seo: {
      title: "Process Improvement & Cost Optimization Consulting",
      description:
        "Process improvement and cost optimization consulting: analyze specific workflows and spending areas, reduce complexity and rework, and keep costs visible.",
      intent: "Commercial: businesses with a known inefficient process or rising costs",
      theme: "process improvement consulting; cost reduction consultant; business efficiency",
    },
    headline: "Remove the friction and waste you already know is there.",
    intro: [
      "Some problems are specific: an approval process that takes weeks, a month-end close that consumes the team, costs that keep rising without a clear explanation. Process improvement and cost optimization goes after those issues directly.",
      "We look at where time, effort, and money go in a defined area of the business, identify what isn’t adding value, and recommend changes your team can realistically adopt.",
    ],
    audience: [
      "Businesses with a specific process that is slow, error-prone, or frustrating for customers",
      "Owners concerned about rising costs and unclear spending patterns",
      "Teams that spend significant time on manual, duplicated, or workaround tasks",
      "Companies preparing to grow that want processes to scale without unnecessary cost",
    ],
    situations: [
      "This process has too many steps and too many approvals.",
      "We fix the same mistakes every month.",
      "Costs are rising faster than revenue, and we can’t say exactly why.",
      "The team re-enters the same data across spreadsheets and systems.",
      "We pay for services and subscriptions nobody has reviewed in years.",
    ],
    areas: [
      {
        title: "Process analysis",
        body: "Breaking a defined process into its steps, measuring time and effort where possible, and identifying delays, rework, and unnecessary complexity.",
      },
      {
        title: "Cost review",
        body: "Examining spending in agreed areas, such as vendors, subscriptions, overhead, or process costs, to find where resources aren’t producing value.",
      },
      {
        title: "Simplification",
        body: "Reducing steps, approvals, and exceptions, and standardizing how routine work gets done.",
      },
      {
        title: "Controls and measures",
        body: "Putting simple measures in place to confirm that changes hold and costs stay visible.",
      },
    ],
    outputs: [
      "Before-and-after maps of selected processes",
      "A cost review of agreed spending areas",
      "A prioritized list of improvement opportunities with expected effort",
      "Revised procedures or checklists",
      "Measures for tracking process performance over time",
    ],
    faqs: [
      {
        question: "How much will we save?",
        answer:
          "That depends entirely on your situation, and an honest consultant won’t promise a number before reviewing it. If savings opportunities are identified, we’ll explain the basis for any estimate.",
      },
      {
        question: "Does cost optimization mean layoffs?",
        answer:
          "Not by default. The focus is on removing waste, rework, and unnecessary spending. Any staffing decisions remain with your leadership and should involve qualified HR and legal advice.",
      },
      {
        question: "Which processes should we start with?",
        answer:
          "Usually the ones that affect customers, consume the most staff time, or cause the most repeated errors. Choosing where to focus is part of the early work.",
      },
    ],
    related: [
      "business-operations-consulting",
      "management-consulting",
      "small-business-startup-consulting",
    ],
    cta: {
      heading: "Know where the friction is?",
      body: "Describe the process or cost area that concerns you most. We’ll discuss how it could be reviewed and what a focused engagement might include.",
    },
  },
  {
    slug: "business-expansion-strategic-advisory",
    number: "08",
    title: "Business Expansion & Strategic Advisory",
    focus: "Evaluating and planning the next stage",
    question: "Should we make this major move, and how?",
    summary:
      "Independent advice on major moves, such as a new region, service line, or business model, from testing the case to planning the steps.",
    seo: {
      title: "Business Expansion & Strategic Advisory",
      description:
        "Strategic advisory for business expansion: test the case for new markets, service lines, or model changes, check readiness, and plan a phased path forward.",
      intent: "Commercial: established businesses evaluating a significant expansion decision",
      theme: "business expansion consulting; strategic advisory services; expansion planning",
    },
    headline: "Evaluate your next big move before you commit to it.",
    intro: [
      "Opening in a new region, adding a service line, or changing your business model are decisions with significant cost and lasting consequences. Expansion and strategic advisory helps you test the case for the move, understand what it will require, and plan the path in stages.",
      "BNX 24 acts as an independent advisor through the decision, raising the hard questions early so the business isn’t surprised later.",
    ],
    audience: [
      "Established businesses considering expansion into new regions or states",
      "Companies evaluating a new service line, product line, or customer type",
      "Owners considering a change to their business model, such as how they deliver or price their work",
      "Leadership teams that want an outside perspective before a major commitment",
    ],
    situations: [
      "We’re considering opening in another state.",
      "Customers keep asking for a service we don’t offer yet.",
      "Our current model is limiting growth, and we’re weighing alternatives.",
      "This expansion is a big investment, and the sequence matters.",
      "The owners want a clearer case before approving the investment.",
    ],
    areas: [
      {
        title: "The expansion case",
        body: "Assessing the rationale, market evidence, and resource requirements behind the proposed move.",
      },
      {
        title: "Readiness",
        body: "Examining whether operations, management capacity, and systems can support expansion without weakening the existing business.",
      },
      {
        title: "Options and scenarios",
        body: "Comparing alternative approaches, such as phased entry, partnering, or a pilot, along with their trade-offs.",
      },
      {
        title: "Phased plan",
        body: "Sequencing steps, decision points, and milestones, with clear criteria for continuing, pausing, or adjusting.",
      },
    ],
    outputs: [
      "An expansion assessment covering rationale, risks, and requirements",
      "An organizational readiness review",
      "Scenario comparisons for alternative approaches",
      "A phased roadmap with decision checkpoints",
      "Briefing materials for owners or a board",
    ],
    faqs: [
      {
        question: "Do you help finance an expansion?",
        answer:
          "No. BNX 24 does not provide investment, lending, or financial advisory services. We can help clarify the business case and operating requirements that your financial advisors and lenders will want to understand.",
      },
      {
        question: "What if the answer is “not yet”?",
        answer:
          "That is a legitimate outcome. Sometimes the most useful result is a clear list of what needs to be in place before an expansion makes sense.",
      },
      {
        question: "How is this different from business development?",
        answer:
          "Business development pursues growth within your current model. Expansion advisory evaluates larger moves that change the shape or reach of the business.",
      },
    ],
    related: [
      "market-research-business-analysis",
      "business-strategy-planning",
      "business-development-growth",
    ],
    cta: {
      heading: "Weighing a major move?",
      body: "Tell us what you’re considering and where the decision stands today. We’ll discuss how an advisory engagement could help you evaluate it.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}/`;
}

/** Grouping used on the services overview page. */
export const serviceGroups: { title: string; description: string; slugs: ServiceSlug[] }[] = [
  {
    title: "Set direction",
    description: "For decisions about where the business is going and how leadership allocates its attention.",
    slugs: ["business-strategy-planning", "management-consulting"],
  },
  {
    title: "Grow and expand",
    description: "For finding, testing, and planning opportunities beyond what the business does today.",
    slugs: [
      "business-development-growth",
      "market-research-business-analysis",
      "business-expansion-strategic-advisory",
    ],
  },
  {
    title: "Run the business better",
    description: "For the way work is organized, delivered, and paid for.",
    slugs: ["business-operations-consulting", "process-improvement-cost-optimization"],
  },
  {
    title: "Build the foundation",
    description: "For founders and small businesses putting structure in place for the next stage.",
    slugs: ["small-business-startup-consulting"],
  },
];
