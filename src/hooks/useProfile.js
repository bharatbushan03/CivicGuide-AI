import { useState, useEffect } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('civicGuideProfile');
    if (saved) return JSON.parse(saved);
    return {
      hasStarted: false,
      knowledgeLevel: 'normal',
      exploredTopics: [],
      lastPosition: null,
      badges: [],
      quizScores: {},
      language: 'en'
    };
  });

  useEffect(() => {
    localStorage.setItem('civicGuideProfile', JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
};
