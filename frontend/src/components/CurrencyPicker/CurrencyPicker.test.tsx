import React from 'react';
import { render, screen } from '@testing-library/react';

test('placeholder', () => {
  render(<div>e</div>);
  const element = screen.getByText(/e/i);
  expect(element).toBeInTheDocument();
});