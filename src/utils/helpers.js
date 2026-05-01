export const checkAndAwardBadges = (scores, explored, currentBadges = []) => {
  const newBadges = [...currentBadges];
  
  if (!newBadges.includes('civic_scholar') && scores['basics'] === 3 && explored.includes('basics')) {
    newBadges.push('civic_scholar');
  }
  if (!newBadges.includes('voting_expert') && scores['voting'] === 3 && explored.includes('voting')) {
    newBadges.push('voting_expert');
  }
  if (!newBadges.includes('timeline_master') && scores['timeline'] === 3 && explored.includes('timeline')) {
    newBadges.push('timeline_master');
  }
  if (!newBadges.includes('scenario_solver') && scores['scenarios'] === 3) {
    newBadges.push('scenario_solver');
  }

  return newBadges;
};

export const getRecommendedFlow = (exploredTopics) => {
  if (exploredTopics.includes('basics') && !exploredTopics.includes('voting')) return 'voting';
  if (exploredTopics.includes('voting') && !exploredTopics.includes('timeline')) return 'timeline';
  if (exploredTopics.includes('timeline') && !exploredTopics.includes('scenarios')) return 'scenarios';
  if (exploredTopics.length === 0) return 'basics';
  return null;
};
