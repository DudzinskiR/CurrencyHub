import React from 'react';
import { render, screen } from '@testing-library/react';

test('placeholder', () => {
  render(<div>a</div>);
  const element = screen.getByText(/a/i);
  expect(element).toBeInTheDocument();
});
