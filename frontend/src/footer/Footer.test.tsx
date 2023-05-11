import { render, screen } from "@testing-library/react"
import Footer from "./footer"

describe('Footer', () => {
  it('should renders GitHub link with correct URL', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: 'github icon' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/DudzinskiR/finance');
  });

  it('should renders contact information correctly', () => {
    render(<Footer />);

    expect(screen.getByText('Dane kontaktowe')).toBeInTheDocument();
    expect(screen.getByText('Robert Dudziński')).toBeInTheDocument();
    expect(screen.getByText('dudzinski.robert97@gmail.com')).toBeInTheDocument();
  });

  it('should renders technology stack logos correctly', () => {
    render(<Footer />);
    expect(screen.getByAltText('typescript icon')).toBeInTheDocument();
    expect(screen.getByAltText('react icon')).toBeInTheDocument();
    expect(screen.getByAltText('node.js icon')).toBeInTheDocument();
    expect(screen.getByAltText('postgreSQL icon')).toBeInTheDocument();
  });

  it('should renders copyright text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/© Copyright/)).toBeInTheDocument();
  })
})