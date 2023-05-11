import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SessionAnalysis from "../session-analysis";
import apiService from '../../../../services/ApiService';
import { timePeriodName } from '../chart-options';
import React from 'react';
jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

jest.mock('../../../../services/ApiService', () => ({
  currencyAnalysis: jest.fn(() => Promise.resolve([])),
}));

describe('Session analysis - chart box', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with correct text', async () => {
    render(<SessionAnalysis />);
    const title = await screen.findByText('Analiza waluty')
    expect(title).toBeInTheDocument();
  });

  it('should call fetchData on render', async () => {
    const spy = jest.spyOn(apiService, 'currencyAnalysis');
    render(<SessionAnalysis />);
    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    })
  });

  it('should hide load information on successful API call', async () => {
    apiService.currencyAnalysis = jest.fn(() => Promise.resolve([{
      time: 7,
      countUp: 1,
      countDown: 2,
      countConst: 3
    }]));
    render(<SessionAnalysis />);
    await waitFor(() => {
      expect(screen.queryByText('Ładowanie')).toBeNull();
    })
  })

  it('should show error information on failed API call', async () => {
    apiService.currencyAnalysis = jest.fn(() => Promise.reject());
    render(<SessionAnalysis />);
    await waitFor(() => {
      expect(screen.getByText('Błąd')).toBeInTheDocument();
    })
  })

  it('should call onChange when a time option is clicked', async () => {
    render(<SessionAnalysis />);
    const button = await screen.findByText(timePeriodName[0]);
    fireEvent.click(button);
    const selectedButton = screen.getAllByRole('button').find(div => div.innerHTML.includes(timePeriodName[0]));
    expect(selectedButton).toHaveClass('selected');
  })
})

describe('Session analysis - picker box', () => {
  it('should show loading information after selecting currency and clicking button', async () => {
    render(<SessionAnalysis />);

    const currencyPicker = await screen.findByText('USD');
    fireEvent(currencyPicker, new MouseEvent('click', { bubbles: true }));


    const selectedCurrency = await screen.findByText('CHF');
    fireEvent.mouseDown(selectedCurrency);
    fireEvent(selectedCurrency, new MouseEvent('click', { bubbles: true }));


    const button = await screen.findByText('Wybierz');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Ładowanie')).toBeInTheDocument();
    })
  })
})