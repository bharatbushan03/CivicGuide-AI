import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProfile } from '../hooks/useProfile';

describe('useProfile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default profile when storage is empty', () => {
    const { result } = renderHook(() => useProfile());
    const [profile] = result.current;

    expect(profile.hasStarted).toBe(false);
    expect(profile.knowledgeLevel).toBe('normal');
    expect(profile.language).toBe('en');
  });

  it('loads a saved profile from storage', () => {
    const saved = {
      hasStarted: true,
      knowledgeLevel: 'expanded',
      exploredTopics: ['basics'],
      lastPosition: { flowId: 'basics', step: 1, scenarioId: null },
      badges: ['civic_scholar'],
      quizScores: { basics: 3 },
      language: 'hi'
    };
    localStorage.setItem('civicGuideProfile', JSON.stringify(saved));

    const { result } = renderHook(() => useProfile());
    const [profile] = result.current;

    expect(profile.hasStarted).toBe(true);
    expect(profile.knowledgeLevel).toBe('expanded');
    expect(profile.language).toBe('hi');
  });

  it('falls back to defaults when storage is corrupted', () => {
    localStorage.setItem('civicGuideProfile', '{not-valid-json');

    const { result } = renderHook(() => useProfile());
    const [profile] = result.current;

    expect(profile.hasStarted).toBe(false);
    const saved = JSON.parse(localStorage.getItem('civicGuideProfile'));
    expect(saved.language).toBe('en');
    expect(saved.knowledgeLevel).toBe('normal');
  });
});
