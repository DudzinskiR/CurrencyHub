import { render, screen } from '@testing-library/react';
import CountryFlag from './CountryFlag';

describe('CountryFlag', () => {
  it('should renders with default props', () => {
    render(<CountryFlag />)
    const flag = screen.getByRole('img');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveStyle('width: 40px');
    expect(flag).toHaveStyle('height: 40px');
    expect(flag).toHaveStyle('transform: scale(1.4)');

    expect(flag).toHaveAttribute('src', expect.stringMatching(/us\.svg$/i));
  });

  it('should renders with specified countryCode and size', () => {
    render(<CountryFlag countryCode='JP' size={60} />)
    const flag = screen.getByRole('img');
    expect(flag).toBeInTheDocument();
    expect(flag).toHaveStyle('width: 60px');
    expect(flag).toHaveStyle('height: 60px');
    expect(flag).toHaveStyle('transform: scale(1.4)');

    expect(flag).toHaveAttribute('src', expect.stringMatching(/jp\.svg$/i));
  });
})