import { act, render, screen } from '@testing-library/react';
import CurrencyAnalysis from "../compoment/CurrencyAnalysis";
import apiService from '../../../../services/ApiService';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

jest.mock('../../../../services/ApiService', () => ({
  currencyAnalysis: jest.fn(() => Promise.resolve([])),
}));

describe('Currency Analysis', () => {
  it('renders header with correct text', async () => {
    render(<CurrencyAnalysis />);
    const title = await screen.findByText('Analiza waluty')
    expect(title).toBeInTheDocument();
  });
})