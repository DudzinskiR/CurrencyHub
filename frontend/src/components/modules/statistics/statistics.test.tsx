import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Statistics from './statistics';
import BackendService from '../../../services/backend.service';
import { StatisticData } from '../../../models/statistics.interface';

jest.mock('../../../services/backend.service', () => ({
  getStatistics: jest.fn(),
}));

describe('Statistics', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  const mockCurrencyCode = 'USD';
  const mockSelectedTime = 0;
  const mockStatistics: StatisticData[] = [
    {
      median: 10.5,
      mode: [10, 11, 12],
      deviation: 2.5,
      variation: 0.24,
    },
    {
      median: 9.8,
      mode: [9, 10, 11],
      deviation: 1.2,
      variation: 0.12,
    },
  ];

  it('should renders loading state', async () => {
    BackendService.getStatistics = jest.fn(() => Promise.resolve(mockStatistics));
    render(<Statistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);
    await waitFor(() => {
      expect(screen.getByText('Loading')).toBeInTheDocument();
    })
  });

  it('should renders error state if API call fails', async () => {
    BackendService.getStatistics = jest.fn(() => Promise.reject());
    render(<Statistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  it('should renders currency statistics when API call is successful', async () => {
    BackendService.getStatistics = jest.fn(() => Promise.resolve(mockStatistics));
    render(<Statistics currencyCode={mockCurrencyCode} selectedTime={mockSelectedTime} />);

    await waitFor(() => {
      expect(screen.getByText('Median')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('10.50')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Mode')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('10.00 11.00 12.00')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Standard deviation')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('2.50')).toBeInTheDocument();
    })

    await waitFor(() => {
      expect(screen.getByText('Coefficient of variation')).toBeInTheDocument();
    })
    await waitFor(() => {
      expect(screen.getByText('0.24')).toBeInTheDocument();
    })
  });
})
