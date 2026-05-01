export const contentData = {
  flows: {
    basics: {
      id: "basics",
      title: "Learn the Basics",
      description: "Understand what elections are and why they matter.",
      icon: "BookOpen",
      steps: [
        {
          title: "What is an Election?",
          content: "An election is a formal decision-making process where citizens choose individuals to hold public office. It's the core mechanism of democracy.",
          simplified: "An election is how people pick their leaders by voting.",
          expanded: "Elections are the foundation of representative democracy. They provide a peaceful way to transfer power and allow citizens to hold leaders accountable. Without elections, governments would not be bound to the will of the people."
        },
        {
          title: "Why it Matters",
          content: "Voting gives you a voice in how your community, state, and country are governed. It directly affects laws, taxes, and public services.",
          simplified: "Voting lets you decide what rules and leaders you want in your town or country.",
          expanded: "Elections determine policies on education, healthcare, infrastructure, and the economy. Even local elections (like for mayor or school board) have a massive impact on your daily life, as they control local budgets and community rules."
        },
        {
          title: "Levels of Government",
          content: "Elections happen at multiple levels: local (mayor, city council), state (governor, state legislature), and national (president, congress).",
          simplified: "You vote for local leaders (like mayors), state leaders, and country leaders (like presidents).",
          expanded: "Different levels of government handle different responsibilities. Local governments manage police, fire, and sanitation. State governments handle highways and state laws. The national government handles defense, foreign policy, and federal laws. You have representatives at each level."
        }
      ]
    },
    voting: {
      id: "voting",
      title: "Voting Process",
      description: "A step-by-step guide on how to register and cast your vote.",
      icon: "CheckSquare",
      steps: [
        {
          title: "1. Registration",
          content: "Before voting, you must register. This proves your eligibility and ensures you vote in the correct district.",
          simplified: "You need to sign up before you can vote so the government knows you are eligible.",
          expanded: "Voter registration prevents voter fraud by ensuring each eligible citizen only votes once. You typically need a government-issued ID and proof of address. Deadlines to register are often 15-30 days before the election, though some places offer same-day registration."
        },
        {
          title: "2. Preparation",
          content: "Research the candidates and issues on your ballot before Election Day. Non-partisan voter guides are excellent resources.",
          simplified: "Learn about the people and rules you are voting for before you actually vote.",
          expanded: "You can usually view a 'sample ballot' online before the election. This shows exactly what your ballot will look like. It's best practice to research each candidate's platform and understand any propositions or measures, as the legal wording on the ballot can be confusing."
        },
        {
          title: "3. Casting Your Vote",
          content: "Go to your designated polling place to vote in person, or fill out and mail in an absentee/mail-in ballot if allowed.",
          simplified: "Go to a polling place to vote on a machine or paper, or mail your vote if you can.",
          expanded: "If voting in person, you'll check in with election workers, possibly show ID, and receive a ballot. You will vote in a private booth. If voting by mail, you must follow the instructions carefully (like signing the outer envelope) and return it before the deadline."
        },
        {
          title: "4. Confirmation",
          content: "After voting, your ballot is securely collected. If you voted by mail, you can often track your ballot's status online.",
          simplified: "Once you vote, your ballot is kept safe until it's time to count.",
          expanded: "Election security is strict. Ballots are kept in locked, sealed containers. For mail-in voting, many states offer online tracking systems where you can see when your ballot was mailed to you, received back, and accepted for counting."
        }
      ]
    },
    timeline: {
      id: "timeline",
      title: "Election Timeline",
      description: "See the stages of an election from start to finish.",
      icon: "Clock",
      isTimeline: true,
      steps: [
        {
          title: "1. Declaration & Primaries",
          content: "Candidates announce they are running. In many systems, parties hold primary elections to choose their final nominee."
        },
        {
          title: "2. Campaigning",
          content: "Candidates debate, hold rallies, and run advertisements to persuade voters. This is the most visible part of the election."
        },
        {
          title: "3. Voter Registration Closes",
          content: "The deadline passes for new voters to sign up for the upcoming election."
        },
        {
          title: "4. Early Voting & Election Day",
          content: "Voters cast their ballots. Election Day is the final day to submit a vote."
        },
        {
          title: "5. Vote Counting & Certification",
          content: "Polls close and counting begins. After all valid ballots are tallied, the results are officially certified and winners are declared."
        }
      ]
    }
  },
  chat: {
    welcome: "Hello! I am your CivicGuide AI. You can ask me questions about elections, like 'What happens in a tie?' or 'How are votes counted?'.",
    fallback: "I'm designed to focus specifically on educational information about the election process. I don't have information on specific candidates, political parties, or current political events to remain completely neutral.",
    scenarios: {
      "tie": "Rules for tied elections vary. Sometimes a run-off election is held between the tied candidates. In other places, ties might be broken by drawing lots (like flipping a coin) or by a legislative vote.",
      "novote": "If you don't vote, you let others decide who will represent you. While not legally required in most places, voting is the primary way citizens hold leaders accountable.",
      "count": "Votes are counted using optical scanners or electronic machines, monitored by bipartisan workers. Provisional and mail-in ballots are verified first.",
      "fraud": "Election systems have multiple layers of security, including paper trails, signature verification, bipartisian poll workers, and post-election audits to prevent fraud."
    }
  }
};
