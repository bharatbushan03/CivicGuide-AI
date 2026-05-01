export const fetchUpcomingElections = async (language = 'en') => {
  // Simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate occasional error for error handling demonstration
      if (Math.random() < 0.1) {
        reject(new Error("Network error"));
        return;
      }

      const data = {
        en: [
          { id: 1, title: "Local City Council", date: "2026-11-03", type: "Local", status: "Upcoming" },
          { id: 2, title: "State Senate Elections", date: "2026-11-03", type: "State", status: "Upcoming" },
          { id: 3, title: "National General Election", date: "2028-11-07", type: "National", status: "Scheduled" }
        ],
        hi: [
          { id: 1, title: "स्थानीय नगर परिषद", date: "2026-11-03", type: "स्थानीय", status: "आगामी" },
          { id: 2, title: "राज्य विधानसभा चुनाव", date: "2026-11-03", type: "राज्य", status: "आगामी" },
          { id: 3, title: "राष्ट्रीय आम चुनाव", date: "2028-11-07", type: "राष्ट्रीय", status: "निर्धारित" }
        ]
      };

      resolve(data[language] || data['en']);
    }, 800);
  });
};
