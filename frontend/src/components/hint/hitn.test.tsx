import React from 'react';
import { render, screen } from '@testing-library/react';
import Hint from './hint';

describe('Hint', () => {
  it('should renders children correctly', () => {
    render(<Hint>Sample Hint Content</Hint>);
    const hintContent = screen.getByText('Sample Hint Content');
    expect(hintContent).toBeInTheDocument();
  });

  it('should renders hint icon', () => {
    render(<Hint />);
    const hintIcon = screen.getByText('hint-icon.svg');
    expect(hintIcon).toBeInTheDocument();
  });
});