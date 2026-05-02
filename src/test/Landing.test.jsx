import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Landing from '../components/Landing';

describe('Landing', () => {
  it('renders the landing content', () => {
    render(<Landing onStart={() => {}} />);

    expect(screen.getByRole('heading', { name: /civicguide ai/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start learning/i })).toBeInTheDocument();
  });

  it('calls onStart when the button is clicked', () => {
    const onStart = vi.fn();
    render(<Landing onStart={onStart} />);

    fireEvent.click(screen.getByRole('button', { name: /start learning/i }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
