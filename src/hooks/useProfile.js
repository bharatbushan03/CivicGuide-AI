import { useState, useEffect } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('civicGuideProfile');
    const defaults = {
      hasStarted: false,
      knowledgeLevel: 'normal',
      exploredTopics: [],
      lastPosition: null,
      badges: [],
      quizScores: {},
      language: 'en'
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaults, ...parsed };
        }
      } catch (err) {
        localStorage.removeItem('civicGuideProfile');
      }
    }

    return defaults;
  });

  useEffect(() => {
    localStorage.setItem('civicGuideProfile', JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
};
