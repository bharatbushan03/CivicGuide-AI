const en = {
  ui: {
    welcomeTitle: "Welcome to CivicGuide",
    welcomeDesc: "Select a topic below to begin your guided learning journey.",
    home: "Home",
    askAI: "Ask AI",
    resumeBannerTitle: "Pick up where you left off",
    resumeBannerDesc: "Continue your journey in",
    resumeBtn: "Resume",
    achievements: "Your Achievements",
    recommended: "Recommended for You",
    askQuestionTitle: "Ask a Question",
    askQuestionDesc: "Chat directly with CivicGuide AI for specific queries.",
    completed: "Completed",
    previousStage: "Previous Stage",
    nextStage: "Next Stage",
    finishTimeline: "Finish Timeline",
    tryScenario: "Try Scenario",
    takeQuiz: "Take Quiz",
    finish: "Finish",
    previous: "Previous",
    nextStep: "Next Step",
    finishScenario: "Finish Scenario",
    whatHappensNext: "What Happens Next?",
    skipToNext: "Skip to Next Topic",
    testScenarioKnowledge: "Test Your Scenario Knowledge",
    quizResults: "Quiz Results",
    assessmentComplete: "Assessment Complete!",
    accuracy: "Accuracy",
    retryQuiz: "Retry Quiz",
    returnHome: "Return Home",
    seeResults: "See Results",
    nextQuestion: "Next Question",
    correct: "Correct!",
    incorrect: "Incorrect",
    outOf: "out of",
    simplify: "Simplify",
    normal: "Normal",
    tellMeMore: "Tell Me More",
    upcomingElections: "Upcoming Elections",
    loading: "Loading...",
    errorLoading: "Failed to load data. Please try again.",
    retry: "Retry"
  },
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
    welcome: "Hello! I am your CivicGuide AI. You can ask me questions about elections.",
    fallback: "I'm designed to focus specifically on educational information about the election process. I remain completely neutral.",
    scenarios: {
      "tie": "Rules for tied elections vary. Sometimes a run-off election is held. In other places, ties might be broken by drawing lots.",
      "novote": "If you don't vote, you let others decide who will represent you. Voting is the primary way citizens hold leaders accountable.",
      "count": "Votes are counted using optical scanners or electronic machines, monitored by bipartisan workers.",
      "fraud": "Election systems have multiple layers of security, including paper trails, signature verification, and post-election audits."
    }
  }
};

