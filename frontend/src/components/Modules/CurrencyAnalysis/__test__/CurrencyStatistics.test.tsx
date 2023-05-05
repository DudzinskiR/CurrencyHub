import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CurrencyStatistics from '../compoment/CurrencyStatistics';
import apiService from '../../../../services/ApiService';

jest.mock('../../../../services/ApiService', () => ({
  currencyStatistics: jest.fn(),
}));

describe('CurrencyStatistics', () => {

  const mockCurrencyCode = 'USD';
  const mockSelectedTime = 0;
  const mockCurrencyStatistics = [
    {
      median: 10.5,
      dominant: [10, 11, 12],
      standardDeviation: 2.5,
      coefficientOfVariantion: 0.24,
    },
    {
      median: 9.8,
      dominant: [9, 10, 11],
      standardDeviation: 1.2,
      coefficientOfVariantion: 0.12,
    },
  ];

  it('should renders loading state', async () => {
    render(<CurrencyStatistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);
    await waitFor(() => {
      expect(screen.getByText('Ładowanie')).toBeInTheDocument();
    })
  });

  it('should renders error state if API call fails', async () => {
    apiService.currencyStatistics = jest.fn(() => Promise.reject());
    render(<CurrencyStatistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);
    await waitFor(() => {
      expect(screen.getByText('Błąd')).toBeInTheDocument();
    });
  });

  it('should redners currency statistics when API call is successful', async () => {
    apiService.currencyStatistics = jest.fn(() => Promise.resolve(mockCurrencyStatistics));
    render(<CurrencyStatistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);

    await waitFor(() => {
      expect(screen.getByText('Mediana')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('10.50')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Dominanta')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('10.00 11.00 12.00')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Odchylenie standardowe')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('2.50')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Współczynnik zmienności')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('0.24')).toBeInTheDocument();
    })
  });
})
