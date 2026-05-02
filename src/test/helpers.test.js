import { describe, it, expect } from 'vitest';
import { checkAndAwardBadges, getRecommendedFlow } from '../utils/helpers';

describe('getRecommendedFlow', () => {
  it('recommends basics for new users', () => {
    expect(getRecommendedFlow([])).toBe('basics');
  });

  it('recommends voting after basics', () => {
    expect(getRecommendedFlow(['basics'])).toBe('voting');
  });

  it('recommends timeline after voting', () => {
    expect(getRecommendedFlow(['basics', 'voting'])).toBe('timeline');
  });

  it('recommends scenarios after timeline', () => {
    expect(getRecommendedFlow(['basics', 'voting', 'timeline'])).toBe('scenarios');
  });
});

describe('checkAndAwardBadges', () => {
  it('awards badges when criteria are met', () => {
    const scores = { basics: 3, voting: 3, timeline: 3, scenarios: 3 };
    const explored = ['basics', 'voting', 'timeline', 'scenarios'];
    const result = checkAndAwardBadges(scores, explored, []);

    expect(result).toContain('civic_scholar');
    expect(result).toContain('voting_expert');
    expect(result).toContain('timeline_master');
    expect(result).toContain('scenario_solver');
  });

  it('does not duplicate badges', () => {
    const scores = { basics: 3 };
    const explored = ['basics'];
    const result = checkAndAwardBadges(scores, explored, ['civic_scholar']);

    expect(result.filter(badge => badge === 'civic_scholar')).toHaveLength(1);
  });
});
