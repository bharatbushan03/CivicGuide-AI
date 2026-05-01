export const electionContent = {
  basics: {
    title: "The Basics of Elections",
    content: "An election is a formal group decision-making process where a population chooses an individual to hold public office. It's the core mechanism of democracy, allowing citizens to have a voice in who governs them and how their community, state, or country is run.",
    followUp: "Would you like to learn about the steps to vote or see the full election timeline?",
    options: [
      { id: "voting_steps", label: "Voting Steps", icon: "CheckSquare" },
      { id: "timeline", label: "Election Timeline", icon: "Clock" }
    ]
  },
  voting_steps: {
    title: "How to Vote (Step-by-Step)",
    content: "Voting usually involves three main steps:\n\n1. Registration: You must register to vote before the election. This verifies your eligibility.\n2. Preparation: Research the candidates and issues on the ballot.\n3. Casting your ballot: Go to your polling place on election day, or submit a mail-in/absentee ballot if allowed.",
    followUp: "Do you want to know what happens during the counting process?",
    options: [
      { id: "counting", label: "How Votes are Counted", icon: "Calculator" },
      { id: "timeline", label: "View Full Timeline", icon: "Clock" }
    ]
  },
  timeline: {
    title: "The Election Timeline",
    content: "A typical election follows this path:",
    isTimeline: true,
    timelineData: [
      { step: "1. Registration", desc: "Citizens sign up to be eligible voters." },
      { step: "2. Campaigning", desc: "Candidates present their platforms and debate issues." },
      { step: "3. Election Day", desc: "Voters cast their ballots at polling stations or via mail." },
      { step: "4. Vote Counting", desc: "Ballots are securely collected and tallied by election officials." },
      { step: "5. Results Declaration", desc: "Official winners are announced after certification." }
    ],
    followUp: "What specific part of this timeline would you like to explore?",
    options: [
      { id: "campaigning", label: "Campaigning", icon: "Megaphone" },
      { id: "counting", label: "Vote Counting", icon: "Calculator" }
    ]
  },
  campaigning: {
    title: "Campaigning",
    content: "During the campaign period, candidates try to persuade voters to support them. They do this through speeches, debates, advertisements, town halls, and speaking directly with citizens to explain their proposed policies and vision.",
    followUp: "Want to explore another topic?",
    options: [
      { id: "basics", label: "Back to Basics", icon: "BookOpen" },
      { id: "voting_steps", label: "How to Vote", icon: "CheckSquare" }
    ]
  },
  counting: {
    title: "How Votes are Counted",
    content: "Once voting ends, ballots are securely transported and counted. This is often done using optical scanners for paper ballots or direct recording electronic machines. Bipartisan election workers and observers monitor the process to ensure accuracy and fairness. Provisional and mail-in ballots are verified before being counted.",
    followUp: "Did this help clarify the process?",
    options: [
      { id: "scenarios", label: "Explore Scenarios", icon: "HelpCircle" },
      { id: "basics", label: "Start Over", icon: "Home" }
    ]
  },
  scenarios: {
    title: "Common Scenarios",
    content: "Let's explore some common questions about the voting process.",
    followUp: "Choose a scenario to learn more:",
    options: [
      { id: "scenario_novote", label: "What if I don't vote?", icon: "AlertTriangle" },
      { id: "scenario_tie", label: "What happens in a tie?", icon: "Scale" }
    ]
  },
  scenario_novote: {
    title: "What happens if I don't vote?",
    content: "If you don't vote, you let others decide who will represent you and make laws that affect your life. While voting is not legally required in most democratic systems, it is the primary way citizens hold their leaders accountable and influence public policy.",
    followUp: "Want to explore more?",
    options: [
      { id: "scenarios", label: "Other Scenarios", icon: "HelpCircle" },
      { id: "timeline", label: "View Timeline", icon: "Clock" }
    ]
  },
  scenario_tie: {
    title: "What happens in a tie?",
    content: "Rules for tied elections vary by jurisdiction. Sometimes a run-off election is held between the tied candidates. In other places, ties might be broken by drawing lots (like flipping a coin or pulling a name from a hat), or the decision might be made by a legislative body.",
    followUp: "Want to explore more?",
    options: [
      { id: "scenarios", label: "Other Scenarios", icon: "HelpCircle" },
      { id: "timeline", label: "View Timeline", icon: "Clock" }
    ]
  },
  welcome: {
    title: "Welcome to CivicGuide AI",
    content: "Hello! I am your civic assistant, designed to help you understand the election process in a simple and clear way.",
    followUp: "What would you like to learn about elections today?",
    options: [
      { id: "basics", label: "Learn the Basics", icon: "BookOpen" },
      { id: "voting_steps", label: "Voting Process", icon: "CheckSquare" },
      { id: "timeline", label: "Election Timeline", icon: "Clock" },
      { id: "scenarios", label: "Common Scenarios", icon: "HelpCircle" }
    ]
  },
  fallback: {
    title: "I'm still learning",
    content: "I'm designed to focus specifically on educational information about the election process. I don't have information on specific candidates, political parties, or current political events to remain completely neutral.",
    followUp: "Let's get back to learning about the process. What interests you?",
    options: [
      { id: "basics", label: "Learn the Basics", icon: "BookOpen" },
      { id: "timeline", label: "Election Timeline", icon: "Clock" }
    ]
  }
};
