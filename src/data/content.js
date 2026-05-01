export const contentData = {
  flows: {
    basics: {
      id: "basics",
      title: "Learn the Basics",
      description: "Understand what elections are and why they matter.",
      icon: "BookOpen",
      type: "flow",
      suggestedNext: "voting",
      quizId: "basics",
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
      type: "flow",
      suggestedNext: "timeline",
      suggestedScenario: "no_vote",
      quizId: "voting",
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
      title: "Interactive Timeline",
      description: "Explore the stages of an election from start to finish.",
      icon: "Clock",
      type: "timeline",
      suggestedScenario: "counting",
      quizId: "timeline",
      stages: [
        {
          title: "Announcement",
          shortDesc: "Election is called",
          icon: "Megaphone",
          content: "The election cycle officially begins when the governing body announces the dates and positions up for election. Candidates formally declare their intention to run."
        },
        {
          title: "Registration",
          shortDesc: "Voters sign up",
          icon: "UserPlus",
          content: "Citizens must verify their eligibility and register to vote before a specified deadline. This ensures they are assigned to the correct polling location based on their address."
        },
        {
          title: "Campaigning",
          shortDesc: "Candidates debate",
          icon: "Mic",
          content: "Candidates present their platforms to the public. This period involves speeches, debates, advertisements, town halls, and rallies to persuade voters."
        },
        {
          title: "Voting Day",
          shortDesc: "Ballots are cast",
          icon: "Vote",
          content: "The designated day(s) when citizens go to polling stations to cast their ballots. In many places, early voting and mail-in voting happen before this final day."
        },
        {
          title: "Vote Counting",
          shortDesc: "Tallying results",
          icon: "Calculator",
          content: "After polls close, election officials securely gather and count all valid ballots. This process is closely monitored by representatives from different parties to ensure fairness."
        },
        {
          title: "Declaration",
          shortDesc: "Winners announced",
          icon: "Award",
          content: "Once counting is complete and verified, the official results are certified and the winners are declared, completing the election cycle."
        }
      ]
    },
    scenarios: {
      id: "scenarios",
      title: "Scenario Simulator",
      description: "Experience what happens in specific election situations.",
      icon: "HelpCircle",
      type: "scenarios",
      quizId: "scenarios",
      cases: [
        {
          id: "no_vote",
          question: "What happens if I don't vote?",
          icon: "AlertTriangle",
          steps: [
            { title: "The Election Continues", content: "The election happens without your input. The total number of voters is slightly smaller." },
            { title: "Others Decide", content: "Because you didn't cast a ballot, the people who did vote have a proportionally larger say in the outcome." },
            { title: "Leaders Are Chosen", content: "Candidates are elected based only on the votes cast. They will now make decisions on laws, taxes, and services." },
            { title: "The Impact", content: "You must live with the rules and leaders chosen by others, without having had a voice in the selection process." }
          ]
        },
        {
          id: "tie",
          question: "What if a candidate gets equal votes?",
          icon: "Scale",
          steps: [
            { title: "A Tie is Declared", content: "After all ballots (including mail-in and provisional) are counted and recounted, the candidates have the exact same number of votes." },
            { title: "Checking the Law", content: "Election officials check the specific local or state laws, as tie-breaking rules vary by jurisdiction." },
            { title: "Runoff or Random Chance", content: "In some places, a new 'runoff' election is scheduled between the two tied candidates. In others, the tie is broken by a game of chance, like drawing straws or flipping a coin!" },
            { title: "Resolution", content: "The winner of the runoff or the random draw is officially declared the winner." }
          ]
        },
        {
          id: "counting",
          question: "How exactly are votes counted?",
          icon: "Calculator",
          steps: [
            { title: "Polls Close", content: "Once the official voting time ends, the doors are locked. Anyone already in line is usually allowed to vote." },
            { title: "Securing Ballots", content: "Paper ballots are sealed in tamper-evident boxes. Electronic voting machines are locked down to prevent new entries." },
            { title: "Tallying", content: "Ballots are transported to a central counting facility. Paper ballots are fed into optical scanners. Bipartisan teams monitor the process." },
            { title: "Verification", content: "Mail-in ballots are verified by checking signatures against voter records before their inner envelope is opened and counted." }
          ]
        }
      ]
    }
  },
  quizzes: {
    basics: [
      {
        question: "What is the primary purpose of an election in a democracy?",
        options: ["To raise taxes", "To choose individuals for public office", "To enforce laws", "To build infrastructure"],
        correctAnswer: 1,
        explanation: "Elections are the formal decision-making process where citizens choose their leaders to hold public office."
      },
      {
        question: "True or False: Elections only happen at the national level (e.g., for President).",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False. Elections happen at local, state, and national levels."
      },
      {
        question: "Why do local elections matter?",
        options: ["They decide national defense policy", "They control the national budget", "They manage local budgets and community rules like schools and sanitation", "They don't matter much"],
        correctAnswer: 2,
        explanation: "Local elections directly affect your daily life through schools, police, and sanitation management."
      }
    ],
    voting: [
      {
        question: "What is the very first step you must take before you can vote?",
        options: ["Watch a debate", "Register to vote", "Go to a polling place", "Donate to a campaign"],
        correctAnswer: 1,
        explanation: "You must register to vote first to prove your eligibility and get assigned to the correct district."
      },
      {
        question: "Why do we have voter registration?",
        options: ["To prevent voter fraud and ensure each eligible citizen votes only once", "To charge a voting fee", "To collect email addresses", "To assign political parties"],
        correctAnswer: 0,
        explanation: "Voter registration is a security measure to prevent fraud and maintain accurate voter rolls."
      },
      {
        question: "True or False: Once you vote by mail, the ballot is immediately thrown away.",
        options: ["True", "False"],
        correctAnswer: 1,
        explanation: "False! Ballots are securely collected, often trackable online, and carefully counted by officials."
      }
    ],
    timeline: [
      {
        question: "Which stage comes first in an election cycle?",
        options: ["Campaigning", "Voting Day", "Announcement & Declaration", "Vote Counting"],
        correctAnswer: 2,
        explanation: "The cycle officially begins when the election is announced and candidates declare their intent to run."
      },
      {
        question: "During which period do candidates hold rallies, debate, and run advertisements?",
        options: ["Registration", "Campaigning", "Vote Counting", "Declaration"],
        correctAnswer: 1,
        explanation: "This happens during the Campaigning stage, where candidates try to persuade voters."
      },
      {
        question: "Who monitors the vote counting process?",
        options: ["Only the winning candidate", "No one, it is done in secret", "Representatives from different parties and bipartisan workers", "The police"],
        correctAnswer: 2,
        explanation: "To ensure fairness, vote counting is closely monitored by representatives from multiple parties."
      }
    ],
    scenarios: [
      {
        question: "If you choose not to vote, what happens?",
        options: ["The election is canceled", "You get fined", "Others decide who will represent you", "The government shuts down"],
        correctAnswer: 2,
        explanation: "The election continues, and the people who did vote have a larger say in deciding the winner."
      },
      {
        question: "What might happen if two candidates tie?",
        options: ["They share the job", "A runoff election is held or a random draw occurs", "The election is canceled forever", "The youngest candidate wins"],
        correctAnswer: 1,
        explanation: "Depending on local laws, ties are usually broken by a runoff election or a game of chance (like flipping a coin)."
      },
      {
        question: "What happens if you are in line to vote when the polls officially close?",
        options: ["You are told to go home", "Your vote won't count", "You are usually allowed to stay in line and vote", "You have to mail your vote instead"],
        correctAnswer: 2,
        explanation: "In most jurisdictions, anyone already in line when polls close is allowed to cast their ballot."
      }
    ]
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
