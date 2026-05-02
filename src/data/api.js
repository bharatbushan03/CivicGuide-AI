const FALLBACK_DATA = {
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

const mapGoogleElection = (election, idx, language) => {
  const typeLabel = language === 'hi' ? 'चुनाव' : 'Election';
  const statusLabel = language === 'hi' ? 'निर्धारित' : 'Scheduled';

  return {
    id: election.id ?? idx + 1,
    title: election.name || (language === 'hi' ? 'चुनाव' : 'Election'),
    date: election.electionDay,
    type: typeLabel,
    status: statusLabel
  };
};

export const fetchUpcomingElections = async (language = 'en') => {
  const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

  // Simulate a short delay so the loading state is visible.
  await new Promise(resolve => setTimeout(resolve, 500));

  if (apiKey) {
    try {
      const response = await fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}`);
      if (!response.ok) throw new Error('Google Civic API error');

      const data = await response.json();
      if (Array.isArray(data?.elections) && data.elections.length > 0) {
        return data.elections.map((election, idx) => mapGoogleElection(election, idx, language));
      }
    } catch (err) {
      console.warn('Falling back to local election data:', err);
    }
  }

  return FALLBACK_DATA[language] || FALLBACK_DATA.en;
};
