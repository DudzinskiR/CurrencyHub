import React from 'react';
import { render, screen } from '@testing-library/react';
import Header  from './Header'

test('render header with text', () => {
  render(<Header text='test'/>);
  const lineElement = screen.getByText(/test/i);
  expect(lineElement).toBeInTheDocument();
});

test('render header without text', () => {
  const { container } = render(<Header/>);
  expect(container.childNodes[0].childNodes[0]).toHaveClass('single-line')
});
