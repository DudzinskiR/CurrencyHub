import { act, render, screen, waitFor } from '@testing-library/react';
import CurrencyAnalysis from "../compoment/CurrencyAnalysis";
import apiService from '../../../../services/ApiService';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

jest.mock('../../../../services/ApiService', () => ({
  currencyAnalysis: jest.fn(() => Promise.resolve([])),
}));

describe('Currency Analysis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with correct text', async () => {
    render(<CurrencyAnalysis />);
    const title = await screen.findByText('Analiza waluty')
    expect(title).toBeInTheDocument();
  });

  it('should call fetchData on render', async () => {
    const spy = jest.spyOn(apiService, 'currencyAnalysis');
    render(<CurrencyAnalysis />);
    const title = await screen.findByText('Analiza waluty')
    expect(spy).toHaveBeenCalled();
  });

  it('should hide load information on successful API call', async () => {
    render(<CurrencyAnalysis />);
    await waitFor(() => {
      expect(screen.queryByText('Ładowanie')).toBeNull();
    })
  })
})