const hi = {
  ui: {
    welcomeTitle: "CivicGuide में आपका स्वागत है",
    welcomeDesc: "अपनी निर्देशित सीखने की यात्रा शुरू करने के लिए नीचे एक विषय चुनें।",
    home: "मुख्य पृष्ठ",
    askAI: "AI से पूछें",
    resumeBannerTitle: "जहाँ से छोड़ा था वहीं से शुरू करें",
    resumeBannerDesc: "अपनी यात्रा जारी रखें",
    resumeBtn: "जारी रखें",
    achievements: "आपकी उपलब्धियां",
    recommended: "आपके लिए अनुशंसित",
    askQuestionTitle: "एक प्रश्न पूछें",
    askQuestionDesc: "विशिष्ट प्रश्नों के लिए सीधे CivicGuide AI से चैट करें।",
    completed: "पूरा हुआ",
    previousStage: "पिछला चरण",
    nextStage: "अगला चरण",
    finishTimeline: "समयरेखा समाप्त करें",
    tryScenario: "परिदृश्य आज़माएं",
    takeQuiz: "प्रश्नोत्तरी लें",
    finish: "समाप्त",
    previous: "पिछला",
    nextStep: "अगला कदम",
    finishScenario: "परिदृश्य समाप्त करें",
    whatHappensNext: "आगे क्या होता है?",
    skipToNext: "अगले विषय पर जाएं",
    testScenarioKnowledge: "अपने ज्ञान का परीक्षण करें",
    quizResults: "प्रश्नोत्तरी परिणाम",
    assessmentComplete: "मूल्यांकन पूर्ण!",
    accuracy: "सटीकता",
    retryQuiz: "पुनः प्रयास करें",
    returnHome: "मुख्य पृष्ठ पर लौटें",
    seeResults: "परिणाम देखें",
    nextQuestion: "अगला प्रश्न",
    correct: "सही!",
    incorrect: "गलत",
    outOf: "में से",
    simplify: "सरल करें",
    normal: "सामान्य",
    tellMeMore: "अधिक बताएं",
    upcomingElections: "आगामी चुनाव",
    loading: "लोड हो रहा है...",
    errorLoading: "डेटा लोड करने में विफल। कृपया पुनः प्रयास करें।",
    retry: "पुनः प्रयास करें"
  },
  flows: {
    basics: {
      id: "basics",
      title: "मूल बातें सीखें",
      description: "समझें कि चुनाव क्या हैं और वे क्यों महत्वपूर्ण हैं।",
      icon: "BookOpen",
      type: "flow",
      suggestedNext: "voting",
      quizId: "basics",
      steps: [
        {
          title: "चुनाव क्या है?",
          content: "चुनाव एक औपचारिक निर्णय लेने की प्रक्रिया है जहां नागरिक सार्वजनिक कार्यालय रखने के लिए व्यक्तियों को चुनते हैं। यह लोकतंत्र का मुख्य तंत्र है।",
          simplified: "चुनाव वह तरीका है जिससे लोग मतदान करके अपने नेताओं को चुनते हैं।",
          expanded: "चुनाव प्रतिनिधि लोकतंत्र की नींव हैं। वे सत्ता हस्तांतरित करने का एक शांतिपूर्ण तरीका प्रदान करते हैं और नागरिकों को नेताओं को जवाबदेह ठहराने की अनुमति देते हैं।"
        },
        {
          title: "यह क्यों मायने रखता है",
          content: "मतदान आपको इस बात में अपनी आवाज देता है कि आपके समुदाय, राज्य और देश पर कैसे शासन किया जाता है।",
          simplified: "मतदान आपको यह तय करने देता है कि आप अपने शहर या देश में क्या नियम और नेता चाहते हैं।",
          expanded: "चुनाव शिक्षा, स्वास्थ्य सेवा, बुनियादी ढांचे और अर्थव्यवस्था पर नीतियों को निर्धारित करते हैं। यहां तक कि स्थानीय चुनावों का आपके दैनिक जीवन पर व्यापक प्रभाव पड़ता है।"
        },
        {
          title: "सरकार के स्तर",
          content: "चुनाव कई स्तरों पर होते हैं: स्थानीय (महापौर, नगर परिषद), राज्य (राज्यपाल, राज्य विधायिका), और राष्ट्रीय (राष्ट्रपति, संसद)।",
          simplified: "आप स्थानीय नेताओं (जैसे मेयर), राज्य के नेताओं और देश के नेताओं (जैसे राष्ट्रपति) के लिए वोट करते हैं।",
          expanded: "सरकार के विभिन्न स्तर अलग-अलग जिम्मेदारियां संभालते हैं। स्थानीय सरकारें पुलिस और स्वच्छता का प्रबंधन करती हैं। राष्ट्रीय सरकार रक्षा और विदेशी नीति को संभालती है।"
        }
      ]
    },
    voting: {
      id: "voting",
      title: "मतदान प्रक्रिया",
      description: "पंजीकरण और मतदान करने का चरण-दर-चरण मार्गदर्शिका।",
      icon: "CheckSquare",
      type: "flow",
      suggestedNext: "timeline",
      suggestedScenario: "no_vote",
      quizId: "voting",
      steps: [
        {
          title: "1. पंजीकरण",
          content: "मतदान करने से पहले, आपको पंजीकरण करना होगा। यह आपकी पात्रता साबित करता है।",
          simplified: "वोट देने से पहले आपको साइन अप करना होगा ताकि सरकार को पता चले कि आप योग्य हैं।",
          expanded: "मतदाता पंजीकरण यह सुनिश्चित करके मतदाता धोखाधड़ी को रोकता है कि प्रत्येक पात्र नागरिक केवल एक बार वोट करे।"
        },
        {
          title: "2. तैयारी",
          content: "चुनाव के दिन से पहले अपने मतपत्र पर उम्मीदवारों और मुद्दों पर शोध करें।",
          simplified: "वास्तव में वोट देने से पहले जिन लोगों और नियमों के लिए आप वोट कर रहे हैं, उनके बारे में जानें।",
          expanded: "आप चुनाव से पहले आमतौर पर ऑनलाइन एक 'नमूना मतपत्र' देख सकते हैं। यह दर्शाता है कि आपका मतपत्र कैसा दिखेगा।"
        },
        {
          title: "3. अपना वोट डालना",
          content: "व्यक्तिगत रूप से वोट करने के लिए अपने निर्धारित मतदान केंद्र पर जाएं, या मेल-इन मतपत्र भरें।",
          simplified: "मशीन या कागज पर वोट करने के लिए मतदान केंद्र पर जाएं, या यदि आप कर सकते हैं तो अपना वोट मेल करें।",
          expanded: "यदि व्यक्तिगत रूप से वोट कर रहे हैं, तो आपको आईडी दिखानी होगी। यदि मेल द्वारा वोट कर रहे हैं, तो आपको निर्देशों का सावधानीपूर्वक पालन करना चाहिए।"
        },
        {
          title: "4. पुष्टि",
          content: "मतदान के बाद, आपका मतपत्र सुरक्षित रूप से एकत्र किया जाता है।",
          simplified: "एक बार जब आप वोट देते हैं, तो आपका मतपत्र तब तक सुरक्षित रखा जाता है जब तक कि गिनती का समय न हो।",
          expanded: "चुनाव सुरक्षा सख्त है। मतपत्रों को बंद, सीलबंद कंटेनरों में रखा जाता है।"
        }
      ]
    },
    timeline: {
      id: "timeline",
      title: "संवादात्मक समयरेखा",
      description: "शुरू से अंत तक चुनाव के चरणों का अन्वेषण करें।",
      icon: "Clock",
      type: "timeline",
      suggestedScenario: "counting",
      quizId: "timeline",
      stages: [
        {
          title: "घोषणा",
          shortDesc: "चुनाव की घोषणा",
          icon: "Megaphone",
          content: "चुनाव चक्र आधिकारिक तौर पर तब शुरू होता है जब शासी निकाय तारीखों की घोषणा करता है।"
        },
        {
          title: "पंजीकरण",
          shortDesc: "मतदाता साइन अप",
          icon: "UserPlus",
          content: "नागरिकों को अपनी पात्रता सत्यापित करनी होगी और निर्दिष्ट समय सीमा से पहले पंजीकरण करना होगा।"
        },
        {
          title: "प्रचार",
          shortDesc: "उम्मीदवारों की बहस",
          icon: "Mic",
          content: "उम्मीदवार जनता के सामने अपने मंच प्रस्तुत करते हैं। इसमें भाषण, बहस और रैलियां शामिल हैं।"
        },
        {
          title: "मतदान का दिन",
          shortDesc: "मतदान होता है",
          icon: "Vote",
          content: "निर्धारित दिन जब नागरिक अपना वोट डालने के लिए मतदान केंद्रों पर जाते हैं।"
        },
        {
          title: "मतगणना",
          shortDesc: "परिणामों की गिनती",
          icon: "Calculator",
          content: "मतदान समाप्त होने के बाद, चुनाव अधिकारी सुरक्षित रूप से सभी वैध मतपत्रों को इकट्ठा करते हैं और गिनते हैं।"
        },
        {
          title: "घोषणा",
          shortDesc: "विजेताओं की घोषणा",
          icon: "Award",
          content: "एक बार गिनती पूरी हो जाने पर, आधिकारिक परिणाम प्रमाणित होते हैं और विजेताओं की घोषणा की जाती है।"
        }
      ]
    },
    scenarios: {
      id: "scenarios",
      title: "परिदृश्य सिम्युलेटर",
      description: "अनुभव करें कि विशिष्ट चुनाव स्थितियों में क्या होता है।",
      icon: "HelpCircle",
      type: "scenarios",
      quizId: "scenarios",
      cases: [
        {
          id: "no_vote",
          question: "अगर मैं वोट नहीं दूं तो क्या होगा?",
          icon: "AlertTriangle",
          steps: [
            { title: "चुनाव जारी रहता है", content: "चुनाव आपके इनपुट के बिना होता है। मतदाताओं की कुल संख्या थोड़ी कम हो जाती है।" },
            { title: "अन्य लोग तय करते हैं", content: "चूंकि आपने मतपत्र नहीं डाला, इसलिए जिन लोगों ने मतदान किया, उनका परिणाम में आनुपातिक रूप से बड़ा हिस्सा है।" },
            { title: "नेता चुने जाते हैं", content: "उम्मीदवारों को केवल डाले गए वोटों के आधार पर चुना जाता है।" },
            { title: "प्रभाव", content: "आपको दूसरों द्वारा चुने गए नियमों और नेताओं के साथ रहना होगा।" }
          ]
        },
        {
          id: "tie",
          question: "यदि किसी उम्मीदवार को समान वोट मिलते हैं तो क्या होगा?",
          icon: "Scale",
          steps: [
            { title: "टाई घोषित", content: "सभी मतपत्रों की गिनती के बाद, उम्मीदवारों के पास बिल्कुल समान संख्या में वोट हैं।" },
            { title: "कानून की जांच", content: "चुनाव अधिकारी विशिष्ट स्थानीय या राज्य कानूनों की जांच करते हैं।" },
            { title: "रनऑफ़ या यादृच्छिक मौका", content: "कुछ स्थानों पर, एक नया 'रनऑफ़' चुनाव निर्धारित है। दूसरों में, टाई को लॉटरी द्वारा तोड़ा जाता है!" },
            { title: "संकल्प", content: "रनऑफ़ या यादृच्छिक ड्रा के विजेता को आधिकारिक तौर पर विजेता घोषित किया जाता है।" }
          ]
        },
        {
          id: "counting",
          question: "वोट कैसे गिने जाते हैं?",
          icon: "Calculator",
          steps: [
            { title: "मतदान बंद", content: "एक बार आधिकारिक मतदान का समय समाप्त होने के बाद, दरवाजे बंद कर दिए जाते हैं।" },
            { title: "मतपत्रों को सुरक्षित करना", content: "पेपर बैलेट को छेड़छाड़-स्पष्ट बक्से में सील कर दिया जाता है।" },
            { title: "गिनती", content: "मतपत्रों को एक केंद्रीय मतगणना सुविधा में ले जाया जाता है। द्विदलीय टीमें प्रक्रिया की निगरानी करती हैं।" },
            { title: "सत्यापन", content: "मेल-इन मतपत्रों को उनके आंतरिक लिफाफे को खोलने और गिनने से पहले मतदाता रिकॉर्ड के खिलाफ हस्ताक्षरों की जांच करके सत्यापित किया जाता है।" }
          ]
        }
      ]
    }
  },
  quizzes: {
    basics: [
      {
        question: "लोकतंत्र में चुनाव का प्राथमिक उद्देश्य क्या है?",
        options: ["कर बढ़ाने के लिए", "सार्वजनिक पद के लिए व्यक्तियों को चुनने के लिए", "कानूनों को लागू करने के लिए", "बुनियादी ढांचे का निर्माण करने के लिए"],
        correctAnswer: 1,
        explanation: "चुनाव वह औपचारिक निर्णय लेने की प्रक्रिया है जहां नागरिक सार्वजनिक पद धारण करने के लिए अपने नेताओं को चुनते हैं।"
      },
      {
        question: "सही या गलत: चुनाव केवल राष्ट्रीय स्तर पर होते हैं।",
        options: ["सही", "गलत"],
        correctAnswer: 1,
        explanation: "गलत। चुनाव स्थानीय, राज्य और राष्ट्रीय स्तर पर होते हैं।"
      },
      {
        question: "स्थानीय चुनाव क्यों मायने रखते हैं?",
        options: ["वे राष्ट्रीय रक्षा नीति तय करते हैं", "वे राष्ट्रीय बजट को नियंत्रित करते हैं", "वे स्थानीय बजट और स्कूलों जैसे सामुदायिक नियमों का प्रबंधन करते हैं", "वे ज्यादा मायने नहीं रखते"],
        correctAnswer: 2,
        explanation: "स्थानीय चुनाव सीधे स्कूलों, पुलिस और स्वच्छता प्रबंधन के माध्यम से आपके दैनिक जीवन को प्रभावित करते हैं।"
      }
    ],
    voting: [
      {
        question: "वोट देने से पहले आपको सबसे पहला कदम क्या उठाना चाहिए?",
        options: ["एक बहस देखें", "वोट देने के लिए पंजीकरण करें", "मतदान केंद्र पर जाएं", "किसी अभियान में दान करें"],
        correctAnswer: 1,
        explanation: "अपनी पात्रता साबित करने के लिए आपको पहले वोट देने के लिए पंजीकरण करना होगा।"
      },
      {
        question: "हमारे पास मतदाता पंजीकरण क्यों है?",
        options: ["मतदाता धोखाधड़ी को रोकने के लिए", "मतदान शुल्क लेने के लिए", "ईमेल पते एकत्र करने के लिए", "राजनीतिक दलों को असाइन करने के लिए"],
        correctAnswer: 0,
        explanation: "मतदाता पंजीकरण धोखाधड़ी को रोकने के लिए एक सुरक्षा उपाय है।"
      },
      {
        question: "सही या गलत: एक बार जब आप मेल द्वारा वोट करते हैं, तो मतपत्र तुरंत फेंक दिया जाता है।",
        options: ["सही", "गलत"],
        correctAnswer: 1,
        explanation: "गलत! मतपत्र सुरक्षित रूप से एकत्र किए जाते हैं और अधिकारियों द्वारा सावधानीपूर्वक गिने जाते हैं।"
      }
    ],
    timeline: [
      {
        question: "चुनाव चक्र में कौन सा चरण पहले आता है?",
        options: ["प्रचार", "मतदान का दिन", "घोषणा", "मतगणना"],
        correctAnswer: 2,
        explanation: "चक्र आधिकारिक तौर पर तब शुरू होता है जब चुनाव की घोषणा की जाती है।"
      },
      {
        question: "उम्मीदवार किस अवधि के दौरान रैलियां और बहस करते हैं?",
        options: ["पंजीकरण", "प्रचार", "मतगणना", "घोषणा"],
        correctAnswer: 1,
        explanation: "यह प्रचार चरण के दौरान होता है, जहां उम्मीदवार मतदाताओं को मनाने की कोशिश करते हैं।"
      },
      {
        question: "मतगणना प्रक्रिया की निगरानी कौन करता है?",
        options: ["केवल जीतने वाला उम्मीदवार", "कोई नहीं", "विभिन्न दलों के प्रतिनिधि", "पुलिस"],
        correctAnswer: 2,
        explanation: "निष्पक्षता सुनिश्चित करने के लिए, विभिन्न दलों के प्रतिनिधियों द्वारा मतगणना की बारीकी से निगरानी की जाती है।"
      }
    ],
    scenarios: [
      {
        question: "यदि आप वोट नहीं देना चुनते हैं, तो क्या होता है?",
        options: ["चुनाव रद्द कर दिया गया है", "आप पर जुर्माना लगाया गया है", "अन्य लोग तय करते हैं कि आपका प्रतिनिधित्व कौन करेगा", "सरकार बंद हो जाती है"],
        correctAnswer: 2,
        explanation: "चुनाव जारी रहता है, और जिन लोगों ने मतदान किया है वे तय करते हैं।"
      },
      {
        question: "क्या हो सकता है यदि दो उम्मीदवार समान वोट प्राप्त करते हैं?",
        options: ["वे नौकरी साझा करते हैं", "एक रनऑफ़ चुनाव या यादृच्छिक ड्रा होता है", "चुनाव हमेशा के लिए रद्द कर दिया जाता है", "सबसे कम उम्र का उम्मीदवार जीतता है"],
        correctAnswer: 1,
        explanation: "स्थानीय कानूनों के आधार पर, संबंधों को आमतौर पर रनऑफ़ चुनाव या मौके के खेल द्वारा तोड़ा जाता है।"
      },
      {
        question: "क्या होता है यदि मतदान आधिकारिक तौर पर बंद होने पर आप वोट देने के लिए कतार में हैं?",
        options: ["आपको घर जाने के लिए कहा जाता है", "आपका वोट नहीं गिना जाएगा", "आमतौर पर आपको लाइन में रहने और वोट देने की अनुमति दी जाती है", "आपको अपना वोट मेल करना होगा"],
        correctAnswer: 2,
        explanation: "अधिकांश न्यायक्षेत्रों में, मतदान बंद होने पर कतार में खड़े किसी भी व्यक्ति को अपना मतपत्र डालने की अनुमति दी जाती है।"
      }
    ]
  },
  chat: {
    welcome: "नमस्ते! मैं आपका CivicGuide AI हूं। आप मुझसे चुनाव के बारे में प्रश्न पूछ सकते हैं।",
    fallback: "मुझे विशेष रूप से चुनाव प्रक्रिया के बारे में शैक्षिक जानकारी पर ध्यान केंद्रित करने के लिए डिज़ाइन किया गया है।",
    scenarios: {
      "tie": "बंधे चुनावों के नियम अलग-अलग होते हैं। कभी-कभी रन-ऑफ चुनाव होता है। अन्य स्थानों पर लॉटरी निकाली जाती है।",
      "novote": "यदि आप वोट नहीं देते हैं, तो आप दूसरों को यह तय करने देते हैं कि आपका प्रतिनिधित्व कौन करेगा।",
      "count": "वोटों की गिनती ऑप्टिकल स्कैनर या इलेक्ट्रॉनिक मशीनों का उपयोग करके की जाती है।",
      "fraud": "चुनाव प्रणालियों में सुरक्षा की कई परतें होती हैं, जिनमें पेपर ट्रेल और चुनाव के बाद के ऑडिट शामिल हैं।"
    }
  }
};

export const contentData = { en, hi };
