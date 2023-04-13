import React from 'react';
import { render, screen } from '@testing-library/react';
import Header  from './Header'

test('render header with text', () => {
  render(<Header text='test'/>);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
