import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderLine from './header-line'

test('render header with text', () => {
  render(<HeaderLine text='test' />);
  const lineElement = screen.getByText(/test/i);
  expect(lineElement).toBeInTheDocument();
});

test('render header without text', () => {
  const { container } = render(<HeaderLine />);
  expect(container.childNodes[0].childNodes[0]).toHaveClass('single-line')
});
