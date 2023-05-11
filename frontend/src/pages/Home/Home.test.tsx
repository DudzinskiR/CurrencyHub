import { render, screen } from "@testing-library/react"
import Home from "./Home"

jest.mock('../../components/modules/change-distribution/change-distribution', () => () => {
  return <div>ChangeDistribution</div>
})

jest.mock('../../components/modules/session-analysis/session-analysis', () => () => {
  return <div>SessionAnalysis</div>
})

describe('Home', () => {
  it('should renders ChangeDistribution header with correct text', () => {
    render(<Home />)
    expect(screen.getByText('ChangeDistribution')).toBeInTheDocument();
  });

  it('should renders CurrencyAnalysis header with correct text', () => {
    render(<Home />)
    expect(screen.getByText('SessionAnalysis')).toBeInTheDocument();
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