import { render, screen } from "@testing-library/react"
import Home from "./Home"

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

describe('Home', () => {
  it('should renders CurrencyPair header with correct text', () => {
    render(<Home />)
    expect(screen.getByText('Analiza par walut')).toBeInTheDocument();
  });

  it('should renders CurrencyAnalysis header with correct text', () => {
    render(<Home />)
    expect(screen.getByText('Analiza waluty')).toBeInTheDocument();
  });

  it('should renders HeaderBar with correct text', () => {
    render(<Home />)
    expect(screen.getByText('Walutownik')).toBeInTheDocument();
  });

  it('should renders Footer with correct text', () => {
    render(<Home />)
    expect(screen.getByText('Robert Dudziński')).toBeInTheDocument();
  });
})