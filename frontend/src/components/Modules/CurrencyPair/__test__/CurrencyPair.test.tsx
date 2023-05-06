import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CurrencyPair from "../CurrencyPair";
import apiService from "../../../../services/ApiService";
import { CurrencyPairData } from "../../../models/CurrencyPairData";
import { timePeriodName } from "../ChartOptions";
import { debug } from "console";

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}));

const mockCurrencyPairData: CurrencyPairData[] = [
  {
    time: 30,
    scopes: [
      {
        startScope: 1,
        endScope: 2
      },
    ],
    values: [100, 200]
  },
  {
    time: 90,
    scopes: [
      {
        startScope: 10,
        endScope: 20
      },
    ],
    values: [1000, 2000]
  },
]

jest.mock('../../../../services/ApiService', () => ({
  CurrencyPair: jest.fn(() => Promise.resolve([])),
}));

describe('Currency Pair', () => {
  it('renders header with correct text', async () => {
    render(<CurrencyPair />);
    const title = await screen.findByText('Analiza par walut')
    expect(title).toBeInTheDocument();
  });

  it('should show load information during API call', async () => {
    apiService.currencyPair = jest.fn(() => Promise.resolve(mockCurrencyPairData));
    render(<CurrencyPair />);
    await waitFor(() => {
      expect(screen.getByText('Ładowanie')).toBeInTheDocument();
    })
  });

  it('should hide load information on successful API call', async () => {
    apiService.currencyPair = jest.fn(() => Promise.resolve(mockCurrencyPairData));
    render(<CurrencyPair />);
    await waitFor(() => {
      expect(screen.queryByText('Ładowanie')).toBeNull();
    })
  });

  it('should show error information on failed API call', async () => {
    apiService.currencyPair = jest.fn(() => Promise.reject());
    render(<CurrencyPair />);
    await waitFor(() => {
      expect(screen.getByText('Błąd')).toBeInTheDocument();
    })
  });

  it('should call onChange when a time option is clicked', async () => {
    render(<CurrencyPair />);
    const button = await screen.findByText(timePeriodName[0]);
    fireEvent.click(button);
    const selectedButton = screen.getAllByRole('button').find(div => div.innerHTML.includes(timePeriodName[0]));
    expect(selectedButton).toHaveClass('selected');
  });

  it('should show loading information after selecting currency and clicking button', async () => {
    render(<CurrencyPair />);

    const currencyPicker1 = await screen.findByText('USD');
    fireEvent(currencyPicker1, new MouseEvent('click', { bubbles: true }));

    const selectedCurrency1 = await screen.findByText('CHF');
    fireEvent.mouseDown(selectedCurrency1);
    fireEvent(selectedCurrency1, new MouseEvent('click', { bubbles: true }));



    const currencyPicker2 = await screen.findByText('GBP');
    fireEvent(currencyPicker2, new MouseEvent('click', { bubbles: true }));

    const selectedCurrency2 = await screen.findByText('JPY');
    fireEvent.mouseDown(selectedCurrency2);
    fireEvent(selectedCurrency2, new MouseEvent('click', { bubbles: true }));


    const button = await screen.findByText('Wybierz');

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Ładowanie')).toBeInTheDocument();
    })
  })
})